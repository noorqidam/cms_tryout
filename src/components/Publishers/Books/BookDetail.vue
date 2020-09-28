<template>
  <div class="row">
    <div class="row flex-xl-nowrap2">
      <div class="bd-content col-md-10 col-xl-8 col-12 pb-md-3 pl-md-5">
        <div class="row" v-for="theme in themes" :key="theme._id">
          <div class="card">
            <div class="card-body">
              {{ theme.theme_name }}
              <div>
                <ul v-for="paket in theme.paket_soal" :key="paket._id" type="1">
                  <li>
                    <router-link
                      :to="{
                        path: '/p/detail-book/' + id + '/paket-soal',
                        query: { paket_id: paket.paket_soal_id }
                      }"
                    >
                      {{ paket }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bd-content col-xl-2 d-none d-xl-block col-md-2">
        <img v-if="Book.image" v-lazy.container="pathImages + Book.image" class="img-fluids mt-0" alt="" />
        <img v-else :src="pathImages + 'edutore.png'" class="img-fluid" alt="edutore" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BooksDetail",
  data() {
    return {
      Book: {},
      themes: [],
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      id: null
    };
  },
  mounted() {
    const id = this.$route.params.book_id;
    this.id = id;
    this.actionGetDetail(id);
  },
  methods: {
    actionGetDetail(id) {
      this.$axios
        .get("books/" + id, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.Book = response.data.data;
          this.themes = response.data.theme;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
