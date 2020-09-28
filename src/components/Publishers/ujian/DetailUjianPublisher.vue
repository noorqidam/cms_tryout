<template>
  <div class="row" style="color:black">
    <div class="col-md-12">
      <b-tabs content-class="mt-3" justified pills card>
        <b-tab title="Detail Ujian">
          <div class="row">
            <div class="col-sm-12">
              <b-modal v-model="showModalImage" hide-footer centered title="Upload Banner">
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
                        <img id="imgsc" :src="banner" class="img-thumbnail" alt />
                      </div>
                      <div v-if="banner" class="col-sm-2">
                        <span class="badge badge-danger btn btn-sm" @click="actionClearFile">x</span>
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
                <form @submit.prevent="actionUpdate">
                  <div class="form-group row">
                    <label for class="col-sm-2">Nama Ujian</label>
                    <div class="col-md-9">
                      <ValidationProvider rules="required|min:10" v-slot="{ errors }">
                        <input
                          v-model="ujian.judul_ujian"
                          type="text"
                          name="Judul Ujian"
                          class="form-control"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for class="col-sm-2">
                      Banner
                      <br />
                      <small class="text-secondary">* ukuran. 400x600</small>
                      <br />
                      <small class="text-secondary">* max. 150kb</small>
                    </label>
                    <div class="col-sm-3">
                      <img
                        v-if="ujian.ujian_banner"
                        v-lazy.container="pathUjian + ujian.ujian_banner"
                        :alt="ujian.ujian_banner"
                        class="img-thumbnail"
                      />
                    </div>
                    <div class="col-sm-auto">
                      <span class="fa fa-pencil" style="cursor:pointer" @click="actionShowModal"
                        >Ganti Banner</span
                      >
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for class="col-sm-2">Tipe Ujian</label>
                    <div class="col-sm-3">
                      <select v-model="ujian.type_ujian" class="form-control">
                        <option value>-- Pilih --</option>
                        <option value="MANDIRI">MANDIRI</option>
                        <option value="BERSAMA">BERSAMA</option>
                      </select>
                    </div>
                    <label for class="col-sm-2">Kategori Ujian</label>
                    <div class="col-sm-2">
                      <select v-model="ujian.category_ujian" class="form-control">
                        <option value>--Pilih --</option>
                        <option
                          v-for="category in category_ujian"
                          :value="category.title"
                          :key="category.title"
                          >{{ category.title }}</option
                        >
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for class="col-sm-2">Tanggal Mulai Quiz</label>
                    <div class="col-sm-3">
                      <b-form-datepicker
                        id="example-datepicker"
                        v-model="start_date"
                        locale="id"
                        class="mb-2"
                      />
                    </div>

                    <label for class="col-sm-2">Tanggal Berakhir Quiz</label>
                    <div class="col-sm-3">
                      <b-form-datepicker id="end_date" v-model="end_date" locale="id" class="mb-2" />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for class="col-sm-2">Di mulai Pada Jam</label>
                    <div class="col-sm-2">
                      <vue-timepicker v-model="ujian.times"></vue-timepicker>
                    </div>
                    <label for class="col-sm-2">Berakhir pada jam</label>
                    <div class="col-sm-2">
                      <vue-timepicker v-model="ujian.end_times"></vue-timepicker>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for class="col-sm-2">Metode Penilaian</label>
                    <div class="col-sm-3">
                      <select v-model="ujian.metode_penilaian" class="form-control" required>
                        <option value>-- PIlih --</option>
                        <option value="NORMAL">NORMAL</option>
                        <option value="UTBK">UTBK</option>
                        <option value="DINAMIS">DINAMIS</option>
                        <option value="BOBOT">BOBOT</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for class="col-sm-2">Berbayar</label>
                    <div class="col-sm-5">
                      <cswitch
                        v-model="ujian.is_premium"
                        type="default"
                        variant="success"
                        :pill="true"
                        :checked="false"
                      />
                    </div>
                  </div>
                  <div v-if="ujian.is_premium" class="form-group row">
                    <label for class="col-sm-2">
                      Harga
                      <small>(Rp)</small>
                    </label>
                    <div class="col-sm-3">
                      <input v-model="ujian.price" type="number" class="form-control" />
                    </div>
                    <div class="col-sm-2">
                      <strong class="control-label">{{ formatPrice(ujian.price) }}</strong>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for class="col-sm-2">Private</label>
                    <div class="col-sm-5">
                      <cswitch
                        v-model="ujian.is_private"
                        type="default"
                        variant="success"
                        :pill="true"
                        :checked="false"
                      />
                    </div>
                  </div>
                  <div v-if="ujian.is_private" class="form-group row">
                    <label for class="col-sm-2">Access PIN</label>
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
                  <div v-if="JadwalUjian.length > 0" class="form-group row">
                    <label for class="col-sm-2">Publish</label>
                    <div class="col-sm-5">
                      <cswitch
                        v-model="ujian.publish"
                        type="default"
                        variant="success"
                        :pill="true"
                        :checked="false"
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for class="col-sm-2">Keterangan</label>
                    <div class="col-sm-5">
                      <!-- <textarea id="" v-model="ujian.description" cols="30" rows="5" class="form-control" /> -->
                      <quill-editor v-model="ujian.description" :options="editorOption" />
                    </div>
                  </div>
                  <div class="form-group row justify-content-center">
                    <div class="col-sm-3">
                      <button class="btn btn-block btn-primary">Update</button>
                    </div>
                  </div>
                </form>
              </ValidationObserver>
            </div>
            <div class="col-sm-12">
              <div class="row justify-content-end">
                <div class="col-sm-2">
                  <button class="btn btn-block btn-danger" @click="_deleteUjian(ujian._id)">
                    <i class="fa fa-trash"></i> Hapus Ujian
                  </button>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Sesi Ujian" @click="actionGetSoalByUjianId">
          <div class="row">
            <router-link
              :to="{
                path: '/p/ujian/create-sesi-ujian',
                query: { ujian_id: ujian._id, judul_ujian: ujian.ujian_slug }
              }"
              class="btn btn-md btn-default"
            >
              <i class="fa fa-plus" /> Tambah Sesi Ujian
            </router-link>
            <!-- <router-link
              :to="{
                path: '/p/ujian/jadwal-sesi-ujian/' + ujian._id
              }"
              class="btn btn-md btn-info"
            >
              <i class="fa fa-print" /> Lihat Jadwal Ujian
            </router-link>-->
            <div class="col-md-12 pt-2">
              <b-list-group v-for="detail in details" :key="detail._id">
                <b-list-group-item
                  href="#"
                  class="flex-column align-items-start mt-2"
                  @click="actionShowDetailSesiUjian(detail._id)"
                >
                  {{ detail._id }}
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ detail.sesi_ujian }}</h5>
                    <hr />
                    <small>{{ formatDate(detail.createdAt) }}</small>
                  </div>
                  Total Soal
                  <strong>{{ detail.soals.length }}</strong>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </b-tab>
        <b-tab title="Jadwal Ujian">
          <div class="row">
            <div class="col-md-12">
              <router-link
                v-if="JadwalUjian.length < 1"
                :to="{ path: '/p/ujian/create-jadwal-sesi-ujian/' + ujian_id }"
                class="btn btn-sm btn-primary"
              >
                <i class="fa fa-pencil"></i> Buat Jadwal Ujian
              </router-link>
              <router-link
                v-else
                :to="{ path: '/p/ujian/edit-jadwal-sesi-ujian/' + ujian_id }"
                class="btn btn-sm btn-warning"
              >
                <i class="fa fa-pencil"></i> Ubah Jadwal Ujian
              </router-link>
              <button v-if="JadwalUjian.length > 0" class="btn btn-md btn-danger ml-1" @click="DeleteJadwal">
                <i class="fa fa-trash"></i> Hapus Jadwal
              </button>
            </div>
            <div class="col-md-12 container mt-1 pt-1">
              <div class="card bg-primary">
                <div class="card-body">
                  <h1 class="h1">{{ formUjian.judul_ujian }}</h1>
                </div>
              </div>
              <div class="row" v-for="j in JadwalUjian" :key="j._id">
                <div class="col-md-12">
                  <div class="timeline-item" :date-is="j.start_time">
                    <div class="card">
                      <div class="card-body">
                        <h3>{{ j.sesi_ujian }}</h3>
                        <br />
                        <label for class="mr-1">Mulai Jam {{ j.start_time }}</label>
                        <label for>
                          Durasi {{ j.duration }}
                          <strong>Menit</strong>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <!-- <b-tab title="Peserta" lazy @click="actionListen">
          <div class="row">
            <div class="col-md-12">
              <button class="btn btn-sm btn-default" @click="showModalPeserta">
                <i class="fa fa-plus" />
              </button>
              <b-modal v-model="modalPeserta" centered hide-footer="" title="Tambah Peserta Ujian">
                <form @submit.prevent="actionAddPeserta">
                  <input id="" v-model="FormPeserta.email" type="email" class="form-control" required />
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
              <b-table
                show-empty
                small
                sticky-header
                head-variant="dark"
                responsive
                :items="peserta"
                :fields="attrPeserta"
                :current-page="currentPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :busy="isBusy"
                @filtered="onFiltered"
              >
                <template v-slot:cell(No)="data">
                  {{ data.index + 1 }}
                </template>
                <template v-slot:cell(actions)="data">
                  <button class="btn btn-sm btn-danger" @click="actionDelete(data.item)">
                    <i class="fa fa-trash" />
                  </button>
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>
        <b-tab title="Report">
          <div class="row">
            <div class="col-md-12"></div>
          </div>
        </b-tab>-->
      </b-tabs>
    </div>
  </div>
</template>

<script>
import cswitch from "../../Switch.vue";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import moment from "moment";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "DetailUjianPublisher",
  components: { cswitch, VueTimepicker },
  data() {
    return {
      items: [],
      peserta: [],
      ujian: {},
      details: [],
      showCalendar: false,
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathUjian: "https://storage.googleapis.com/edutore-cdn/tryout/",
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      dragValue: null,
      range: {
        start: null,
        end: null
      },
      attrs: [
        {
          highlight: true,
          dates: [
            // { "start": "2019-11-27T17:00:00.000Z", "end": "2019-11-28T17:00:00.000Z" }
            // { start : null , end : new Date()}
          ]
        }
      ],
      sticky: true,
      attrPeserta: [
        "No",
        { key: "email", label: "Email", class: "text-left" },
        { key: "_id", label: "Nomor Registrasi", class: "text-left" },
        { key: "actions", label: "Actions" }
      ],
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      isBusy: false,
      filterOn: [],
      totalSoal: 0,
      modalPeserta: false,
      FormPeserta: {},
      start_date: null,
      end_date: null,
      showModalImage: false,
      banner: null,
      Newbanner: null,
      typeFiled: "password",
      acces_pin: null,
      ujian_id: null,
      formUjian: {},
      JadwalUjian: [],
      editorOption: {
        modules: {
          imageResize: true
        }
      },
      category_ujian: []
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => ({ text: f.label, value: f.key }));
    }
  },
  mounted() {
    const id = this.$route.query._id;
    this.ujian_id = id;
    this.token = sessionStorage.getItem("session_token");
    this.actionGetUjianByid(id);
    this.actionGetJadwalUjianById(id);
    this.actionGetCategoryUjian();
  },
  methods: {
    actionGetCategoryUjian() {
      this.$axios.get("category-ujian", { headers: { "x-access-token": this.token } }).then(response => {
        if (response.data.success == "true") {
          this.category_ujian = response.data.data.rows;
        }
      });
    },
    actionGetUjianByid(id) {
      this.$axios
        .get(`publisher-ujian/${id}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.ujian = responseData.data;
            this.start_date = new Date(responseData.data.start_date);
            this.end_date = new Date(responseData.data.end_date);
            let UjianAccess = response.data.ujian_access;
            this.acces_pin = UjianAccess ? UjianAccess.acces_pin : null;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    actionGetSoalByUjianId() {
      let id = this.$route.query._id;
      this.$axios
        .get(`publisher-soal-ujian/ujian/${id}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            console.log(response.data.data);
            this.items = responseData.data[0].soals;
            this.details = response.data.data;
            this.totalSoal = this.items.length;
            // this.totalRows = responseData.data.paginator.itemCount;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    actionListen() {
      this.$axios
        .get(`peserta-ujian/ujian_id/${this.ujian._id}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          this.peserta = response.data.data;
          // this.totalRowsPeserta = response.data
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    actionShowDetailSesiUjian(sesiId) {
      this.$router.push({
        path: "/p/ujian/sesi-ujian/" + this.ujian_id + "/" + sesiId
      });
    },
    showModalPeserta() {
      this.modalPeserta = true;
    },
    actionAddPeserta() {
      const data = {
        email: this.FormPeserta.email,
        ujian_id: this.ujian._id
      };
      this.$axios
        .post("peserta-ujian", data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          this.$notify({
            group: "foo",
            title: "Success Add ",
            text: response.data.message
          });
          this.actionListen();
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
    },
    actionDelete(item) {
      const data = {
        _id: item._id,
        ujian_id: item.ujian_id._id
      };
      this.$axios
        .post("peserta-ujian/remove-peserta", data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          this.$notify({
            group: "foo",
            text: response.data.message
          });
          this.actionListen();
        })
        .catch(() => {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Ada Kesalahan di Server "
          });
        });
    },
    formatDate(tgl) {
      return moment(tgl).format("dddd, MMMM Do YYYY");
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
    actionUpdate() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Edit Ujian Gagal",
            text: "Pastikan telah mengisi form dengan benar."
          });
        } else if (success) {
          this.btn_loading = true;
          let data = {
            judul_ujian: this.ujian.judul_ujian,
            ujian_slug: this.ujian.judul_ujian.replace(/\s+/g, "-").toLowerCase(),
            category_ujian: this.ujian.category_ujian,
            type_ujian: this.ujian.type_ujian,
            is_premium: this.ujian.is_premium,
            is_private: this.ujian.is_private,
            start_date: this.start_date,
            end_date: this.end_date,
            type_start: this.ujian.type_start,
            times: this.ujian.times,
            end_times: this.ujian.end_times,
            durations: this.ujian.durations,
            publish: this.ujian.publish,
            durasi_soal: this.ujian.durasi_soal,
            description: this.ujian.description,
            metode_penilaian: this.ujian.metode_penilaian,
            waktu_pengerjaan: this.ujian.waktu_pengerjaan,
            pin: this.acces_pin
          };

          this.$axios
            .put(`publisher-ujian/${this.ujian._id}`, data, {
              headers: { "x-access-token": this.token }
            })
            .then(response => {
              if (response.data.success === "true") {
                this.$notify({
                  group: "foo",
                  type: "success",
                  title: "Success",
                  text: response.data.message
                });
              }
              // this.actionGetUjianByid(this.ujian._id);
              this.$router.push({
                path: "/p/ujian"
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
          const FormUjian = new FormData();
          FormUjian.append("ujian_banner", this.Newbanner);
          FormUjian.append("judul_ujian", this.ujian.judul_ujian);
          FormUjian.append("ujian_id", this.ujian._id);
          this.$axios
            .post("publisher-update-banner-ujian", FormUjian, {
              headers: { "x-access-token": this.token }
            })
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
              this.actionGetUjianByid(this.ujian._id);
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
    showPin() {
      this.typeFiled = this.typeFiled === "password" ? "text" : "password";
    },
    formatPrice(value) {
      if (value) {
        const val = (value / 1).toFixed(0).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

      return "0";
    },
    _deleteUjian(id) {
      this.$swal({
        title: "Apakah Anda Yakin akan Hapus Ujian ini ?",
        text: this.ujian.judul_ujian,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Tidak",
        confirmButtonText: "Ya, Hapus !"
      }).then(result => {
        if (result.value) {
          let data = {
            ujian_id: id
          };
          this.$axios
            .post("publisher-delete-ujian", data, {
              headers: { "x-access-token": this.token }
            })
            .then(response => {
              this.$notify({
                group: "foo",
                title: "Berhasil ",
                text: response.data.message
              });
              this.$router.push({
                path: "/p/ujian"
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
    actionGetJadwalUjianById(id) {
      this.$axios
        .get(`publisher-jadwal-ujian/${id}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          let objs = response.data.data.schedule;
          this.formUjian = response.data.ujian;
          let FixData = objs.sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0));
          this.JadwalUjian = FixData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    DeleteJadwal() {
      let data = {
        ujian_id: this.ujian_id
      };
      this.$axios
        .post("publisher-hapus-jadwal-ujian", data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.$notify({
              group: "foo",
              title: "Berhasil hapus Jadwal ",
              text: response.data.message
            });
          }
          window.location.reload();
        })
        .catch(() => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opss .. ",
            text: "Ada Kesalahan di Server"
          });
        });
    }
  }
};
</script>
<style scoped>
.b-table-sticky-header {
  overflow-y: auto;
  max-height: 600px;
}
h5 {
  color: black;
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
.container {
  max-width: 1024px;
  width: 90%;
  margin: 0 auto;
}

.timeline-item {
  padding: 3em 2em 2em;
  position: relative;
  color: rgba(0, 0, 0, 0.7);
  border-left: 2px solid rgba(0, 0, 0, 0.3);
}
.timeline-item p {
  font-size: 1rem;
}
.timeline-item::before {
  content: attr(date-is);
  position: absolute;
  left: 2em;
  font-weight: bold;
  top: 1em;
  display: block;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 0.785rem;
}
.timeline-item::after {
  width: 10px;
  height: 10px;
  display: block;
  top: 1em;
  position: absolute;
  left: -7px;
  border-radius: 10px;
  content: "";
  border: 2px solid rgba(0, 0, 0, 0.3);
  background: white;
}
.timeline-item:last-child {
  -webkit-border-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(60%, rgba(0, 0, 0, 0.3)),
      to(rgba(0, 0, 0, 0))
    )
    1 100%;
  -webkit-border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0)) 1 100%;
  -o-border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0)) 1 100%;
  border-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(60%, rgba(0, 0, 0, 0.3)),
      to(rgba(0, 0, 0, 0))
    )
    1 100%;
  border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0)) 1 100%;
}
</style>
