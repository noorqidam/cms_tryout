<template>
  <div class="row">
    <div class="col-md-6">
      <b-modal
        v-model="is_loading"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
      >
        <div class="row">
          <div class="col-md-12">
            Loading...
          </div>
        </div>
      </b-modal>
    </div>
    <div class="col-md-12">
      <div class="card border-0">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-auto">
              <h4 class="h3">
                <span v-if="items.trial" class="badge badge-primary"> Trials</span>
                <span v-else class="badge badge-danger"> Non Trials </span>
              </h4>
            </div>
            <div class="col-sm-auto">
              <button class="btn ml-2 btn-sm btn-primary" @click="_actionAddSoal">
                <i class="fa fa-plus"> </i> <b> Tambah Soal </b>
              </button>
            </div>
          </div>
          <ul>
            <template v-for="(soal, n) in soals" name="soal">
              <li :key="soal.soals.soal_id">
                <div class="form-group row">
                  <div class="col-sm-auto">
                    <strong> {{ ++n }} </strong>
                  </div>
                  <div class="col-sm-auto">
                    <button class="btn btn-sm btn-outline-success">
                      <i class="fa fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary ml-1">
                      <i class="fa fa-pencil"></i>
                    </button>
                  </div>
                </div>
                <div class="form-group row ml-2">
                  <p v-if="soal.soals.soal_text" v-html="soal.soals.soal_text" class="pl-1"></p>
                </div>
                <div class="form-group row ml-1" v-if="soal.soals.gambar">
                  <div class="col-sm-auto">
                    <img
                      :src="pathImagesQ + soal.soals.gambar"
                      :alt="soal.soals.gambar"
                      style="height:100px;width:auto"
                    />
                  </div>
                </div>
                <div class="form-group row ml-2">
                  <blockquote class="info" v-if="soal.soals.pembahasan">
                    <strong> Pembahasan </strong>
                    <p
                      class="text-justify"
                      v-if="soal.soals.pembahasan.isi"
                      v-html="soal.soals.pembahasan.isi"
                    ></p>
                    <img
                      v-if="soal.soals.pembahasan.gambar"
                      :src="pathPembahasan + soal.soals.pembahasan.gambar"
                      :alt="soal.soals.pembahasan.gambar"
                      style="height:120px;width:auto"
                    />
                    <br />
                    <code> Status -> {{ soal.soals.pembahasan.is_show ? "displayed" : "No displayed" }}</code>
                  </blockquote>
                </div>
                <div class="form-group row ml-1">
                  <div class="col-sm-auto">
                    <ol>
                      <li v-for="(j, i) in soal.soals.jawabans" :key="j.id" class="pl-1 ml-2">
                        {{ _Alphabet(i) }}.
                        <a
                          ><label
                            v-if="j.jawaban_text"
                            v-html="j.jawaban_text"
                            class="m-2 btn"
                            @click="_ModalEditJawaban(j)"
                          >
                          </label>
                        </a>
                        <img
                          v-if="j.jawaban_image"
                          :src="pathImagesAnswer + j.jawaban_image"
                          :alt="j.jawaban_image"
                          class="img-thumbnails"
                        />
                        <span v-if="j.is_correct" class="badge badge-success">
                          <i class="fa fa-check"></i> Benar
                        </span>
                        <span v-else class="badge badge-danger"> <i class="fa fa-times"></i> salah </span>
                      </li>
                    </ol>
                  </div>
                </div>
              </li>
            </template>
          </ul>
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
      soals: [],
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      pathPembahasan: "https://storage.googleapis.com/edutore-cdn/public/soal/discussion/",
      is_loading: false,
      FormEditJ: {},
      showModalEditJ: false
    };
  },
  mounted() {
    let id = this.$route.query.paket_id;
    this._actionGetPaketSoal(id);
  },
  methods: {
    _actionGetPaketSoal(id) {
      this.$axios
        .get("publisher-module-soal/" + id)
        .then(response => {
          this.is_loading = false;
          this.items = response.data.data;
          this.soals = response.data.data;
        })
        .catch(err => {
          console.log(err);
          this.is_loading = false;
        });
    },
    _actionAddSoal() {
      // let id = this.$route.query.paket_id;
      // let slug = this.items.name.toLowerCase();
      // this.$router.push({
      //   path: "/soals/create",
      //   query: { paket_soal: id, slug: slug }
      // });
    },
    _Alphabet(data) {
      switch (data) {
        case 0:
          return "A";
        case 1:
          return "B";
        case 2:
          return "C";
        case 3:
          return "D";
        case 4:
          return "E";
        default:
          break;
      }
    },
    _ModalEditJawaban(data) {
      this.showModalEditJ = true;
      this.FormEditJ = data;
    },
    _actionUpdateJawban() {
      this.showModalEditJ = true;
    }
  }
};
</script>

<style scoped>
.trans {
  opacity: 0.9;
  color: black;
}
blockquote.info {
  background: rgba(8, 148, 226, 0.038);
}
blockquote {
  line-height: 1.6;
  position: relative;
  margin: 25px 0;
  background: #f9eff1;
  padding: 20px;
}

blockquote {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
}
blockquote.info::before {
  background: #0894e2;
}
blockquote strong:first-of-type {
  display: block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
}
blockquote.info strong {
  color: #0894e2;
}
blockquote::before {
  height: 100%;
  width: 5px;
  content: "";
  background: #ed2945;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
</style>
