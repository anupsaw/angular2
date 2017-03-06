import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'main-header',
    templateUrl: 'app/main-header/main-header.tpl.html'
})

export class MainHeaderComponent {

    constructor(private _route: Router) {

    }

    goTo(component: string) {

        this._route.navigate(['/' + component, 0])

    }
}