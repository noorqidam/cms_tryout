<template>
  <div class="row">
    <div>
      <b-modal v-model="showModalAlert" title="PERHATIAN!" ok-only centered>
        <p class="text-center">
          Edit quiz gagal :(
        </p>
        <p class="text-center">Pastikan sudah mengisi form edit quiz dengan benar.</p>
      </b-modal>
    </div>
    <div class="col-md-12">
      <b-tabs content-class="mt-3" justified pills card>
        <b-tab title="Detail Quiz">
          <div class="col-md-12 text-right mb-2">
            <router-link
              :to="{
                path: '/category-quiz'
              }"
              class="btn btn-sm btn-info text-white"
            >
              <i class="fa fa-plus"></i> Tambah Kategori
            </router-link>
          </div>
          <div class="row">
            <div class="col-sm-12">
              <b-modal v-model="showModalImage" hide-footer="" centered title="Upload Banner">
                <ValidationObserver ref="formBanner">
                  <form ref="form" @submit.prevent="handleSubmit">
                    <div v-if="!banner" class="col-sm-12">
                      <ValidationProvider
                        name="image"
                        rules="image|size:150|ext:jpeg,jpg,png"
                        ref="provider"
                        v-slot="{ errors }"
                      >
                        <input id="upload" type="file" @change="_changeFile" class="form-control-file" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                    <div class="row justify">
                      <div v-if="banner" class="col-sm-6">
                        <img id="imgsc" :src="banner" class="img-thumbnail" alt="" />
                      </div>
                      <div v-if="banner" class="col-sm-2">
                        <span class="badge badge-danger btn btn-sm" @click="_actionClearFile"> x </span>
                      </div>
                    </div>
                    <div class="row justify-content-center mt-2">
                      <div class="col-sm-5">
                        <button type="submit" class="btn btn-block btn-primary">
                          <i class="fa fa-upload"></i> Upload
                        </button>
                      </div>
                    </div>
                  </form>
                </ValidationObserver>
              </b-modal>
            </div>
            <div class="col-md-12">
              <ValidationObserver ref="form">
                <form @submit.prevent="_actionUpdated">
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
                      Banner
                      <br />
                      <small class="text-secondary">* ukuran. 400x600</small>
                      <br />
                      <small class="text-secondary">* max. 150kb</small>
                    </label>
                    <div class="col-sm-3">
                      <img
                        v-if="items.quiz_banner"
                        :src="pathImagesBanner + items.quiz_banner"
                        :alt="items.quiz_banner"
                        srcset=""
                        class="img-thumbnail"
                      />
                    </div>
                    <div class="col-sm-auto">
                      <span class="fa fa-pencil" style="cursor:pointer" @click="_actionShowModal">
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
                      <!-- {{ _formatDate(items.start_date) }} -->
                    </div>
                    <label for="" class="col-sm-2"> Tanggal berakhir Quiz </label>
                    <div class="col-sm-4">
                      <b-form-datepicker id="end_date" v-model="start_date" locale="id" class="mb-2" />
                      <!-- {{ _formatDate(items.start_date) }} -->
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-2"> Dimulai pada Jam </label>
                    <div class="col-sm-2">
                      <vue-timepicker v-model="items.times"></vue-timepicker>
                    </div>
                    <label for="" class="col-sm-2"> Berakhir pada Jam </label>
                    <div class="col-sm-2">
                      <vue-timepicker v-model="items.end_times"></vue-timepicker>
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
                      <select v-model="items.penyelenggara" class="form-control">
                        <option value="">
                          -- Pilih --
                        </option>
                        <option v-for="publisher in publishers" :key="publisher.id">
                          {{ publisher.name }}
                        </option>
                      </select>
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
                  <div class="form-group row">
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
                    <label for="" class="col-sm-2"> Durasi Tampil Soal <small>* Detik</small> </label>
                    <div class="col-sm-2">
                      <input v-model="items.durasi_soal" type="number" class="form-control" />
                    </div>
                    <label for="" class="col-sm-2"> Durasi Pengerajaan Soal <small>* Detik</small> </label>
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
                        Simpan
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
                :to="{ path: '/bank-soal-quiz', query: { quiz_id: items._id } }"
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
                    <p v-html="data.item.soal_text"></p>
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
                  <b-button size="sm" class="btn-danger" @click="_actionDeleted(row.item._id)">
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
        <b-tab title="Peserta">
          <div class="row">
            <div class="col-md-12">
              <button class="btn btn-sm btn-default" @click="_showModalAddPeserta">
                <i class="fa fa-plus" />
              </button>
              <b-modal v-model="modalAddPeserta" centered hide-footer="" title="Tambah Peserta Quiz">
                <form @submit.prevent="_actionAddPesertaBerbayar">
                  <input id="" v-model="formPeserta.email" type="email" class="form-control" required />
                  <div class="row justify-content-center mt-2">
                    <div class="col-md-3">
                      <button class="btn btn-block btn-dark">
                        Tambah
                      </button>
                    </div>
                  </div>
                </form>
              </b-modal>
            </div>
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col-1">
                        No
                      </th>
                      <th scope="col">
                        Email
                      </th>
                      <th scope="col">
                        Nomor Registrasi
                      </th>
                      <th scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(pesertaQuizBerbayar, index) in dataPesertaBerbayar" :key="index">
                      <th>
                        {{ index + 1 }}
                      </th>
                      <td>{{ pesertaQuizBerbayar.email }}</td>
                      <td>{{ pesertaQuizBerbayar._id }}</td>
                      <td>
                        <button
                          class="btn btn-sm btn-danger"
                          @click="_actionDeletePeserta(pesertaQuizBerbayar)"
                        >
                          <i class="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import cswitch from "../../Switch";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import moment from "moment";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);

export default {
  name: "DetailQuiz",
  components: { cswitch, VueTimepicker },
  data() {
    return {
      items: {},
      soals: [],
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      pathImagesBanner: "https://storage.googleapis.com/edutore-cdn/tryout/",
      attribute: [
        "No",
        { key: "soal", label: "Soal text", sortable: true, sortDirection: "desc" },
        { key: "images", label: "Soal Image", sortable: true, class: "text-center" },
        {
          key: "type_soal",
          label: "Tipe Soal",
          sortable: true,
          class: "text-center"
        },
        { key: "category_id", label: "Kategory", sortable: true, class: "text-center" },
        { key: "matpel_id", label: "Mata pelajaran", sortable: true, class: "text-center" },
        { key: "publisher_id", label: "Publisher", sortable: true, class: "text-center" },
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
      dataPesertaBerbayar: [],
      formPeserta: {},
      modalAddPeserta: false,
      showModalAlert: false,
      editorOption: {
        modules: {
          imageResize: true
        }
      }
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.query._id;
    this.quiz_id = id;
    this._actionGetDetail(id);
    this._actionGetPublishers();
    this._actionGetCategoryQuiz();
    this._actionGetPesertaBerbayar();
  },
  methods: {
    _actionGetPublishers() {
      this.$axios.get("publishers", { headers: { "x-access-token": this.token } }).then(response => {
        this.publishers = response.data.data.rows;
      });
    },
    _actionGetCategoryQuiz() {
      this.$axios.get("category-quiz", { headers: { "x-access-token": this.token } }).then(response => {
        this.category_quiz = response.data.data.rows;
      });
    },
    _actionGetDetail(id) {
      this.$axios
        .get("quiz/" + id, { headers: { "x-access-token": this.token } })
        .then(response => {
          console.log(response.data);
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.start_date = moment(this.items.start_date).format("YYYY-MM-DD");
            this.end_date = moment(this.items.end_date).format("YYYY-MM-DD");
            this.soals = response.data.soal ? response.data.soal.soals : [];
            let quiz_access = response.data.quiz_access;
            this.acces_pin = quiz_access ? quiz_access.acces_pin : null;
            console.log(quiz_access);
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    // Function Peserta
    _showModalAddPeserta() {
      this.modalAddPeserta = true;
    },
    _actionGetPesertaBerbayar() {
      this.$axios
        .get("peserta-quiz/quiz_id/" + this.quiz_id, { headers: { "x-access-token": this.token } })
        .then(response => {
          const dataPesertaBerbayar = response.data;
          if (dataPesertaBerbayar.success === "true") {
            this.dataPesertaBerbayar = dataPesertaBerbayar.data;
          }
        })
        .catch(err => console.log(err));
    },
    _actionDeletePeserta(item) {
      let data = {
        _id: item._id,
        quiz_id: item.quiz_id._id
      };
      this.$axios
        .post("peserta-quiz/remove-peserta", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            text: response.data.message
          });
          this._actionGetPesertaBerbayar();
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Ada Kesalahan di Server"
          });
          console.log(err);
        });
    },
    _actionAddPesertaBerbayar() {
      let data = {
        quiz_id: this.quiz_id,
        email: this.formPeserta.email
      };
      this.$axios
        .post("peserta-quiz", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            text: response.data.message
          });
          this.modalAddPeserta = false;
          this.formPeserta = {};
          this._actionGetPesertaBerbayar();
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Add New Peserta Quiz Failed"
          });
          console.log(err);
        });
    },
    // End Function Peserta
    _actionDeleted(id) {
      let data = {
        quiz_id: this.quiz_id,
        soal_id: id
      };
      this.$axios
        .post("soal-quiz/soal_id/" + id, data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            text: response.data.message
          });

          this._actionGetDetail(this.quiz_id);
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
    _actionUpdated() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          this.showModalAlert = true;
          console.log(data);
          return;
        }
        this.btn_loading = true;
        let data = {
          judul_quiz: this.items.judul_quiz,
          quiz_slug: this.items.judul_quiz.replace(/\s+/g, "-").toLowerCase(),
          category_quiz: this.items.category_quiz,
          type_quiz: this.items.type_quiz,
          penyelenggara: this.items.penyelenggara,
          is_premium: this.items.is_premium,
          is_private: this.items.is_private,
          quiz_banner: this.items.quiz_banner,
          start_date: this.start_date,
          end_date: this.start_date,
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
          .put("quiz/" + this.quiz_id, data, { headers: { "x-access-token": this.token } })
          .then(response => {
            if (response.data.success == "true") {
              this.$notify({
                group: "foo",
                title: "Success Add ",
                text: response.data.message
              });
            }
            console.log(response.data.data);
            this.$router.push({
              path: "/quiz"
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
            .post("delete-quiz", data, { headers: { "x-access-token": this.token } })
            .then(response => {
              this.$notify({
                group: "foo",
                title: "Berhasil ",
                text: response.data.message
              });
              this.$router.push({
                path: "/quiz"
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showPin() {
      this.typeFiled = this.typeFiled === "password" ? "text" : "password";
    },
    _formatDate(tgl) {
      return new Date(tgl).toString();
    },
    _actionShowModal() {
      this.showModalImage = true;
    },
    async _changeFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        var files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
          this.banner = e.target.result;
          this.Newbanner = files[0];
        };
      }
    },
    _actionClearFile(e) {
      e.preventDefault();
      // document.getElementById("upload").value = "";
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
          FormQuiz.append("quiz_id", this.items._id);
          this.$axios
            .post("update-quiz-banner", FormQuiz, { headers: { "x-access-token": this.token } })
            .then(response => {
              if (response.data.success == "true") {
                this.$notify({
                  group: "foo",
                  title: "Success",
                  text: "Upload Banner"
                });
              }
              (this.showModalImage = false), (this.banner = null);
              this._actionGetDetail(this.items._id);
            })
            .catch(err => {
              console.log(err);
              this.btn_loading = true;
              this.$notify({
                group: "foo",
                type: "error",
                title: "Opss ..",
                text: "Ada Kesalahan di Server"
              });
            });
        }
      });
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
