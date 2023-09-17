import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss']
})
export class ShowUserComponent implements OnInit {
  users: User[] = [];

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users') as string);
  }
}
