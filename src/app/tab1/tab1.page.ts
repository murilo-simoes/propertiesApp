import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  data:any;
  dataFiltrada: any;
  salas: any;
  tipo: string = "alugar";
  search?: string;

  constructor(private http: HttpClient, public navCtrl: NavController, public router:Router) {
  }

  ngOnInit(){
    this.getData()
  }

  filterDataInput(data: any){
    this.dataFiltrada = data.filter((item:any) => {
      return item.title.toUpperCase().includes(this.search?.toUpperCase()) || item.subtitle.toUpperCase().includes(this.search?.toUpperCase())
    })
    if(this.search === ""){
      this.filterData(this.data)
    }
  }

  getData(){
    this.http.get('/assets/mock/cards.json').pipe(map(data => data)).subscribe(result => {
      this.data = result
      this.filterData(this.data)
    });
  }

  filterData(data: any){
    this.dataFiltrada = data.filter((item:any) => item.tipo === this.tipo)
  }

  //DETALHES DA CASA //////////////////////////////////////////////

  Details(key: any){
    this.navCtrl.navigateForward('home-details/'+key)
  }



}
