<template>
  <section class="bg-gray-50 dark:bg-gray-900 h-screen">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Faça login em sua conta
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Seu email</label
              >
              <input
                type="email"
                v-model="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Senha</label
              >
              <input
                type="password"
                v-model="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300"
                    >Lembre-me</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Esqueceu senha?</a
              >
            </div>
            <button
              @click="login"
              class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Entrar
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Não tem uma conta ainda?
              <a
                href="#"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Inscrever-se
              </a>
            </p>
          </div>
        </div>
      </div>
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2024 <a href="#" class="hover:underline">SrMourao™</a>. Felipe
        Mourão.
      </span>
    </div>
  </section>
</template>
<script setup>
import { authAmplify } from "@/stores/auth";
import { useRouter } from "vue-router";
import { ref } from "vue";

const username = ref("");
const password = ref("");
const router = useRouter();

const auth = authAmplify();

const login = async () => {
  if (!username.value && !password.value) {
    alert("Campos Obrigatórios");
    return;
  }

  try {
    const user = {
      username: username.value,
      password: password.value,
    };
    await auth.login(user);
    auth.userAuthenticated();
    router.push("/");
  } catch (error) {
    console.error(error);
    alert("Senha ou email incorreto");
  }
};
</script>
