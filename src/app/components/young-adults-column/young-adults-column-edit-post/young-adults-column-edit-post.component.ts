import { Component, OnInit } from '@angular/core';
import { YAColumn } from '../model/YAColumn';
import { YacolumnService} from '../service/yacolumn.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-young-adults-column-edit-post',
  templateUrl: './young-adults-column-edit-post.component.html',
  styleUrls: ['./young-adults-column-edit-post.component.css']
})
export class YoungAdultsColumnEditPostComponent implements OnInit {

  yaColumn:YAColumn;

  submitted:boolean = false;

  constructor(
    private yacolumnService:YacolumnService,
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute) {
      this.yacolumnService.getYAColumn(this.route.snapshot.params.id)
      .subscribe(yaColumn => {
        this.yaColumn = yaColumn;
      });
    }

  ngOnInit() {

  }

  onSubmit({value,valid}:{value:YAColumn, valid:boolean}) {
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['YoungAdultsColumnEditPostComponent',this.yaColumn.id]);
    } else {
      this.yacolumnService.editYAColumn(this.route.snapshot.params.id,value)
      .subscribe(res=>{
        this.router.navigate(['/YoungAdultsColumnListComponent']);
        this.flashMessagesService.show('Young Adults Column has been edited',{cssClass:'alert-success',timeout:3000});
      });
    }
  }
}
