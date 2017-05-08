import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './RoutingComponents/home/home.Component';
import { UserComponent } from './RoutingComponents/user/user.Component';
import { WorkComponent } from './RoutingComponents/work/work.Component';
import { AddressComponent } from './RoutingComponents/address/address.Component';


const appRoutes: Routes = [{
    path: 'home', component: HomeComponent
}, {
    path: 'user/:id', component: UserComponent
},
{
    path: 'address/:id', component: AddressComponent
},
{
    path: 'work/:id', component: WorkComponent
}, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRootRoutingModule { }

export const AppRootRoutingComponent = [
    HomeComponent,
    UserComponent,
    AddressComponent,
    WorkComponent
]