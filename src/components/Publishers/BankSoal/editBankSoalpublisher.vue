<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <form class="form-horizontal" @submit.prevent="_actionUpdate">
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Soal Text </label>
              <div class="col-md-9">
                <quill-editor v-model="Form.soal_text" :options="editorOption" />
                <!-- <div id="editor0" style="max-height:200px;margin-botton:20px;overflow:auto"></div> -->
              </div>
            </div>
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Jenis Soal </label>
              <div class="col-md-3">
                <select v-model="Form.type_soal" class="form-control" required @change="actionAdd">
                  <option> -- Pilih -- </option>
                  <option value="PG"> Pilihan Ganda </option>
                  <option value="ESAY"> Esay </option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="showAdd">
              <label for="soal_text" class="col-sm-3">
                <span class="btn btn-sm btn-outline-primary" @click="_actionAddJawaban">
                  <i class="fa fa-plus" style="cursor:pointer" /> Jawaban
                </span>
              </label>
            </div>

            <div v-for="(j, i) in Jawaban" :key="i">
              <div class="form-group row">
                <label for="soal_text" class="col-sm-2"> Pilihan Jawaban {{ ++i }} </label>
                <div class="col-sm-1">
                  <i class="badge badge-danger" style="cursor:pointer" @click="_deleteJawaban(j)"> Hapus </i>
                </div>
                <div class="col-md-5">
                  <!-- <div :id="editor + ++i" style="max-height:200px;margin-botton:20px;overflow:auto"></div> -->
                  <quill-editor v-model="j.jawaban_text" :options="editorOption" />
                </div>
                <div class="col-sm-2">
                  jawaban Benar
                  <cswitch v-model="j.benar" type="default" variant="success" :pill="true" :checked="false" />
                </div>
                <div class="col-sm-auto">
                  Point
                </div>
                <div class="col-sm-1">
                  <input v-model="j.point" type="number" class="form-control" />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Kategori Soal </label>
              <div class="col-md-3">
                <select v-model="Form.category_id" class="form-control" required>
                  <option> -- Pilih -- </option>
                  <option value="UMUM">
                    UMUM
                  </option>
                  <option value="SD/MI">
                    SD/MI
                  </option>
                  <option value="SMP/MTs">
                    SMP/MTs
                  </option>
                  <option value="SMA/SEDERAJAT">
                    SMA/SEDERAJAT
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Matapelajaran </label>
              <div class="col-md-5">
                <select v-model="Form.matpel_id" class="form-control" required>
                  <option value="">
                    -- Pilih --
                  </option>
                  <option v-for="matpel in matapelajaran" :key="matpel.id" :value="matpel.name">
                    {{ matpel.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Bobot </label>
              <div class="col-md-3">
                <input v-model="Form.bobot" type="number" class="form-control" required />
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <div class="col-sm-3">
                <button class="btn btn-block btn-primary">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- <div class="col-md-4">
      <div v-html="Form.soal_text"></div>
    </div> -->
  </div>
</template>

<script>
import cswitch from "../../Switch";
import Quill from "quill";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);
export default {
  name: "EditBankSoalpublisher",
  components: { cswitch },
  data() {
    return {
      Form: {},
      Jawaban: [],
      editorOption: {
        modules: {
          imageResize: true
        }
      },
      matapelajaran: [],
      publishers: [],
      token: null,
      quill: null,
      id: null,
      showAdd: false
    };
  },
  mounted() {
    // const auth = sessionStorage.getItem("authorized");
    this.token = sessionStorage.getItem("session_token");
    const id = this.$route.query._id;
    this._actionGetSoalByid(id);
    this._actionGetMataPelajaran();
    this._actionGetKelas();
    this.id = id;
  },
  methods: {
    _actionGetSoalByid(id) {
      this.$axios
        .get(`publisher-banksoals/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.Form = response.data.data;
          this.Jawaban = response.data.data.jawabans;
          if (this.Form.type_soal === "PG") {
            this.showAdd = true;
          }
        });
    },
    _actionAddJawaban() {
      this.Jawaban.push({
        jawaban_text: null,
        jawaban_image: null,
        benar: false,
        point: 0
      });
    },
    _deleteJawaban(i) {
      this.Jawaban.splice(i, 1);
    },
    _actionGetMataPelajaran() {
      this.$axios.get("matapelajaran", { headers: { "x-access-token": this.token } }).then(response => {
        this.matapelajaran = response.data.data.rows;
      });
    },
    _actionGetKelas() {},
    _actionUpdate() {
      const data = {
        soal_text: this.Form.soal_text,
        category_id: this.Form.category_id,
        matpel_id: this.Form.matpel_id,
        publisher_id: this.Form.publisher_id,
        type_soal: this.Form.type_soal,
        publish: this.Form.publish,
        bobot: this.Form.bobot,
        jawabans: this.Jawaban
      };
      console.log(this.Jawaban);
      this.$axios
        .put(`publisher-create-banksoal/${this.id}`, data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              type: "success",
              title: "Success",
              text: response.data.message
            });
          }

          this.$router.push({
            path: "/p/banksoals"
          });
        })
        .catch(err => {
          console.log(JSON.stringify(err.response));
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opss .. ",
            text: `Ada Kesalahan di Server ${JSON.stringify(err.response)}`
          });
        });
    },
    actionAdd() {
      if (this.Form.type_soal === "PG") {
        this.showAdd = true;
      } else {
        this.showAdd = false;
        this.Jawaban = [];
      }
    }
  }
};
</script>

<style scoped></style>
