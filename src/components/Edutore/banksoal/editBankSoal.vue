<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <form class="form-horizontal" @submit.prevent="actionUpdate">
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Soal Text </label>
              <div class="col-md-9">
                <quill-editor v-model="Form.soal_text" :options="editorOption" />
              </div>
            </div>
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3">
                <span class="btn btn-sm btn-outline-primary" @click="actionAddJawaban">
                  <i class="fa fa-plus" style="cursor:pointer" /> Jawaban
                </span>
              </label>
            </div>

            <div v-for="(j, i) in Jawaban" :key="i">
              <div class="form-group row">
                <label for="soal_text" class="col-sm-2"> Pilihan Jawaban {{ ++i }} </label>
                <div class="col-sm-1">
                  <i class="badge badge-danger" style="cursor:pointer" @click="deleteJawaban(j)"> Hapus </i>
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
              <label for="soal_text" class="col-sm-3"> Jenis Soal </label>
              <div class="col-md-3">
                <select v-model="Form.type_soal" class="form-control" required>
                  <option> -- Pilih -- </option>
                  <option value="PG"> Pilihan Ganda </option>
                  <option value="ESAY"> Esay </option>
                </select>
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
              <label for="soal_text" class="col-sm-3"> Publisher </label>
              <div class="col-md-3">
                <select v-model="Form.publisher_id" class="form-control" required>
                  <option value="">
                    -- Pilih --
                  </option>
                  <option v-for="publisher in publishers" :key="publisher.id" :value="publisher.name">
                    {{ publisher.name }}
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
            <div class="form-group row">
              <label for="soal_text" class="col-sm-3"> Publish </label>
              <div class="col-md-2">
                <cswitch
                  v-model="Form.publish"
                  type="default"
                  variant="success"
                  :pill="true"
                  :checked="false"
                />
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
  </div>
</template>

<script>
import cswitch from "../../Switch.vue";
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
      editorOption: {
        modules: {
          imageResize: true
        }
      },
      matapelajaran: [],
      publishers: [],
      token: null,
      quill: null,
      id: null
    };
  },
  mounted() {
    const id = this.$route.query._id;
    this.token = sessionStorage.getItem("session_token");
    this.actionGetPublishers();
    this.actionGetMataPelajaran();
    this.actionGetSoalByid(id);
    // this.createQuil();
    this.id = id;
  },
  methods: {
    actionGetSoalByid(id) {
      this.$axios.get(`banksoal/${id}`, { headers: { "x-access-token": this.token } }).then(response => {
        this.Form = response.data.data;
        this.Jawaban = response.data.data.jawabans;
      });
    },
    actionAddJawaban() {
      this.Jawaban.push({
        jawaban_text: null,
        jawaban_image: null,
        benar: false,
        point: 0
      });
    },
    deleteJawaban(i) {
      this.Jawaban.splice(i, 1);
    },
    actionGetPublishers() {
      this.$axios.get("publishers", { headers: { "x-access-token": this.token } }).then(response => {
        this.publishers = response.data.data.rows;
      });
    },
    actionGetMataPelajaran() {
      this.$axios.get("matapelajaran", { headers: { "x-access-token": this.token } }).then(response => {
        this.matapelajaran = response.data.data.rows;
      });
    },
    _actionGetKelas() {},
    actionUpdate() {
      const data = {
        soal_text: this.Form.soal_text,
        category_id: this.Form.category_id,
        matpel_id: this.Form.matpel_id,
        publisher_id: this.Form.publisher_id,
        publish: this.Form.publish,
        bobot: this.Form.bobot,
        jawabans: JSON.stringify(this.Jawaban)
      };
      this.$axios
        .put(`create-banks-soal/${this.id}`, data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              title: "Success Add ",
              text: response.data.message
            });
          }
          this.$router.push({
            path: "/banksoals"
          });
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opss .. ",
            text: `Ada Kesalahan di Server ${JSON.stringify(err.response)}`
          });
        });
    }
    // createQuil() {
    //   const quill = new Quill("#editor0", {
    //     theme: "snow",
    //     modules: {
    //       imageResize: {
    //         displaySize: true
    //       },
    //       toolbar: [
    //         [{ header: [1, 2, 3, 4, 5, 6, false] }],
    //         ["bold", "italic", "underline", "strike"],
    //         [{ color: [] }, { background: [] }],
    //         [{ align: [] }],
    //         ["link", "image"],

    //         ["clean"]
    //       ]
    //     }
    //   });
    //   this.quill = quill;
    // }
  }
};
</script>

<style scoped></style>
