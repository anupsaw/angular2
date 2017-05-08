import { Component, Input, Output } from '@angular/core';



@Component({
    selector: 'as-grid',
    templateUrl: 'app/grid/grid.html'
})

export class AppGridComponent {

  @Input()  public gridConfig: Array<IGridConfig> = [
        { displayName: 'Full Name', fieldName: 'fullName' },
        { displayName: 'Email Id', fieldName: 'emailId' }
    ]
   @Input()  public gridRows: Array<any> = [
        { fullName: 'Anup Saw', emailId: 'anupsaw@gmail.com' },
        { fullName: 'Priyanka Saw', emailId: 'priyankasaw@gmail.com' }
    ]

    public test = { name: 'Anup' };

    constructor() {

    }

}

export interface IGridConfig {
    displayName: String,
    fieldName: String,
}