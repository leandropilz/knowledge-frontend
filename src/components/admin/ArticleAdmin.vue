<template>
  <div class="article-admin">
    <b-form>
      <input type="hidden" id="article-id" v-model="article.id">
      <b-form-group label="Nome:" label-for="article-name">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          :readonly="mode === 'remove'"
          required
          placeholder="Informe o Nome do Artigo..."
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Descrição" label-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          :readonly="mode === 'remove'"
          required
          placeholder="Informe a Descrição do Artigo..."
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Imagem (URL):" label-for="article-imageUrl">
        <b-form-input
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          v-if="mode === 'save'"
          required
          placeholder="Informe a URL da Imagem..."
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Categoria:" label-for="article-categoryId" v-if="mode === 'save'">
        <b-form-select id="article-categoryId" :options="categories" v-model="article.categoryId"/>
      </b-form-group>

      <b-form-group label="Autor:" label-for="article-userId" v-if="mode === 'save'">
        <b-form-select id="article-userId" :options="users" v-model="article.userId"/>
      </b-form-group>

      <b-form-group label="Conteúdo" label-for="category-content">
        <VueEditor
          v-model="article.content"
          v-if="mode === 'save'"
          placeholder="Informe o Conteúdo do Artigo..."
        />
      </b-form-group>

      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr>
    <b-table hover striped :items="articles" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="getCategory(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="getCategory(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit"></b-pagination>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then(res => {
        // this.articles = res.data;
        this.articles = res.data.data; //dentro do json existe o atribo data...
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then(res => {
        this.categories = res.data.map(category => {
          return { value: category.id, text: category.path };
        });
      });
    },
    loadUser() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.article.id;
      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    getCategory(article, mode = "save") {
      this.mode = mode;
      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then(res => (this.article = res.data));
    }
  },
  watch: {
    page() {
      this.loadArticles();
    }
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUser();
  }
};
</script>

<style>
</style>
