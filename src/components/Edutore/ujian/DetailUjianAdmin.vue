<template>
  <div class="row">
    <!-- Modal Banner Upload -->
    <div class="col-md-12">
      <b-modal v-model="showModalImage" hide-footer="" centered title="Upload Banner">
        <ValidationObserver ref="formBanner">
          <form @submit.prevent="handleSubmitUpdateBanner">
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
    <!-- End Modal Upload Banner -->
    <div class="col-md-12">
      <b-tabs content-class="mt-3" justified pills card>
        <b-tab title="Detail Ujian">
          <div class="col-md-12 text-right mb-2">
            <router-link
              :to="{
                path: '/category-ujian'
              }"
              class="btn btn-sm btn-info text-white"
            >
              <i class="fa fa-plus"></i> Tambah Kategori
            </router-link>
          </div>
          <div v-if="isLoadingEdit === false" class="row">
            <div>
              <b-modal v-model="showModalAlert" title="PERHATIAN!" ok-only centered>
                <p class="text-center">
                  Edit ujian gagal :(
                </p>
                <p class="text-center">Pastikan sudah mengisi form edit ujian dengan benar.</p>
              </b-modal>
            </div>
            <div class="col-md-12">
              <div class="">
                <div class="">
                  <ValidationObserver ref="form">
                    <form @submit.prevent="_actionUpdate">
                      <div class="form-group row">
                        <label for="" class="col-sm-2"> Nama Ujian </label>
                        <div class="col-md-9">
                          <ValidationProvider rules="required|min:10" v-slot="{ errors }">
                            <input
                              v-model="Form.judul_ujian"
                              type="text"
                              name="Judul Ujian"
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
                            v-if="Form.ujian_banner"
                            v-lazy.container="pathUjian + Form.ujian_banner"
                            :alt="Form.ujian_banner"
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
                        <label for="" class="col-sm-2"> Tipe Ujian </label>
                        <div class="col-sm-3">
                          <select v-model="Form.type_ujian" class="form-control">
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
                        <label for="" class="col-sm-2"> Kategori Ujian </label>
                        <div class="col-sm-2">
                          <select v-model="Form.category_ujian" class="form-control">
                            <option value="">
                              -- Pilih --
                            </option>
                            <option
                              v-for="category in category_ujian"
                              :key="category.id"
                              :value="category.title"
                            >
                              {{ category.title }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-sm-2"> Tanggal Mulai Quiz </label>
                        <div class="col-sm-3">
                          <b-form-datepicker
                            id="example-datepicker"
                            v-model="start_date"
                            locale="id"
                            class="mb-2"
                          />
                        </div>
                        <label for="" class="col-sm-2"> Tanggal Berakhir Quiz </label>
                        <div class="col-sm-3">
                          <b-form-datepicker id="end_date" v-model="end_date" locale="id" class="mb-2" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-sm-2"> Mulai dari Jam </label>
                        <div class="col-sm-2">
                          <!-- <input v-model="Form.times" type="time" class="form-control" /> -->
                          <vue-timepicker v-model="Form.times"></vue-timepicker>
                        </div>
                        <label for="" class="col-sm-2"> Berakhir Pada Jam </label>
                        <div class="col-sm-2">
                          <!-- <input v-model="Form.end_times" type="time" class="form-control" /> -->
                          <vue-timepicker v-model="Form.end_times"></vue-timepicker>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-sm-2"> Metode Penilaian </label>
                        <div class="col-sm-3">
                          <select v-model="Form.metode_penilaian" class="form-control" required>
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

                          <!-- <option value=""></option> -->
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-sm-2"> Penyelenggara Ujian </label>
                        <div class="col-sm-4">
                          <select v-model="Form.penyelenggara" class="form-control">
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
                        <label for="" class="col-sm-2"> Premium </label>
                        <div class="col-sm-5">
                          <cswitch
                            v-model="Form.is_premium"
                            type="default"
                            variant="success"
                            :pill="true"
                            :checked="false"
                          />
                        </div>
                      </div>
                      <div v-if="Form.is_premium" class="form-group row">
                        <label for="" class="col-sm-2"> Harga <small> (Rp)</small> </label>
                        <div class="col-sm-3">
                          <input v-model="Form.price" type="number" class="form-control" />
                        </div>
                        <div class="col-sm-2">
                          <strong class="control-label"> {{ _formatPrice(Form.price) }}</strong>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-sm-2"> Private </label>
                        <div class="col-sm-5">
                          <cswitch
                            v-model="Form.is_private"
                            type="default"
                            variant="success"
                            :pill="true"
                            :checked="false"
                          />
                        </div>
                      </div>

                      <div v-if="Form.is_private" class="form-group row">
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
                      <div v-if="JadwalUjian.length > 0" class="form-group row">
                        <label for="" class="col-sm-2"> Publish </label>
                        <div class="col-sm-5">
                          <cswitch
                            v-model="Form.publish"
                            type="default"
                            variant="success"
                            :pill="true"
                            :checked="false"
                          />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-sm-2"> Keterangan </label>
                        <div class="col-sm-5">
                          <!-- <textarea
                            id=""
                            v-model="Form.description"
                            cols="30"
                            rows="5"
                            class="form-control"
                          /> -->
                          <quill-editor v-model="Form.description" :options="editorOption" />
                        </div>
                      </div>
                      <div class="form-group row justify-content-center">
                        <div class="col-sm-3">
                          <button class="btn btn-block btn-primary">
                            Simpan
                          </button>
                        </div>
                      </div>
                    </form>
                  </ValidationObserver>
                  <div class="col-sm-12">
                    <div class="row justify-content-end">
                      <div class="col-sm-2">
                        <button class="btn btn-block btn-danger" @click="_actionDeleteUjian(ujian_id)">
                          <i class="fa fa-trash"></i> Hapus Ujian
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <h2>Loading....</h2>
          </div>
        </b-tab>
        <b-tab title="Sesi Ujian">
          <div class="row">
            <router-link
              :to="{
                path: '/ujian-add-soal',
                query: { ujian_id: ujian_id }
              }"
              class="btn btn-md btn-default float-right"
            >
              <i class="fa fa-plus" /> Tambah Sesi Ujian
            </router-link>
            <div class="col-md-12 pt-2">
              <b-list-group v-for="detail in details" :key="detail._id">
                <b-list-group-item
                  href="#"
                  class="flex-column align-items-start"
                  @click="actionShow(ujian_id, detail._id)"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">
                      {{ detail.sesi_ujian }}
                    </h5>
                    <hr />
                    <small> {{ formatDate(detail.createdAt) }} </small>
                  </div>
                  Total Soal <strong>{{ detail.soals.length }}</strong>
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
                :to="{ path: '/ujian/create-jadwal-sesi-ujian/' + ujian_id }"
                class="btn btn-sm btn-primary"
              >
                <i class="fa fa-pencil"></i> Buat Jadwal Ujian
              </router-link>
              <router-link
                v-else
                :to="{ path: '/ujian/edit-jadwal-sesi-ujian/' + ujian_id }"
                class="btn btn-sm btn-success text-white"
              >
                <i class="fa fa-pencil"></i> Edit Jadwal Ujian
              </router-link>
              <button
                v-if="JadwalUjian.length > 0"
                class="btn btn-md btn-danger ml-1"
                @click="_actionDeleteJadwal"
              >
                <i class="fa fa-trash"></i> Hapus Jadwal
              </button>
            </div>
            <div class="col-md-12 container mt-1 pt-1">
              <div class="card bg-primary">
                <div class="card-body">
                  <h1 class="h1">{{ ujian.judul_ujian }}</h1>
                </div>
              </div>
              <div class="row" v-for="j in JadwalUjian" :key="j._id">
                <div class="col-md-12">
                  <div class="timeline-item" :date-is="j.start_time">
                    <div class="card">
                      <div class="card-body">
                        <h3>{{ j.sesi_ujian }}</h3>
                        <br />
                        <label for="" class="mr-1"> Mulai Jam {{ j.start_time }}</label>
                        <label for=""> Durasi {{ j.duration }} <strong>Menit</strong> </label>
                      </div>
                    </div>
                  </div>
                </div>
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
  name: "DetailUjianAdmin",
  components: { cswitch, VueTimepicker },
  data: () => ({
    token: null,
    ujian_id: null,
    // state for edit ujian
    Form: {},
    publishers: [],
    banner: null,
    dragValue: null,
    tanggal_ujian: "",
    category_ujian: [],
    count_theme: [],
    acces_pin: null,
    typeFiled: "password",
    pathUjian: "https://storage.googleapis.com/edutore-cdn/tryout/",
    Newbanner: null,
    showModalImage: false,
    start_date: null,
    end_date: null,
    showModalAlert: false,
    isLoadingEdit: true,
    editorOption: {
      modules: {
        imageResize: true
      }
    },
    // end state for edit ujian
    // ------ //
    // state sesi ujian
    details: [],
    // end state sesi ujian
    // state for jadwal ujian
    JadwalUjian: [],
    ujian: {}
    // end state for jadwal ujian
  }),
  async mounted() {
    this.token = sessionStorage.getItem("session_token");
    const id = this.$route.params.ujian_id;
    this.ujian_id = id;
    await this._actionGetUjianByid(id);
    this._actionGetPublishers();
    this.actionGetCategoryUjian();
    this.actionGetSoalByUjianId(this.ujian_id);
    this._actionGetJadwalSesiUjian();
  },
  methods: {
    //   method for detail ujian
    actionGetCategoryUjian() {
      this.$axios
        .get("category-ujian", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.category_ujian = response.data.data.rows;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionGetPublishers() {
      this.$axios
        .get("publishers", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.publishers = response.data.data.rows;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    async _actionGetUjianByid(id) {
      this.isLoadingEdit = true;
      this.$axios
        .get(`ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.Form = responseData.data;
            this.start_date = new Date(responseData.data.start_date);
            this.end_date = new Date(responseData.data.end_date);
            const { ujian_access } = response.data;
            this.acces_pin = ujian_access ? ujian_access.acces_pin : null;
            this.isLoadingEdit = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionUpdate() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          this.showModalAlert = true;
          return;
        }
        let data = {
          judul_ujian: this.Form.judul_ujian,
          ujian_slug: this.Form.judul_ujian.replace(/\s+/g, "-").toLowerCase(),
          category_ujian: this.Form.category_ujian,
          type_ujian: this.Form.type_ujian,
          penyelenggara: this.Form.penyelenggara,
          is_premium: this.Form.is_premium,
          is_private: this.Form.is_private,
          ujian_banner: this.Form.ujian_banner,
          start_date: this.start_date,
          end_date: this.end_date,
          times: this.Form.times,
          end_times: this.Form.end_times,
          durations: this.Form.durations,
          publish: this.Form.publish,
          durasi_soal: this.Form.durasi_soal ? this.Form.durasi_soal : 120,
          description: this.Form.description,
          metode_penilaian: this.Form.metode_penilaian,
          waktu_pengerjaan: this.Form.waktu_pengerjaan,
          pin: this.acces_pin
        };
        this.$axios
          .put(`ujian/${this.ujian_id}`, data, {
            headers: { "x-access-token": this.token }
          })
          .then(response => {
            if (response.data.success == "true") {
              this.$notify({
                group: "foo",
                title: "Update Ujian Berhasil ",
                text: response.data.message
              });
            }
            this._actionGetUjianByid(this.Form._id);
            this.$router.push({
              path: "/ujian"
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
      });
    },
    _actionDeleteUjian(id) {
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
            .post("delete-ujian", data, { headers: { "x-access-token": this.token } })
            .then(response => {
              this.$notify({
                group: "foo",
                title: "Berhasil ",
                text: response.data.message
              });
              this.$router.push({
                path: "/ujian"
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
    async _changeFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        const { files } = e.target;
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
          this.banner = e.target.result;
          this.Newbanner = files[0];
        };
      }
    },
    actionShowModal() {
      this.showModalImage = true;
    },
    handleSubmitUpdateBanner() {
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
          FormUjian.append("judul_ujian", this.Form.judul_ujian);
          FormUjian.append("ujian_id", this.ujian_id);
          this.$axios
            .post("update-ujian-banner", FormUjian, { headers: { "x-access-token": this.token } })
            .then(response => {
              if (response.data.success == "true") {
                this.$notify({
                  group: "foo",
                  title: "Success",
                  text: "Upload Banner"
                });
              }
              this.showModalImage = false;
              this.banner = null;
              this._actionGetUjianByid(this.Form._id);
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
    _actionClearFile(e) {
      e.preventDefault();
      // document.getElementById("image").value = "";
      this.banner = "";
      this.Newbanner = null;
    },
    showPin() {
      this.typeFiled = this.typeFiled === "password" ? "text" : "password";
    },
    _formatPrice(value) {
      if (value) {
        const val = (value / 1).toFixed(0).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    },
    // end method detail ujian
    // method sesi ujian
    actionGetSoalByUjianId(id) {
      this.$axios
        .get(`soal-ujian/ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.details = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    actionShow(ujian_id, id) {
      this.$router.push({
        path: "/ujian/detail-sesi-ujian",
        query: { ujian_id, _id: id }
      });
    },
    formatDate(tgl) {
      return moment(tgl).format("dddd, MMMM Do YYYY");
    },
    // end method sesi ujian
    // method jadwal ujian
    _actionGetJadwalSesiUjian() {
      this.$axios
        .get("publisher-jadwal-ujian/" + this.ujian_id, { headers: { "x-access-token": this.token } })
        .then(response => {
          let objs = response.data.data.schedule;
          this.ujian = response.data.ujian;
          let FixData = objs.sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0));
          this.JadwalUjian = FixData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionDeleteJadwal() {
      let data = {
        ujian_id: this.ujian_id
      };
      this.$axios
        .post("publisher-hapus-jadwal-ujian", data, { headers: { "x-access-token": this.token } })
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
    // end method jadwal ujian
  }
};
</script>
<style scoped>
.field-icon {
  float: right;
  margin-left: -45px;
  margin-top: -25px;
  position: relative;
  z-index: 1;
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
