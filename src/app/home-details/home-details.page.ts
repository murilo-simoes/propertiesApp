import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-details',
  templateUrl: './home-details.page.html',
  styleUrls: ['./home-details.page.scss'],
})
export class HomeDetailsPage implements OnInit {

  id: any;
  home: any;
  data: any;

  message: any;
  existeFavorito: any;
  estaFavorito: any;
  todosFavoritos: any;
  corCoracao: any;
  search?: string;

  constructor( public navCtrl : NavController, public router: ActivatedRoute, public http: HttpClient, private storage:Storage) { }


  async ionViewWillEnter() {
    await this.storage.create();
    this.showData()
    await this.showAllFavorites()


  }

  ngOnInit() {

  }

  Back(){
    this.navCtrl.back();
  }

  showData(){
    this.id = this.router.snapshot.paramMap.get('id')
    this.http.get('/assets/mock/cards.json').pipe(map(data => data)).subscribe(result => {
    this.data = result
    this.home = this.data.filter((item: any) => parseInt(item.id) === parseInt(this.id))
    });
  }

  comprarCasa(text:string){
    alert(text)
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
    await this.storage.forEach((value, key, index) => {
      todosFavoritosAtual.push(value)
    });
      var desligou : boolean = false
      for(let x = 0; x < todosFavoritosAtual.length; x++){
        if(this.home[0].id === todosFavoritosAtual[x].id){
          this.corCoracao = ("icon-heart-on")
          var desligou : boolean = true
          break
        }
        }
        if(desligou === false){
          this.corCoracao = ("icon-heart-off")
        }

    }
  }


