import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GLOBAL } from './global';
@Injectable({
  providedIn: 'root'
})
export class TweetService {
  public url: string;
  public bsq
  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  obttweets(page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'dataSocialMedia2/' + page, { withCredentials: true });
    //return this._http.get(this.url + 'dataSocialMedia2/' + page, { headers: headers });
  }
  obtALLtweets(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'dataSocialMediaFiltros', { withCredentials: true });
    //return this._http.get(this.url + 'dataSocialMedia2/' + page, { headers: headers });
  }

  obtALLtweets2HLG(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'dataSocialMedia', { withCredentials: true });
    //return this._http.get(this.url + 'dataSocialMedia2/' + page, { headers: headers });
  }

  obtBSQ(){
  let bsq = JSON.parse(localStorage.getItem('bsq'));

  if (bsq != "undefined") {
    this.bsq= bsq;
  } else {
    this.bsq = null;
  }

  return this.bsq;
}
}
