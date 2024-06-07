export class LoginEntity {
  email!: string;
  password!: string;

  constructor(this_class: LoginEntity) {
    Object.entries(this_class).forEach(([key, value]) => {
      if (key in this) this[key] = value;
    });
  }
}
