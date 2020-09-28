<template>
  <div class="container-fluid">
    <div class="row mb-3">
      <div class="col-md-7">
        <div class="card-content mb-2" style="overflow: auto;max-height: 600px">
          <h5 class="text-center">Tema Buku {{ modules.module_name }}</h5>
          <hr style="border-top: 2px solid rgb(168, 171, 181);" />
          <section>
            <ol class="custom-bullet custom-bullet--b">
              <li v-for="tema in theme" :key="tema._id" class="li-custom">
                {{ tema.theme_name }}
                <div v-for="paket in tema.paket_soal" :key="paket._id">
                  <div class="div-list">
                    <router-link
                      :to="{
                        path: '/books/details-book/' + module_id + '/paket-soal',
                        query: { paket_id: paket.paket_soal_id }
                      }"
                    >
                      {{ paket.paket_name }}
                    </router-link>
                  </div>
                </div>
              </li>
            </ol>
          </section>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card-content">
          <p v-if="modules.image === null">Loading...</p>
          <div v-else class="col-md-12 mb-1" style="text-align: -webkit-center;">
            <div class="col-md-10">
              <img
                v-lazy.container="pathImages + modules.image"
                :alt="modules.module_name"
                class="img-fluid"
                style="width: 100%;border-radius: 10px"
              />
            </div>
          </div>
          <hr style="border-top: 2px solid rgb(168, 171, 181);" />
          <h5>
            <i class="fa fa-book mr-2"></i>
            <b>{{ modules.module_name }}</b>
          </h5>
          <h6>
            <i class="fa fa-user-circle mr-2"></i>
            <em
              v-for="(author, index) in modules.module_authors"
              :key="index"
              style="text-decoration: underline"
            >
              {{ author }}
            </em>
            <br />
            <b class="ml-4">{{ modules.publisher }}</b>
          </h6>
          <span class="badge badge-info text-white" style="font-size: 12px">
            <i class="fa fa-dollar mr-2"></i>
            Rp.{{ modules.price }}
          </span>
          <p class="text-left txt-syarat mt-3">
            <em style="text-decoration: underline">Deskripsi Buku</em>
          </p>
          <div style="text-align: justify; text-justify: inter-word; margin-top: -10px">
            <span v-if="!read_more">
              <p v-if="description_length >= 200">
                {{ modules.description.slice(0, 200) }}...
                <a v-if="!read_more" @click="read_more = true" class="text-primary">Baca Selengkapnya</a>
              </p>
              <p v-else-if="description_length <= 200">
                {{ modules.description }}
              </p>
            </span>
            <span v-if="read_more">
              <p>
                {{ modules.description }}
                <a v-if="read_more" @click="read_more = false" class="text-primary">Baca Lebih Sedikit</a>
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsBooks",
  data: () => ({
    module_id: null,
    token: null,
    modules: [],
    theme: [],
    description_length: "",
    read_more: false,
    pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/"
  }),
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.module_id = this.$route.params.module_id;
    this._actionGetModule();
  },
  methods: {
    _actionGetModule() {
      this.$axios
        .get("books/" + this.module_id, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.modules = response.data.data;
            this.theme = response.data.theme;
            this.description_length = this.modules.description.length;
          }
        });
    }
  }
};
</script>
<style scoped>
.card-content {
  padding: 40px;
  padding-bottom: 20px;
  box-shadow: 0 0 26px 0 rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #fff;
}
.custom-bullet {
  margin-left: -40px;
  list-style: none;
  counter-reset: counter;
}
.custom-bullet li::before {
  counter-increment: counter;
  content: counter(counter);
}

.custom-bullet--b .li-custom {
  position: relative;
  margin-bottom: 1.5rem;
  border: 3px solid rgb(168, 171, 181);
  padding: 0.75rem;
  border-radius: 3px;
}
.custom-bullet--b .li-custom::before {
  position: absolute;
  top: -0.75rem;
  padding-left: 0.375rem;
  padding-right: 0.375rem;
  color: rgb(168, 171, 181);
  background-color: white;
}
.div-list {
  display: list-item;
  margin-left: 1.5em;
  list-style-type: disc;
}
</style>
