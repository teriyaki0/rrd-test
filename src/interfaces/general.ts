import express from "express";
import { Server as HttpServer } from "http";

import { Game } from "../models/game.model";
import { User } from "../models/user.model";
import { AuthService } from "../services/auth.service";
import { GeneralService } from "../services/general.service";
import { TelegramService } from "../services/telegram.service";

export interface Context {
  services: {
    authService: AuthService;
    telegramService: TelegramService;
    generalService: GeneralService;
  };
}

export type RouterFactory = (context: Context) => express.Router;

export type Loader = (app: express.Application, context: Context) => void;

export type SocketLoader = (httpServer: HttpServer) => void;

export interface Models {
  user: typeof User;
  game: typeof Game;
}
