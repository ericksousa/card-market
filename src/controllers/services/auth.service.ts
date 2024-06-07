import { default as Connection } from "../config/axios.connection";
import { BaseService } from "./util/base.service";
import { make_url } from "../util/make-url.util";
import { RegisterEntity } from "@/models/entity/auth/register.entity";
import { LoginEntity } from "@/models/entity/auth/login.entity";
import { IAuth } from "@/models/interfaces/auth.interface";

export class AuthService extends BaseService {
  constructor() {
    super(Connection, "");
  }

  async register(payload: RegisterEntity): Promise<unknown> {
    this.override_url = make_url("register");
    return this.save(payload);
  }

  async login(payload: LoginEntity): Promise<IAuth> {
    this.override_url = make_url("login");
    return this.save(payload);
  }
}

export default new AuthService();
