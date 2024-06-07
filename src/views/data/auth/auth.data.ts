import AuthService from "@/controllers/services/auth.service";
import { LoginEntity } from "@/models/entity/auth/login.entity";
import { RegisterEntity } from "@/models/entity/auth/register.entity";

class AuthData {
  payload_login = new LoginEntity({
    email: "",
    password: "",
  });

  payload_register = new RegisterEntity({
    name: "",
    email: "",
    password: "",
  });

  async register(payload: RegisterEntity) {
    return await AuthService.register(payload);
  }
}

export default new AuthData();
