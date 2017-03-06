import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../global-services/dataService';
import * as _ from 'lodash';

@Component({
    templateUrl: 'app/RoutingComponents/user/user.tpl.html'
})

export class UserComponent {

    //use of templated form
    public user: UserModel = new UserModel();

    private id: number;
    constructor(private _route: Router,
        private _dataService: DataService,
        private _routeData: ActivatedRoute
    ) {


    }

    ngOnInit() {
        this._routeData.params.subscribe((user: UserModel) => {
            let id = this._dataService.generateId(+user.id);
            let data = this._dataService.fetch('user', id);
            if (!_.isEmpty(data)) { this.user = data; }
            this.id = id;
            this.user.id = id;
        })

    }



    saveAndNext() {
        console.log(this.user);
        let res = this._dataService.save('user', this.user);
        if (res) this._route.navigate(['/work', this.user.id]);
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