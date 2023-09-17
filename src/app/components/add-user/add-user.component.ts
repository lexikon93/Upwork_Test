import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  users: User[] = [];

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
            email: user.email
          });
        });
      }
    );

    this.apiService.getWeatherData('-45.7179', '-84.3750').subscribe((weather: any) => console.log('weather: ', weather));
  }
}
