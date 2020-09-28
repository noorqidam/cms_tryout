<template>
  <div class="col-md-12">
    <div>
      <b-modal v-model="showModalAlert" title="PERHATIAN!" ok-only centered>
        <p class="text-center">
          Edit Publisher Baru Gagal!
        </p>
        <p class="text-center">Pastikan sudah mengisi form tambah Publisher dengan benar.</p>
      </b-modal>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
        <h4>Edit Publisher</h4>
      </div>
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <ValidationObserver ref="form">
              <form @submit.prevent="_actionUpdate">
                <div class="form-group row">
                  <label for="badanUsaha" class="col-sm-2">
                    Badan Usaha <span class="text-danger">*</span>
                  </label>
                  <div class="col-sm">
                    <ValidationProvider rules="required" name="Badan Usaha" v-slot="{ errors }">
                      <select v-model="form.badan_usaha" class="form-control form-control-sm">
                        <option value="PENERBIT">Penerbit</option>
                        <option value="SEKOLAH">Sekolah</option>
                        <option value="KURSUS">Kursus</option>
                        <option value="BIMBEL">Bimbel</option>
                        <option value="UNIVERSITAS">Universitas</option>
                        <option value="PEMBICARA">Pembicara</option>
                        <option value="Lainnya">Lain-Lain</option>
                      </select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="nama" class="col-sm-2">Nama<span class="text-danger">*</span> </label>
                  <div class="col-sm">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input
                        v-model="form.name"
                        type="text"
                        name="Nama"
                        class="form-control form-control-sm"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="subNama" class="col-sm-2">
                    Subtitle Nama<span class="text-danger">*</span>
                  </label>
                  <div class="col-sm">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input
                        v-model="form.subtitle_name"
                        type="text"
                        name="Sub Nama"
                        class="form-control form-control-sm"
                      />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="email" class="col-sm-2">Email</label>
                  <div class="col-sm">
                    <input
                      v-model="form.email"
                      type="email"
                      name="Email"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="telepon" class="col-sm-2">Telepon</label>
                  <div class="col-sm">
                    <input
                      v-model="form.phone"
                      type="text"
                      name="Telepon"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="facebook" class="col-sm-2">Facebook</label>
                  <div class="col-sm">
                    <input
                      v-model="form.account_facebook"
                      type="text"
                      name="Facebook"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Instagram" class="col-sm-2">Instagram</label>
                  <div class="col-sm">
                    <input
                      v-model="form.account_instagram"
                      type="text"
                      name="Instagram"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="LinkedIn" class="col-sm-2">LinkedIn</label>
                  <div class="col-sm">
                    <input
                      v-model="form.account_linkedin"
                      type="text"
                      name="LinkedIn"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Twitter" class="col-sm-2">Twitter</label>
                  <div class="col-sm">
                    <input
                      v-model="form.account_twitter"
                      type="text"
                      name="Twitter"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Youtube" class="col-sm-2">Youtube</label>
                  <div class="col-sm">
                    <input
                      v-model="form.account_youtube"
                      type="text"
                      name="Youtube"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Alamat" class="col-sm-2">Alamat</label>
                  <div class="col-sm">
                    <textarea
                      id="alamat"
                      v-model="form.address"
                      cols="30"
                      rows="5"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Deskripsi" class="col-sm-2">Deskripsi</label>
                  <div class="col-sm">
                    <textarea
                      id="deskripsi"
                      v-model="form.description"
                      cols="30"
                      rows="5"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Logo" class="col-sm-2">Logo</label>
                  <div class="col-sm">
                    <input
                      id="logo"
                      type="file"
                      class="form-control form-control-sm"
                      style="font-size: 11px"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="KartuIdentitas" class="col-sm-2">Kartu Identitas</label>
                  <div class="col-sm">
                    <input
                      v-model="form.id_card"
                      type="text"
                      name="Kartu Identitas"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="NoKartu" class="col-sm-2">Nomor Kartu</label>
                  <div class="col-sm">
                    <input
                      v-model="form.id_card_number"
                      type="text"
                      name="Nomor Kartu"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="FotoKartu" class="col-sm-2">Foto Kartu</label>
                  <div class="col-sm">
                    <input
                      id="fotokartu"
                      type="file"
                      class="form-control form-control-sm"
                      style="font-size: 11px"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Sertifikat Domisili" class="col-sm-2">Sertifikat Domisili</label>
                  <div class="col-sm">
                    <input
                      v-model="form.certificate_domicile"
                      type="text"
                      name="Sertifikat Domisili"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="FotoSertifikat" class="col-sm-2">Foto Sertifikat</label>
                  <div class="col-sm">
                    <input
                      id="fotosertifikat"
                      type="file"
                      class="form-control form-control-sm"
                      style="font-size: 11px"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="SuratKeputusan" class="col-sm-2">Surat Keputusan</label>
                  <div class="col-sm">
                    <input
                      v-model="form.decree"
                      type="text"
                      name="Surat Keputusan"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="FotoSK" class="col-sm-2">Foto SK</label>
                  <div class="col-sm">
                    <input
                      id="fotosk"
                      type="file"
                      class="form-control form-control-sm"
                      style="font-size: 11px"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="Akta" class="col-sm-2">Akta</label>
                  <div class="col-sm">
                    <input v-model="form.deed" type="text" name="Akta" class="form-control form-control-sm" />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="FotoAkta" class="col-sm-2">Foto Akta</label>
                  <div class="col-sm">
                    <input
                      id="fotoakta"
                      type="file"
                      class="form-control form-control-sm"
                      style="font-size: 11px"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="NoNPWP" class="col-sm-2">Nomor NPWP</label>
                  <div class="col-sm">
                    <input
                      v-model="form.npwp_number"
                      type="text"
                      name="Nomor NPWP"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="FotoNPWP" class="col-sm-2">Foto NPWP</label>
                  <div class="col-sm">
                    <input
                      id="fotonpwp"
                      type="file"
                      class="form-control form-control-sm"
                      style="font-size: 11px"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="NoSKDP" class="col-sm-2">Nomor SKDP</label>
                  <div class="col-sm">
                    <input
                      v-model="form.skdp_number"
                      type="text"
                      name="Nomor SKDP"
                      class="form-control form-control-sm"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="FotoSKDP" class="col-sm-2">Foto SKDP`</label>
                  <div class="col-sm">
                    <input
                      id="fotoskdp"
                      type="file"
                      class="form-control form-control-sm"
                      style="font-size: 11px"
                    />
                  </div>
                </div>
                <div class="form-group row justify-content-center">
                  <div class="col-sm-3">
                    <button class="btn btn-block btn-primary" type="submit">
                      Edit
                    </button>
                  </div>
                  <div class="col-sm-3">
                    <router-link :to="{ path: '/publisher' }" class="btn btn-block btn-danger">
                      Kembali
                    </router-link>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPublisher",
  data() {
    return {
      token: null,
      form: {},
      id: null,
      showModalAlert: false
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.id = this.$route.params.id;
    this._actionGetPublisherByid(this.id);
  },
  methods: {
    _actionGetPublisherByid(id) {
      this.$axios
        .get(`publishers/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.form = responseData.data;
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

        const FormPublisher = this.form;
        this.$axios
          .put("publishers/" + this.id, FormPublisher, {
            headers: { "x-access-token": this.token }
          })
          .then(response => {
            if (response.data.success == "true") {
              this.$notify({
                group: "foo",
                title: "Edit Publishers Sukses ",
                text: response.data.message
              });
            }
            this.$router.push({
              path: "/publisher"
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
    }
  }
};
</script>

<style scoped></style>
