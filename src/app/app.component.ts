import { Component } from '@angular/core';
import { DataService } from './global-services/dataService';
@Component({
  selector: 'my-app',
  templateUrl: 'app/app-component.tpl.html'
})
export class AppComponent {

  constructor(_dataService:DataService) {

  }
  name = 'Angular';
}
