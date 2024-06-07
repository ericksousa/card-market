import { default as Connection } from "../config/axios.connection";
import { make_url } from "../util/make-url.util";
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

  async addCardToUser(cardIds: { cardIds: string[] }): Promise<unknown> {
    this.override_url = make_url("me", "cards");
    return this.save(cardIds);
  }
}

export default new CardService();
