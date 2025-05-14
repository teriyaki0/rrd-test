import { RegularGame } from "../sessions/regular.session";

export interface IRegularService {
  spin({ tgId, mode, combination, regularGame }: { tgId: string; mode: number; combination: number[]; regularGame: RegularGame }): Promise<void>;
}
