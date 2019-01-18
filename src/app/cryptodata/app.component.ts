import { Component, OnInit,Input, HostListener, Directive } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { DetalleComponent } from '../detalle/detalle.component';
import { interval } from 'rxjs';
@Component({
  selector: 'app-cryptodata',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class Cryptodata implements OnInit {
  title = 'Crypto View App';
  results = "";
  dato=null;
  valorusd = '';
  nombrecm="";
  mostrar1=false;
  mostrar2=true;
  id=null;
  tiempo=3000;
  constructor(private http: HttpClient){
  }
  drefresh(valores){
    this.detalles(valores);
    this.id = setInterval(() => {
    this.detalles(valores); 
  }, this.tiempo);
  }

  detalles(valores) {
  this.mostrar1=true;
  this.mostrar2=false;
  this.results=valores;
    this.http.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id='+valores, {
        headers: new HttpHeaders().set('X-CMC_PRO_API_KEY', 'e2f37ab5-fbe4-49af-89c7-da2c787285d6')
      }).subscribe(lista => {
      this.valorusd=lista['data'][valores].quote.USD.price;
      this.nombrecm=lista['data'][valores].name;
        console.log(lista['data'][valores]);
    });
  }
  Regresar(){
    if (this.id) {
    clearInterval(this.id);
  }
    this.mostrar2=true;
    this.mostrar1=false;
  }
  ngOnInit(): void {
    	this.http.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: new HttpHeaders().set('X-CMC_PRO_API_KEY', 'e2f37ab5-fbe4-49af-89c7-da2c787285d6')
      }).subscribe(lista => {
      this.dato=lista['data'];
      	console.log(lista['data']);
    });
  }
}