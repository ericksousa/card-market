import CardService from "@/controllers/services/card.service";
import { ResponsePaginateDTO } from "@/controllers/util/response-dto.util";
import { PaginationFilterEntity } from "@/models/entity/util/pagination-filter.util";
import { QuasarPaginationEntity } from "@/models/entity/util/quasar-pagination.util";
import { ICard } from "@/models/interfaces/card.interface";

class CardData {
  filter = new PaginationFilterEntity({ rpp: 8 });
  pagination = new QuasarPaginationEntity({
    rowsNumber: 8,
    rowsPerPage: 8,
  });

  cards: ICard[] = [];

  loading_cards = false;

  async get_all_cards(
    params: PaginationFilterEntity
  ): Promise<ResponsePaginateDTO<ICard>> {
    this.loading_cards = true;

    return await CardService.getAllCards(params).finally(
      () => (this.loading_cards = false)
    );
  }

  async add_card_to_user(cardIds: { cardIds: string[] }): Promise<unknown> {
    return await CardService.addCardToUser(cardIds);
  }
}

export default new CardData();
