import { Component, OnInit } from '@angular/core';
import {YAColumn} from '../model/YAColumn';
import {YacolumnService} from '../service/yacolumn.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';

@Component({
  selector: 'app-young-adults-column-view-post',
  templateUrl: './young-adults-column-view-post.component.html',
  styleUrls: ['./young-adults-column-view-post.component.css']
})
export class YoungAdultsColumnViewPostComponent implements OnInit {

  yaColumn:YAColumn;

  constructor(
    private yacolumnService: YacolumnService,
    private router:Router,
    private route:ActivatedRoute,
    private location:Location

  ) { }

  ngOnInit() {
    this.yacolumnService.getYAColumn(this.route.snapshot.params.id)
         .subscribe(yaColumn => this.yaColumn = yaColumn);
  }

  goBack(): void {
    this.location.back();
  }

  onClickDelete() {
    this.yacolumnService.deleteYAColumn(this.route.snapshot.params.id)
    .subscribe(()=> this.router.navigate(['/YoungAdultsColumnListComponent']));
  }
}
