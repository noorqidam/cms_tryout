<template>
  <div v-if="isLoading === true" class="hello">
    <div v-if="items.length > 0" class="col-md-12">
      <div class="col-md-12 text-center">
        <h4>{{ judul_ujian }} - {{ judul_sesi }}</h4>
        <h5>
          Review Nilai Ujian <span style="color: #1e9cd7">{{ email }}</span>
        </h5>
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
          <b-modal v-model="showModalEnd" size="md" hide-footer hide-header header-bg-variant="info">
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
                      <td>: {{ email }}</td>
                    </tr>
                    <tr>
                      <td>Total Soal</td>
                      <td>: {{ total_soal }}</td>
                    </tr>
                    <tr>
                      <td>Total Soal PG / Dijawab</td>
                      <td>: {{ total_soal_pg }}/{{ soal_pg_dijawab }}</td>
                    </tr>
                    <tr>
                      <td>Total Soal Essay / Dijawab</td>
                      <td>: {{ total_soal_esay }}/{{ soal_esay_dijawab }}</td>
                    </tr>
                    <tr>
                      <td>Nilai PG</td>
                      <td>
                        :<span v-if="total_nilai_pg < 70" class="badge badge-danger ml-1"
                          >{{ total_nilai_pg }}/100</span
                        >
                        <span v-else-if="total_nilai_pg >= 70" class="badge badge-success ml-1">
                          {{ total_nilai_pg }}/100
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Nilai Essay</td>
                      <td @click="showModalEnd = false" style="cursor: pointer">
                        :<span v-if="total_nilai < 70" class="badge badge-danger ml-1"
                          >{{ total_nilai }}/100</span
                        >
                        <span v-else-if="total_nilai >= 70" class="badge badge-success ml-1">
                          {{ total_nilai }}/100
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Nilai Akhir</td>
                      <td>
                        <!-- <form> -->
                        <div class="col-sm">
                          <!-- <ValidationProvider rules="digits" v-slot="{ errors }"> -->
                          <input
                            v-model="formAkhir.nilai_akhir"
                            type="number"
                            min="1"
                            max="100"
                            name="Nilai Akhir"
                            class="form-control form-control-sm"
                          />
                          <!-- <span style="font-size:10px" class="text-danger">{{
                                errors[0] ? "Nilai akhir harus berupa angka" : ""
                              }}</span>
                            </ValidationProvider> -->
                        </div>
                        <span style="font-size: 10px" class="col-sm"><em> Contoh: 1 - 100</em></span>
                        <!-- </form> -->
                      </td>
                    </tr>
                    <tr>
                      <td>Catatan</td>
                      <td>
                        <!-- <form> -->
                        <div class="col-sm">
                          <textarea
                            v-model="formAkhir.catatan"
                            id="alamat"
                            cols="30"
                            rows="2"
                            class="form-control form-control-sm"
                          />
                        </div>
                        <span
                          v-for="ctt in catatan"
                          :key="ctt.text"
                          style="font-size: 12px;cursor: pointer"
                          class="ml-2"
                          @click="addComment(ctt.text)"
                          ><em class="badge badge-secondary"> {{ ctt.text }}</em></span
                        >
                        <!-- </form> -->
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
                  <button class="btn btn-danger ml-2" @click="showModalEnd = false">
                    Tutup
                  </button>
                  <b-modal v-model="modalError" title="PERHATIAN!" ok-only centered>
                    <p class="text-center">
                      Submit nilai gagal
                    </p>
                    <p class="text-center">Pastikan sudah mengisi form nilai akhir dengan benar.</p>
                  </b-modal>
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
            size="md"
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
                    <div class="wrapper" style="text-align: center">
                      <!-- <range-slider class="slider" min="0" max="10" step="1" v-model="form.nilai">
                      </range-slider> -->
                      <input type="number" min="1" max="100" class="form-control" v-model="form.nilai" />
                      <span style="font-size: 10px; float: left" class="col-sm text-secondary text-left mt-1"
                        ><em> Contoh: 1 - 100</em></span
                      >
                      <br />
                      <!-- <span v-if="form.nilai >= 70" class="badge badge-success">{{ form.nilai }}</span>
                      <span v-else-if="form.nilai < 70" class="badge badge-danger">{{ form.nilai }}</span> -->
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
        <!-- Modal Go To -->
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
                  <div class="col-md-12 mb-2">
                    <div class="row col-md-12 mb-1">
                      <div style="width: 20px; height: 20px; border-radius: 3px" class="bg-success"></div>
                      <div class="ml-2">
                        Essay
                      </div>
                    </div>
                    <div class="row col-md-12">
                      <div style="width: 20px; height: 20px; border-radius: 3px" class="bg-primary"></div>
                      <div class="ml-2">
                        Pilihan Ganda
                      </div>
                    </div>
                  </div>
                  <div v-for="(no, index) in items" :key="index" @click="_actionGetNumber(index)">
                    <!-- {{ index + 1 }} -->
                    <span v-if="no.type_soal == 'ESAY'" class="badge badge-success m-1 customList">
                      {{ index + 1 }}
                    </span>
                    <span v-else class="badge badge-primary m-1 customList">
                      {{ index + 1 }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
        <!-- End Modal Go To -->
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
              <!-- Content Essay -->
              <h6 class="text-center mt-3">{{ page + 1 }}</h6>
              <div v-if="hasil.type_soal == 'ESAY'">
                <span class="badge badge-success" style="font-size: 12px">Essay</span>
                <hr />
                <div class="col-md-12 col-12 mt-2">
                  <p v-html="hasil.soal_text" class="text-justify"></p>
                  <div v-if="hasil.soal_image" class="text-center mb-3">
                    <!-- <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" /> -->
                    <img :src="pathImagesQ + hasil.soal_image" :alt="soal_image" class="img img-thumbnail" />
                  </div>
                </div>
                <div class="col-12 col-md-12">
                  <label for="jawaban_text" class="m-2" style="color: #1e9cd7">
                    <b>Jawaban</b>
                  </label>
                </div>
                <div class="col-md-12 col-12">
                  <p v-html="hasil.jawaban_text" class="text-justify pl-4"></p>
                  <div v-if="hasil.image_jawababan" class="text-center">
                    <img :src="pathImagesQ + hasil.soal_image" :alt="soal_image" style="width: 150px" />
                  </div>
                </div>
                <div class="col-md-12 col-12">
                  <label for="jawaban_text" class="m-2" style="color: #1e9cd7">
                    <b v-if="showComment == true">Komentar</b>
                    <b v-else @click="showComment = true" style="cursor: pointer"
                      >Lihat Komentar
                      <span class="badge" style="background-color: #1e9cd7"
                        ><i class="fa fa-arrow-down"></i></span
                    ></b>
                  </label>
                  <br />
                  <div v-if="showComment == true">
                    <div v-if="hasil.comment != ''" class="card-custom4">
                      <span v-html="hasil.comment" class="p-2 text-justify mr-2 ml-2"></span>
                    </div>
                    <div v-else-if="hasil.comment == ''" class="card-custom4 text-center pt-3">
                      <span style="font-size:16px">Belum ada komentar..</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="col-md-12 mb-3">
                  <div class="row">
                    <div class="col-md-6 col-6">
                      <label for="nilai_text" class="m-2" style="font-size: 16px">
                        <b>Nilai/Point :</b>
                      </label>
                      <span v-if="hasil.point >= 70" class="badge badge-success" style="font-size:16px">
                        {{ hasil.point }}
                      </span>
                      <span
                        v-else-if="hasil.isReviewed == false"
                        class="badge badge-secondary"
                        style="font-size:16px"
                      >
                        Belum di nilai
                      </span>
                      <span v-else-if="hasil.point < 70" class="badge badge-danger" style="font-size:16px">
                        {{ hasil.point }}
                      </span>
                    </div>
                    <div class="col-md-6 col-6 text-right">
                      <div class="form-group justify-content-center mt-3">
                        <button
                          class="btn btn-info btn-sm text-white"
                          @click="_actionShowModal(hasil.soal_id, hasil.point, hasil.comment)"
                        >
                          <div v-if="hasil.isReviewed == false">
                            Nilai
                          </div>
                          <div v-else>
                            Edit Nilai
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End Content Essay -->
              <!-- Content Pilihan Ganda -->
              <div v-else-if="hasil.type_soal == 'PG'">
                <span class="badge badge-primary" style="font-size: 12px">Pilihan Ganda</span>
                <hr />
                <div class="col-md-12 col-12 mt-2">
                  <p v-html="hasil.soal_text" class="text-justify"></p>
                  <div v-if="hasil.soal_image" class="text-center mb-3">
                    <img :src="pathImagesQ + hasil.soal_image" :alt="hasil.soal_image" style="width: 150px" />
                  </div>
                </div>
                <div class="col-12 col-md-12">
                  <label for="jawaban_text" class="m-2" style="color: #1e9cd7">
                    <b>Jawaban Peserta</b>
                  </label>
                </div>
                <div class="col-md-12 col-12">
                  <p v-html="hasil.jawaban_text" class="text-justify pl-4"></p>
                  <div v-if="hasil.image_jawababan" class="text-center">
                    <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" class="mr-md-2 mb-1" />
                    <img src="https://via.placeholder.com/150" alt="" />
                  </div>
                </div>
                <hr />
                <div class="col-md-12 col-12 mb-3">
                  <label for="nilai_text" class="m-2" style="font-size: 16px">
                    <b>Hasil :</b>
                  </label>
                  <span v-if="hasil.point == 1" class="badge badge-success" style="font-size:16px">
                    Benar
                  </span>
                  <span v-else-if="hasil.point == 0" class="badge badge-danger" style="font-size:16px">
                    Salah
                  </span>
                </div>
              </div>
              <!-- End Content Pilihan Ganda -->
            </div>
          </div>
        </div>
        <!-- End Content -->
        <div class="col-md-1 align-self-center pl-md-5 d-md-block d-none">
          <button class="btn" :disabled="page >= pageCount - 1" @click="nextPage">
            <i class="fa fa-chevron-circle-right" style="font-size:32px"></i>
          </button>
        </div>
        <!-- Tombol Akhir -->
        <div v-if="doneReview" class="col-md-12 text-center mb-2">
          <div class="col-md-12 text-center">
            <button class="btn btn-success" @click="_actionShowModalEnd">
              Akhiri Review
            </button>
          </div>
        </div>
        <div v-else class="col-md-12 text-center mb-2">
          <div v-if="showButtonEnd" class="col-md-12 text-center">
            <button class="btn btn-success" :disabled="btnDisabled" @click="_actionShowModalEnd">
              Akhiri Review
            </button>
          </div>
        </div>
        <!-- End Tombol Akhir -->
      </div>
    </div>
    <!-- Content Jika tidak ada essay -->
    <div v-else class="col-md-12 text-center">
      <button class="btn btn-success" @click="showModalEnd2 = true">
        Beri Nilai AKhir
      </button>
      <div class="col-md-12">
        <b-modal v-model="showModalEnd2" size="md" hide-footer hide-header header-bg-variant="info">
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
                    <td>: {{ email }}</td>
                  </tr>
                  <tr>
                    <td>Total Soal</td>
                    <td>: {{ total_soal }}</td>
                  </tr>
                  <tr>
                    <td>Total Soal PG / Dijawab</td>
                    <td>: {{ total_soal_pg }}/{{ soal_pg_dijawab }}</td>
                  </tr>
                  <tr>
                    <td>Total Soal Essay / Dijawab</td>
                    <td>: {{ total_soal_esay }}/{{ soal_esay_dijawab }}</td>
                  </tr>
                  <tr>
                    <td>Nilai PG</td>
                    <td>
                      :<span v-if="total_nilai_pg < 70" class="badge badge-danger ml-1"
                        >{{ total_nilai_pg }}/100</span
                      >
                      <span v-else-if="total_nilai_pg >= 70" class="badge badge-success ml-1">
                        {{ total_nilai_pg }}/100
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Nilai Essay</td>
                    <td>
                      :<span v-if="total_nilai < 70" class="badge badge-danger ml-1"
                        >{{ total_nilai }}/100</span
                      >
                      <span v-else-if="total_nilai >= 70" class="badge badge-success ml-1">
                        {{ total_nilai }}/100
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Nilai Akhir</td>
                    <td>
                      <!-- <form> -->
                      <div class="col-sm">
                        <!-- <ValidationProvider rules="digits" v-slot="{ errors }"> -->
                        <input
                          v-model="formAkhir.nilai_akhir"
                          type="number"
                          max="100"
                          min="1"
                          name="Nilai Akhir"
                          class="form-control form-control-sm"
                        />
                        <!-- <span style="font-size:10px" class="text-danger">{{
                                errors[0] ? "Nilai akhir harus berupa angka" : ""
                              }}</span>
                            </ValidationProvider> -->
                      </div>
                      <span style="font-size: 10px" class="col-sm"><em> Contoh: 1 - 100</em></span>
                      <!-- </form> -->
                    </td>
                  </tr>
                  <tr>
                    <td>Catatan</td>
                    <td>
                      <!-- <form> -->
                      <div class="col-sm">
                        <textarea
                          v-model="formAkhir.catatan"
                          id="alamat"
                          cols="30"
                          rows="2"
                          class="form-control form-control-sm"
                        />
                      </div>
                      <span
                        v-for="ctt in catatan"
                        :key="ctt.text"
                        style="font-size: 12px;cursor: pointer"
                        class="ml-2"
                        @click="addComment(ctt.text)"
                        ><em class="badge badge-secondary"> {{ ctt.text }}</em></span
                      >
                      <!-- </form> -->
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
                <button class="btn btn-danger ml-2" @click="showModalEnd2 = false">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </div>
    <!-- End Content jika tidak ada essay -->
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
// import RangeSlider from "vue-range-slider";
// you probably need to import built-in style
import "../../../assets/css/vue-range-slider.css";
// import Accordion from "./component/Accordion";
export default {
  name: "ReviewEssayAdmin",
  // components: { RangeSlider },
  data() {
    return {
      page: 0,
      page2: 3,
      perPage: 1,
      showModal: false,
      showModalEnd2: false,
      icon: true,
      icon2: true,
      showButtonEnd: false,
      showModalGoTo: false,
      form: {},
      user_id: null,
      ujian_id: null,
      sesi_id: null,
      items: [],
      email: "",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      showModalEnd: false,
      btnDisabled: false,
      doneReview: false,
      token: null,
      total_nilai: null,
      total_soal: null,
      soal_dijawab: null,
      showReview: true,
      showComment: false,
      judul_ujian: "",
      judul_sesi: "",
      attributes: "",
      total_soal_esay: null,
      soal_esay_dijawab: null,
      total_nilai_pg: null,
      total_soal_pg: null,
      soal_pg_dijawab: null,
      isLoading: false,
      modalError: false,
      formAkhir: {
        nilai_akhir: "",
        catatan: ""
      },
      catatan: [
        {
          text: "Bagus!"
        },
        {
          text: "Terus tingkatkan!"
        },
        {
          text: "Belajar lagi!"
        }
      ]
    };
  },
  props: {
    // items: { type: Array, required: true },
    size: { type: Number, required: false, default: 1 }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.user_id = this.$route.query.user_id;
    this.ujian_id = this.$route.query.ujian_id;
    this.sesi_id = this.$route.query.sesi_id;
    this._actionGetReview();
  },
  methods: {
    addComment(catatan) {
      if (this.formAkhir.catatan !== "") {
        this.formAkhir.catatan += ", " + catatan;
      } else {
        this.formAkhir.catatan = catatan;
      }
      this.formAkhir.nilai_akhir;
    },
    _actionShowModalEnd() {
      this.showModalEnd = true;
    },
    _actionSubmitReview() {
      if (this.formAkhir.nilai_akhir > 100) {
        this.modalError = true;
      } else {
        this.showModalEnd = false;
        let data = {
          ujian_id: this.ujian_id,
          sesi_id: this.sesi_id,
          user_id: this.user_id,
          email: this.email,
          nilai_akhir: this.formAkhir.nilai_akhir,
          catatan: this.formAkhir.catatan,
          nilai_objective: this.total_nilai_pg,
          nilai_esay: this.total_nilai
        };
        this.$axios
          .post("nilai-akhir-ujian", data, { headers: { "x-access-token": this.token } })
          .then(response => {
            if (response.data.success === "true") {
              this.$notify({
                group: "foo",
                type: "success",
                title: "Sukses ",
                text: response.data.message
              });
            }
          })
          .catch(err => {
            console.log(err);
            this.$notify({
              group: "foo",
              type: "error",
              title: "Opss .. ",
              text: "Ada Kesalahan di Server"
            });
          });
        this.$router.push({
          path: "/ujian/review-peserta-ujian",
          query: { ujian_id: this.ujian_id, sesi_ujian: this.sesi_id }
        });
      }
    },
    nextPage() {
      const next = this.page++;
      const currentPage = this.page;
      const itemReview = this.items.length;
      const maxItemReview = itemReview - 1;
      this.showComment = false;
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
      this.showComment = false;
      if (currentPage != maxItemReview) {
        prev;
        this.showButtonEnd = false;
      }
    },
    _actionGetReview() {
      this.$axios
        .get(
          "review-sesi-ujian/jawaban-peserta?ujian_id=" +
            this.ujian_id +
            "&sesi_id=" +
            this.sesi_id +
            "&user_id=" +
            this.user_id,
          {
            headers: { "x-access-token": this.token }
          }
        )
        .then(response => {
          this.isLoading = true;
          if (response.data.success === "true") {
            const data = response.data.data;
            let itemsDesc = data.sort((a, b) =>
              a.type_soal > b.type_soal ? 1 : b.type_soal > a.type_soal ? -1 : 0
            );
            this.items = itemsDesc;
            this.formAkhir.nilai_akhir = response.data.nilai_sesi;
            this.email = response.data.email;
            this.doneReview = response.data.isReviewed;
            this.total_nilai = response.data.score_esay;
            this.total_soal = response.data.total_soal;
            this.soal_dijawab = response.data.soal_dijawab;
            this.judul_ujian = response.data.judul_ujian;
            this.judul_sesi = response.data.sesi_ujian;
            this.total_soal_esay = response.data.total_soal_esay;
            this.soal_esay_dijawab = response.data.soal_esay_dijawab;
            // this.attributes = response.data.data[0].attr.name;
            this.soal_pg_dijawab = response.data.soal_pg_dijawab;
            this.total_soal_pg = response.data.total_soal_pg;
            this.total_nilai_pg = response.data.score_pg;
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = true;
        });
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
        .post("review-sesi-ujian?ujian_id=" + this.ujian_id + "&sesi_id=" + this.sesi_id, data, {
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
            this.showComment = false;
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
          this.$notify({
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
  border-radius: 3px;
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
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 70px;
}
.customList {
  font-size: 13px;
  cursor: pointer;
}
.customList:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  color: #fff;
  transform: translateY(-6px);
}

.slider {
  /* overwrite slider styles */
  width: 300px;
}
</style>
