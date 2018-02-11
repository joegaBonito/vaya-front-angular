import { Component, OnInit } from '@angular/core';
import { YAColumn } from '../model/YAColumn';
import { YacolumnService} from '../service/yacolumn.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from '../../login/service/login.service';


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
    private route:ActivatedRoute,
    private loginService:LoginService) {
    }

  ngOnInit() {
    this.yacolumnService.getYAColumn(this.route.snapshot.params.id)
    .subscribe(yaColumn => {
      this.yaColumn = yaColumn;
      this.loginService.isCurrentUserName.subscribe((res)=>{
        this.yaColumn.author = res;
       });
    });
  }

  onClickBack(){
    this.router.navigate(['/yacolumn/list']);
  }

  onSubmit({value,valid}:{value:YAColumn, valid:boolean}) {
    //console.log(value.date);
    if(!valid) {
      this.flashMessagesService.show('Please fill in all required fields', {cssClass:'alert-danger', timeout:3000});
      this.router.navigate(['/yacolumn/edit',this.yaColumn.id]);
    } else {
      this.yacolumnService.editYAColumn(this.route.snapshot.params.id,value)
      .subscribe(res=>{
        this.router.navigate(['/yacolumn/list']);
        this.flashMessagesService.show('Young Adults Column has been edited',{cssClass:'alert-success',timeout:3000});
      });
    }
  }
}
