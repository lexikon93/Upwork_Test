import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  getUserData(): any {
    return this.http.get('https://randomuser.me/api');
  }
}
