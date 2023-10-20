import {Storage} from '@ionic/storage-angular'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  data: any;
  dataFiltrada: any;
  message: any;
  existeFavorito: any;
  todosFavoritos: any;
  search?: string;


  constructor(private http: HttpClient, private storage:Storage, public navCtrl: NavController, public router:Router) {}

  async ngOnInit(){
    this.getData()
    this.ionViewWillEnter()

  }

  async ionViewWillEnter() {
    await this.storage.create();
    this.todosFavoritos = await this.showAllFavorites()
  }
  async filterDataInput(data: any){
    this.todosFavoritos = data.filter((item:any) => {
      return item.title.toUpperCase().includes(this.search?.toUpperCase()) || item.subtitle.toUpperCase().includes(this.search?.toUpperCase())
    })
    if(this.search === ""){
      this.todosFavoritos = await this.showAllFavorites();
    }
  }

  async setValue(id:number, data : any) {
    this.existeFavorito = await this.storage.get(id.toString());
    if(this.existeFavorito === null){
      await this.storage.set(id.toString(), data);
      this.todosFavoritos = await this.showAllFavorites();
    }else{
      await this.storage.remove(id.toString())
      this.todosFavoritos = await this.showAllFavorites();
    }

  }
  async showAllFavorites() {
    var todosFavoritosAtual: any = []
    await this.storage.forEach((value, key, index) => {
      todosFavoritosAtual.push(value)
    });
    return todosFavoritosAtual
  }

/////////////////////////////////////////////////////////////////////////////////////////////////
  getData(){
    this.http.get('/assets/mock/cards.json').pipe(map(data => data)).subscribe(result => {
      this.data = result
      this.filterData(this.data)
    });
  }
  filterData(data: any){
    this.dataFiltrada = data.filter((item:any) => item.favorito === true)
  }

  Details(key: any){
    this.navCtrl.navigateForward('home-details/'+key)
  }

}
