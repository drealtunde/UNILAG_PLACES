import { ListPage } from './../list/list';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab1Root: any = MapPage;
  tab2Root: any = ListPage;

  

  constructor(public navCtrl: NavController) {

  }

}
