import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gnb',
  templateUrl: './gnb.component.html',
  styleUrls: ['./gnb.component.css']
})
export class GnbComponent implements OnInit {
  innerWidth:any;
  show:boolean = true;

  constructor() {
    //Gets the resolution width of the screen on load.
    this.innerWidth = window.screen.width;
 }

  ngOnInit() {
    if(this.innerWidth < 992) {
      this.show = false;
    }
  }
  //Gets the resolution width of the screen on resize.
  onResize(event) {
   this.innerWidth = event.target.innerWidth;
   if (this.innerWidth < 992) {
      this.show = false;
   } else {
     this.show = true;
   }
}
  //Toggle GNB if the resolution is below 992px
  toggleCollapse() {
    if(this.innerWidth < 992)
      this.show = !this.show;
  }

  //Make 'show' false on clicking the logo if the resolution is below 992px
  onClickLogo() {
    if(this.innerWidth < 992)
      this.show = false;
  }

}
