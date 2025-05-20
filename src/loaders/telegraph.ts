import { Telegraf } from "telegraf";

import { config } from "../config";
import { TELEGRAM } from "../constants/messages/telegram-message.enum";
import { Loader } from "../interfaces/general";

export const loadTelegraph: Loader = (app, context) => {
  const bot = new Telegraf(config.telegram.botToken);

  bot.telegram.setMyCommands([{ command: TELEGRAM.COMMANDS.START, description: TELEGRAM.COMMON.DESCRIPTION }]);

  bot.telegram.setChatMenuButton({
    menuButton: {
      type: TELEGRAM.CHAT_BUTTON_INFO.TYPE,
      text: TELEGRAM.CHAT_BUTTON_INFO.TEXT,
      web_app: {
        url: config.urls.client,
      },
    },
  });

  bot.command(TELEGRAM.COMMANDS.START, async (ctx) => {
    await context.services.telegramService.start(ctx);
  });

  bot.launch()
};
