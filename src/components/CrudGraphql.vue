<template>
  <div
    class="p-5 flex flex-col justify-center bg-gray-50 dark:bg-gray-900 h-screen"
  >
    <div class="">
      <button
        type="button"
        @click="deslogar"
        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Sair
      </button>
    </div>
    <div>
      <form class="max-w-sm mx-auto">
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nome</label
          >
          <input
            type="text"
            v-model="name"
            id="small-input"
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div class="mb-5">
          <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Conteudo</label
          >
          <input
            type="text"
            v-model="content"
            id="large-input"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>
    </div>
    <div>
      <button
        type="button"
        @click="queryPost"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        CONSULTAR
      </button>
      <button
        type="button"
        @click="createPost"
        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        CRIAR
      </button>
      <button
        type="button"
        @click="queryPost"
        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Atualizar
      </button>
      <button
        type="button"
        @click="deletePost"
        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Delete
      </button>
    </div>

    <div class="relative overflow-x-auto mt-5">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">id</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">content</th>
          </tr>
        </thead>
        <tbody v-for="item in result" :key="item.id">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ item.id }}
            </th>
            <td class="px-6 py-4">{{ item.title }}</td>
            <td class="px-6 py-4">{{ item.content }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { DataStore } from "aws-amplify/datastore";
import { Post } from "../models";
import { ref } from "vue";
import { authAmplify } from "@/stores/auth";
import { useRouter } from "vue-router";

const result = ref([]);
const name = ref("");
const content = ref("");
const auth = authAmplify();
const router = useRouter();

const createPost = async () => {
  try {
    await DataStore.save(
      new Post({
        title: name.value,
        comments: [],
        content: content.value,
      })
    );
    alert("CRIADO COM SUCESSO");
    queryPost(); // Chamar queryPost após a criação do post
  } catch (error) {
    console.error(error);
  }
};

const queryPost = async () => {
  const models = await DataStore.query(Post);
  result.value = models;
};
queryPost();

const deletePost = async () => {
  const modelToDelete = await DataStore.query(Post, 123456789);
  DataStore.delete(modelToDelete);
};

const deslogar = async () => {
  try {
    await auth.handleSignOut();
    router.push("/loginUser");
  } catch (error) {
    console.error(error);
  }
};
</script>
