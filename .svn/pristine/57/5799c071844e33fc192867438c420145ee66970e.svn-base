import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../global-services/dataService';
import * as _ from 'lodash';




@Component({
    selector: 'side-bar',
    templateUrl: 'app/side-bar/side-bar.tpl.html'
})

export class SideBarComponent {

    public usersList: any;
    //public user: UserModel;
    private id: number;
    constructor(
        private _route: Router,
        private _dataService: DataService
    ) {


    }

    ngOnInit() {
        this._dataService.fetch('user').subscribe((userList: any) => {
            this.usersList = userList;
            this._dataService.userSubject.subscribe((userList: any) => { this.usersList = userList; })
        })

        
    }


}