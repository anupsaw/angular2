import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../global-services/dataService';
import * as _ from 'lodash';

@Component({
    templateUrl: 'app/RoutingComponents/address/address.tpl.html'
})

export class AddressComponent {

    public address: AddressModel = new AddressModel();

    constructor(private _route: Router,
        private _dataService: DataService,
        private _routeData: ActivatedRoute
    ) {


    }


    ngOnInit() {
        this._routeData.params.subscribe((add: AddressModel) => {
            //let id = this._dataService.generateId();
            let data = this._dataService.fetch('add', add.id);
            if (!_.isEmpty(data)) this.address = data;
            this.address.id = add.id;
        })

    }


    saveAndNext(model: any) {
        console.log(model);
        let res = this._dataService.save('work', model.address);
        //if (res) this._route.navigate(['/address',{ id: model.address.id } ]);
    }
}

export class AddressModel {
    public addressLine1: string;
    public addressLine2: string;
    public country: string;
    public city: string;
    public zipCode: number;
    public phoneNumber: string;
    public id: number;
}