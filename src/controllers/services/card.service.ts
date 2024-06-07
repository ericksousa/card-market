import { default as Connection } from "../config/axios.connection";
import { ResponsePaginateDTO } from "../util/response-dto.util";
import { BaseService } from "./util/base.service";
import { FiltroPaginationEntity } from "@/models/entity/util/filtro-pagination.util";
import { ICard } from "@/models/interfaces/card.interface";

export class CardService extends BaseService {
  constructor() {
    super(Connection, "cards");
  }

  async getAllCards(
    params: FiltroPaginationEntity
  ): Promise<ResponsePaginateDTO<ICard>> {
    return this.getAll({ params });
  }
}

export default new CardService();
