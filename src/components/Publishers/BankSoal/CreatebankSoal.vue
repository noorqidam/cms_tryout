<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <form class="form-horizontal" v-on:submit.prevent="_actionCreate">
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
                <select v-model="Form.type_soal" class="form-control" required @change="gettype">
                  <option> -- Pilih -- </option>
                  <option value="PG"> Pilihan Ganda </option>
                  <option value="ESAY"> Esay </option>
                </select>
              </div>
            </div>
            <div class="form-group row" v-if="showAdd">
              <label for="soal_text" class="col-sm-3">
                <span class="btn btn-sm btn-outline-primary" @click="_actionAddJawaban">
                  <i class="fa fa-plus" style="cursor:pointer"> </i> Jawaban
                </span>
              </label>
              <div class="col-sm-auto">
                <p>
                  Pilihan Jawaban : <span class="badge badge-info"> {{ Jawaban.length }}</span>
                </p>
              </div>
            </div>

            <div v-for="(j, i) in Jawaban" :key="i">
              <div class="form-group row">
                <label for="soal_text" class="col-sm-2"> Pilihan Jawaban {{ ++i }} </label>
                <div class="col-sm-1">
                  <i class="badge badge-danger" @click="_deleteJawaban(j)" style="cursor:pointer"> Hapus </i>
                </div>
                <div class="col-md-5">
                  <!-- <div :id="editor + ++i" style="max-height:200px;margin-botton:20px;overflow:auto"></div> -->
                  <quill-editor v-model="j.jawaban_text" :options="editorOption" />
                </div>
                <div class="col-sm-2">
                  jawaban Benar
                  <cswitch type="default" variant="success" :pill="true" :checked="false" v-model="j.benar" />
                </div>
                <div class="col-sm-auto">
                  Point
                </div>
                <div class="col-sm-1">
                  <input type="number" v-model="j.point" class="form-control" />
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Kategori Soal </label>
              <div class="col-md-3">
                <select v-model="Form.category_id" class="form-control" required @change="getSubCategories">
                  <option> -- Pilih -- </option>
                  <option value="UMUM"> UMUM </option>
                  <option value="SD/MI"> SD/MI </option>
                  <option value="SMP/MTs"> SMP/MTs </option>
                  <option value="SMA/SEDERAJAT"> SMA/SEDERAJAT </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Sub Kategori Soal </label>
              <div class="col-md-3">
                <select v-model="Form.sub_category_id" class="form-control" required>
                  <option> -- Pilih -- </option>
                  <option v-for="sub in subcategories" :key="sub.name" :value="sub.name">
                    {{ sub.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Matapelajaran </label>
              <div class="col-md-5">
                <select v-model="Form.matpel_id" class="form-control" required>
                  <option value=""> -- Pilih -- </option>
                  <option v-for="matpel in matapelajaran" :key="matpel.id" :value="matpel.name">
                    {{ matpel.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Bobot </label>
              <div class="col-md-3">
                <input type="number" v-model="Form.bobot" class="form-control" required />
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <div class="col-sm-3">
                <button class="btn btn-block btn-primary">Simpan</button>
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
  name: "CreateBankSoal",
  components: { cswitch },
  data() {
    return {
      Form: {},
      Jawaban: [],
      matapelajaran: [],
      publishers: [],
      token: null,
      quill: null,
      editorOption: {
        modules: {
          imageResize: true
        }
      },
      showAdd: false,
      subcategories: []
    };
  },
  mounted() {
    // const auth = sessionStorage.getItem("authorized");
    this.token = sessionStorage.getItem("session_token");
    this._actionGetMataPelajaran();
    //this._createQuil();
  },
  methods: {
    getSubCategories() {
      if (this.Form.category_id === "SD/MI") {
        this.subcategories = [
          { name: "1" },
          { name: "2" },
          { name: "3" },
          { name: "4" },
          { name: "5" },
          { name: "6" }
        ];
      } else if (this.Form.category_id === "SMP/MTs") {
        this.subcategories = [{ name: "7" }, { name: "8" }, { name: "9" }];
      } else if (this.Form.category_id === "SMA/SEDERAJAT") {
        this.subcategories = [{ name: "10" }, { name: "11" }, { name: "12" }];
      }
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
    _actionGetPublishers() {
      this.$axios.get("publishers", { headers: { "x-access-token": this.token } }).then(response => {
        this.publishers = response.data.data.rows;
      });
    },
    _actionGetMataPelajaran() {
      this.$axios.get("matapelajaran", { headers: { "x-access-token": this.token } }).then(response => {
        this.matapelajaran = response.data.data.rows;
      });
    },
    _actionGetKelas() {},
    _actionCreate() {
      // const justHtml = this.quill.root.innerHTML;
      const data = {
        soal_text: this.Form.soal_text,
        category_id: this.Form.category_id,
        sub_category_id: this.Form.sub_category_id,
        tag: this.Form.category_id + " " + this.Form.sub_category_id,
        matpel_id: this.Form.matpel_id,
        publisher_id: this.Form.publisher_id,
        publish: this.Form.is_publish,
        bobot: this.Form.bobot,
        type_soal: this.Form.type_soal,
        jawabans: JSON.stringify(this.Jawaban)
      };

      // let FormBankSoal = new FormData();
      // FormBankSoal.append('soal_text',justHtml);
      // FormBankSoal.append('category_id',this.Form.category_id);
      // FormBankSoal.append('matpel_id',this.Form.matpel_id);
      // FormBankSoal.append('publisher_id',this.Form.publisher_id);
      // FormBankSoal.append('publish',this.Form.is_publish);
      // FormBankSoal.append('bobot',this.Form.bobot);
      // FormBankSoal.append('jawabans',JSON.stringify(this.Jawaban));
      // console.log(FormBankSoal)
      this.$axios
        .post("publisher-create-banksoal", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              type: "success",
              title: "Success Add ",
              text: response.data.message
            });
          }

          this.Form = {};
          this.Jawaban = [];
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
    gettype() {
      if (this.Form.type_soal == "PG") {
        this.showAdd = true;
      } else {
        this.showAdd = false;
        this.Jawaban = [];
      }
    },
    _createQuil() {
      // const quill = new Quill("#editor0", {
      //   theme: "snow",
      //   modules: {
      //     imageResize: {
      //       displaySize: true
      //     },
      //     toolbar: [
      //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
      //       ["bold", "italic", "underline", "strike"],
      //       [{ color: [] }, { background: [] }],
      //       [{ align: [] }],
      //       ["link", "image"],
      //       ["clean"]
      //     ]
      //   }
      // });
      // this.quill = quill;
    }
  }
};
</script>

<style scoped></style>
