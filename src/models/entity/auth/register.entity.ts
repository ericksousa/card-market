export class RegisterEntity {
  name!: string;
  email!: string;
  password!: string;

  constructor(this_class: RegisterEntity) {
    Object.entries(this_class).forEach(([key, value]) => {
      if (key in this) this[key] = value;
    });
  }
}
