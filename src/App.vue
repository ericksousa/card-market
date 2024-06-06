<template>
  <q-layout>
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Card Market </q-toolbar-title>

        <div class="auth-area absolute">
          <q-btn color="secondary" label="Login" rounded unelevated />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="content-area q-pa-sm">
        <router-view v-slot="{ Component, route }">
          <transition :duration="300" mode="out-in" name="fade">
            <div :key="String(route.name)">
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
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
