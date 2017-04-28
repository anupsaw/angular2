import { Component } from '@angular/core';
import { DataService } from '../global-services/dataService';
import { Router } from '@angular/router';

@Component({
    selector: 'head-bar',
    templateUrl: 'app/head-bar/head-bar.tpl.html'
})

export class HeadBarComponent {

    public id: number;
    constructor(private _dataService: DataService, private _router: Router) {
        this.id = this._dataService._id;
    }


    goTo(route, id) {
        console.log(id)
        this._router.navigate(['/' + route, this._dataService._id]);
    }


}