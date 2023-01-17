import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IconModule } from '../../components/icon/icon.module';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
        children: [{ path: ':id', component: UserComponent }],
      },
    ]),
    IconModule,
  ],
})
export class UsersModule {}
