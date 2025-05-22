import { CHANCE } from "../constants/game/chance.enum";
import { CARDS_POINT_PULL } from "../constants/game/const/card-point-pull.const";
import { SUPER_MODE_COST } from "../constants/game/const/costs.const";
import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { ISuperSpinResult, superSpin } from "../game/superSpin";
import { pickRandom } from "../game/utils/super/pickRandom";
import { ISuperService } from "../interfaces/services/super.interface";
import { SuperGame } from "../interfaces/sessions/super.session";
import { HttpError } from "../middleware/error-handler";
import { Game } from "../models/game.model";
import { User } from "../models/user.model";

export class SuperService implements ISuperService {
  async spin({
    tgId,
    mode,
    combination,
    superGame,
    doubleGameActive,
  }: {
    tgId: string;
    mode: number;
    combination: number[];
    superGame: SuperGame;
    doubleGameActive: boolean;
  }): Promise<ISuperSpinResult> {
    // if (doubleGameActive) {
    //   throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.GAME.DOUBLE_GAME_ACTIVE);
    // }

    const game = await Game.findOne({
      include: [
        {
          model: User,
          as: "user",
          where: { tgId },
          attributes: [],
        },
      ],
    });

    if (!game) {
      throw new HttpError(HTTP_STATUS_CODE.NOT_FOUND, ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    const superCost = SUPER_MODE_COST[mode - 1];

    if (game.superPoint < superCost || game.credits < 1) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.GAME.BALANCE_NOT_ENOUGH);
    }

    game.credits -= 1;
    game.superPoint -= superCost;

    const result = superSpin(mode, combination, superGame);

    game.cards += result.cards;

    await game.save();

    return result;
  }

  async getCards({ tgId }: { tgId: string }): Promise<{ winAmount: number; isEleven: boolean }> {
    const game = await Game.findOne({
      include: [
        {
          model: User,
          as: "user",
          where: { tgId },
          attributes: [],
        },
      ],
    });

    if (!game) {
      throw new HttpError(HTTP_STATUS_CODE.NOT_FOUND, ERROR_MESSAGE.USER.USER_NOT_FOUND);
    }

    if (game.cards >= 11) {
      game.cards -= 11;
      const winAmount = pickRandom({
        values: CARDS_POINT_PULL,
        min: 0,
        jackpot: {
          chance: CHANCE.ROULLETE,
          value: 5000,
        },
      });
      
      await game.save();

      return {
        winAmount,
        isEleven: true,
      };
    } else {
      throw new HttpError(HTTP_STATUS_CODE.NOT_FOUND, ERROR_MESSAGE.SUPER.CARDS_NOT_ENOUGH);
    }
  }
}
