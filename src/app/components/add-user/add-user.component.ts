import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Weather } from 'src/app/interfaces/weather';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  users: User[] = [];
  weather: Weather[] = [];

  constructor(
    private apiService: ApiService
  ) {}
  
  ngOnInit(): void {
    this.apiService.getUserData(10).subscribe(
      (data: any) => {
        data.results.forEach((user: any) => {
          this.users.push({
            name: user.name.first + ' ' + user.name.last,
            gender: user.gender,
            profileImage: user.picture.thumbnail,
            location: user.location.country + ', ' + user.location.city + ', ' + user.location.street.name + ', ' + user.location.street.number,
            email: user.email,
            latitude: user.location.coordinates.latitude,
            longitude: user.location.coordinates.longitude
          });
        });

        this.users.forEach(user => {
          this.apiService.getWeatherData(user.latitude, user.longitude).subscribe(
            (weather: any) => {
              this.weather.push(weather);
            }
          );
        });
      }
    );
  }
}
