import { Component } from '@angular/core';
import { DataServerService } from '../../global-services/dataServerService';
import { IGridConfig } from '../../grid/grid.component'

@Component({
    templateUrl: 'app/RoutingComponents/home/home.tpl.html'
})


export class HomeComponent {

    public rows: Array<any> = [];
    public gridConfig: Array<IGridConfig> = [
        { displayName: 'Full Name', fieldName: 'fullName' },
        { displayName: 'Email Id', fieldName: 'emailId' }
    ];


    constructor(private dataService: DataServerService) {

    }

    ngOnInit() {
        this.dataService.getData('user')
            .subscribe(data => data.forEach(
                _row => {
                    _row.fullName = _row.firstName +'  ' +  _row.lastName;
                    this.rows.push(_row);
                }
            ));
    }

}