export type Currency = "credits" | "superPoint";

export interface IGeneralService {
  init({ tgId }: { tgId: string }): Promise<{ winAmount: number; superPoint: number; credits: number; cards: number }>;
  creditsTransfer({ tgId, amount, from, to }: { tgId: string; amount: number; from: Currency; to: Currency }): Promise<{ credits: number; superPoint: number }>;
}
