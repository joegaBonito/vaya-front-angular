import { Component, OnInit } from '@angular/core';
import {YAColumn} from '../model/YAColumn';
import {YacolumnService} from '../service/yacolumn.service';

@Component({
  selector: 'app-young-adults-column-list',
  templateUrl: './young-adults-column-list.component.html',
  styleUrls: ['./young-adults-column-list.component.css']
})
export class YoungAdultsColumnListComponent implements OnInit {
  items:YAColumn[];
  selectedPost:YAColumn;
  isLoading: boolean = false;

  constructor(private yacolumnService:YacolumnService) {
  }

  getYAColumns():void {
    this.isLoading = true;
    this.yacolumnService.getYAColumns()
    .subscribe(yaColumns=>{
      this.items = yaColumns;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.getYAColumns();
  }
}
