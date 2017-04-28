import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/map';

export class DataService {

    public _id: number = 0;
    public userSubject = new Subject<any>();
    private _userData: Array<any> = [];
    private _workData: Array<any> = [];
    private _addData: Array<any> = [];

    private turnLocalStorageOn = true;

    constructor() {

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

    getLocalData(type) {

        if (type === 'user') { return this._userData; }
        else if (type === 'work') { return this._workData; }
        else if (type === 'address') { return this._addData; }

    }

    setLocalData(type, data) {
        if (type === 'user') { this._userData = data; }
        else if (type === 'work') { this._workData = data; }
        else if (type === 'address') { this._addData = data; }
    }


    public fetch(type: string, key: number = 0): Observable<any> {
        //try {

        let dataObj = this.turnLocalStorageOn ? this.getFromLocalStorage(type) : this.getLocalData(type);
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
            let existData;
            this.fetch(type).subscribe((resData: any) => {
                existData = _.isEmpty(resData) ? [] : resData;
                _.find(existData, (item: any, index: number, self: Array<any>) => {
                    if (item.id === data.id) {
                        self.splice(index, 1, data);
                        res = true;
                    }
                });

                if (!res) {
                    existData.push(data);
                }

            });

            if (this.turnLocalStorageOn) this.setLocalStorage(type, existData);
            if (!this.turnLocalStorageOn) this.setLocalData(type, existData);

            if (type === 'user') this.userSubject.next(existData);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }

    }

    private setLocalStorage(key, data) {
        console.log(key, data);
        localStorage.setItem(key, JSON.stringify(data));
    }

    private getFromLocalStorage(key) {
        if (!key) {
            throw new Error("Key is not provided");
        } else {
            let data = localStorage.getItem(key);
            console.log(key, data);
            return _.isEmpty(data) ? [] : JSON.parse(data);
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


