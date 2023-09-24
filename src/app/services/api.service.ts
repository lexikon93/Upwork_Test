import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {}

  getUserData(count?: number): any {
    if (count) {
      return this.http.get('https://randomuser.me/api/?results=' + count);
    } else {
      return this.http.get('https://randomuser.me/api');
    }
  }

  getWeatherData(latitude: number, longitude: number): any {
    return this.http.get('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current_weather=true&hourly=temperature_2m')
  }
}
