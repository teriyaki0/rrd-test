import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { Currency, IGeneralService } from "../interfaces/services/general.interface";
import { sequelize } from "../libs/sequalize";
import { HttpError } from "../middleware/error-handler";
import { Game } from "../models/game.model";
import { User } from "../models/user.model";

export class GeneralService implements IGeneralService {
  async init({ tgId }: { tgId: string }): Promise<{ winAmount: number; superPoint: number; credits: number; cards: number } | null> {
    const user = await User.findOne({ where: { tgId } });

    if (!user) throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.USER.USER_NOT_FOUND);

    const game = await Game.findOne({
      where: { userId: user.id },
      attributes: ["winPoint", "superPoint", "credits", "cards"],
    });

    const { winPoint, superPoint, credits, cards } = game;

    return { winAmount: winPoint, superPoint, credits, cards };
  }

  async creditsTransfer({ tgId, amount, from, to }: { tgId: string; amount: number; from: Currency; to: Currency }): Promise<{ credits: number; superPoint: number }> {
    if (from === to) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.CONVERT.PARAMS_FROM_TO_DIFFERENT);
    }

    if (amount <= 0) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.CONVERT.CONVERSION_NOT_ENOUGH);
    }

    return await sequelize.transaction(async (transaction) => {
      const game = await Game.findOne({
        include: [
          {
            model: User,
            as: "user",
            where: { tgId },
            attributes: [],
          },
        ],
        transaction,
        lock: transaction.LOCK.UPDATE,
      });

      if (!game) {
        throw new HttpError(HTTP_STATUS_CODE.NOT_FOUND, ERROR_MESSAGE.GAME.GAME_NOT_FOUND);
      }

      const currentFrom = from === "credits" ? game.credits : game.superPoint;

      if (currentFrom < amount) {
        throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.CONVERT.CONVERSION_NOT_ENOUGH);
      }

      if (from === "credits") {
        game.credits -= amount;
        game.superPoint += amount;
      } else {
        game.superPoint -= amount;
        game.credits += amount;
      }

      await game.save({ transaction });

      return {
        credits: game.credits,
        superPoint: game.superPoint,
      };
    });
  }
}
