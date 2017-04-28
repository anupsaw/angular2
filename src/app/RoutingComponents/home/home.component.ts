import { Component } from '@angular/core';
import { DataServerService } from '../../global-services/dataServerService';

@Component({
    templateUrl: 'app/RoutingComponents/home/home.tpl.html'
})


export class HomeComponent {

    constructor(private dataService: DataServerService) {

    }

    ngOnInit(){
        this.dataService.getData('user').subscribe(data => console.log(data));
    }

}