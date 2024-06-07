import { ITradeList } from "@/models/interfaces/trade.interface";

export class TradeEntity {
  list: ITradeList[];
  rpp: number;
  page: number;
  more: boolean;

  constructor(this_class?: Partial<TradeEntity>) {
    this.list = [];
    this.rpp = 10;
    this.page = 1;
    this.more = false;

    if (this_class) {
      Object.entries(this_class).forEach(([key, value]) => {
        if (key in this && value) this[key] = value;
      });
    }
  }
}
