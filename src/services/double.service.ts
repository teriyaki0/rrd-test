import { CHANCE } from "../constants/game/chance.enum";
import { HTTP_STATUS_CODE } from "../constants/http-status-code.enum";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { isWin } from "../game/utils/isWin";
import { AppSession } from "../interfaces/express";
import { IDoubleService } from "../interfaces/services/double.interface";
import { DoubleGame } from "../interfaces/sessions/double.session";
import { HttpError } from "../middleware/error-handler";
import { Game } from "../models/game.model";
import { User } from "../models/user.model";

export class DoubleService implements IDoubleService {
  async start({
    tgId,
    mode,
    appSession,
  }: {
    tgId: string;
    mode: string;
    appSession: AppSession;
  }): Promise<{ doubleGame: DoubleGame; credits: number; winPoints: number; superPoint: number }> {
    const active = appSession.doubleGame?.active ?? false;

    if (active) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.GAME.DOUBLE_GAME_ACTIVE);
    }

    const amount = mode === "super" ? appSession.superGame.winAmount : appSession.regularGame.winAmount;

    if (!amount || amount <= 0) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.GAME.BALANCE_NOT_ENOUGH);
    }

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

    game.winPoint += amount;
    await game.save();

    const doubleGame = {
      active: true,
      currentAttempts: 0,
      currentMultiplier: 1,
      canHalf: true,
      originalAmount: amount,
      initialWinPoint: amount,
    };

    return {
      doubleGame,
      credits: game.credits,
      winPoints: game.winPoint,
      superPoint: game.superPoint,
    };
  }

  async play({
    tgId,
    doubleGame,
  }: {
    tgId: string;
    doubleGame: DoubleGame;
  }): Promise<{ doubleGame: DoubleGame; totalAmount?: number; multiplier?: number; winPoints: number; superPoint: number; gameFinished: boolean }> {
    const active = doubleGame.active;

    if (!active) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.GAME.DOUBLE_GAME_ACTIVE);
    }

    const updatedGame = { ...doubleGame };

    updatedGame.canHalf = true;
    updatedGame.currentAttempts++;
    updatedGame.currentMultiplier *= 2;

    const potentialWinPoints = updatedGame.originalAmount * updatedGame.currentMultiplier;

    if (potentialWinPoints >= 1000) {
      const result = await this.finalizeDouble(updatedGame, true, tgId);

      return {
        doubleGame: { ...updatedGame, active: false },
        totalAmount: result.total,
        winPoints: updatedGame.originalAmount * updatedGame.currentMultiplier,
        superPoint: result.superPoint,
        gameFinished: true,
      };
    }

    if (!isWin(CHANCE.DOUBLE)) {
      const result = await this.finalizeDouble(updatedGame, false, tgId);

      return {
        doubleGame: { ...updatedGame, active: false },
        totalAmount: 0,
        ...result,
        gameFinished: true,
      };
    }

    return {
      doubleGame: updatedGame,
      multiplier: updatedGame.currentMultiplier,
      winPoints: updatedGame.originalAmount * updatedGame.currentMultiplier,
      superPoint: 0,
      gameFinished: false,
    };
  }

  async cashOut({ tgId, doubleGame }: { tgId: string; doubleGame: DoubleGame }): Promise<object> {
    const result = await this.finalizeDouble(doubleGame, true, tgId);
    return { totalAmount: result.total, ...result };
  }

  async half({
    tgId,
    doubleGame,
  }: {
    tgId: string;
    doubleGame: DoubleGame;
  }): Promise<{ doubleGame: DoubleGame; cashed: number; newAmount: number; gameActive: boolean; credits: number; winPoints: number; superPoint: number }> {
    const { active, canHalf } = doubleGame;

    if (!active || !canHalf) {
      throw new HttpError(HTTP_STATUS_CODE.BAD_REQUEST, ERROR_MESSAGE.GAME.DOUBLE_GAME_ACTIVE);
    }

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

    const total = doubleGame.originalAmount * doubleGame.currentMultiplier;
    const halfAmount = total / 2;

    const updatedGame = {
      ...game,
      superPoint: game.superPoint + halfAmount,
      winPoint: game.winPoint - doubleGame.initialWinPoint + halfAmount,
    };

    const updatedDoubleGame = {
      ...doubleGame,
      originalAmount: halfAmount,
      initialWinPoint: halfAmount,
      currentMultiplier: 1,
      canHalf: false,
      active: halfAmount >= 1,
    };

    await game.update(updatedGame);

    return {
      doubleGame: updatedDoubleGame,
      cashed: halfAmount,
      newAmount: halfAmount,
      gameActive: updatedDoubleGame.active,
      credits: updatedGame.credits,
      winPoints: updatedGame.winPoint,
      superPoint: updatedGame.superPoint,
    };
  }

  private async finalizeDouble(session: DoubleGame, isWin: boolean, tgId: string): Promise<{ total: number; credits: number; winPoints: number; superPoint: number }> {
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

    const { originalAmount, currentMultiplier } = session;

    game.winPoint = 0;

    if (isWin) {
      game.superPoint += originalAmount * currentMultiplier;
    }

    await game.save();

    return {
      total: originalAmount * currentMultiplier,
      credits: game.credits,
      winPoints: game.winPoint,
      superPoint: game.superPoint,
    };
  }
}
