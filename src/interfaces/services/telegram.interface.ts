import { Context } from "telegraf";

export interface ITelegramService {
  start(ctx: Context): Promise<void>;
}
