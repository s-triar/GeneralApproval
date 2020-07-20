export class User {
  nik: string;
  name: string;
  email: string;
  phone: string;
  token: string;
  photoUrl: string;
  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
