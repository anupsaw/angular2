import { Component } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../global-services/dataService';
import * as _ from 'lodash';

@Component({
    templateUrl: 'app/RoutingComponents/work/work.tpl.html'
})

export class WorkComponent {

    //use of reactive Form

    public work: WorkModel = new WorkModel();;

    constructor(private _route: Router,
        private _dataService: DataService,
        private _routeData: ActivatedRoute
    ) {


    }


    ngOnInit() {
        this._routeData.params.subscribe((work: WorkModel) => {

            this._dataService.fetch('user', +work.id).subscribe((workData: any) => {
                if (!_.isEmpty(workData)) { this.work = workData; }
            });
            this.work.id = +work.id;
        })

    }


    saveAndNext(model: any) {
        console.log(model);
        let res = this._dataService.save('work', model.work);
        if (res) this._route.navigate(['/address', model.work.id]);
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
}