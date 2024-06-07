<script lang="ts" setup>
import TradeService from "@/controllers/services/trade.service";
import { onMounted, ref } from "vue";
import { Loading } from "quasar";
import { FiltroPaginationEntity } from "@/models/entity/util/filtro-pagination.util";
import { QuasarPaginationEntity } from "@/models/entity/util/quasar-pagination.util";
import { ENUM_LOADING } from "@/controllers/enum/loading.enum";
import { ITrade } from "@/models/interfaces/trade.interface";
import { TradeEntity } from "@/models/entity/trade/trade.entity";

const filtro = new FiltroPaginationEntity();
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
      <template v-slot:item="{ row }">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card flat bordered>
            <q-card-section class="text-center">
              Usuário
              <br />
              <strong>{{ row.user.name }}</strong>
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
