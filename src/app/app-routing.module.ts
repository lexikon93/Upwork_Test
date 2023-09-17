import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ShowUserComponent } from './show-user/show-user.component';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
