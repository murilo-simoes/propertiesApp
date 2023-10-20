import {Storage} from '@ionic/storage-angular'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  data: any;
  message: any;
  existeFavorito: any;
  estaFavorito: any;
  todosFavoritos: any;
  corCoracao: any = [];
  search?: string;

  constructor(private http: HttpClient, private storage:Storage, public navCtrl: NavController, public router:Router) {}

  async ionViewWillEnter() {
    await this.storage.create();
    await this.showAllFavorites()
  }
  async ngOnInit(){
    this.getData()
  }

  async setValue(id:number, data : any) {
    this.existeFavorito = await this.storage.get(id.toString());
    if(this.existeFavorito === null){
      await this.storage.set(id.toString(), data);
      await this.showAllFavorites()
    }else{
      await this.storage.remove(id.toString())
      await this.showAllFavorites()
    }
  }


  async showAllFavorites() {
    var todosFavoritosAtual: any = []
    this.corCoracao = []
     await this.storage.forEach((value, key, index) => {
      todosFavoritosAtual.push(value)
    });
    for(let i = 0; i < this.data.length;i++){
      let adicionou : boolean = false
      for(let x = 0; x < todosFavoritosAtual.length; x++){
        if(this.data[i].id === todosFavoritosAtual[x].id){
          this.corCoracao.push("icon-heart-on")
          adicionou = true
          continue
        }
      }
      if(adicionou === false){
        this.corCoracao.push("icon-heart-off")
      }
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////

  getData(){
    this.http.get('/assets/mock/cards.json').pipe(map(data => data)).subscribe(result => {
      this.data = result
    });
  }

    //DETALHES DA CASA //////////////////////////////////////////////

    Details(key: any){
      this.navCtrl.navigateForward('home-details/'+key)
    }

}
