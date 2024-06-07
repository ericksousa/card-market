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
    message: ENUM_LOADING.CADASTRANDO,
  });

  await data
    .register(data.payload_register)
    .then(() => {
      CreateNotify.success("Cadastro realizado com sucesso!");
      router.push({ name: ENUM_ROUTER_NAME.LOGIN });
    })
    .finally(() => Loading.hide());
}

/**
 * Daria pra otimizar este componente afim de evitar tanta
 * duplicidade de código com o login
 */
</script>

<template>
  <q-card class="q-pa-md shadow-2 login-box" bordered>
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">Cadastre-se</div>
      <div class="text-grey-8">Preencha os dados abaixo para se cadastrar</div>
    </q-card-section>

    <q-form @submit.prevent.stop="on_submit">
      <q-card-section>
        <div class="q-gutter-y-sm column">
          <q-input
            v-model="data.payload_register.name"
            :rules="[field_required]"
            label="Nome"
            type="text"
            outlined
            dense
          />

          <q-input
            v-model="data.payload_register.email"
            :rules="[field_required]"
            label="E-mail"
            type="email"
            outlined
            dense
          />

          <q-input
            v-model="data.payload_register.password"
            :rules="[field_required]"
            :type="showPwd ? 'text' : 'password'"
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
          label="Cadastrar"
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
        Já tem conta?

        <router-link
          :to="{ name: ENUM_ROUTER_NAME.LOGIN }"
          class="text-dark text-weight-bold"
          style="text-decoration: none"
        >
          Faça Login
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
