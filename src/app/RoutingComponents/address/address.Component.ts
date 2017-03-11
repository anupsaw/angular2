import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../global-services/dataService';
import * as _ from 'lodash';

@Component({
    templateUrl: 'app/RoutingComponents/address/address.tpl.html'
})

export class AddressComponent {

    public address: FormGroup;
    private _id: number;

    constructor(private _route: Router,
        private _dataService: DataService,
        private _routeData: ActivatedRoute,
        private fb: FormBuilder
    ) {

    }

    initializeForm(data: any) {

        this.address = this.fb.group(new AddressModel(data));
    }


    ngOnInit() {
        this._routeData.params.subscribe((add: AddressModel) => {
            this._dataService.fetch('address', +add.id).subscribe((addData: any) => {
                !_.isEmpty(addData) ? this.initializeForm(addData) : this.initializeForm(null);
            });
            //this.address.value.id = +add.id;
            this.address.controls['id'].setValue(+add.id);
            this._id = +add.id;
        })

    }


    saveAndNext(model: FormGroup) {
        console.log(model.value);
        model.value.id = this._id;
        let res = this._dataService.save('address', model.value);
        if (res) this._route.navigate(['/home']);
    }
}

export class AddressModel {


    public addressLine1: string = '';
    public addressLine2: string = '';
    public country: string = '';
    public city: string = '';
    public zipCode: number = 0;
    public phoneNumber: string = '';
    public id: number = 0;

    constructor(data = null) {

        if (!_.isEmpty(data)) {
            this.addressLine1 = data.addressLine1;
            this.addressLine2 = data.addressLine2;
            this.country = data.country;
            this.city = data.city;
            this.zipCode = data.zipCode;
            this.phoneNumber = data.phoneNumber;
            this.id = data.id;
        }
    }


}