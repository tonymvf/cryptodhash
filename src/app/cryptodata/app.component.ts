import { Component, OnInit,Input, HostListener, Directive } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-cryptodata',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class Cryptodata implements OnInit {
  title = 'Crypto View App';
  results = "";
  dato="";
  id=1;
  valorusd = '';
  mostrar1=false;
  mostrar2=true;
  constructor(private http: HttpClient){
  }
  detalles(valores) {
  this.mostrar1=true;
  this.mostrar2=false;
  this.results=valores;
    this.http.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id='+valores, {
        headers: new HttpHeaders().set('X-CMC_PRO_API_KEY', 'e2f37ab5-fbe4-49af-89c7-da2c787285d6')
      }).subscribe(data => {
      this.valorusd=data.data[valores].quote.USD.price;
        console.log(data.data[valores]);
    });
  }
  Regresar(){
    this.mostrar2=true;
    this.mostrar1=false;
  }
  ngOnInit(): void {
    	this.http.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: new HttpHeaders().set('X-CMC_PRO_API_KEY', 'e2f37ab5-fbe4-49af-89c7-da2c787285d6')
      }).subscribe(data => {
      this.dato=data.data;
      	console.log(data.data);
    });
  }
}