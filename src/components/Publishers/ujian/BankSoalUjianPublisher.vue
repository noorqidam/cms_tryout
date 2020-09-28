<template>
  <div class="row">
    <div class="col-md-12">
      <!-- UJian Id {{ ujian_id }} -->
      <div class="row">
        <div class="col-md-2 card p-0 fixed" style="max-height:450px">
          <form>
            <label for="" class="pl-1"> <b> Mata Pelajaran </b> </label>
            <div class="ml-1 mb-2">
              <input type="text" v-model="Filter" />
            </div>

            <div class="col-sm-12" style="max-height:200px;overflow: auto;">
              <div v-for="m in filteredList" :key="m._id">
                <li style="list-style :none">
                  <input type="checkbox" v-model="matpel" :value="m._id" @change="_actionFilter" />
                  {{ m._id }} ({{ m.count }})
                </li>
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Kategori </b> </label>
            <div class="col-md-12" style="max-height:150px;overflow: auto;">
              <div style="margin-left:0" v-for="l in GroupLevel" :key="l._id">
                <li style="list-style:none;">
                  <input type="checkbox" v-model="level" :value="l._id" @change="_actionFilter" />
                  {{ l._id }} ({{ l.count }})
                </li>
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Sub Kategori </b> </label>
            <div v-if="SubGroupLevel" class="col-md-12" style="max-height:100px;overflow: auto;">
              <div style="margin-left:0" v-for="l in SubGroupLevel" :key="l._id">
                <li style="list-style:none;">
                  <input type="checkbox" v-model="sub_level" :value="l._id" @change="_actionFilter" />
                  {{ l._id }} ({{ l.count }})
                </li>
              </div>
            </div>
            <div v-else class="col-md-12">
              Tidak ada Sub Kategori
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
                      type="text"
                      placeholder="Cari disini"
                      v-model="search"
                      class="form-control form-control-sm"
                    />
                  </div>

                  <div class="col-sm-auto">
                    <router-link
                      :to="{
                        path: '/p/ujian/cart-soal-ujian',
                        query: { _id: ujian_id }
                      }"
                      class="btn btn-sm"
                    >
                      Cart Soal
                      <i class="fa fa-cart-arrow-down" />
                      <span class="badge badge-pill badge-success"> {{ totalCart }}</span>
                    </router-link>
                  </div>
                </div>
                <div class="row" v-if="selected.length > 0">
                  <div class="">
                    Di Pilih <b> {{ selected.length }} </b>
                    <button class="btn btn-sm btn-success" @click="actionStoredIndexedDB">
                      <i class="fa fa-send"></i> Proses
                    </button>
                  </div>
                  <div class="ml-2">
                    <button class="btn btn-sm btn-danger" @click="clearSelected">
                      <i class="fa fa-times"></i> Buang Semua
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
                  @row-selected="onRowSelected"
                  small
                  sticky-header
                  head-variant="dark"
                  responsive
                  :items="items"
                  :fields="attribute"
                  :current-page="currentPage"
                  :filter="filter"
                  :filterIncludedFields="filterOn"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  @filtered="onFiltered"
                  :busy="isBusy"
                >
                  <template v-slot:cell(No)="data">
                    {{ data.index + 1 }}
                  </template>
                  <template v-slot:cell(soal)="data">
                    <div v-if="data.item.soal_text">
                      <p v-html="data.item.soal_text"></p>
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

                  <template v-slot:cell(actions)="row">
                    <b-button size="sm" @click="row.toggleDetails">
                      <i class="fa fa-angle-down"></i>
                    </b-button>
                  </template>

                  <template v-slot:row-details="row">
                    <b-card v-if="row.item.jawabans.length > 0">
                      <ol type="A">
                        <li v-for="(value, key) in row.item.jawabans" :key="key">
                          <label v-html="value.jawaban_text"></label> (point
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
                      <b-spinner class="align-middle" variant="dark" type="grow" label="Loading ..">
                      </b-spinner>
                      Loading ..
                    </div>
                  </template>
                  <!-- <template v-slot:cell(pilih)="data">
                    <input type="checkbox" v-model="Pilih">
                  </template> -->
                </b-table>
              </div>

              <div class="row justify-content-end">
                <div class="col-sm-auto">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                  ></b-pagination>
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
  name: "BankSoalUjianPublisher",
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
      sub_level: [],
      GroupMatpel: [],
      GroupLevel: [],
      SubGroupLevel: [],
      GroupPublisher: [],
      showD: [],
      attribute: [
        "No",
        {
          key: "soal",
          label: "Soal text",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "images",
          label: "Soal Image",
          sortable: true,
          class: "text-center"
        },
        {
          key: "type_soal",
          label: "Tipe Soal",
          sortable: true,
          class: "text-center"
        },
        {
          key: "category_id",
          label: "Kategory",
          sortable: true,
          class: "text-center"
        },
        {
          key: "matpel_id",
          label: "Mata pelajaran",
          sortable: true,
          class: "text-center"
        },
        {
          key: "publisher_id",
          label: "Publisher",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" },
        { key: "pilih", label: "Pilih" }
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
      ujian_id: null,
      selectMode: "multi",
      selected: [],
      search: "",
      totalCart: 0,
      DB_NAME: "Ujian",
      DB_VERSION: 3,
      db: null
    };
  },
  watch: {
    currentPage() {
      if (this.$route.query.matpel || this.$route.query.level) {
        let matpel = this.$route.query.matpel ? this.$route.query.matpel : null;
        let level = this.$route.query.level ? this.$route.query.level : null;
        let sub_level = this.$route.query.sub_level ? this.$route.query.sub_level : null;
        this._actionQuerySoal(matpel, level, sub_level);
      } else {
        console.log("get all");
        this._actionGetAll();
      }
    }
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
  async mounted() {
    // const auth = sessionStorage.getItem("authorized");
    this.token = sessionStorage.getItem("session_token");
    const { ujian_id } = this.$route.query;
    this.ujian_id = ujian_id;
    this._actionGetAll();
    this.db = await this.getDb();
  },
  methods: {
    _actionFilter() {
      const { matpel } = this;
      const { level } = this;
      const { sub_level } = this;
      this._actionQuerySoal(matpel, level, sub_level);
    },
    _actionGetAll() {
      this.isBusy = true;
      this.$axios
        .get(`publisher-banksoals?page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.items = responseData.data;
            this.totalRows = responseData.total;
            this.GroupMatpel = responseData.matpel_id;
            this.GroupLevel = responseData.category_id;
            this.SubGroupLevel = responseData.sub_category_id;
          }
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isBusy = false;
        });
    },
    _actionQuerySoal(matpel, level, sub_level) {
      if (matpel.length > 0) {
        if (matpel.length > 0 && level.length > 0 && sub_level.length > 0) {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&matpel=${matpel}&level=${level}&sub_level=${sub_level}&page=${this.currentPage}&limit=${this.perPage}`,
              { headers: { "x-access-token": this.token } }
            )
            .then(response => {
              this.isBusy = false;
              this.items = [];
              if (response.data.success === "true") {
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.GroupMatpel = response.data.matpel_id ? response.data.matpel_id : null;
                this.GroupLevel = response.data.category_id;
              }
              this.isBusy = false;
            })
            .catch(err => {
              console.log(err);
              this.isBusy = false;
            });
        } else if (matpel.length > 0 && sub_level.length > 0) {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&matpel=${matpel}&sub_level=${sub_level}&page=${this.currentPage}&limit=${this.perPage}`,
              { headers: { "x-access-token": this.token } }
            )
            .then(response => {
              this.isBusy = false;
              this.items = [];
              if (response.data.success === "true") {
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.GroupMatpel = response.data.matpel_id ? response.data.matpel_id : null;
                this.GroupLevel = response.data.category_id;
              }
              this.isBusy = false;
            })
            .catch(err => {
              console.log(err);
              this.isBusy = false;
            });
        } else {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&matpel=${matpel}&page=${this.currentPage}&limit=${this.perPage}`,
              { headers: { "x-access-token": this.token } }
            )
            .then(response => {
              this.isBusy = false;
              this.items = [];
              if (response.data.success === "true") {
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.GroupMatpel = response.data.matpel_id ? response.data.matpel_id : null;
                this.GroupLevel = response.data.category_id;
              }
              this.isBusy = false;
            })
            .catch(err => {
              console.log(err);
              this.isBusy = false;
            });
        }
      } else if (level.length > 0) {
        if (level.length > 0 && sub_level.length > 0) {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&level=${level}&sub_level=${sub_level}&page=${this.currentPage}&limit=${this.perPage}`,
              {
                headers: { "x-access-token": this.token }
              }
            )
            .then(response => {
              this.isBusy = false;
              this.items = [];
              if (response.data.success === "true") {
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.GroupMatpel = response.data.matpel_id ? response.data.matpel_id : null;
                this.GroupLevel = response.data.category_id;
              }
              this.isBusy = false;
            })
            .catch(err => {
              console.log(err);
              this.isBusy = false;
            });
        } else {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&level=${level}&page=${this.currentPage}&limit=${this.perPage}`,
              {
                headers: { "x-access-token": this.token }
              }
            )
            .then(response => {
              this.isBusy = false;
              this.items = [];
              if (response.data.success === "true") {
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.GroupMatpel = response.data.matpel_id ? response.data.matpel_id : null;
                this.GroupLevel = response.data.category_id;
              }
              this.isBusy = false;
            })
            .catch(err => {
              console.log(err);
              this.isBusy = false;
            });
        }
      } else if (sub_level.length > 0) {
        if (sub_level.length > 0 && matpel.length > 0) {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&matpel=${matpel}&sub_level=${sub_level}&page=${this.currentPage}&limit=${this.perPage}`,
              { headers: { "x-access-token": this.token } }
            )
            .then(response => {
              this.isBusy = false;
              this.items = [];
              if (response.data.success === "true") {
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.GroupMatpel = response.data.matpel_id ? response.data.matpel_id : null;
                this.GroupLevel = response.data.category_id;
              }
              this.isBusy = false;
            })
            .catch(err => {
              console.log(err);
              this.isBusy = false;
            });
        } else {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&sub_level=${sub_level}&page=${this.currentPage}&limit=${this.perPage}`,
              { headers: { "x-access-token": this.token } }
            )
            .then(response => {
              this.isBusy = false;
              this.items = [];
              if (response.data.success === "true") {
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.GroupMatpel = response.data.matpel_id ? response.data.matpel_id : null;
                this.GroupLevel = response.data.category_id;
              }
              this.isBusy = false;
            })
            .catch(err => {
              console.log(err);
              this.isBusy = false;
            });
        }
      }
    },
    _formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
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
    async actionStoredIndexedDB() {
      let newSoal = this.selected;

      await this.addQuizToDb(newSoal);
    },
    async addQuizToDb(soal) {
      return new Promise((resolve, reject) => {
        let transaction = this.db.transaction("ujian", "readwrite");
        transaction.onerror = e => {
          console.log("Error Add", e);
          reject("Error");
        };
        transaction.oncomplete = e => {
          console.log(e);
          resolve();
        };
        let storeQuiz = transaction.objectStore("ujian");

        soal.forEach(element => {
          console.log("load soal ");
          let self = this;
          const index = storeQuiz.index("soal_id");
          const request = index.get(element._id);
          request.onsuccess = function() {
            const matching = request.result;
            if (matching !== undefined) {
              console.log("data exist");
            } else {
              storeQuiz.put({
                soal_id: element._id,
                value: element
              });

              var countRequest = storeQuiz.count();
              countRequest.onsuccess = function() {
                self.totalCart = countRequest.result;
                console.log(self.totalCart);
              };
            }
          };
          request.onerror = e => {
            console.log(e);
          };
        });

        this.clearSelected();
        //this.coutIndexDb(storeQuiz);
      });
    },
    async listSoalCart() {
      let transaction = await this.db.transaction("ujian", "readwrite").objectStore("ujian");
      transaction.onerror = e => {
        console.log("Error Add", e);
      };
      transaction.oncomplete = e => {
        console.log(e);
      };

      transaction.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          console.log("Name for SSN " + cursor.key + " is " + JSON.stringify(cursor.value));
          cursor.continue();
        } else {
          console.log("No more entries!");
        }
      };
    },
    async coutIndexDb(transaction) {
      console.log("count indexDB");
      let self = this;
      var countRequest = transaction.count();
      countRequest.onsuccess = function() {
        console.log(countRequest.result);
        self.totalCart = countRequest.result;
      };
    },
    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);
        if (!window.indexedDB) {
          alert("Browser anda tidak mendukung IndexDB");
        }
        request.onerror = e => {
          console.log("Error opening DB", e);
          reject("Error");
        };
        request.onsuccess = e => {
          console.log("Success Open DB");
          resolve(e.target.result);
          let db = request.result;
          let data = db.transaction("ujian", "readwrite");
          let storeQuiz = data.objectStore("ujian");
          this.coutIndexDb(storeQuiz);
        };
        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          if (!db.objectStoreNames.contains("ujian")) {
            let store = db.createObjectStore("ujian", { autoIncrement: true, keyPath: "id" });
            store.createIndex("soal_id", "soal_id", { unique: true });
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
