<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ENUM_ROUTER_NAME } from "./vue/router/enum/router-name.enum";

const router = useRouter();
</script>

<template>
  <q-layout>
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Card Market </q-toolbar-title>

        <div class="auth-area absolute">
          <q-btn
            @click="router.push({ name: ENUM_ROUTER_NAME.LOGIN })"
            color="secondary"
            label="Login"
            rounded
            unelevated
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="content-area q-pa-sm">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.auth-area {
  right: 12px;
}

.content-area {
  margin: 2em auto;
}

@media (min-width: $breakpoint-md-min) {
  .content-area {
    width: 60vw;
  }
}
</style>
