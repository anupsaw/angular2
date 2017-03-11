import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//services
import { DataService } from './global-services/dataService';
//routes
//import { appRoutes } from './app.route';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeadBarComponent } from './head-bar/head-bar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { HomeComponent } from './RoutingComponents/home/home.Component';
import { UserComponent } from './RoutingComponents/user/user.Component';
import { WorkComponent } from './RoutingComponents/work/work.Component';
import { AddressComponent } from './RoutingComponents/address/address.Component';


const appRoutes: Routes = [{
  path: 'home', component: HomeComponent
}, {
  path: 'user/:id', component: UserComponent
},
{
  path: 'address/:id', component: AddressComponent
},
{
  path: 'work/:id', component: WorkComponent
}, {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
}];


@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, MainHeaderComponent, SideBarComponent, HeadBarComponent, HomeComponent, UserComponent, WorkComponent, AddressComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
