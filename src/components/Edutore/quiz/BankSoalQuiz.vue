<template>
  <div class="row">
    <div class="col-md-12">
      <!-- Quiz Id {{ quiz_id }} -->
      <div class="row">
        <div class="col-md-2 card p-0 fixed" style="max-height:700px">
          <form>
            <label for="" class="text-left pl-1"> <b> Publishers </b> </label>
            <div class="col-sm-12" style="max-height:220px;overflow: auto;">
              <div v-if="GroupPublisher">
                <div v-for="p in GroupPublisher" :key="p._id" class="margin:0;float:left">
                  <li style="list-style :none;left:0">
                    <input
                      v-model="Filterspublishers"
                      type="checkbox"
                      :value="p._id"
                      @change="_actionFilter"
                    />
                    {{ p._id }} ({{ p.count }})
                  </li>
                </div>
              </div>
              <div v-else>
                Tidak ada Publishers
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Mata Pelajaran </b> </label>
            <div class="ml-1 mb-2">
              <input v-model="Filter" type="text" />
            </div>

            <div class="col-sm-12" style="max-height:250px;overflow: auto;">
              <div v-if="filteredList">
                <div v-for="m in filteredList" :key="m._id">
                  <li style="list-style :none">
                    <input v-model="matpel" type="checkbox" :value="m._id" @change="_actionFilter" />
                    {{ m._id }} ({{ m.count }})
                  </li>
                </div>
              </div>
              <div v-else>
                Tidak ada Mata Pelajaran
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Kategori </b> </label>
            <div class="col-md-12" style="max-height:130px;overflow: auto;">
              <div v-if="GroupLevel">
                <div v-for="l in GroupLevel" :key="l._id" style="margin-left:0">
                  <li style="list-style:none;">
                    <input v-model="level" type="checkbox" :value="l._id" @change="_actionFilter" />
                    {{ l._id }} ({{ l.count }})
                  </li>
                </div>
              </div>
              <div v-else>
                Tidak ada Kategori
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Type </b> </label>
            <div class="col-md-12">
              <div v-for="l in GroupType" :key="l.name" style="margin-left:0">
                <li style="list-style:none;">
                  <!-- <input v-model="type" type="checkbox" :value="l.name" @change="_actionFilter" /> -->
                  <input type="radio" v-model="type" :id="l.name" :value="l.name" />
                  {{ l.label }}
                </li>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-10">
          <div class="card">
            <div class="card-body">
              <div class="col-md-12">
                <div class="form-group row">
                  <!-- <label for="" class="col-sm-1"> Cari </label> -->
                  <div class="col-sm">
                    <input
                      v-model="search"
                      type="text"
                      placeholder="Cari disini"
                      class="form-control form-control-sm"
                    />
                  </div>
                  <div class="col-sm-auto">
                    <router-link
                      :to="{ path: '/cart-soal-quiz', query: { _id: quiz_id } }"
                      class="btn btn-sm btn-default"
                    >
                      Cart Soal
                      <i class="fa fa-cart-arrow-down" />
                      <span class="badge badge-pill badge-success"> {{ totalCart }}</span>
                    </router-link>
                  </div>
                </div>
                <div v-if="selected.length > 0" class="row">
                  <div class="col-sm-3">
                    Di Pilih <b> {{ selected.length }} </b>
                    <button class="btn btn-sm btn-success" @click="_actionStoredIndexedDb">
                      <i class="fa fa-send" /> Proses
                    </button>
                  </div>
                  <div class="col-sm-2">
                    <button class="btn btn-sm btn-danger" @click="clearSelected">
                      <i class="fa fa-times" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="row justify-content-end">
                <div class="col-sm-auto">
                  <label for="" class="text-bold">
                    Total Soal <b> {{ _formatPrice(totalRows) }} </b>
                  </label>
                </div>
              </div>
              <div>
                <b-table
                  ref="selectableTable"
                  selectable
                  :select-mode="selectMode"
                  show-empty
                  small
                  sticky-header
                  head-variant="dark"
                  responsive
                  :items="items"
                  :fields="attribute"
                  :current-page="currentPage"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  :busy="isBusy"
                  @row-selected="onRowSelected"
                  @filtered="onFiltered"
                >
                  <template v-slot:cell(No)="data">
                    {{ data.index + 1 + (currentPage - 1) * perPage }}
                  </template>
                  <template v-slot:cell(soal)="data">
                    <div v-if="data.item.soal_text">
                      <p v-html="data.item.soal_text" />
                    </div>
                  </template>
                  <template v-slot:cell(images)="data">
                    <div v-if="data.item.soal_image">
                      <img
                        v-if="data.item.soal_image"
                        v-lazy.container="pathImagesQ + data.item.soal_image"
                        :alt="data.item.soal_image"
                        srcset=""
                        style="heigth:60pxwidth:auto;max-width:200px"
                      />
                    </div>
                  </template>
                  <template v-slot:cell(free)="row">
                    <div>
                      <span v-if="row.item.free_trial" class="badge badge-success"> Trial </span>
                      <span v-else class="badge badge-danger"> Non Trial </span>
                    </div>
                  </template>

                  <template v-slot:cell(actions)="row">
                    <b-button size="sm" @click="row.toggleDetails">
                      <i class="fa fa-angle-down" />
                    </b-button>
                  </template>

                  <template v-slot:row-details="row">
                    <b-card v-if="row.item.jawabans.length > 0">
                      <ol type="A">
                        <li v-for="(value, key) in row.item.jawabans" :key="key">
                          <label v-html="value.jawaban_text" /> (point
                          <span class="badge badge-light"> {{ value.point }} </span> )
                        </li>
                      </ol>
                    </b-card>
                    <b-card v-else>
                      Tidak ada pilihan jawaban
                    </b-card>
                  </template>
                  <template v-slot:table-busy>
                    <div class="text-center text-dark my-2">
                      <b-spinner class="align-middle" variant="dark" type="grow" label="Loading .." /> Loading
                      ..
                    </div>
                  </template>
                  <!-- <template v-slot:cell(pilih)="data">
                    <input type="checkbox" v-model="Pilih">
                  </template> -->
                </b-table>
              </div>

              <div class="row justify-content-end">
                <div class="col-sm-auto">
                  <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BankSoalQuiz",
  data() {
    return {
      items: [],
      perPage: 200,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      pathPembahasan: "https://storage.googleapis.com/edutore-cdn/public/soal/discussion/",
      Filterspublishers: [],
      matpel: [],
      level: [],
      GroupMatpel: [],
      GroupLevel: [],
      GroupPublisher: [],
      showD: [],
      attribute: [
        "No",
        { key: "soal", label: "Soal text", sortable: true, sortDirection: "desc" },
        { key: "images", label: "Soal Image", sortable: true, class: "text-center" },
        {
          key: "type_soal",
          label: "Tipe Soal",
          sortable: true,
          class: "text-center"
        },
        { key: "category_id", label: "Kategory", sortable: true, class: "text-center" },
        { key: "matpel_id", label: "Mata pelajaran", sortable: true, class: "text-center" },
        {
          key: "free",
          label: "Free"
        },
        { key: "publisher_id", label: "Publisher", sortable: true, class: "text-center" },
        { key: "actions", label: "Actions" }
        // { key: "pilih", label: "Pilih" }
      ],
      currentPage: 1,
      // pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      isBusy: true,
      Filter: null,
      quiz_id: null,
      selectMode: "multi",
      selected: [],
      search: "",
      totalCart: 0,
      db: null,
      quizs: [],
      DB_NAME: "tryout",
      DB_VERSION: 3,
      GroupType: [
        { name: "true", label: "TRIAL" },
        { name: "false", label: "NON TRIAL" }
      ],
      type: ""
    };
  },
  computed: {
    filteredList() {
      if (this.Filter) {
        return this.GroupMatpel.filter(
          item => item._id.toLowerCase().indexOf(this.Filter.toLowerCase()) > -1
        );
      }
      return this.GroupMatpel;
    }
  },
  watch: {
    currentPage() {
      const i = this.$route.query;
      console.log(i);
      if (i) {
        const Publisher = this.Filterspublishers;
        const { matpel } = this;
        const { level } = this;
        const { type } = this;
        this._actionFilterSoal(Publisher, matpel, level, type);
      }
    },
    type() {
      const i = this.$route.query;
      if (i) {
        const Publisher = this.Filterspublishers;
        const { matpel } = this;
        const { level } = this;
        const { type } = this;
        this._actionFilterSoal(Publisher, matpel, level, type);
      }
    }
  },
  async mounted() {
    this.token = sessionStorage.getItem("session_token");
    let quiz_id = this.$route.query.quiz_id;
    this.quiz_id = quiz_id;
    this._actionGetAll();
    this._actionGetGroupmatpel();
    this._actionGetGroupLevel();
    this._actionGetGroupPublisher();
    this.db = await this.getDb();
    this._actionCount();
  },
  methods: {
    _actionGetGroupmatpel() {
      this.$axios
        .get("group/matapelajaran", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.GroupMatpel = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionGetGroupLevel() {
      this.$axios
        .get("group/level", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.GroupLevel = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionGetGroupPublisher() {
      this.$axios
        .get("group/publisher", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.GroupPublisher = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionFilter() {
      let Publisher = this.Filterspublishers;
      let matpel = this.matpel;
      let level = this.level;
      let type = this.type;
      this._actionFilterSoal(Publisher, matpel, level, type);
    },
    _actionGetAll() {
      this.isBusy = true;
      this.$axios
        .get("banksoal?page=" + this.currentPage + "&limit=" + this.perPage, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          let responseData = response.data;
          if (response.data.success === "true") {
            this.items = responseData.data.rows;
            this.totalRows = responseData.data.total;
          }
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isBusy = false;
        });
    },
    _actionFilterSoal(id, matpel, level, type) {
      this.isBusy = true;
      this.$axios
        .get(
          `banksoal/filter?_id=${id}&matpel=${matpel}&level=${level}&type=${type}&page=${this.currentPage}&limit=${this.perPage}`,
          { headers: { "x-access-token": this.token } }
        )
        .then(response => {
          this.isBusy = false;
          this.items = [];
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.totalRows = response.data.total;
            // this.GroupMatpel = response.data.M_aggregate;
            // this.GroupLevel = response.data.C_aggregate;
            // this.GroupPublisher = response.data.P_aggregate;
          }
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isBusy = false;
        });
    },
    _formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows();
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected();
    },
    selectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.selectRow(2);
    },
    unselectThirdRow() {
      // Rows are indexed from 0, so the third row is index 2
      this.$refs.selectableTable.unselectRow(2);
    },
    async _actionStoredIndexedDb() {
      let newSoal = this.selected;
      await this._actionAddQuizToDb(newSoal);
    },
    async _actionAddQuizToDb(soal) {
      return new Promise((resolve, reject) => {
        let transaction = this.db.transaction("quizs", "readwrite");
        transaction.onerror = e => {
          console.log("Error Add", e);
          reject("Error");
        };
        transaction.oncomplete = e => {
          console.log(e);
          resolve();
        };
        let storeQuiz = transaction.objectStore("quizs");
        soal.forEach(element => {
          console.log("Load Soal");
          const index = storeQuiz.index("quiz_id");
          const request = index.get(element._id);
          request.onsuccess = function() {
            const matching = request.result;
            if (matching !== undefined) {
              console.log("Data Exist");
            } else {
              storeQuiz.put({
                quiz_id: element._id,
                value: element
              });
            }
          };
          request.onerror = e => {
            console.log(e);
          };
        });
        this.clearSelected();
        this._actionCount();
      });
    },
    async _actionCount() {
      return new Promise((resolve, reject) => {
        let getTransaction = this.db.transaction(["quizs"], "readonly");
        getTransaction.onerror = e => {
          console.log("Error Get", e);
          reject("Error");
        };
        getTransaction.oncomplete = e => {
          console.log(e);
          resolve(quizs);
        };
        let getStore = getTransaction.objectStore("quizs");
        let quizs = [];

        getStore.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            quizs.push(cursor.value);
            cursor.continue();
            this.totalCart = quizs.length;
            console.log(quizs.length);
          }
        };
      });
    },
    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);
        request.onerror = e => {
          console.log("Error opening DB", e);
          reject("Error");
        };
        request.onsuccess = e => {
          console.log("Success Open DB");
          resolve(e.target.result);
        };
        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          if (!db.objectStoreNames.contains("quizs") && !db.objectStoreNames.contains("ujians")) {
            let objectStore = db.createObjectStore("quizs", { autoIncrement: true, keyPath: "id" });
            let objectStore2 = db.createObjectStore("ujians", { autoIncrement: true, keyPath: "id" });
            objectStore.createIndex("quiz_id", "quiz_id", { unique: true });
            objectStore2.createIndex("ujian_id", "ujian_id", { unique: true });
          }
        };
      });
    }
  }
};
</script>

<style scoped>
img[lazy="loading"] {
  /*your style here*/
  background-color: rgb(165, 157, 157);
}
img[lazy="error"] {
  /*your style here*/
  background-color: rgb(144, 105, 105);
}
.tableFixHead {
  overflow-y: auto;
  height: 580px;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
  background-color: #b8daff;
}
.content {
  padding: 0 18px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #f1f1f1;
}
.b-table-sticky-header {
  overflow-y: auto;
  max-height: 650px;
}
</style>
