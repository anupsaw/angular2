import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// custom modules
import { AppRootRoutingComponent, AppRootRoutingModule } from './app.route.module'

//services
import { DataService } from './global-services/dataService';
import { DataServerService } from './global-services/dataServerService';
//routes
//import { appRoutes } from './app.route';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeadBarComponent } from './head-bar/head-bar.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import {AppGridComponent} from './grid/grid.component';






@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, AppRootRoutingModule],
  declarations: [AppComponent, MainHeaderComponent, SideBarComponent, HeadBarComponent, AppGridComponent, AppRootRoutingComponent],
  providers: [DataService, DataServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
