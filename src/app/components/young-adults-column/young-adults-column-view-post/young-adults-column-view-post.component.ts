import { Component, OnInit} from '@angular/core';
import {YAColumn} from '../model/YAColumn';
import {YacolumnService} from '../service/yacolumn.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location }                 from '@angular/common';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-young-adults-column-view-post',
  templateUrl: './young-adults-column-view-post.component.html',
  styleUrls: ['./young-adults-column-view-post.component.css']
})
export class YoungAdultsColumnViewPostComponent implements OnInit {
  isAdmin: boolean = false;
  isOwner: boolean = false;
  yaColumn: YAColumn;

  constructor(
    private yacolumnService: YacolumnService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private store:Store<fromApp.AppState>
  ) { }

  ngOnInit() {
      this.route.paramMap
        // (+) converts string 'id' to a number (+params.get('id'))
        .switchMap((params: ParamMap) => this.yacolumnService.getYAColumn(params.get('id')))
        .subscribe(yaColumn => {
          this.yaColumn = yaColumn;
          this.onCheckAdmin();
        });
  }

  goBack(): void {
    this.location.back();
  }

  onClickDelete() {
    this.yacolumnService.deleteYAColumn(this.route.snapshot.params.id)
      .subscribe(() => this.router.navigate(['/yacolumn/list']));
  }

  onCheckAdmin() {
    this.store.select('auth').subscribe((res)=>{
      this.isAdmin = res.isAdmin;
      this.onCheckOwner();
    })
  }

  onCheckOwner() {
    let username: string;
    this.store.select('auth').subscribe((res)=>{
      username = res.currentUsername;
    })
    if (username == this.yaColumn.author) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }
  }
}
