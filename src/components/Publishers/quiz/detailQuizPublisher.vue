<template>
  <div class="row">
    <div class="col-md-12">
      <b-tabs content-class="mt-3" justified pills card>
        <b-tab title="Detail Quiz">
          <div class="row">
            <div class="col-sm-12">
              <b-modal v-model="showModalImage" hide-footer="" centered title="Upload Banner">
                <ValidationObserver ref="formBanner">
                  <form @submit.prevent="handleSubmit">
                    <div v-if="!banner" class="col-sm-12">
                      <ValidationProvider
                        name="image"
                        rules="image|size:150|ext:jpeg,jpg,png"
                        ref="provider"
                        v-slot="{ errors }"
                      >
                        <input id="upload" type="file" class="form-control-file" @change="changeFile" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="row justify">
                      <div v-if="banner" class="col-sm-6">
                        <img id="imgsc" :src="banner" class="img-thumbnail" alt="" />
                      </div>
                      <div v-if="banner" class="col-sm-2">
                        <span class="badge badge-danger btn btn-sm" @click="actionClearFile"> x </span>
                      </div>
                    </div>
                    <div class="row justify-content-center mt-2">
                      <div class="col-sm-5">
                        <button class="btn btn-block btn-primary"><i class="fa fa-upload"></i> Upload</button>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </b-modal>
            </div>
            <div class="col-md-12">
              <ValidationObserver ref="form">
                <form @submit.prevent="actionUpdated">
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Nama Quiz </label>
                    <div class="col-md-9">
                      <ValidationProvider rules="required|min:10" v-slot="{ errors }">
                        <input
                          v-model="items.judul_quiz"
                          type="text"
                          name="Judul Quiz"
                          class="form-control"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2">
                      Banner Quiz
                      <br />
                      <small class="text-secondary">* ukuran. 400x600</small>
                      <br />
                      <small class="text-secondary">* max. 150kb</small>
                    </label>
                    <div class="col-sm-3">
                      <img
                        v-if="items.quiz_banner"
                        v-lazy.container="pathImagesBanner + items.quiz_banner"
                        :alt="items.quiz_banner"
                        srcset=""
                        class="img-thumbnail"
                      />
                    </div>
                    <div class="col-sm-auto">
                      <span class="fa fa-pencil" style="cursor:pointer" @click="actionShowModal">
                        Ganti Banner
                      </span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Tipe Quiz </label>
                    <div class="col-sm-4">
                      <select v-model="items.type_quiz" class="form-control" required>
                        <option value="">
                          -- Pilih --
                        </option>
                        <option value="MANDIRI">
                          MANDIRI
                        </option>
                        <option value="BERSAMA">
                          BERSAMA
                        </option>
                      </select>
                    </div>
                    <label for="" class="col-sm-2"> Kategori Quiz </label>
                    <div class="col-sm-2">
                      <select v-model="items.category_quiz" class="form-control">
                        <option value="">
                          -- Pilih --
                        </option>
                        <option v-for="category in category_quiz" :key="category.id" :value="category.title">
                          {{ category.title }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Tanggal Mulai Quiz </label>
                    <div class="col-sm-4">
                      <b-form-datepicker id="start_date" v-model="start_date" locale="id" class="mb-2" />
                      <!-- {{ formatDate(items.start_date) }} -->
                    </div>
                    <label for="" class="col-sm-2"> Tanggal berakhir Quiz </label>
                    <div class="col-sm-4">
                      <b-form-datepicker id="end_date" v-model="start_date" locale="id" class="mb-2" />
                      <!-- {{ formatDate(items.end_date) }} -->
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Dimulai pada Jam </label>
                    <div class="col-sm-2">
                      <input v-model="items.times" type="time" class="form-control" />
                    </div>
                    <label for="" class="col-sm-2"> Berakhir pada Jam </label>
                    <div class="col-sm-2">
                      <input v-model="items.end_times" type="time" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Tipe Start </label>
                    <div class="col-sm-2">
                      <select v-model="items.type_start" class="form-control" required>
                        <option> -- PIlih -- </option>
                        <option value="REALTIMESOAL">
                          REALTIME SOAL
                        </option>
                        <option value="RACE">
                          RACE
                        </option>
                      </select>
                    </div>
                    <label for="" class="col-sm-2"> Metode Penilaian </label>
                    <div class="col-sm-3">
                      <select v-model="items.metode_penilaian" class="form-control">
                        <option value="">
                          -- PIlih --
                        </option>
                        <option value="NORMAL">
                          NORMAL
                        </option>
                        <option value="UTBK">
                          UTBK
                        </option>
                        <option value="DINAMIS">
                          DINAMIS
                        </option>
                        <option value="BOBOT">
                          BOBOT
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Penyelenggara Quiz </label>
                    <div class="col-sm-4">
                      <input type="text" v-model="items.penyelenggara" readonly class="form-control" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Berbayar </label>
                    <div class="col-sm-2">
                      <cswitch
                        v-model="items.is_premium"
                        type="default"
                        variant="success"
                        :pill="true"
                        :checked="false"
                      />
                    </div>

                    <label for="" class="col-sm-1"> Private </label>
                    <div class="col-sm-1">
                      <cswitch
                        v-model="items.is_private"
                        type="default"
                        variant="success"
                        :pill="true"
                        :checked="false"
                      />
                    </div>
                  </div>
                  <div v-if="items.is_premium" class="form-group row">
                    <label for="" class="col-sm-2"> Harga <small> (Rp)</small> </label>
                    <div class="col-sm-3">
                      <input v-model="price" type="number" class="form-control" />
                    </div>
                    <div class="col-sm-2">
                      <strong class="control-label"> {{ _formatPrice(price) }}</strong>
                    </div>
                  </div>
                  <div v-if="items.is_private" class="form-group row">
                    <label for="" class="col-sm-2"> Access PIN </label>
                    <div class="col-sm-5">
                      <input v-model="acces_pin" :type="typeFiled" class="form-control" />
                      <span
                        v-if="typeFiled === 'password'"
                        class="fa fa-fw fa-eye field-icon toggle-password"
                        style="cursor:pointer"
                        @click="showPin"
                      />
                      <span
                        v-else
                        class="fa fa-fw fa-eye-slash field-icon toggle-password"
                        style="cursor:pointer"
                        @click="showPin"
                      />
                    </div>
                  </div>
                  <div v-if="soals.length > 0" class="form-group row">
                    <label for="" class="col-sm-2"> Publish </label>
                    <div class="col-sm-auto">
                      <cswitch
                        v-model="items.publish"
                        type="default"
                        variant="success"
                        :pill="true"
                        :checked="false"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2">
                      Durasi Tampil Soal <small>* Detik <i> Untuk tipe quiz Realtime Soal </i> </small>
                    </label>
                    <div class="col-sm-2">
                      <input v-model="items.durasi_soal" type="number" class="form-control" />
                    </div>
                    <label for="" class="col-sm-2"> Durasi Pengerajaan Soal <small>* Menit</small> </label>
                    <div class="col-sm-2">
                      <input v-model="items.waktu_pengerjaan" type="number" class="form-control" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Keterangan </label>
                    <div class="col-sm-5">
                      <!-- <textarea id="" v-model="items.description" cols="30" rows="5" class="form-control" /> -->
                      <quill-editor v-model="items.description" :options="editorOption" />
                    </div>
                  </div>
                  <div class="form-group row justify-content-center">
                    <div class="col-sm-3">
                      <button v-if="!btn_loading" class="btn btn-block btn-primary">
                        Update
                      </button>
                      <button v-else class="btn btn-block btn-primary" disabled>
                        <b-spinner type="grow" small label="Spinning" />
                      </button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
              <div class="col-sm-12">
                <div class="row justify-content-end">
                  <div class="col-sm-2">
                    <button class="btn btn-block btn-danger" @click="_actionDeleteQuiz(quiz_id)">
                      <i class="fa fa-trash"></i> Hapus Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Soal">
          <div class="row">
            <div class="col-sm-3 mb-1">
              <router-link
                v-if="soals.length < 1"
                :to="{ path: '/p/bank-soal-quiz', query: { quiz_id: items._id } }"
                class="btn btn-sm btn-info"
              >
                <i class="fa fa-plus" /> Soal ▶
                {{ items.judul_quiz }}
              </router-link>
              <router-link
                v-else
                :to="{ path: '/p/bank-soal-quiz-edit', query: { quiz_id: items._id } }"
                class="btn btn-sm btn-info"
              >
                <i class="fa fa-plus" /> Soal ▶
                {{ items.judul_quiz }}
              </router-link>
            </div>

            <div class="col-md-12">
              <b-table
                show-empty
                small
                sticky-header
                head-variant="dark"
                responsive
                :items="soals"
                :fields="attribute"
                :current-page="currentPage"
                :filter="filter"
                :filter-included-fields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :busy="isBusy"
                @filtered="onFiltered"
              >
                <template v-slot:cell(No)="data">
                  {{ data.index + 1 }}
                </template>
                <template v-slot:cell(soal)="data">
                  <div v-if="data.item.soal_text">
                    <p v-html="data.item.soal_text" />
                  </div>
                </template>
                <template v-slot:cell(images)="data">
                  <div v-if="data.item.soal_image">
                    <img
                      v-if="data.item.soal_image"
                      v-lazy.container="pathImagesQ + data.item.soal_image"
                      :alt="data.item.soal_image"
                      srcset=""
                      style="heigth:60pxwidth:auto;max-width:200px"
                    />
                  </div>
                </template>
                <template v-slot:cell(actions)="row">
                  <b-button size="sm" @click="row.toggleDetails">
                    <i class="fa fa-angle-down" />
                  </b-button>
                </template>
                <template v-slot:cell(deleted)="row">
                  <b-button size="sm" class="btn-danger" @click="actionDeleted(row.item._id)">
                    <i class="fa fa-trash" />
                  </b-button>
                </template>
                <template v-slot:row-details="row">
                  <b-card v-if="row.item.jawabans.length > 0">
                    <ol type="A">
                      <li v-for="(value, key) in row.item.jawabans" :key="key">
                        <p>{{ value.jawaban_text }}</p>
                        (point <span class="badge badge-light"> {{ value.point }} </span> )
                      </li>
                    </ol>
                  </b-card>
                  <b-card v-else>
                    Tidak ada pilihan jawaban
                  </b-card>
                </template>
                <template v-slot:table-busy>
                  <div class="text-center text-dark my-2">
                    <b-spinner class="align-middle" variant="dark" type="grow" label="Loading .." /> Loading
                    ..
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>
        <!-- <b-tab title="Peserta">
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-sm table-striped table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col-1">
                        No
                      </th>
                      <th scope="col">
                        Email
                      </th>
                      <th scope="col">
                        Score
                      </th>
                      <th scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(pesertaQuiz, index) in dataPeserta" :key="index">
                      <th>
                        {{ index + 1 }}
                      </th>
                      <td>{{ pesertaQuiz._id.email }}</td>
                      <td>{{ pesertaQuiz.total_point }}</td>
                      <td>
                        <span
                          class="badge badge-info btn"
                          @click="actionDetailQuizPeserta(_id, pesertaQuiz._id.email)"
                          >Details</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </b-tab> -->
      </b-tabs>
    </div>
  </div>
</template>

<script>
// import moment from 'moment';
import cswitch from "../../Switch.vue";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "DetailQuizPublisher",
  components: { cswitch },
  data() {
    return {
      items: [],
      soals: [],
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      pathImagesBanner: "https://storage.googleapis.com/edutore-cdn/tryout/",
      attribute: [
        "No",
        {
          key: "soal",
          label: "Soal text",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "images",
          label: "Soal Image",
          sortable: true,
          class: "text-center"
        },
        {
          key: "type_soal",
          label: "Tipe Soal",
          sortable: true,
          class: "text-center"
        },
        {
          key: "category_id",
          label: "Kategory",
          sortable: true,
          class: "text-center"
        },
        {
          key: "matpel_id",
          label: "Mata pelajaran",
          sortable: true,
          class: "text-center"
        },
        {
          key: "publisher_id",
          label: "Publisher",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" },
        { key: "deleted", label: "Hapus" }
      ],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      isBusy: false,
      Filter: null,
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      quiz_id: null,
      publishers: [],
      token: null,
      start_date: null,
      end_date: null,
      category_quiz: [],
      acces_pin: null,
      typeFiled: "password",
      btn_loading: false,
      showModalImage: false,
      banner: null,
      Newbanner: null,
      dataPeserta: [],
      price: 0,
      editorOption: {
        modules: {
          imageResize: true
        }
      }
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    // const auth = sessionStorage.getItem('authorized');
    const id = this.$route.query._id;
    this.quiz_id = id;
    this.actionGetDetail(id);
    this.actionGetCategoryQuiz();
    this.actionGetPesertaQuiz(id);
  },
  methods: {
    actionGetCategoryQuiz() {
      this.$axios.get("category-quiz", { headers: { "x-access-token": this.token } }).then(response => {
        this.category_quiz = response.data.data.rows;
      });
    },
    actionGetDetail(id) {
      this.$axios
        .get(`publisher-quiz/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.start_date = new Date(this.items.start_date);
            this.end_date = new Date(this.items.end_date);
            this.soals = response.data.soal ? response.data.soal.soals : [];
            const QuizAccess = response.data.quiz_access;
            this.acces_pin = QuizAccess ? QuizAccess.acces_pin : null;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionDeleteQuiz(id) {
      this.$swal({
        title: "Apakah Anda Yakin akan Hapus Ujian ini ?",
        text: this.items.judul_quiz,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Tidak",
        confirmButtonText: "Ya, Hapus !"
      }).then(result => {
        if (result.value) {
          let data = {
            quiz_id: id
          };
          this.$axios
            .post("publisher-delete-quiz", data, { headers: { "x-access-token": this.token } })
            .then(response => {
              this.$notify({
                group: "foo",
                title: "Berhasil ",
                text: response.data.message
              });
              this.$router.push({
                path: "/p/quiz"
              });
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
        }
      });
    },
    actionGetPesertaQuiz(id) {
      const data = {
        id: id
      };
      this.$axios
        .post("publisher-report-quiz", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.dataPeserta = response.data.data;
          }
        })
        .catch(err => console.log(err));
    },
    actionDetailQuizPeserta(id, email) {
      this.$router.push({
        path: "/quiz/quiz-detail-peserta",
        query: { _id: id, email }
      });
    },
    actionDeleted(id) {
      const data = {
        quiz_id: this.quiz_id,
        soal_id: id
      };
      this.$axios
        .post(`soal-quiz/soal_id/${id}`, data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            text: response.data.message
          });

          this.actionGetDetail(this.quiz_id);
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            type: "error",
            text: "Ada Kesalahan di Server "
          });
        });
    },
    actionUpdated() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Edit Quiz Gagal.",
            text: "Pastikan telah mengisi form dengan benar."
          });
        } else if (success) {
          this.btn_loading = true;
          let data = {
            judul_quiz: this.items.judul_quiz,
            quiz_slug: this.items.judul_quiz.replace(/\s+/g, "-").toLowerCase(),
            category_quiz: this.items.category_quiz,
            type_quiz: this.items.type_quiz,
            penyelenggara: this.items.penyelenggara,
            is_premium: this.items.is_premium,
            is_private: this.items.is_private,
            start_date: this.start_date,
            end_date: this.end_date,
            type_start: this.items.type_start,
            times: this.items.times,
            end_times: this.items.end_times,
            durations: this.items.durations,
            publish: this.items.publish,
            durasi_soal: this.items.durasi_soal,
            description: this.items.description,
            metode_penilaian: this.items.metode_penilaian,
            waktu_pengerjaan: this.items.waktu_pengerjaan,
            pin: this.acces_pin
          };

          this.$axios
            .put(`publisher-quiz/${this.items._id}`, data, { headers: { "x-access-token": this.token } })
            .then(response => {
              if (response.data.success === "true") {
                this.$notify({
                  group: "foo",
                  type: "success",
                  title: "Success",
                  text: response.data.message
                });
              }
              this.$router.push({
                path: "/p/quiz"
              });
            })
            .catch(err => {
              console.log(err);
              this.btn_loading = true;
              this.$notify({
                group: "foo",
                type: "error",
                title: "Opss .. ",
                text: "Ada Kesalahan di Server"
              });
            });
        }
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showPin() {
      this.typeFiled = this.typeFiled === "password" ? "text" : "password";
    },
    formatDate(tgl) {
      return new Date(tgl).toString();
    },
    actionShowModal() {
      this.showModalImage = true;
    },
    async changeFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        const { files } = e.target;
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = d => {
          this.banner = d.target.result;
          this.Newbanner = files[0];
        };
      }
    },
    actionClearFile(e) {
      e.preventDefault();
      // document.getElementById('image').value = ''
      this.banner = null;
      this.Newbanner = null;
    },
    handleSubmit() {
      this.$refs.formBanner.validate().then(success => {
        if (!success) {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Oopss ..",
            text: "Ganti Banner Gagal"
          });
        } else {
          const FormQuiz = new FormData();
          FormQuiz.append("quiz_banner", this.Newbanner);
          FormQuiz.append("judul_quiz", this.items.judul_quiz);
          FormQuiz.append("quiz_id", this.quiz_id);
          this.$axios
            .post("publisher-update-banner-quiz", FormQuiz, { headers: { "x-access-token": this.token } })
            .then(response => {
              if (response.data.success === "true") {
                this.$notify({
                  group: "foo",
                  title: "Success",
                  text: " Upload Banner"
                });
              }
              this.showModalImage = false;
              this.banner = null;
              this.actionGetDetail(this.quiz_id);
            })
            .catch(err => {
              console.log(err);
              this.btn_loading = true;
              this.$notify({
                group: "foo",
                type: "error",
                title: "Opss .. ",
                text: "Ada Kesalahan di Server"
              });
            });
        }
      });
    },
    _formatPrice(value) {
      if (value) {
        const val = (value / 1).toFixed(0).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    }
  }
};
</script>

<style scoped>
img[lazy="loading"] {
  /*your style here*/
  background-color: rgb(165, 157, 157);
}
img[lazy="error"] {
  /*your style here*/
  background-color: rgb(144, 105, 105);
}
.tableFixHead {
  overflow-y: auto;
  height: 380px;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
  background-color: #b8daff;
}
.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}
.b-table-sticky-header {
  overflow-y: auto;
  max-height: 650px;
}
.field-icon {
  float: right;
  margin-left: -45px;
  margin-top: -25px;
  position: relative;
  z-index: 1;
}
.nav-tabs .nav-link.active:focus,
.nav-tabs .navbar .navbar .nav-tabs {
  background: #fff;
  border-color: #c2cfd6;
  border-bottom-color: #fff;
}
</style>
