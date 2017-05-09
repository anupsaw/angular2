import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../global-services/dataService';
import { DataServerService } from '../../global-services/dataServerService';
import * as _ from 'lodash';


function validateZipCode(c: AbstractControl): { [key: string]: boolean } | null {

    if (c.value !== undefined && isNaN(c.value)) {
        return { 'zip': true };
    }

    return null;


}


@Component({
    templateUrl: 'app/RoutingComponents/work/work.tpl.html'
})

export class WorkComponent {


    public id: number;
    public updateWork: boolean;
    public work = new FormGroup({
        companyName: new FormControl('', Validators.required),
        jobTitle: new FormControl(),
        jobRole: new FormControl(),
        companySize: new FormControl(),
        companyAddress: new FormGroup({
            city: new FormControl('', Validators.required),
            zipCode: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(5), validateZipCode])
        }),
        id: new FormControl()
    })


    constructor(private _route: Router,
        private _dataService: DataService,
        private _routeData: ActivatedRoute,
        private dataService: DataServerService
    ) {

    }


    ngOnInit() {
        this._routeData.params.subscribe((work: WorkModel) => {
            this.dataService.getData('work', work.id).subscribe((workData: any) => {
                if (!_.isEmpty(workData)) {
                    this.work.patchValue(workData);
                    this.updateWork = true;
                }
            });
            //this.id = work.id;
        })
    }


    saveAndNext(model: any) {

        let res;
        if (this.updateWork) {
            res = this.dataService.putData('work', this.work.value, this.work.get('id').value);

        } else {
            res = this.dataService.postData('work', this.work.value);

        }

        res.subscribe((data) => {
            if (data) this._route.navigate(['/address', data.id]);
        })


    }
}

export class WorkModel {
    public companyName: string;
    public jobTitle: string;
    public companySize: string;
    public companyCity: string;
    public companyZip: number;
    public jobRole: string;
    public id: number;
    constructor(

    ) {

    }

}