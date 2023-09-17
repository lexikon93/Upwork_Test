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

  savedUsers: User[] = [];

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
            profileImage: user.picture.medium,
            location: user.location.country + ', ' + user.location.city + ', ' + user.location.street.name + ', ' + user.location.street.number,
            email: user.email,
            latitude: user.location.coordinates.latitude,
            longitude: user.location.coordinates.longitude
          });
        });

        this.users.forEach(user => {
          this.apiService.getWeatherData(user.latitude, user.longitude).subscribe(
            (weather: any) => {
              let icon = '';

              switch (weather.current_weather.weatherCode) {
                case '1':
                case '2':
                case '3':
                  icon = 'Mainly clear, partly cloudy, and overcast';
                  break;
                case '45':
                case '48':
                  icon = 'Fog and depositing rime fog';
                  break;
                case '51':
                case '53':
                case '55':
                  icon = 'Drizzle: Light, moderate, and dense intensity';
                  break;
                case '56':
                case '57':
                  icon = 'Freezing Drizzle: Light and dense intensity';
                  break;
                case '61':
                case '63':
                case '65':
                  icon = 'Rain: Slight, moderate and heavy intensity';
                  break;
                case '66':
                case '67':
                  icon = 'Freezing Rain: Light and heavy intensity';
                  break;
                case '71':
                case '73':
                case '75':
                  icon = 'Snow fall: Slight, moderate, and heavy intensity';
                  break;
                case '77':
                  icon = 'Snow grains';
                  break;
                case '80':
                case '81':
                case '82':
                  icon = 'Rain showers: Slight, moderate, and violent';
                  break;
                case '85':
                case '86':
                  icon = 'Snow showers slight and heavy';
                  break;
                case '95':
                  icon = 'Thunderstorm: Slight or moderate';
                  break;
                case '96':
                case '99':
                  icon = 'Thunderstorm with slight and heavy hail';
                  break;
                default:
                  icon = 'Clear sky';
              }

              this.weather.push({ icon, temperature: 'Current: ' + weather.current_weather.temperature + ', Lowest: ' + Math.min(...weather.hourly.temperature_2m) + ', Highest: ' + Math.max(...weather.hourly.temperature_2m) });
            } 
          );
        });
      }
    );
  }

  saveUser(user: User): void {
    this.savedUsers.push(user);
    localStorage.setItem('users', JSON.stringify(this.savedUsers));
  }
}
