import { Context } from "../interfaces/general";
import { AuthService } from "../services/auth.service";
import { TelegramService } from "../services/telegram.service";

export const loadContext = async (): Promise<Context> => {
  return {
    services: {
      authService: new AuthService(),
      telegramService: new TelegramService(),
    },
  };
};
