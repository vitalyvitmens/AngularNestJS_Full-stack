import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  users$?: Observable<IUser[]>;

  constructor(private readonly usersService: UsersService) {}
  ngOnInit(): void {
    this.users$ = this.usersService.getAllUsers();
  }
}
