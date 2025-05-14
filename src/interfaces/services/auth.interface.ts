import { InitData } from "@telegram-apps/init-data-node";

export interface IAuthService {
  login(initData: InitData): Promise<object>;
  register(id: string): Promise<object>;
}
