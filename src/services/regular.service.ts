import { IRegularService } from "../interfaces/services/regular.interface";
import { RegularGame } from "../interfaces/sessions/regular.session";

export class RegularService implements IRegularService {
  spin({ tgId, mode, combination, regularGame }: { tgId: string; mode: number; combination: number[]; regularGame: RegularGame }): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
