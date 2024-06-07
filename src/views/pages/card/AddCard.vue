<script lang="ts" setup>
import CardData from "@/views/data/card/card.data";
import { reactive, ref } from "vue";

const data = reactive(CardData);
const selected_items = ref([]);

const columns = [
  { name: "name", label: "Nome", field: "name" },
  { name: "description", label: "Descrição", field: "description" },
  { name: "imageUrl", label: "Imagem", field: "imageUrl" },
];

async function on_request({ pagination }): Promise<void> {
  data.pagination = pagination;

  data.filter.page = pagination.page;

  await load_cards();
}

async function load_cards() {
  return await data.get_all_cards(data.filter).then((r) => {
    data.cards = r.list;

    /**
     * POG pra paginar "corretamente". O ideal seria o back trazer o total de registros
     */
    if (r.more) {
      data.pagination.rowsNumber =
        data.pagination.page * data.pagination.rowsPerPage +
        data.pagination.rowsPerPage;
    }
  });
}
</script>

<template>
  <q-table
    :rows="data.cards"
    :columns="columns"
    :loading="data.loading_cards"
    :rows-per-page-options="[data.filter.rpp]"
    @request="on_request"
    @update:pagination="load_cards"
    v-model:pagination="data.pagination"
    v-model:selected="selected_items"
    no-data-label="Nenhuma carta encontrada"
    selection="multiple"
    title="Cartas"
    color="primary"
    row-key="id"
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

          <q-separator />

          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-caption text-grey">
                {{ props.row.description }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<style lang="scss">
.grid-style-transition {
  transition: transform 0.28s, background-color 0.28s;
}
</style>
