import { ITrade } from "@/models/interfaces/trade.interface";
import { default as Connection } from "../config/axios.connection";
import { BaseService } from "./util/base.service";
import { FiltroPaginationEntity } from "@/models/entity/util/filtro-pagination.util";

export class TradeService extends BaseService {
  constructor() {
    super(Connection, "trades");
  }

  async getAllTrades(params?: FiltroPaginationEntity): Promise<ITrade> {
    return this.getAll({ params });
  }
}

export default new TradeService();
