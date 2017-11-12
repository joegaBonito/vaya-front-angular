import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {
  lat: number = 40.757440;
  lng: number = -73.490519;
  zoom: number = 16;
  usePanning:boolean = true;
  scrollwheel:boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
