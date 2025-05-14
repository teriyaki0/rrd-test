import { Context } from "telegraf";

import { config } from "../config";
import { TELEGRAM } from "../constants/messages/telegram-message.enum";
import { ITelegramService } from "../interfaces/services/telegram.interface";
import { logger } from "../libs/logger";

export class TelegramService implements ITelegramService {
  async start(ctx: Context): Promise<void> {
    try {
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

      return;
    } catch (error) {
      logger.error({
        msg: TELEGRAM.COMMANDS.START,
        error: error.message,
      });
    }
  }
}
