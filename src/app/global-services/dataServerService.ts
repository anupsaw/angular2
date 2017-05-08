import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/Observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';

import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Injectable()
export class DataServerService {

  private serverUrl = 'http://localhost:3100/api/'

  constructor(private http: Http) {

  }

  getData(entity, id = null): Observable<any> {
    let url = this.serverUrl + entity;
    if (id) url = url + '/' + id;
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  postData(entity, data): Observable<any> {
    // let headers = new Headers();
    // headers.append( 'Content-Type',  'application/json' );
    // headers.append('method', 'POST');
    //let options = new RequestOptions({ headers: headers });
    return this.http.post(this.serverUrl + entity, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putData(entity, data, id): Observable<any> {
    return this.http.put(this.serverUrl + entity + '/' + id, data)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteData(entity, id): Observable<any> {
    return this.http.delete(this.serverUrl + entity + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}