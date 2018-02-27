import { Component, OnInit } from '@angular/core';
import { YAColumn } from '../model/YAColumn';
import { YacolumnService } from '../service/yacolumn.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-young-adults-column-create-post',
  templateUrl: './young-adults-column-create-post.component.html',
  styleUrls: ['./young-adults-column-create-post.component.css']
})
export class YoungAdultsColumnCreatePostComponent implements OnInit {


  yaColumn: YAColumn = new YAColumn();
  submitted: boolean = false;

  constructor(
    private yacolumnService: YacolumnService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private store:Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.store.select('auth').subscribe((res)=>{
      this.yaColumn.author = res.currentUsername;
    });
    this.yaColumn.date = JSON.stringify(Date.now());
  }

  onClickBack() {
    this.router.navigate(['/yacolumn/list']);
  }

  onSubmit({ value, valid }: { value: YAColumn, valid: boolean }) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all required fields', { cssClass: 'alert-danger', timeout: 3000 });
      this.router.navigate(['/yacolumn/create']);
    } else {
      this.yacolumnService.newYAColumn(value)
        .subscribe(res => {
          this.router.navigate(['/yacolumn/list']);
        });
      this.flashMessagesService.show('New Client has been added', { cssClass: 'alert-success', timeout: 3000 });
    }
  }

}
