import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DiningTime} from '../models/dining-time';

@Injectable({
  providedIn: 'root'
})
export class DiningTimeService {

  private readonly URL = 'https://us-central1-test-ce3be.cloudfunctions.net/diningtime';

  constructor(
    private http: HttpClient) {
  }

  getAll(): Observable<DiningTime[]> {
    return this.http.get<DiningTime[]>(this.URL);
  }

  getByCode(name: string): Observable<DiningTime> {
    return this.http.get<DiningTime>(this.URL + '/' + name);
  }

  save(diningTime: DiningTime): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(diningTime);
    return this.http.post(this.URL, body, {headers});
  }

  update(diningTime: DiningTime, name: string): Observable<any> {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(diningTime);
    return this.http.put(this.URL + '/' + name, body, {headers});
  }


}