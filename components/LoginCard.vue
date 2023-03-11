<script setup lang="ts">
import { Field, Form, ErrorMessage, configure } from "vee-validate";
import { defineRule } from "vee-validate";
import { required, email, min, max } from "@vee-validate/rules";
import { reactive } from "vue";
import { useAuthStore } from "~~/store/auth";
import { ICredentials } from "~/types";

// TODO move to plugin

defineRule("min", min);
defineRule("max", max);
defineRule("email", email);
defineRule("required", required);

configure({
  validateOnInput: true,
});

// TODO move to plugin

const store = useAuthStore();
const router = useRouter();
const creds = reactive<ICredentials>({
  username: "",
  password: "",
});

const onLogin = async () => {
  await store.login(creds);

  router.push({ path: "/" });
};
</script>

<template>
  <section class="min-h-screen flex flex-col justify-center items-center">
    <Form
      v-slot="{ meta }"
      class="w-1/3 flex flex-col"
      v-on="{
        submit: onLogin,
      }"
    >
      <h2 class="text-white text-2xl mb-4">
        Login
      </h2>
      <!-- TODO move to component -->
      <div class="flex flex-col h-50">
        <label
          class="text-white"
          v-bind="{
            for: 'email',
          }"
        >
          Email
        </label>
        <Field
          v-model="creds.username"
          class="border h-10 bg-indigo-100 rounded text-md pl-4"
          v-bind="{
            name: 'email',
            type: 'email',
            placeholder: 'Enter email',
            autocomplete: 'email',
            rules: {
              required: true,
              email: true,
            },
          }"
        />
        <p class="h-6">
          <ErrorMessage
            class="text-red-500"
            v-bind="{
              name: 'email',
            }"
          />
        </p>
      </div>

      <div class="flex flex-col h-50">
        <label class="text-white"> Password </label>
        <Field
          v-model="creds.password"
          class="shadow-md border h-10 bg-indigo-100 rounded text-md pl-4"
          v-bind="{
            name: 'password',
            type: 'password',
            placeholder: 'Enter password',
            autocomplete: 'curr-password',
            rules: {
              required: true,
              min: 3,
            },
          }"
        />
        <p class="h-6">
          <ErrorMessage
            class="text-red-500"
            v-bind="{
              name: 'password',
            }"
          />
        </p>
      </div>

      <base-button
        class="self-end"
        v-bind="{
          type: 'submit',
          disabled: !meta.valid,
        }"
      >
        <template #default>
          Sign in
        </template>
      </base-button>
    </Form>
  </section>
</template>
