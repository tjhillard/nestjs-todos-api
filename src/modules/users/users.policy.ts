export class UsersPolicy {
  static all(user?: any) {
    return user.role === 'admin';
  }
}
