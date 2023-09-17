import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ShowUserComponent } from './components/show-user/show-user.component';

const routes: Routes = [
  {
    path: '',
    component: AddUserComponent,
    title: 'Add User'
  },
  {
    path: 'show',
    component: ShowUserComponent,
    title: 'Show User'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
