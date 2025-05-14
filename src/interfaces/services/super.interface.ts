import { SuperGame } from "../sessions/super.session";

export interface ISuperService {
  spin({ tgId, mode, combination, superGame }: { tgId: string; mode: number; combination: number[]; superGame: SuperGame }): Promise<void>;
}
