import { gql } from 'apollo-angular';
import { IUser } from 'src/app/interfaces';

export interface IUPDATE_USER {
  updateUser: IUser;
}

export const UPDATE_USER = gql`
  mutation updateUser($updateUser: UpdateUserInput!) {
    updateUser(updateUser: $updateUser) {
      id
    }
  }
`;
