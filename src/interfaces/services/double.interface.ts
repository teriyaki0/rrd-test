export interface IDoubleService {
  start(): Promise<void>;
  play(): Promise<void>;
  cashOut(): Promise<void>;
  half(): Promise<void>;
}
