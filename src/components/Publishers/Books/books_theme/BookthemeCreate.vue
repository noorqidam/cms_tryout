<template>
  <transition name="slide-fade">
    <div class="row mt-2 pt-1">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <form v-on:submit.prevent="_actionCreateModule">
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Module Name</label>
                <div class="col-sm-8">
                  <input type="text" v-model="Form.name" class="form-control form-control-sm" />
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Slug Module Name</label>
                <div class="col-sm-8 text-success">
                  <i>{{ reversedSlug }} </i>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm">Module Categories</label>
                <div class="col-sm-3">
                  <select v-model="Form.module_category_id" class="form-control form-control-sm">
                    <option value="0" disabled> -- Option -- </option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm">Module Types </label>
                <div class="col-sm-3">
                  <select v-model="Form.module_type" class="form-control form-control-sm" required>
                    <option value="0" disabled> -- Option -- </option>
                    <option value="PELAJAR"> PELAJAR </option>
                    <option value="UMUM"> UMUM </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Kelas </label>
                <div class="col-sm-3">
                  <select v-model="Form.kelas_id" class="form-control form-control-sm" required>
                    <option value="0" disabled> -- Option -- </option>
                    <option v-for="kelas in kelas" :key="kelas.id" :value="kelas.id">
                      {{ kelas.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Image </label>
                <div class="col-sm-3">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    class="form-control-file"
                    @change="_changeFile"
                    accept="application/jpeg|jpg"
                  />
                </div>
                <div class="col-sm-4" id="preview" v-if="!image">
                  <i> No Preview Image </i>
                </div>
                <div v-else class="col-sm-4">
                  <img :src="image" id="imgsc" class="img-thumbnail" alt="" />
                </div>
                <div class="col-sm-2" v-if="image">
                  <span class="btn btn-sm btn-danger" @click="_actionClearFile">
                    <i class="fa fa-times"></i>
                  </span>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-11">
                  <div class="col-sm-1 pull-right">
                    <span @click="_actionAddTheme" class="btn btn-sm btn-primary">
                      <span class="fa fa-plus"></span> Add Theme Modules
                    </span>
                  </div>
                </div>
              </div>
              <!-- Theme Form -->
              <div v-for="(i, j) in count_theme" :key="j">
                <div class="form-group row">
                  <label for="" class="col-sm-3 form-control-sm">Theme Name {{ i.no }} </label>
                  <div class="col-sm-8">
                    <input
                      type="text"
                      v-model="i.name"
                      class="form-control form-control-sm"
                      placeholder="theme name "
                    />
                  </div>
                  <label for="" class="col-sm-3 form-control-sm"> Semester </label>
                  <div class="col-sm-8">
                    <select v-model="i.semester" class="form-control">
                      <option value="0"> --Pilih --</option>
                      <option value="GANJIL"> GANJIL </option>
                      <option value="GENAP">GENAP</option>
                    </select>
                  </div>
                  <label for="" class="col-sm-3 form-control-sm"> Subjects </label>
                  <div class="col-sm-8">
                    <multiselect
                      v-model="i.matpel"
                      :options="matpels"
                      :multiple="false"
                      :close-on-select="false"
                      :clear-on-select="false"
                      :preserve-search="true"
                      placeholder="Pick some"
                      label="name"
                      track-by="name"
                      :preselect-first="true"
                    >
                      <template slot="selection" slot-scope="{ values, search, isOpen }"
                        ><span class="multiselect__single" v-if="values.length && !isOpen"
                          >{{ values.length }} options selected</span
                        ></template
                      >
                    </multiselect>
                  </div>
                  <div class="col-sm-1">
                    <span
                      @click="_DeleteCountTheme(j)"
                      class="btn btn-sm btn-danger btn-pill"
                      style="color:white"
                    >
                      <i class="fa fa-times"></i>
                    </span>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group row mt-1">
                      <div class="col-md-2 offset-3">
                        <span @click="_actionAddPaketSoal(j)" class="btn btn-sm btn-primary btn-pill">
                          <span class="fa fa-plus"></span> Add Paket Soal {{ j }}
                        </span>
                      </div>
                    </div>

                    <div v-for="(data, index) in count_theme[j].PaketSoal" :key="index" class="col-md-10">
                      <div class="form-group row offset-4">
                        <label for="" class="col-sm-3 form-control-sm"> Paket Soal Name {{ j }}</label>
                        <div class="col-sm-8">
                          <input
                            type="text"
                            v-model="data.name"
                            class="form-control form-control-sm"
                            placeholder="paket soal name "
                          />
                        </div>
                        <div class="col-md-1">
                          <span
                            @click="_DeleteCountPaketSoal(j, index)"
                            class="btn btn-danger btn-sm btn-pill"
                            style="color:white"
                          >
                            <i class="fa fa-times"></i>
                          </span>
                        </div>
                      </div>

                      <div class="form-group row offset-4">
                        <label for="" class="col-sm-3 form-control-sm"> Scoring </label>
                        <div class="col-sm-6">
                          <select v-model="data.scoring" class="form-control form-control-sm">
                            <option value="0"> -- Option -- </option>
                            <option value="DEFAULT"> DEFAULT </option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group row offset-4">
                        <label for="" class="col-sm-3 form-control-sm"> Free Trial </label>
                        <div class="col-sm-8">
                          <c-switch type="3d" variant="success" :checked="false" v-model="data.trial" />
                          <span v-if="data.trial"> Yes </span>
                          <span v-else> No </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Price </label>
                <div class="col-sm-4">
                  <input
                    type="number"
                    v-model="Form.price"
                    class="form-control form-control-sm"
                    placeholder="10000"
                    required
                  />
                  <i v-if="Form.price">
                    {{ formatPrice(Form.price) }}
                  </i>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Publisher </label>
                <div class="col-sm-3">
                  <select
                    v-model="Form.publisher_id"
                    class="form-control form-control-sm"
                    @change="_actionGetAuthor"
                  >
                    <option value="0" disabled> -- Option -- </option>
                    <option v-for="publisher in publishers" :key="publisher.id" :value="publisher.id">
                      {{ publisher.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Authors </label>
                <div class="col-sm-8">
                  <multiselect
                    v-model="Form.authors"
                    :options="authors"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :preserve-search="true"
                    placeholder="Pick some"
                    label="name"
                    track-by="name"
                    :preselect-first="true"
                  >
                    <template slot="selection" slot-scope="{ values, search, isOpen }"
                      ><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen"
                        >{{ values.length }} options selected</span
                      ></template
                    >
                  </multiselect>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-3 form-control-sm"> Descriptions </label>
                <div class="col-sm-8">
                  <quillEditor class="quill-editor" name="descriptions" v-model="Form.descriptions" />
                </div>
              </div>

              <div class="form-group row justify-content-center">
                <div class="col-md-3">
                  <button class="btn btn-sm btn-block btn-success"><i class="fa fa-save"></i> Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cSwitch from "../../Switch";
export default {
  name: "BookCreate",
  components: {
    cSwitch
  },
  data() {
    return {
      Form: {
        category_id: 0,
        publisher_id: 0,
        module_type: 0
      },
      Thema: [],
      PaketSoal: [],
      publishers: [],
      categories: [],
      matpels: [],
      kelas: [],
      authors: [],
      count_theme: [
        // {
        //   name:'',
        //   PaketSoal:[
        //     // { name :'tes'}
        //   ]
        // }
      ],
      count_paketSoal: [],
      image: ""
    };
  },
  mounted() {
    this._actionFetchPublisher();
    this._actionFetchModuleCategories();
    this._actionFetchMatpel();
    this._actionFetchKelas();
  },
  computed: {
    // a computed getter
    reversedSlug: function() {
      // `this` points to the vm instance
      if (this.Form.name) {
        let SlugName = this.Form.name.replace(/\s+/g, "-").toLowerCase();
        return SlugName;
      }

      return "";
    }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    _actionFetchModuleCategories() {
      this.$axios
        .get("categories")
        .then(response => {
          this.categories = response.data.data.rows;
          console.log(response.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionFetchPublisher() {
      this.$axios
        .get("publishers")
        .then(response => {
          this.publishers = response.data.data.rows;
          console.log(response.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionGetAuthor() {
      this.authors = [];
      this.Form.authors = [];
      this.$axios
        .get("authors/publisher/" + this.Form.publisher_id)
        .then(response => {
          this.authors = response.data.data.rows;
          console.log(response.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionFetchKelas() {
      this.$axios
        .get("kelas")
        .then(response => {
          this.kelas = response.data.data.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionFetchMatpel() {
      this.$axios
        .get("mata-pelajarans")
        .then(response => {
          this.matpels = response.data.data.rows;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionAddTheme() {
      this.count_theme.push({
        no: this.count_theme.length ? 1 : 1,
        name: "",
        PaketSoal: []
      });
    },
    _actionAddPaketSoal(i) {
      for (let index = 0; index < this.count_theme.length; index++) {
        if (i === index) {
          console.log("pas arr");
          this.count_theme[index].PaketSoal.push({
            name: "",
            scoring: "",
            trial: false
          });
        }
      }
    },
    _actionCreateModule() {
      this.Form.thema = this.count_theme;
      let ModuleData = new FormData();
      ModuleData.append("name", this.Form.name);
      ModuleData.append("module_slug", this.Form.name.replace(/\s+/g, "-").toLowerCase());
      ModuleData.append("categories", this.Form.module_category_id);
      ModuleData.append("authors", JSON.stringify(this.Form.authors));
      ModuleData.append("publisher_id", this.Form.publisher_id);
      ModuleData.append("module_type", this.Form.module_type);
      ModuleData.append("theme", JSON.stringify(this.count_theme));
      ModuleData.append("image", this.Form.image);
      ModuleData.append("price", this.Form.price);
      ModuleData.append("kelas", this.Form.kelas_id);
      ModuleData.append("description", this.Form.descriptions);
      console.log("authors " + JSON.stringify(this.Form.authors));
      console.log("theme " + JSON.stringify(this.Form.thema));
      this.$axios
        .post("books", ModuleData)
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              title: "Berhasil",
              text: response.data.message
            });
          }
          this.$router.push({
            path: "/p/books"
          });
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            title: "opps ..",
            text: err.response.data.message
          });
        });
    },
    _DeleteCountTheme(i) {
      this.count_theme.splice(i, 1);
    },
    _DeleteCountPaketSoal(j, i) {
      for (let index = j; index < this.count_theme.length; index++) {
        this.count_theme[index].PaketSoal.splice(i, 1);
      }
    },
    _changeFile(e) {
      var files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = e => {
        this.image = e.target.result;
        this.Form.image = files[0];
        console.log(files);
      };
    },
    _actionClearFile(e) {
      e.preventDefault();
      document.getElementById("image").value = "";
      this.image = "";
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
