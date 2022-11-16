import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  SaveUser(param?: any) {
    let apiUrl = this.baseUrl + 'users/save'
    return this.http.post(apiUrl, param).pipe(map((res) => res));
  }


  getUsers() {
    let apiUrl = this.baseUrl + 'users/getUsers'
    return this.http.get(apiUrl).pipe(map((resp)=> resp))
  }
}
