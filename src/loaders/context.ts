import { Context } from "../interfaces/general";
import { AuthService } from "../services/auth.service";
import { DoubleService } from "../services/double.service";
import { GeneralService } from "../services/general.service";
import { RegularService } from "../services/regular.service";
import { SuperService } from "../services/super.service";
import { TelegramService } from "../services/telegram.service";

export const loadContext = async (): Promise<Context> => {
  return {
    services: {
      authService: new AuthService(),
      telegramService: new TelegramService(),
      generalService: new GeneralService(),
      regularService: new RegularService(),
      superService: new SuperService(),
      doubleService: new DoubleService(),
    },
  };
};
