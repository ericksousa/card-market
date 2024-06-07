<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ENUM_ROUTER_NAME } from "./vue/router/enum/router-name.enum";
import { auth_store } from "@/vue/store/auth/auth.store";

const router = useRouter();
const store = auth_store();
</script>

<template>
  <q-layout>
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Card Market </q-toolbar-title>

        <div class="auth-area absolute">
          <q-btn
            v-if="!store.token"
            @click="router.push({ name: ENUM_ROUTER_NAME.LOGIN })"
            color="secondary"
            label="Login"
            rounded
            unelevated
          />

          <div v-if="store.user">
            <q-btn round flat icon="fa-solid fa-ellipsis-vertical">
              <q-menu auto-close :offset="[110, 0]">
                <q-list style="min-width: 150px">
                  <q-item clickable>
                    <q-item-section>Meus dados</q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item clickable>
                    <q-item-section>Adicionar cartas</q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>Trocar cartas</q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item @click="store.logout()" clickable>
                    <q-item-section>Sair</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
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
