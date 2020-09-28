<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card bg border-0">
        <div class="card-body tulisan">
          <h4 class="h3">
            {{ items.name }}
            <span v-if="items.trial" class="badge badge-primary"> Trials</span>
            <span v-else class="badge badge-danger"> Non Trials </span>
          </h4>
          <ol>
            <template v-for="(soal, n) in items.soals">
              <li :key="soal.id">
                {{ ++n }}
                <p v-html="soal.pertanyaan"></p>
                <span v-if="soal.gambar">
                  <img :src="pathImagesQ + soal.gambar" :alt="soal.gambar" class="thumbnail" />
                </span>
                <!-- {{ soal }} -->
              </li>
            </template>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailPaketSoal",
  data() {
    return {
      items: {},
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      pathPembahasan: "https://storage.googleapis.com/edutore-cdn/public/soal/discussion/",
      image: "pattern-general-01.png"
    };
  },

  methods: {
    _actionGetPaketSoal(id) {
      this.$axios
        .get(`paket-soals/${id}`)
        .then(response => {
          this.items = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    const { id } = this.$route.query;
    this._actionGetPaketSoal(id);
  }
};
</script>

<style>
.bg {
  background-color: transparent;
  background-image: url("../../../public/img/pattern-general-01.png");
  background-repeat: repeat-y space;
  position: relative;
  background: size 80em;
}
.bg::after {
  content: "";
  position: absolute;
}
</style>
