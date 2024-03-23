<template>
  <div>
    <button @click="createPost">CRIAR</button>
    <button @click="queryPost">CONSULTAR</button>
    <button @click="queryPost">ATUALIZAR</button>
    <button @click="deletePost">EXCLUIR</button>
    <pre>
      {{ result }}
    </pre>
  </div>
</template>

<script>
import { DataStore } from "aws-amplify/datastore";
import { Post } from "./models";
export default {
  name: "App",
  data() {
    return {
      result: [],
    };
  },
  methods: {
    async createPost() {
      try {
        await DataStore.save(
          new Post({
            title: "Felipe Mourão 2",
            comments: [],
            content: "TACA FLAMENGO",
          }),
          alert("CRIADO COM SUCESSO")
        );
      } catch (error) {
        console.error(error);
      }
    },
    async queryPost() {
      const models = await DataStore.query(Post);
      this.result = models;
    },
    async deletePost() {
      const modelToDelete = await DataStore.query(Post, 123456789);
      DataStore.delete(modelToDelete);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
