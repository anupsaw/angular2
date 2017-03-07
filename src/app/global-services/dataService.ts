import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

export class DataService {

    private _id: number;
    public userSubject = new Subject<any>();

    constructor() {

    }

    private setKey(entity: any) {
        return this._id + '::' + entity;
    }



    public save(type: string, data: any) {
        try {

            this.update(type, data);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }

    }


    public fetch(type: string, key: number = 0): Observable<any> {
        //try {

        let dataObj = this.getFromLocalStorage(type);
        dataObj = key === 0 ? dataObj : _.find(dataObj, (item: any) => { return item.id === key });
        return of(dataObj);

        // } catch (error) {
        // console.error(error);
        // return false;
        // }
    }

    public update(type: string, data: any) {
        try {
            let res = false;
            if (!type) throw new Error('entity name is not provided.');
            if (!data.id) throw new Error('user id is not provided.');

            let existData = this.fetch(type).subscribe((existData: any) => {
                _.find(existData, (item: any, index: number, self: Array<any>) => {
                    if (item.id === data.id) {
                        self.splice(index, 1, data);
                        res = true;
                    }
                });

                if (!res) {
                    existData = _.isEmpty(existData) ? [] : existData;
                    existData.push(data);
                    this.userSubject.next(existData);
                }

            });


            this.setLocalStorage(type, existData);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }

    }

    private setLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    private getFromLocalStorage(key) {
        if (!key) {
            throw new Error("Key is not provided");
        } else {
            let data = localStorage.getItem(key);
            return _.isEmpty(data) ? null : JSON.parse(data);
        }
    }

    generateId(id: number = undefined) {
        if (id === undefined || isNaN(id) || id === 0) {
            this._id = new Date().getTime();
        } else {
            this._id = id;
        }

        return this._id;
    }


}


