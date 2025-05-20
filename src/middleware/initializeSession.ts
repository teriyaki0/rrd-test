import { Response, NextFunction } from "express";

import { ExtendedRequest } from "../interfaces/express";

export function initializeSession(req: ExtendedRequest, res: Response, next: NextFunction) {
  req.session.regularGame ??= {
    combination: [0, 0, 0],
    mode: "x1",
    elements: [],
    winAmount: 0,
    beSecondChance: false,
  };  

  req.session.superGame ??= {     
    combination: [0, 0, 0],
    mode: "x1",
    elements: [],
    winAmount: 0,
    beSecondChance: false,
    carding: false
  };

  req.session.doubleGame ??= {   
    active: false,
    currentAttempts: 0,
    currentMultiplier: 0,
    canHalf: false,
    originalAmount: 0,
    initialWinPoint: 0, 
  };

  next();
}
