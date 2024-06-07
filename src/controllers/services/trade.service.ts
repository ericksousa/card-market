import { ITrade } from "@/models/interfaces/trade.interface";
import { default as Connection } from "../config/axios.connection";
import { BaseService } from "./util/base.service";
import { PaginationFilterEntity } from "@/models/entity/util/pagination-filter.util";

export class TradeService extends BaseService {
  constructor() {
    super(Connection, "trades");
  }

  async getAllTrades(params?: PaginationFilterEntity): Promise<ITrade> {
    return this.getAll({ params });
  }

  async createNewTrade(payload): Promise<unknown> {
    return this.save(payload);
  }
}

export default new TradeService();
