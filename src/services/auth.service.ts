import { isValid } from "@telegram-apps/init-data-node";

import { config } from "../config";
import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { IAuthService } from "../interfaces/services/auth.interface";
import { HttpError } from "../middleware/error-handler";
import { Game } from "../models/game.model";
import { User, UserAttributes } from "../models/user.model";
import { singJWT } from "../utils/signJWT";

export class AuthService implements IAuthService {
  async login(initData: string): Promise<{ token: string }> {
    const isInitDataValid = isValid(initData, config.telegram.botToken);

    if (!isInitDataValid) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.COMMON.VALIDATION_ERROR);
    }

    const params = new URLSearchParams(initData);
    const userData = JSON.parse(params.get("user") || "{}");

    const user = await User.findOne({ where: { tgId: userData.id.toString() } });

    if (!user) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.AUTH.LOGIN_ERROR);
    }

    const token = singJWT(user.tgId);

    return { token };
  }

  async register(id: string, username: string): Promise<UserAttributes> {
    const existing = await User.findOne({ where: { tgId: id } });

    if (existing) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.AUTH.USER_ALREADY_REGISTERED);
    }

    const user = await User.create({ tgId: id, username });

    await Game.create({
      userId: user.id,
      cards: 0,
      credits: 1000,
      winPoint: 0,
      superPoint: 0,
    });

    return user.toJSON();
  }
}
