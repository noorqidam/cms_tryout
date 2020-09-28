<template>
  <div class="row">
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-2 card p-0 fixed" style="max-height:900px">
          <form class="form-horizontal">
            <label for="" class="pl-1"> <b> Matapelajaran </b> </label>
            <div class="ml-1">
              <input type="text" v-model="Filter" />
            </div>
            <div class="col-sm-12" style="max-height:400px;overflow: scroll;">
              <div v-for="m in filteredList" :key="m._id">
                <li style="list-style :none">
                  <input type="checkbox" v-model="matpel" :value="m._id" @change="_actionFilter" />
                  {{ m._id }} ({{ m.count }})
                </li>
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Kategory </b> </label>
            <div class="col-md-12" style="max-height:180px;overflow: scroll;">
              <div style="margin-left:0" v-for="l in GroupLevel" :key="l._id">
                <li style="list-style:none;">
                  <input type="checkbox" v-model="level" :value="l._id" @change="_actionFilter" />
                  {{ l._id }} ({{ l.count }})
                </li>
              </div>
            </div>
            <label for="" class="pl-1"> <b> Sub Kategory </b> </label>
            <div class="col-md-12" style="max-height:180px;overflow: scroll;">
              <div style="margin-left:0" v-for="l in SubGroupLevel" :key="l._id">
                <li style="list-style:none;">
                  <input type="checkbox" v-model="sub_level" :value="l._id" @change="_actionFilter" />
                  {{ l._id }} ({{ l.count }})
                </li>
              </div>
            </div>
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
          <router-link :to="{ path: '/p/create-bank-soal' }" class="btn btn-sm btn-primary mb-1">
            <i class="fa fa-plus"></i> Bank Soal
          </router-link>
          <router-link :to="{ path: '/p/banksoals/upload' }" class="btn btn-sm btn-dark mb-1 ml-2">
            <i class="fa fa-cloud-upload"></i> Upload Soal
          </router-link>
          <div class="card">
            <div class="card-body">
              <div class="row justify-content-end">
                <div class="col-sm-auto">
                  <label for="" class="text-bold">
                    Total Soal <b> {{ _formatPrice(totalRows) }} </b>
                  </label>
                  <button class="btn btn-sm btn-default" @click="_actionGetAll">
                    <i class="fa fa-refresh"></i>
                  </button>
                </div>
              </div>
              <div>
                <b-table
                  show-empty
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
                    <!-- {{ data.index + 1 }}  -->
                    {{ (currentPage - 1) * perPage + (data.index + 1) }}
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
                      <i class="fa fa-angle-down"></i>
                    </b-button>
                  </template>
                  <template v-slot:cell(edit)="row">
                    <b-button variant="primary" size="sm" @click="_actionEditSoal(row.item)">
                      <i class="fa fa-pencil"></i>
                    </b-button>
                  </template>
                  <template v-slot:cell(delete)="row">
                    <b-button variant="danger" size="sm" @click="_actionDeleteSoal(row)">
                      <i class="fa fa-trash-o"></i>
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
                      <!-- <small> di buat </small> <i class="fa fa-clock-o"></i> -->
                      <!-- {{ formatDatetime(row.item.createdAt) }} -->
                      {{ row.item.tag }}
                      {{ row.item.sub_category_id }}
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
  name: "BankSoalPublisher",
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
          key: "free",
          label: "Free"
        },
        {
          key: "publisher_id",
          label: "Publisher",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" },
        { key: "edit", label: "Edit" },
        { key: "delete", label: "Delete" },
        { key: "createdBy", label: "Di Buat Oleh" }
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
      GroupType: [
        { name: "true", label: "TRIAL" },
        { name: "false", label: "NON TRIAL" }
      ],
      type: ""
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
    },
    type() {
      const i = this.$route.query;
      console.log(i);
      if (i) {
        // const Publisher = this.Filterspublishers;
        // const { matpel } = this;
        // const { level } = this;
        // const { type } = this;
        // this._actionFilterSoal(Publisher, matpel, level, type);
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
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    if (this.$route.query.matpel || this.$route.query.level) {
      let matpel = this.$route.query.matpel ? this.$route.query.matpel : null;
      let level = this.$route.query.level ? this.$route.query.level : null;
      let sub_level = this.$route.query.sub_level ? this.$route.query.sub_level : null;
      this._actionQuerySoal(matpel, level, sub_level);
    } else {
      console.log("get all");
      this._actionGetAll();
    }
  },
  methods: {
    _actionFilter() {
      const { matpel } = this;
      const { level } = this;
      const { sub_level } = this;
      this.$router.push({
        path: "/p/banksoals?",
        query: { matpel, level, sub_level }
      });

      setTimeout(() => {
        this._actionQuerySoal(matpel, level, sub_level);
      }, 1000);
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
      console.log("Query ini " + matpel.length, level.length, sub_level.length);
      if (matpel.length > 0) {
        if (matpel && level.length > 0) {
          this.isBusy = true;
          this.$axios
            .get(
              `publisher-banksoals/filter?&matpel=${matpel}&level=${level}&page=${this.currentPage}&limit=${this.perPage}`,
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
        this.isBusy = true;
        this.$axios
          .get(`publisher-banksoals/filter?&level=${level}&page=${this.currentPage}&limit=${this.perPage}`, {
            headers: { "x-access-token": this.token }
          })
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
      } else {
        this._actionGetAll();
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
    _actionDeleteSoal(row) {
      const data = {
        _id: row.item._id
      };

      this.$axios
        .post("publisher-delete-bank-soal", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Yay",
            text: response.data.message
          });
          this.shuffle_items(row.item._id);
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opps ",
            text: err.response.data.message
          });
        });
    },
    shuffle_items(id) {
      // get index of object with id:37
      var removeIndex = this.items
        .map(function(item) {
          return item._id;
        })
        .indexOf(id);

      // remove object
      this.items.splice(removeIndex, 1);
      this.totalRows = this.items.length;
    },
    _actionEditSoal(data) {
      this.$router.push({
        path: "/p/edit-bank-soal",
        query: { _id: data._id }
      });
    },
    formatDatetime(date) {
      return new Date(date).toString();
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
