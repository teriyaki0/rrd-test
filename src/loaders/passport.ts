import { Passport } from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";

import { config } from "../config";
import { ERROR_MESSAGE } from "../constants/messages/error-messages.const";
import { Context, Loader } from "../interfaces/general";
import { User } from "../models/user.model";

export const loadPassport: Loader = (app, context: Context) => {
  const passport = new Passport();

  passport.use(
    new JWTStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: config.security.auth.secret }, async (jwtPayload, done) => {
      try {
        const user = await User.findByPk(jwtPayload.id);

        if (!user) {
          return done(null, false, { message: ERROR_MESSAGE.AUTH.UNAUTHORIZED });
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }),
  );

  app.use((req, res, next) => {
    if (!req.headers.authorization) {
      return next();
    }

    passport.authenticate("jwt", { session: false }, (...args: any[]) => {
      req.user = args[1] || undefined;
      next();
    })(req, res, next);
  });
};
