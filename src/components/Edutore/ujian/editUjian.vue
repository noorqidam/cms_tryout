<template>
  <div class="row">
    <div>
      <b-modal v-model="showModalAlert" title="PERHATIAN!" ok-only centered>
        <p class="text-center">
          Edit ujian gagal :(
        </p>
        <p class="text-center">Pastikan sudah mengisi form edit ujian dengan benar.</p>
      </b-modal>
    </div>
    <div class="col-sm-12">
      <b-modal v-model="showModalImage" hide-footer="" centered title="Upload Banner">
        <form ref="form" @submit.prevent="handleSubmit">
          <div v-if="!banner" class="col-sm-12">
            <ValidationProvider
              name="image"
              rules="image|size:2000|ext:jpeg,jpg,png"
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
              <button class="btn btn-block btn-primary"><i class="fa fa-upload"></i> Upload</button>
            </div>
          </div>
        </form>
      </b-modal>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <ValidationObserver ref="form">
            <form @submit.prevent="_actionUpdate">
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
                <label for="" class="col-sm-2"> Banner </label>
                <div class="col-sm-4">
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
                    <option v-for="category in category_ujian" :key="category.id" :value="category.title">
                      {{ category.title }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-2"> Tanggal Mulai Quiz </label>
                <div class="col-sm-3">
                  <b-form-datepicker id="example-datepicker" v-model="start_date" locale="id" class="mb-2" />
                </div>
                <label for="" class="col-sm-2"> Tanggal Berakhir Quiz </label>
                <div class="col-sm-3">
                  <b-form-datepicker id="end_date" v-model="start_date" locale="id" class="mb-2" />
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
                  <textarea id="" v-model="Form.description" cols="30" rows="5" class="form-control" />
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
import cswitch from "../../Switch";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";

export default {
  name: "EditUjian",
  components: { cswitch, VueTimepicker },
  data() {
    return {
      Form: {},
      publishers: [],
      banner: null,
      token: null,
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
      showModalAlert: false
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetPublishers();
    const id = this.$route.query.ujian_id;
    this.ujian_id = id;
    this.token = sessionStorage.getItem("session_token");
    this._actionGetUjianByid(id);
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
    _actionGetUjianByid(id) {
      this.$axios
        .get(`ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          console.log(response.data);
          const responseData = response.data;
          if (response.data.success === "true") {
            this.Form = responseData.data;
            this.start_date = new Date(responseData.data.start_date);
            this.end_date = new Date(responseData.data.end_date);
            const { ujian_access } = response.data;
            this.acces_pin = ujian_access ? ujian_access.acces_pin : null;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionGetPublishers() {
      this.$axios.get("publishers", { headers: { "x-access-token": this.token } }).then(response => {
        this.publishers = response.data.data.rows;
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
          end_date: this.start_date,
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
                title: "Success Add ",
                text: response.data.message
              });
            }
            this._actionGetUjianByid(this.Form._id);
            this.$router.push({
              path: "/ujian/ujian-detail",
              query: { _id: this.ujian_id }
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
    handleSubmit() {
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
