import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) {}
  
  ngOnInit(): void {
    this.apiService.getUserData(10).subscribe((user: any) => console.log('user: ', user));
    this.apiService.getWeatherData('-45.7179', '-84.3750').subscribe((weather: any) => console.log('weather: ', weather));
  }
}
