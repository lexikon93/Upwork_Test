import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  users: any[] = [];

  constructor(
    private apiService: ApiService
  ) {}
  
  ngOnInit(): void {
    this.users = this.apiService.getUserData().subscribe((value: any) => console.log('value: ', value));
  }
}
