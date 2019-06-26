<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder" :main="category.name" sub="Categoria"/>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, showError } from "@/global";
import PageTitle from "../template/PageTitle";

export default {
  name: "ArticlesByCategory",
  components: { PageTitle },
  data() {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true
    };
  },
  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`;
      axios.get(url).then(res => {
        this.category = res.data;
      });
    }
  },
  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
  }
};
</script>

<style>
</style>
