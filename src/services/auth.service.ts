import { InitData } from "@telegram-apps/init-data-node";

import { IAuthService } from "../interfaces/services/auth.interface";

export class AuthService implements IAuthService {
  login(initData: InitData): Promise<object> {
    throw new Error("Method not implemented.");
  }

  register(id: string): Promise<object> {
    throw new Error("Method not implemented.");
  }
}
