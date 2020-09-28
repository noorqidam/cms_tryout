<template>
  <div class="row">
    <div>
      <b-modal v-model="showModalAlert" title="PERHATIAN!" ok-only centered>
        <p class="text-center">
          Membuat quiz baru gagal :(
        </p>
        <p class="text-center">Pastikan sudah mengisi form membuat quiz dengan benar.</p>
      </b-modal>
    </div>
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
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <ValidationObserver ref="form">
            <form @submit.prevent="actionCreate">
              <div class="form-group row">
                <label for="" class="col-sm-2"> Judul Quiz </label>
                <div class="col-md-9">
                  <ValidationProvider rules="required|min:10" v-slot="{ errors }">
                    <input v-model="Form.judul_quiz" type="text" name="Judul Quiz" class="form-control" />
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
                    <input id="image" type="file" @change="changeFile" class="form-control-file" />
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
                  <span class="btn btn-sm btn-danger" style="cursor:pointer" @click="actionClearFile">
                    <i class="fa fa-times" />
                  </span>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-2"> Tipe Quiz </label>
                <div class="col-sm-3">
                  <select v-model="Form.type_quiz" class="form-control" required>
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
                  <select v-model="Form.category_quiz" class="form-control" required>
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
                <div class="col-sm-3">
                  <b-form-datepicker
                    id="example-datepicker"
                    v-model="Form.start_date"
                    locale="id"
                    class="mb-2"
                  />
                </div>
                <label for="" class="col-sm-2"> Tanggal Berakhir Quiz </label>
                <div class="col-sm-3">
                  <b-form-datepicker id="end_date" v-model="Form.start_date" locale="id" class="mb-2" />
                </div>
              </div>
              <div class="form-group row" />
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
                <label for="" class="col-sm-2"> Tipe Start </label>
                <div class="col-sm-2">
                  <select v-model="Form.type_start" class="form-control" required>
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
                <div class="col-sm-2">
                  <select v-model="Form.metode_penilaian" class="form-control">
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
                    @click="showPin"
                  />
                  <span v-else class="fa fa-fw fa-eye-slash field-icon toggle-password" @click="showPin" />
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-2"> Durasi Tampil Soal <small>* Detik</small> </label>
                <div class="col-sm-2">
                  <input v-model="Form.durasi_soal" type="number" class="form-control" />
                </div>
                <label for="" class="col-sm-2"> Durasi Pengerajaan Soal <small>* Detik</small> </label>
                <div class="col-sm-2">
                  <input v-model="Form.waktu_pengerjaan" type="number" class="form-control" />
                </div>
              </div>
              <div class="form-group row">
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
                  <!-- <textarea id="" v-model="Form.description" cols="30" rows="5" class="form-control" /> -->
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
  name: "CreateQuiz",
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
      range: {
        start: new Date(),
        end: new Date()
      },
      tanggal_quiz: new Date(),
      category_quiz: [],
      typeFiled: "password",
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
    this.actionGetPublishers();
    this.actionGetCategoryQuiz();
  },
  methods: {
    actionGetCategoryQuiz() {
      this.$axios.get("category-quiz", { headers: { "x-access-token": this.token } }).then(response => {
        this.category_quiz = response.data.data.rows;
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
          this.showModalAlert = true;
          return;
        }
        const FormQuiz = new FormData();
        const newJam = this.Form.times.HH + ":" + this.Form.times.mm;
        const newEndJam = this.Form.end_times.HH + ":" + this.Form.end_times.mm;
        FormQuiz.append("judul_quiz", this.Form.judul_quiz);
        FormQuiz.append("quiz_slug", this.Form.judul_quiz.replace(/\s+/g, "-").toLowerCase());
        FormQuiz.append("category_quiz", this.Form.category_quiz);
        FormQuiz.append("type_quiz", this.Form.type_quiz);
        FormQuiz.append("penyelenggara", this.Form.penyelenggara);
        FormQuiz.append("is_premium", this.Form.is_premium);
        FormQuiz.append("quiz_banner", this.Form.banner);
        FormQuiz.append("start_date", this.Form.start_date);
        FormQuiz.append("end_date", this.Form.start_date);
        FormQuiz.append("type_start", this.Form.type_start);
        FormQuiz.append("times", newJam);
        FormQuiz.append("end_times", newEndJam);
        FormQuiz.append("durations", this.Form.durations);
        FormQuiz.append("publish", this.Form.publish);
        FormQuiz.append("durasi_soal", this.Form.durasi_soal);
        FormQuiz.append("description", this.Form.description);
        FormQuiz.append("metode_penilaian", this.Form.metode_penilaian);
        FormQuiz.append("waktu_pengerjaan", this.Form.waktu_pengerjaan);
        if (this.Form.is_private) {
          FormQuiz.append("pin", this.Form.pin);
        }
        if (this.Form.is_premium) {
          FormQuiz.append("price", this.Form.price);
        }

        this.$axios
          .post("quiz", FormQuiz, { headers: { "x-access-token": this.token } })
          .then(response => {
            if (response.data.success === "true") {
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
          .catch(() => {
            this.$notify({
              group: "foo",
              type: "error",
              title: "Opss .. ",
              text: "Ada Kesalahan di Server"
            });
          });
      });
    },
    async changeFile(e) {
      const { valid } = await this.$refs.provider.validate(e);
      if (valid) {
        const { files } = e.target;
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = d => {
          this.banner = d.target.result;
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
