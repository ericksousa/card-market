import { ITrade } from "@/models/interfaces/trade.interface";
import { default as Connection } from "../config/axios.connection";
import { ResponsePaginateDTO } from "../util/response-dto.util";
import { BaseService } from "./util/base.service";
import { PaginationEntity } from "@/models/entity/util/pagination.util";

export class TradeService extends BaseService {
  constructor() {
    super(Connection, "trades");
  }

  async getAllTrades(
    params?: PaginationEntity
  ): Promise<ResponsePaginateDTO<ITrade>> {
    return this.getAll({ params });
  }
}

export default new TradeService();
