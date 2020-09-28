<template>
  <div class="row">
    <div class="col-md-12 text-right mb-2">
      <router-link
        :to="{
          path: '/p/category-ujian'
        }"
        class="btn btn-sm btn-info text-white"
      >
        <i class="fa fa-plus"></i> Tambah Kategori
      </router-link>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <ValidationObserver ref="form">
            <form @submit.prevent="actionCreate">
              <div class="form-group row">
                <label for="" class="col-sm-2"> Nama Ujian </label>
                <div class="col-md-9">
                  <ValidationProvider rules="required|min:10" v-slot="{ errors }">
                    <input v-model="Form.judul_ujian" type="text" name="Judul Ujian" class="form-control" />
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
                  <ValidationProvider
                    name="image"
                    rules="image|size:150|ext:jpeg,jpg,png"
                    ref="provider"
                    v-slot="{ errors }"
                  >
                    <input id="image" type="file" class="form-control-file" @change="changeFile" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
                <div v-if="!banner" id="preview" class="col-sm-4">
                  <i> No Preview Image </i>
                </div>
                <div v-else class="col-sm-4">
                  <img id="imgsc" :src="banner" class="img-thumbnail" alt="" />
                </div>
                <div v-if="banner" class="col-sm-2">
                  <span class="btn btn-sm btn-danger" @click="actionClearFile">
                    <i class="fa fa-times" />
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
                    <option value="">--Pilih --</option>
                    <option v-for="category in category_ujian" :value="category.title" :key="category.title">
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
                    v-model="Form.start_date"
                    locale="id"
                    class="mb-2"
                  />
                </div>
                <label for="" class="col-sm-2"> Tanggal Berakhir Quiz </label>
                <div class="col-sm-3" v-if="Form.type_ujian === 'MANDIRI'">
                  <b-form-datepicker id="end_date" v-model="Form.end_date" locale="id" class="mb-2" />
                </div>
                <div class="col-sm-3" v-else>
                  <b-form-datepicker id="end_date" v-model="Form.start_date" locale="id" class="mb-2" />
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-2"> Di mulai Pada Jam </label>
                <div class="col-sm-2">
                  <vue-timepicker v-model="Form.times"></vue-timepicker>
                </div>
                <label for="" class="col-sm-2"> Berakhir pada jam </label>
                <div class="col-sm-2">
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
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-2"> Berbayar </label>
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
                  <strong class="control-label"> {{ formatPrice(Form.price) }}</strong>
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
                  <input v-model="Form.pin" :type="typeFiled" class="form-control" />
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
              <!-- <div class="form-group row">
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
              </div> -->
              <div class="form-group row">
                <label for="" class="col-sm-2"> Keterangan </label>
                <div class="col-sm-5">
                  <!-- <textarea id="" v-model="Form.description" cols="30" rows="5" class="form-control" /> -->
                  <quill-editor v-model="Form.description" :options="editorOption" />
                </div>
              </div>
              <div class="form-group row justify-content-center">
                <div class="col-sm-3">
                  <button class="btn btn-block btn-primary">
                    Buat
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cswitch from "../../Switch.vue";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "CreateUjian",
  components: { cswitch, VueTimepicker },
  data() {
    return {
      Form: {
        is_premium: false,
        publish: false,
        is_private: false
      },
      publishers: [],
      banner: null,
      token: null,
      dragValue: null,
      tanggal_ujian: "",
      count_theme: [],
      typeFiled: "password",
      editorOption: {
        modules: {
          imageResize: true
        }
      },
      category_ujian: []
    };
  },
  mounted() {
    // const auth = sessionStorage.getItem('authorized');
    this.token = sessionStorage.getItem("session_token");
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
    actionGetPublishers() {
      this.$axios.get("publishers", { headers: { "x-access-token": this.token } }).then(response => {
        this.publishers = response.data.data.rows;
      });
    },
    actionCreate() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Membuat Ujian Gagal ",
            text: "Pastikan telah mengisi form dengan benar."
          });
        } else {
          const FormUjian = new FormData();
          const newJam = this.Form.times.HH + ":" + this.Form.times.mm;
          const newEndJam = this.Form.end_times.HH + ":" + this.Form.end_times.mm;
          FormUjian.append("judul_ujian", this.Form.judul_ujian);
          FormUjian.append("ujian_slug", this.Form.judul_ujian.replace(/\s+/g, "-").toLowerCase());
          FormUjian.append("category_ujian", this.Form.category_ujian);
          FormUjian.append("type_ujian", this.Form.type_ujian);
          FormUjian.append("is_premium", this.Form.is_premium);
          FormUjian.append("is_private", this.Form.is_private);
          FormUjian.append("ujian_banner", this.Form.banner);
          FormUjian.append("start_date", this.Form.start_date);
          if (this.Form.type_ujian === "MANDIRI") {
            FormUjian.append("end_date", this.Form.end_date);
          } else {
            FormUjian.append("end_date", this.Form.start_date);
          }

          FormUjian.append("times", newJam);
          FormUjian.append("end_times", newEndJam);
          FormUjian.append("durations", this.Form.durations);
          FormUjian.append("publish", this.Form.publish);
          FormUjian.append("durasi_soal", this.Form.durasi_soal ? this.Form.durasi_soal : 120);
          FormUjian.append("description", this.Form.description);
          FormUjian.append("metode_penilaian", this.Form.metode_penilaian);
          FormUjian.append("waktu_pengerjaan", this.Form.waktu_pengerjaan);
          if (this.Form.is_private) {
            FormUjian.append("pin", this.Form.pin);
          }
          if (this.Form.is_premium) {
            FormUjian.append("price", this.Form.price);
          }

          this.$axios
            .post("publisher-ujian", FormUjian, {
              headers: {
                "Content-Type": "multipart/form-data",
                path: "tryout/",
                "x-access-token": this.token
              }
            })
            .then(response => {
              if (response.data.success === "true") {
                this.$notify({
                  group: "foo",
                  title: "Success Add ",
                  text: response.data.message
                });
              }
              this.$router.push({
                path: "/p/ujian"
              });
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
      });
    },
    async changeFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        const { files } = e.target;
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = e => {
          this.banner = e.target.result;
          // eslint-disable-next-line prefer-destructuring
          this.Form.banner = files[0];
        };
      }
    },
    actionClearFile(e) {
      e.preventDefault();
      document.getElementById("image").value = "";
      this.banner = "";
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
    }
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
</style>
