<template>
  <div class="hello">
    <div v-if="items.length > 0" class="col-md-12">
      <div class="col-md-12">
        <h5 class="text-center">Review Nilai Quiz {{ email }}</h5>
      </div>
      <div class="col-md-10 offset-md-1 text-right mt-md-3 d-none d-md-block mb-md-2">
        <button class="btn btn-primary btn-sm" large @click="showModalGoTo = true">
          Pergi ke nomor
          <i class="fa fa-arrow-right"></i>
        </button>
      </div>
      <div class="row">
        <!-- Modal Result -->
        <div class="col-md-12">
          <b-modal v-model="showModalEnd" size="md" hide-footer title="Preview" header-bg-variant="info">
            <div class="row">
              <div class="col-md-12">
                <table class="table table-hover">
                  <thead>
                    <tr class="text-center bg-primary">
                      <td colspan="2">
                        Hasil Akhir
                      </td>
                    </tr>
                    <tr>
                      <td>Peserta</td>
                      <td>{{ email }}</td>
                    </tr>
                    <tr>
                      <td>Total Soal</td>
                      <td>{{ total_soal }}</td>
                    </tr>
                    <tr>
                      <td>Total Soal Di Jawab</td>
                      <td>{{ soal_dijawab }}</td>
                    </tr>
                    <tr>
                      <td>Total Nilai</td>
                      <td>
                        <span v-if="total_nilai < 70" class="badge badge-danger">{{ total_nilai }}</span>
                        <span v-else-if="total_nilai >= 70" class="badge badge-success">{{
                          total_nilai
                        }}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2"></td>
                    </tr>
                  </thead>
                </table>
                <div class="text-center">
                  <button class="btn btn-primary" @click="_actionSubmitReview">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
        <!-- End Modal Result -->
        <!-- Modal Form-->
        <div class="col-md-12">
          <b-modal
            v-model="showModal"
            size="lg"
            hide-footer=""
            title="Berikan Review"
            header-bg-variant="info"
          >
            <div class="row">
              <div class="col-md-12">
                <form v-on:submit.prevent="_actionSubmitNilai(form.soal_id, form.nilai, form.comment)">
                  <input v-model="form.soal_id" type="text" hidden />
                  <div class="form-group mt-3">
                    <label for="nilai_peserta">Nilai</label>
                    <div class="wrapper">
                      <select
                        v-model="form.nilai"
                        class="form-control"
                        onfocus="this.size=5;"
                        onblur="this.size=1;"
                        onchange="this.size=1; this.blur();"
                      >
                        <option
                          v-for="nilaiPeserta in nilai"
                          :key="nilaiPeserta.nilai"
                          :value="nilaiPeserta.nilai"
                        >
                          {{ nilaiPeserta.nilai }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="komentar"> Komentar </label>
                    <textarea v-model="form.comment" rows="5" class="form-control" />
                  </div>
                  <div class="form-group justify-content-center mt-3">
                    <button class="btn btn-block btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </b-modal>
        </div>
        <!-- End Modal Form -->
        <div class="col-md-12">
          <b-modal
            v-model="showModalGoTo"
            size="md"
            hide-footer
            title="Pergi ke nomor"
            header-bg-variant="info"
          >
            <div class="row">
              <div class="col-md-12">
                <div class="row" style="place-content: center">
                  <div
                    v-for="(no, index) in items"
                    :key="index"
                    class="customList bg-info"
                    @click="_actionGetNumber(index)"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
        <div class="col-md-1 align-self-center d-md-block d-none">
          <button class="btn" :disabled="page === 0" @click="prevPage">
            <i class="fa fa-chevron-circle-left" style="font-size:32px"></i>
          </button>
        </div>
        <!-- Button On Mobile View -->
        <div class="row d-md-none col-md-1 align-self-center">
          <div class="col-6">
            <button class="btn" :disabled="page === 0" @click="prevPage">
              <i class="fa fa-chevron-circle-left" style="font-size:32px"></i>
            </button>
          </div>
          <div class="d-md-none col-6 pr-1 text-right">
            <div class="test">
              <button class="btn" :disabled="page >= pageCount - 1" @click="nextPage">
                <i class="fa fa-chevron-circle-right" style="font-size:32px"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- End Button On Mobile View -->
        <!-- Content -->
        <div class="col-12 col-md-10 scrollable pl-md-5">
          <div class="row justify-content-center">
            <div v-for="(hasil, index) in paginated" :key="index" class="col-md-12 card-custom mb-3 mr-md-3">
              <h6 class="text-center mt-3">{{ page + 1 }}</h6>
              <div>
                <div class="col-12 col-md-12">
                  <label for="soal_text" class="m-2" style="text-decoration: underline"><b>Soal</b></label>
                </div>
              </div>
              <div>
                <div class="col-md-12 col-12">
                  <p v-html="hasil.soal_text" class="text-justify pl-4"></p>
                  <!-- <div class="text-center mb-3">
                    <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" />
                  </div> -->
                </div>
              </div>
              <div>
                <div class="col-12 col-md-12">
                  <label for="jawaban_text" class="m-2" style="text-decoration: underline">
                    <b>Jawaban</b>
                  </label>
                </div>
              </div>
              <div>
                <div class="col-md-12 col-12">
                  <p v-html="hasil.jawaban_text" class="text-justify pl-4"></p>
                  <!-- <div class="text-center">
                    <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" />
                  </div> -->
                </div>
              </div>
              <div v-if="showReview == true" class="col-md-12 col-12">
                <div class="row">
                  <div class="col-md-2 col-12">
                    <label for="nilai_text" class="m-2" style="text-decoration: underline">
                      <b>Nilai</b>
                    </label>
                    <br />
                    <span v-if="hasil.point >= 7" class="badge badge-success ml-4" style="font-size:16px">
                      {{ hasil.point }}
                    </span>
                    <span
                      v-else-if="hasil.point == ''"
                      class="badge badge-secondary ml-4"
                      style="font-size:16px"
                    >
                      -
                    </span>
                    <span v-else-if="hasil.point <= 6" class="badge badge-danger ml-4" style="font-size:16px">
                      {{ hasil.point }}
                    </span>
                  </div>
                  <div class="col-md-10 col-12">
                    <label for="koment_text" class="m-2" style="text-decoration: underline">
                      <b>Komentar</b>
                    </label>
                    <br />
                    <div v-if="hasil.comment != ''" class="card-custom4">
                      <span v-html="hasil.comment" class="p-2 text-justify mr-2 ml-2"></span>
                    </div>
                    <div v-else-if="hasil.comment == ''" class="card-custom4 text-center pt-3">
                      <span style="font-size:16px">Belum ada komentar..</span>
                    </div>
                  </div>
                </div>
                <div class="form-group justify-content-center mt-3">
                  <button
                    class="btn btn-block btn-primary"
                    @click="_actionShowModal(hasil.soal_id, hasil.point, hasil.comment)"
                  >
                    <div v-if="hasil.point !== ''">
                      Edit Review
                    </div>
                    <div v-else>
                      Review
                    </div>
                  </button>
                </div>
                <hr />
              </div>
              <div class="col-md-12 mb-3 text-right">
                <button class="btn btn-info btn-sm text-white" @click="_actionShowReview">
                  <span v-if="showReview == true">
                    Tutup Review
                  </span>
                  <span v-else>
                    Lihat Review
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- End Content -->
        <div class="col-md-1 align-self-center pl-md-5 d-md-block d-none">
          <button class="btn" :disabled="page >= pageCount - 1" @click="nextPage">
            <i class="fa fa-chevron-circle-right" style="font-size:32px"></i>
          </button>
        </div>
        <div v-if="doneReview" class="col-md-12 text-center">
          <div class="col-md-12 text-center">
            <button class="btn btn-success" @click="_actionShowModalEnd">
              Akhiri Review
            </button>
          </div>
        </div>
        <div v-else class="col-md-12 text-center">
          <div v-if="showButtonEnd" class="col-md-12 text-center">
            <button class="btn btn-success" :disabled="btnDisabled" @click="_actionShowModalEnd">
              Akhiri Review
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Tidak Ada Data Essay</h2>
    </div>
  </div>
</template>

<script>
// import Accordion from "./component/Accordion";
export default {
  name: "HelloWorld",
  // components: { Accordion },
  data() {
    return {
      page: 0,
      page2: 3,
      perPage: 1,
      showModal: false,
      icon: true,
      icon2: true,
      showButtonEnd: false,
      showModalGoTo: false,
      form: {},
      nilai: [
        { nilai: 1 },
        { nilai: 2 },
        { nilai: 3 },
        { nilai: 4 },
        { nilai: 5 },
        { nilai: 6 },
        { nilai: 7 },
        { nilai: 8 },
        { nilai: 9 },
        { nilai: 10 }
      ],
      user_id: null,
      quiz_id: null,
      items: [],
      email: "",
      showModalEnd: false,
      btnDisabled: false,
      doneReview: false,
      token: null,
      total_nilai: null,
      total_soal: null,
      soal_dijawab: null,
      showReview: false
    };
  },
  props: {
    // items: { type: Array, required: true },
    size: { type: Number, required: false, default: 1 }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.user_id = this.$route.query.user_id;
    this.quiz_id = this.$route.query.quiz_id;
    this._actionGetReview();
  },
  methods: {
    _actionShowModalEnd() {
      this.showModalEnd = true;
    },
    _actionSubmitReview() {
      this.showModalEnd = false;
      this.$router.push({
        path: "/quiz/review-peserta-quiz",
        query: { quiz_id: this.quiz_id }
      });
    },
    nextPage() {
      const next = this.page++;
      const currentPage = this.page;
      const itemReview = this.items.length;
      const maxItemReview = itemReview - 1;
      if (currentPage === maxItemReview) {
        next;
        this.showButtonEnd = true;
        this.btnDisabled = true;
      } else {
        next;
        this.showButtonEnd = false;
      }
    },
    prevPage() {
      const prev = this.page--;
      const currentPage = this.page;
      const itemReview = this.items.length;
      const maxItemReview = itemReview - 1;
      if (currentPage != maxItemReview) {
        prev;
        this.showButtonEnd = false;
      }
    },
    _actionGetReview() {
      this.$axios
        .get("review-quiz/quiz?quiz_id=" + this.quiz_id + "&user_id=" + this.user_id, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.email = response.data.email;
            this.doneReview = response.data.isReviewed;
            this.total_nilai = response.data.temp_score;
            this.total_soal = response.data.total_soal;
            this.soal_dijawab = response.data.soal_dijawab;
          }
        })
        .catch(err => console.log(err));
    },
    _actionShowModal(soal, nilai, comment) {
      this.showModal = true;
      this.form = {
        soal_id: soal,
        nilai: nilai,
        comment: comment
      };
    },
    _actionGetNumber(no) {
      this.page = no;
      this.showModalGoTo = false;
    },
    _actionSubmitNilai(soal, nilai, comment) {
      let data = {
        user_id: this.user_id,
        soal_id: soal,
        point: nilai,
        comment: comment
      };
      this.$axios
        .post("review-quiz?quiz_id=" + this.quiz_id, data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.$notify({
              group: "foo",
              title: "Success",
              text: response.data.message
            });
            const currentPage = this.page;
            const itemReview = this.items.length;
            const maxItemReview = itemReview - 1;
            const toMaxReview = itemReview - 2;
            if (currentPage === maxItemReview) {
              this.showModal = false;
              this._actionGetReview();
              this.showButtonEnd = true;
              this.btnDisabled = false;
            } else if (currentPage === toMaxReview) {
              this.showModal = false;
              this.page++;
              this._actionGetReview();
              this.showButtonEnd = true;
              this.btnDisabled = true;
            } else {
              this.showModal = false;
              this.page++;
              this._actionGetReview();
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.notify({
            group: "foo",
            title: "error",
            text: "Review Error"
          });
        });
    },
    _actionShowReview() {
      this.showReview = !this.showReview;
    }
  },
  computed: {
    pageCount() {
      let l = this.items.length,
        s = this.size;
      return Math.floor(l / s);
    },
    paginated() {
      const start = this.page * this.size,
        end = start + this.size;
      return this.items.slice(start, end);
    }
  }
};
</script>

<style scoped>
.scrollable {
  max-height: 600px;
  overflow: auto;
}
.card-custom {
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.card-custom2 {
  border-radius: 3px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
.card-custom3 {
  border-radius: 3px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
.card-custom4 {
  border-radius: 3px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  min-height: 70px;
}
.customList {
  min-height: 25px;
  min-width: 25px;
  border: 1px solid #fff;
  border-radius: 3px;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
}
.customList:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  color: #fff;
  transform: translateY(-6px);
}
</style>
