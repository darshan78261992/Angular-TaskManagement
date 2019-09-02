import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule , HttpClientXsrfModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddComponent } from './addtask/add/add.component';
import { UpdateComponent } from './updatetask/update/update.component';
import { ViewComponent } from './viewtask/view/view.component';
import { FormsModule } from '@angular/forms';
import { AdduserComponent } from './adduser/adduser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { ViewprojectComponent } from './viewproject/viewproject.component';



@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    UpdateComponent,
    ViewComponent,
    AdduserComponent,
    UpdateuserComponent,
    AddprojectComponent,
    UpdateprojectComponent,
    ViewuserComponent,
    ViewprojectComponent,
    //AppRoutingModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'addproject', component: AddprojectComponent },
      { path: '', redirectTo: 'addproject', pathMatch: 'full' },
      { path: 'addtask', component: AddComponent },
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      { path: 'addUser', component: AdduserComponent },
      { path: '', redirectTo: 'addUser', pathMatch: 'full' },
      { path: 'viewtask', component: ViewComponent },
      { path: '', redirectTo: 'view', pathMatch: 'full' },
      { path: 'update', component: UpdateComponent },
      { path: '', redirectTo: 'update', pathMatch: 'full' },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
