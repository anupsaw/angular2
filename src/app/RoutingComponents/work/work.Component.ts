import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../global-services/dataService';
import * as _ from 'lodash';

@Component({
    templateUrl: 'app/RoutingComponents/work/work.tpl.html'
})

export class WorkComponent {

    //use of reactive Form : FornGroup



    public work = new FormGroup({
        companyName: new FormControl(),
        jobTitle: new FormControl(),
        jobRole: new FormControl(),
        companySize: new FormControl(),
        companyAddress: new FormGroup({
            city: new FormControl(),
            zipCode: new FormControl()
        }),
        id:new FormControl()
    })
    public id: number;

    constructor(private _route: Router,
        private _dataService: DataService,
        private _routeData: ActivatedRoute
    ) {

    }


    ngOnInit() {
        this._routeData.params.subscribe((work: WorkModel) => {

            this._dataService.fetch('work', +work.id).subscribe((workData: any) => {
                if (!_.isEmpty(workData)) { this.work.patchValue(workData); }
            });
            this.id = +work.id;
        })

    }


    saveAndNext(model: any) {
        console.log(model);
        model.value.id = this.id;
        let res = this._dataService.save('work', model.value);
        if (res) this._route.navigate(['/address', this.id]);
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