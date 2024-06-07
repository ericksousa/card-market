<script lang="ts" setup>
import AuthData from "@/views/data/auth/auth.data";
import { reactive, ref } from "vue";
import { field_required } from "@/views/util/validation.util";
import { ENUM_ROUTER_NAME } from "@/vue/router/enum/router-name.enum";
import { Loading } from "quasar";
import { ENUM_LOADING } from "@/controllers/enum/loading.enum";
import { CreateNotify } from "@/views/util/notify.util";
import { useRouter } from "vue-router";

const data = reactive(AuthData);
const router = useRouter();
const showPwd = ref(false);

async function on_submit() {
  Loading.show({
    message: ENUM_LOADING.LOGANDO,
  });

  await data
    .login(data.payload_login)
    .then(() => {
      CreateNotify.success("Login efetuado com sucesso!");
      router.push({ name: ENUM_ROUTER_NAME.HOME });
    })
    .finally(() => Loading.hide());
}
</script>

<template>
  <q-card class="q-pa-md shadow-2 login-box" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">Login</div>
      <div class="text-grey-8">Faça login abaixo para acessar sua conta</div>
    </q-card-section>

    <q-form @submit.prevent.stop="on_submit">
      <q-card-section>
        <div class="q-gutter-y-sm column">
          <q-input
            v-model="data.payload_login.email"
            :rules="[field_required]"
            label="E-mail"
            type="email"
            outlined
            dense
          />

          <q-input
            v-model="data.payload_login.password"
            :type="showPwd ? 'text' : 'password'"
            :rules="[field_required]"
            label="Senha"
            outlined
            dense
          >
            <template #append>
              <q-icon
                @click="showPwd = !showPwd"
                :name="showPwd ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
                size="xs"
                class="cursor-pointer"
              />
            </template>
          </q-input>
        </div>
      </q-card-section>

      <q-card-section>
        <q-btn
          class="full-width"
          label="Fazer Login"
          color="dark"
          size="md"
          style="border-radius: 8px"
          type="submit"
          rounded
          no-caps
        />
      </q-card-section>
    </q-form>

    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">
        Ainda não tem conta?

        <router-link
          :to="{ name: ENUM_ROUTER_NAME.REGISTER }"
          class="text-dark text-weight-bold"
          style="text-decoration: none"
        >
          Cadastre-se
        </router-link>
      </div>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.login-box {
  width: 25rem;
  border-radius: 8px;
  margin: 0 auto;
}
</style>
