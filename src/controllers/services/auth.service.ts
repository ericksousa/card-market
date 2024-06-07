import { ITrade } from "@/models/interfaces/trade.interface";
import { default as Connection } from "../config/axios.connection";
import { BaseService } from "./util/base.service";
import { make_url } from "../util/make-url.util";
import { RegisterEntity } from "@/models/entity/auth/register.entity";

export class AuthService extends BaseService {
  constructor() {
    super(Connection, "");
  }

  async register(payload: RegisterEntity): Promise<ITrade> {
    this.override_url = make_url("register");
    return this.save(payload);
  }
}

export default new AuthService();
