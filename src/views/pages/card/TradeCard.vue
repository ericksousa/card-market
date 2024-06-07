<script lang="ts" setup>
import TradeService from "@/controllers/services/trade.service";
import CardService from "@/controllers/services/card.service";
import CardData from "@/views/data/card/card.data";
import { ICard } from "@/models/interfaces/card.interface";
import { computed, onMounted, reactive, ref } from "vue";
import { Loading } from "quasar";
import { ENUM_LOADING } from "@/controllers/enum/loading.enum";
import { CreateNotify } from "@/views/util/notify.util";
import { useRouter } from "vue-router";
import { ENUM_ROUTER_NAME } from "@/vue/router/enum/router-name.enum";

const data = reactive(CardData);
const router = useRouter();

const loading_my_cards = ref(false);
const loading_desired_cards = ref(false);

const my_cards = ref<ICard[]>([]);
const my_selected_card = ref<ICard[]>([]);

const desired_cards = ref<ICard[]>([]);
const desired_selected_card = ref<ICard[]>([]);

const splitterModel = ref(50);

const columns = [
  { name: "name", label: "Nome", field: "name" },
  { name: "imageUrl", label: "Imagem", field: "imageUrl" },
];

async function load_my_cards() {
  loading_my_cards.value = true;

  await CardService.getCardFromUser()
    .then((cards) => {
      my_cards.value = cards;
    })
    .finally(() => (loading_my_cards.value = false));
}

async function load_desired_cards() {
  loading_desired_cards.value = true;

  await data
    .get_all_cards(data.filter)
    .then((r) => {
      desired_cards.value = r.list;

      /**
       * POG pra paginar "corretamente". O ideal seria o back trazer o total de registros
       */
      if (r.more) {
        data.pagination.rowsNumber =
          data.pagination.page * data.pagination.rowsPerPage +
          data.pagination.rowsPerPage;
      }
    })
    .finally(() => (loading_desired_cards.value = false));
}

async function on_request({ pagination }): Promise<void> {
  data.pagination = pagination;

  data.filter.page = pagination.page;

  await load_desired_cards();
}

async function new_trade() {
  const payload = {
    cards: [offering_card.value, receiving_card.value],
  };

  Loading.show({
    message: ENUM_LOADING.SALVANDO,
  });

  await TradeService.createNewTrade(payload)
    .then(() => {
      CreateNotify.success("Troca solicitada com sucesso!");
      router.push({ name: ENUM_ROUTER_NAME.HOME });
    })
    .finally(() => Loading.hide());
}

function get_card_id(cardArray: ICard[]): string | null {
  return cardArray.length ? cardArray[0].id : null;
}

const offering_card = computed(() => {
  return {
    cardId: get_card_id(my_selected_card.value),
    type: "OFFERING",
  };
});

const receiving_card = computed(() => {
  return {
    cardId: get_card_id(desired_selected_card.value),
    type: "RECEIVING",
  };
});

onMounted(async () => {
  await load_my_cards();
});
</script>

<template>
  <q-splitter v-model="splitterModel" class="shadow-2" style="height: 400px">
    <template #before>
      <q-table
        :rows="my_cards"
        :columns="columns"
        :rows-per-page-options="[0]"
        :loading="loading_my_cards"
        v-model:selected="my_selected_card"
        no-data-label="Nenhuma carta encontrada"
        selection="single"
        title="Minhas Cartas"
        color="primary"
        row-key="id"
        hide-selected-banner
        hide-pagination
        grid
      >
        <template #loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template #item="props">
          <div
            :style="props.selected ? 'transform: scale(0.95);' : ''"
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <q-card
              :class="['full-height', { 'bg-grey-2': props.selected }]"
              bordered
              flat
            >
              <q-img :src="props.row.imageUrl" />

              <q-card-section>
                <q-checkbox
                  dense
                  v-model="props.selected"
                  :label="props.row.name"
                />
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </template>

    <template #after>
      <q-table
        :rows="desired_cards"
        :columns="columns"
        :rows-per-page-options="[data.filter.rpp]"
        :loading="loading_desired_cards"
        @request="on_request"
        @update:pagination="load_desired_cards"
        v-model:pagination="data.pagination"
        v-model:selected="desired_selected_card"
        no-data-label="Nenhuma carta encontrada"
        selection="single"
        title="Todas as Cartas"
        color="primary"
        row-key="id"
        hide-selected-banner
        grid
      >
        <template #loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template #item="props">
          <div
            :style="props.selected ? 'transform: scale(0.95);' : ''"
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          >
            <q-card
              :class="['full-height', { 'bg-grey-2': props.selected }]"
              bordered
              flat
            >
              <q-img :src="props.row.imageUrl" />

              <q-card-section>
                <q-checkbox
                  dense
                  v-model="props.selected"
                  :label="props.row.name"
                />
              </q-card-section>
            </q-card>
          </div>
        </template>
      </q-table>
    </template>
  </q-splitter>

  <div class="q-mt-xl text-center">
    <q-btn
      :disabled="!my_selected_card.length || !desired_selected_card.length"
      color="primary"
      label="Solicitar Troca"
      @click="new_trade"
    />
  </div>
</template>
