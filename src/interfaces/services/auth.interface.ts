export interface IAuthService {
  login(initData: string): Promise<{ token: string }>;
  register(id: string, username: string): Promise<object>;
}
