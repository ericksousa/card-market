<script lang="ts" setup>
import TradeService from "@/controllers/services/trade.service";
import { onMounted, ref } from "vue";
import { Loading } from "quasar";
import { PaginationFilterEntity } from "@/models/entity/util/pagination-filter.util";
import { QuasarPaginationEntity } from "@/models/entity/util/quasar-pagination.util";
import { ENUM_LOADING } from "@/controllers/enum/loading.enum";
import { ITrade } from "@/models/interfaces/trade.interface";
import { TradeEntity } from "@/models/entity/trade/trade.entity";
import { auth_store } from "@/vue/store/auth/auth.store";
import { CreateNotify } from "@/views/util/notify.util";

const store = auth_store();

const filtro = new PaginationFilterEntity();
const quasar_pagination = ref(new QuasarPaginationEntity({ rowsNumber: 10 })); // Back deveria trazer essa informação da quantidade total de registros

const trades = ref<ITrade>(new TradeEntity());

const columns = [
  { name: "user", label: "Usuário", field: (val) => val.user.name },
  { name: "cards", label: "Cards", field: (val) => val.tradeCards },
];

async function load_trades(): Promise<ITrade> {
  Loading.show({
    message: ENUM_LOADING.CARREGANDO,
  });

  return await TradeService.getAllTrades(filtro).finally(() => Loading.hide());
}

async function on_request({ pagination }): Promise<void> {
  quasar_pagination.value = pagination;

  filtro.page = pagination.page;
  filtro.rpp = pagination.rowsPerPage;

  trades.value = await load_trades();
}

async function remove_trade(tradeId: string): Promise<void> {
  Loading.show({
    message: ENUM_LOADING.CANCELANDO,
  });

  await TradeService.delete(tradeId)
    .then(async () => {
      CreateNotify.success("Troca cancelada com sucesso!");
      trades.value = await load_trades();
    })
    .finally(() => Loading.hide());
}

onMounted(async () => {
  trades.value = await load_trades();
});
</script>

<template>
  <div>
    <q-table
      :rows="trades.list"
      :columns="columns"
      @request="on_request"
      v-model:pagination="quasar_pagination"
      no-data-label="Nenhum registro de troca encontrado"
      title="Solicitações de trocas"
      color="primary"
      row-key="id"
      grid
    >
      <template #item="{ row }">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-card-section class="text-center">
              <div class="row items-center no-wrap">
                <div style="flex: 1">
                  Usuário
                  <br />
                  <strong>{{ row.user.name }}</strong>
                </div>

                <q-btn
                  v-if="row.userId === store.user?.id"
                  icon="fa-solid fa-ellipsis-vertical"
                  color="grey-7"
                  round
                  flat
                >
                  <q-menu auto-close>
                    <q-list>
                      <q-item @click="remove_trade(row.id)" clickable>
                        <q-item-section>Cancelar troca</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <div class="flex flex-center">
                <div
                  v-for="(trade, index) in row.tradeCards"
                  :key="trade.id"
                  :style="`order: ${index * 2}`"
                  class="trade-item column flex-center"
                >
                  <div class="text-subtitle2">
                    {{ trade.type }}
                  </div>

                  <q-avatar>
                    <img :src="trade.card.imageUrl" alt="Card" />
                  </q-avatar>

                  <div class="text-caption q-mt-sm">{{ trade.card.name }}</div>

                  <q-tooltip>
                    {{ trade.card.name }} - {{ trade.card.description }}
                  </q-tooltip>
                </div>

                <q-icon
                  name="fa-solid fa-arrow-right-arrow-left"
                  class="q-pa-md"
                  color="primary"
                  style="order: 1"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </template>

      <template #pagination="scope">
        <q-btn
          icon="fa-solid fa-chevron-left"
          color="primary"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />

        <q-btn
          icon="fa-solid fa-chevron-right"
          color="primary"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />
      </template>
    </q-table>
  </div>
</template>
@/models/entity/util/filtro-pagination.util
