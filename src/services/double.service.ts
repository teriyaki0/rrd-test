import { IDoubleService } from "../interfaces/services/double.interface";

export class DoubleService implements IDoubleService {
  start(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  play(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  cashOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  half(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async finalizeDouble(): Promise<void> {}
}
