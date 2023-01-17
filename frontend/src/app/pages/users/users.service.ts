import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import { GET_ALL_USERS, IGET_ALL_USERS } from './gql/get-all-users';
import { GET_ONE_USER, IGET_ONE_USER } from './gql/get-one-user';
import { DELETE_USER, IDELETE_USER } from './gql/delete-user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private readonly apollo: Apollo) {}

  getAllUsers(): Observable<IUser[]> {
    return this.apollo
      .watchQuery<IGET_ALL_USERS>({
        query: GET_ALL_USERS,
      })
      .valueChanges.pipe(map(({ data }) => data?.getAllUsers));
  }

  getOneUser(id: string): Observable<IUser> {
    return this.apollo
      .watchQuery<IGET_ONE_USER>({
        query: GET_ONE_USER,
        variables: {
          id: +id,
        },
      })
      .valueChanges.pipe(map(({ data }) => data?.getOneUser));
  }
  deleteUser(id: number): Observable<number | undefined> {
    return this.apollo
      .mutate<IDELETE_USER>({
        mutation: DELETE_USER,
        variables: {
          id: +id,
        },
        refetchQueries: ['getAllUsers'],
      })
      .pipe(map(({ data }) => data?.removeUser));
  }
}
