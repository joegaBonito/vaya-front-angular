import { AdminGuard } from "../guards/admin.guard";
import { CommonModule } from "@angular/common";
import { NgxPaginationModule } from "ngx-pagination";
import { FormsModule } from "@angular/forms";
import { NewCommerRoutingModule } from "./newcommer-routing.module";
import { NewcommerComponent } from "./newcommer.component";
import { NewcommerViewComponent } from "./newcommer-view/newcommer-view.component";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        NewcommerComponent,
        NewcommerViewComponent,
      ],
      imports: [
          CommonModule,
          FormsModule,
          NgxPaginationModule,
          NewCommerRoutingModule
      ],
      providers: [
        AdminGuard
      ]
})

export class NewCommerModule{}