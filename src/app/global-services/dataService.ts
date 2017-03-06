import * as _ from 'lodash';
import * as rx from 'rxjs';

export class DataService {

    private _id: number;
    private _userData: Array<any> = [];
    private _workData: Array<any> = [];
    private _addData: Array<any> = [];
    private userData: any = {};


    constructor() {

    }

    private setKey(entity: any) {
        return this._id + '::' + entity;
    }


    // saveUser(user: any) {
    //     //this.save('userList', user);
    //     this._userData.push(user);
    // }

    // saveWork(work: any) {
    //     this.save(this.setKey('work'), work);
    // }

    // saveAdd(add: any) {
    //     this.save(this.setKey('add'), add);
    // }


    public save(type: string, data: any) {
        try {

            let existData = this.fetch(type);
            existData = _.isEmpty(existData) ? [] : existData;
            existData.push(data);

            this.setLocalStorage(type, existData);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }

    }


    public fetch(type: string, key: number = 0) {
        try {

            let dataObj = this.getFromLocalStorage(type);
            dataObj = key === 0 ? dataObj : _.find(dataObj, (item: any) => { return item.id === key });
            return dataObj;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    public update(type: string, key: number = 0, data: any) {
        try {

            if (!type) throw new Error('entity name is not provided.');
            if (!key) throw new Error('user id is not provided.');
            let existData = this.fetch(type);
            _.find(existData, (item: any, index: number, self: Array<any>) => {
                if (item.id === key) {
                    self.splice(index, 1, data);
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


