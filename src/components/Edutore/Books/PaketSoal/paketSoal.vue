9<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12 card-custom">
        <div class="col-md-12 mt-2">
          <span v-if="trial">
            <h5 class="badge badge-success" style="font-size: 16px">
              Trial
            </h5>
          </span>
          <span v-else>
            <h5 class="badge badge-danger" style="font-size: 16px">
              Non Trial
            </h5>
          </span>
          <button class="btn btn-primary ml-2"><i class="fa fa-plus"></i> Tambah Soal</button>
        </div>
        <div class="col-md-12 mt-2 mb-2">
          <div class="col-md-12" v-for="(soal, n) in soals" :key="n">
            <div class="col-md-12">
              <span class="">{{ ++n }}</span>
              <button class="btn btn-sm btn-outline-success ml-3">
                <i class="fa fa-check"></i>
              </button>
              <button class="btn btn-sm btn-outline-primary ml-1">
                <i class="fa fa-pencil"></i>
              </button>
            </div>
            <div class="col-md-12">
              <p v-if="soal.soals.soal_text" v-html="soal.soals.soal_text" class="pl-3"></p>
            </div>
            <div class="col-md-12" v-if="soal.soals.soal_image">
              <img
                :src="pathImagesQ + soal.soals.soal_image"
                :alt="soal.soals.soal_image"
                class="ml-3"
                style="height:100px;width:auto"
              />
            </div>
            <div class="col-md-11 ml-3 mt-2 mb-3" style="border: 1px solid #404040">
              <ol type="A" class="mt-2">
                <div v-for="j in soal.soals.jawabans" :key="j.id" class="div-list">
                  <div class="row ml-2">
                    <div class="col-auto">
                      <span v-if="j.jawaban_text" v-html="j.jawaban_text" @click="_actionEditJawaban(j)">
                      </span>
                    </div>
                    <div class="col-md-6">
                      <span v-if="j.benar" class="ml-3 badge badge-success">
                        <i class="fa fa-check"></i> Benar
                      </span>
                      <span v-else class="badge badge-danger ml-3"> <i class="fa fa-times"></i> Salah </span>
                    </div>
                  </div>
                  <img
                    v-if="j.jawaban_image"
                    :src="pathImagesAnswer + j.jawaban_image"
                    :alt="j.jawaban_image"
                    class="mb-1"
                    style="height:100px;width:auto"
                  />
                </div>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaketSoalAdmin",
  data: () => ({
    items: {},
    soals: [],
    trial: false, // dummy
    pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
    pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/"
  }),
  mounted() {
    let id = this.$route.query.paket_id;
    this._actionGetSoal(id);
  },
  methods: {
    _actionGetSoal(id) {
      this.$axios
        .get("publisher-module-soal/" + id)
        .then(response => {
          this.items = response.data.data;
          this.soals = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionEditJawaban(j) {
      console.log(j);
    }
  }
};
</script>
<style scoped>
.card-custom {
  box-shadow: 0 0 26px 0 rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  background-color: #fff;
}
.div-list {
  display: list-item;
  margin-left: 1.5em;
  list-style-type: upper-alpha;
}
</style>
