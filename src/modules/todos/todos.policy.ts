import { UserResponseObject } from 'src/modules/users/user.dto';

export class TodosPolicy {
  // authorize(user, resource) {}

  static all(user?: UserResponseObject, response?: any) {
    return true;
  }
}
