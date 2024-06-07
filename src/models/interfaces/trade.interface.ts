import { ICard } from "./card.interface";
import { IUser } from "./user.interface";

export interface ITrade {
  list: ITradeList[];
  rpp: number;
  page: number;
  more: boolean;
}

export interface ITradeList {
  id: string;
  userId: string;
  createdAt: string;
  user: IUser;
  tradeCards: ITradeCard[];
}

export interface ITradeCard {
  id: string;
  cardId: string;
  tradeId: string;
  type: "OFFERING" | "RECEIVING";
  card: ICard;
}
