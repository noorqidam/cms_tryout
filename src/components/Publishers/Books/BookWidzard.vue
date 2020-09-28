<template>
  <form-wizard
    @on-complete="_actionSaveModules"
    color="#3498db"
    title="Form Package Subscription"
    subtitle=""
    stepSize="xs"
  >
    <tab-content title="Subscription identification" icon="fa fa-play" :before-change="beforeTabSwitch">
      <div class="card">
        <div class="card-header bg-primary"></div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-12">
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
              <div class="form-group row">
                <label for="" class="col-sm-3"> Publish </label>
                <div class="col-sm-3">
                  <cswitch
                    type="default"
                    variant="success"
                    :pill="true"
                    :checked="false"
                    v-model="Form.publish"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </tab-content>

    <tab-content title="Module" icon="fa fa-book">
      <transition name="slide-fade">
        <div class="card">
          <div class="card-header bg-primary"></div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12"></div>
            </div>
          </div>
        </div>
      </transition>
    </tab-content>

    <tab-content title="Price" icon="fa fa-dollar">
      <transition name="slide-fade"> </transition>
    </tab-content>

    <tab-content title="Review" icon="fa fa-print" :before-change="_actionConfirm">
      <transition name="slide-fade">
        <div class="card">
          <div class="card-header bg-primary"></div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12"></div>
            </div>
          </div>
        </div>
      </transition>
    </tab-content>
  </form-wizard>
</template>

<script>
import cswitch from "../Switch";
export default {
  name: "CreateModule",
  components: {
    cswitch
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
  watch: {},
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
    _formatPrice(value) {
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
      ModuleData.append("module_category_id", this.Form.module_category_id);
      ModuleData.append("authors", JSON.stringify(this.Form.authors));
      ModuleData.append("publisher_id", this.Form.publisher_id);
      ModuleData.append("module_type", this.Form.module_type);
      ModuleData.append("theme", JSON.stringify(this.count_theme));
      ModuleData.append("image", this.Form.image);
      ModuleData.append("price", this.Form.price);
      ModuleData.append("kelas_id", this.Form.kelas_id);
      ModuleData.append("descriptions", this.Form.descriptions);
      console.log("authors " + JSON.stringify(this.Form.authors));
      console.log("theme " + JSON.stringify(this.Form.thema));
      this.$axios
        .post("modules", ModuleData)
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              title: "Order In ",
              text: response.data
            });
          }
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            title: "Order In ",
            text: err.response.data.message
          });
        });

      //console.log(ModuleData)
    },
    _DeleteCountTheme(i) {
      this.count_theme.splice(i, 1);
    },
    _DeleteCountPaketSoal(j, i) {
      console.log("Paket Soal " + j + " in " + i);
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
    },
    beforeTabSwitch() {},
    _actionConfirm() {},
    _actionSaveModules() {}
  },
  mounted() {
    this._actionFetchPublisher();
    this._actionFetchModuleCategories();
    this._actionFetchMatpel();
    this._actionFetchKelas();
  }
};
</script>

<style>
.list-group-item {
  user-select: none;
}

.list-group input[type="checkbox"] {
  display: none;
}

.list-group input[type="checkbox"] + .list-group-item {
  cursor: pointer;
}

.list-group input[type="checkbox"] + .list-group-item:before {
  content: "\2713";
  color: transparent;
  font-weight: bold;
  margin-right: 1em;
}

.list-group input[type="checkbox"]:checked + .list-group-item {
  background-color: #0275d8;
  color: #fff;
}

.list-group input[type="checkbox"]:checked + .list-group-item:before {
  color: inherit;
}
</style>
