import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../global-services/dataService';
import * as _ from 'lodash';
import { DataServerService } from '../../global-services/dataServerService';

@Component({
    templateUrl: 'app/RoutingComponents/user/user.tpl.html'
})

export class UserComponent {

    //use of templated form

    public user: UserModel
    private id: number;
    constructor(private _route: Router,
        private _dataService: DataService,
        private _routeData: ActivatedRoute,
        private dataService: DataServerService
    ) {

        this.user = new UserModel();
    }

    ngOnInit() {
        this._routeData.params.subscribe((user: UserModel) => {
            let id = +user.id;
            if (id === 0) {
                this.user = new UserModel();
            } else {
                this.dataService.getData('user', id).subscribe((user: any) => {
                    if (!_.isEmpty(user)) { this.user = user; }
                });
            }
        })

    }



    saveAndNext() {
        console.log(this.user);
        //let res = this._dataService.save('user', this.user);
        let res;
        this.dataService.postData('user', this.user).subscribe(data => {
            if (data.id) this._route.navigate(['/work', data.id]);
        });

    }
}


export class UserModel {

    public firstName: string;
    public lastName: string;
    public email: string;
    public userName: string;
    public password: string;
    public confirmPassword: string;
    public id: number;

}