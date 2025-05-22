import { DEFAULT_MODE_COST } from "../constants/game/const/costs.const";
import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { IRegularSpinResult, regularSpin } from "../game/regularSpin";
import { IRegularService } from "../interfaces/services/regular.interface";
import { RegularGame } from "../interfaces/sessions/regular.session";
import { HttpError } from "../middleware/error-handler";
import { Game } from "../models/game.model";
import { User } from "../models/user.model";

export class RegularService implements IRegularService {
  async spin({
    tgId,
    mode,
    combination,
    regularGame,
    doubleGameActive,
  }: {
    tgId: string;
    mode: number;
    combination: number[];
    regularGame: RegularGame;
    doubleGameActive: boolean;
  }): Promise<IRegularSpinResult> {
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

    const defaultCost = DEFAULT_MODE_COST[mode - 1];

    if (game.credits < defaultCost) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.GAME.BALANCE_NOT_ENOUGH);
    }

    game.credits -= defaultCost;

    await game.save();

    const result = regularSpin(mode, combination, regularGame);

    return result;
  }
}
