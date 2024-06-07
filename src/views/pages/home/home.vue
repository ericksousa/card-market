<script lang="ts" setup>
import TradeService from "@/controllers/services/trade.service";
import { PaginationEntity } from "@/models/entity/util/pagination.util";
import { onMounted } from "vue";

const pagination = new PaginationEntity();

async function load_trades() {
  await TradeService.getAllTrades(pagination);
}

onMounted(async () => {
  await load_trades();
});
</script>

<template>Home</template>
