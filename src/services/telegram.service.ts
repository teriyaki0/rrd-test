import { Context } from "telegraf";

import { config } from "../config";
import { TELEGRAM } from "../constants/messages/telegram-message.enum";
import { ITelegramService } from "../interfaces/services/telegram.interface";
import { logger } from "../libs/logger";
import { AuthService } from "./auth.service";

export class TelegramService implements ITelegramService {
  async start(ctx: Context): Promise<void> {
    try {
      const user = await new AuthService().register(ctx.from.id.toString(), ctx.from.username);

      ctx.reply(TELEGRAM.COMMON.DESCRIPTION, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: TELEGRAM.COMMON.DESCRIPTION,
                web_app: {
                  url: config.urls.client,
                },
              },
            ],
          ],
        },
      });

      logger.error({
        msg: TELEGRAM.COMMANDS.START,
        user: user.tgId,
      });

      return;
    } catch (error) {
      logger.error({
        msg: TELEGRAM.COMMANDS.START,
        error: error.message,
      });
    }
  }
}
