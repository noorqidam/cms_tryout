<template>
  <div class="row">
    <div class="col-md-12">
      <b-modal
        v-model="isLoading"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
      >
        <div class="row">
          <div class="col-md-12">
            Loading...
          </div>
        </div>
      </b-modal>
    </div>
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-2 card p-0 fixed" style="max-height:900px">
          <form>
            <label for="" class="text-left pl-1"> <b> Publishers </b> </label>
            <div class="col-sm-12" style="max-height:220px;overflow: scroll;">
              <div v-for="p in GroupPublisher" :key="p._id" class="margin:0;float:left">
                <li style="list-style :none;left:0">
                  <input v-model="Filterspublishers" type="checkbox" :value="p._id" @change="_actionFilter" />
                  {{ p._id }} ({{ p.count }})
                </li>
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Matapelajaran </b> </label>
            <div class="ml-1">
              <input v-model="Filter" type="text" />
            </div>

            <div class="col-sm-12" style="max-height:400px;overflow: scroll;">
              <div v-for="m in filteredList" :key="m._id">
                <li style="list-style :none">
                  <input v-model="matpel" type="checkbox" :value="m._id" @change="_actionFilter" />
                  {{ m._id }} ({{ m.count }})
                </li>
              </div>
            </div>
            <hr />
            <label for="" class="pl-1"> <b> Kategory </b> </label>
            <div class="col-md-12" style="max-height:180px;overflow: scroll;">
              <div v-for="l in GroupLevel" :key="l._id" style="margin-left:0">
                <li style="list-style:none;">
                  <input v-model="level" type="checkbox" :value="l._id" @change="_actionFilter" />
                  {{ l._id }} ({{ l.count }})
                </li>
              </div>
            </div>
            <label for="" class="pl-1"> <b> Type </b> </label>
            <div class="col-md-12" style="max-height:180px;overflow: scroll;">
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
              <div class="row justify-content-end mb-1">
                <div class="col-sm-auto">
                  <router-link :to="{ path: '/create-bank-soal' }" class="btn btn-sm btn-outline-primary">
                    <i class="fa fa-plus" /> Soal
                  </router-link>
                </div>
                <div class="col-sm-auto">
                  <label for="" class="text-bold">
                    Total Soal <b> {{ _formatPrice(totalRows) }} </b>
                  </label>
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
                  :filter-included-fields="filterOn"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  :busy="isBusy"
                  @filtered="onFiltered"
                >
                  <template v-slot:cell(No)="data">
                    {{ data.index + 1 + (currentPage - 1) * perPage }}
                  </template>
                  <template v-slot:cell(soal)="data">
                    <div v-if="data.item.soal_text" style="max-width:250px">
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
                      <!-- {{ row.item }} -->
                      <span v-if="row.item.free_trial" class="badge badge-success"> Trial </span>
                      <span v-else class="badge badge-danger"> Non Trial </span>
                    </div>
                  </template>
                  <template v-slot:cell(actions)="row">
                    <b-button size="sm" @click="row.toggleDetails">
                      <i class="fa fa-angle-down" />
                    </b-button>
                  </template>
                  <template v-slot:cell(edit)="row">
                    <b-button variant="primary" size="sm" @click="_actionEditSoal(row.item)">
                      <i class="fa fa-pencil" />
                    </b-button>
                  </template>
                  <template v-slot:cell(delete)="row">
                    <b-button variant="danger" size="sm" @click="_actionDeleteSoal(row)">
                      <i class="fa fa-trash-o" />
                    </b-button>
                  </template>

                  <template v-slot:row-details="row">
                    <b-card>
                      {{ row.item.tag }}
                    </b-card>
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
                    <span v-if="row.item.publish" class="badge badge-success"> Publish </span>
                    <span v-else class="badge badge-danger"> Un Publish </span>
                  </template>
                  <template v-slot:table-busy>
                    <div class="text-center text-dark my-2">
                      <b-spinner class="align-middle" variant="dark" type="grow" label="Loading .." /> Loading
                      ..
                    </div>
                  </template>
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
  name: "BankSoal",
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
      GroupType: [
        { name: "true", label: "TRIAL" },
        { name: "false", label: "NON TRIAL" }
      ],
      type: "",
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
        { key: "delete", label: "Delete" }
      ],
      currentPage: 1,
      // pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      isBusy: true,
      Filter: null
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
        this._acrtionFilterSoal(Publisher, matpel, level, type);
      }
    },
    type() {
      const i = this.$route.query;
      console.log(i);
      if (i) {
        const Publisher = this.Filterspublishers;
        const { matpel } = this;
        const { level } = this;
        const { type } = this;
        this._acrtionFilterSoal(Publisher, matpel, level, type);
      }
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetAll();
    this._actionGetGroupmatpel();
    this._actionGetGroupLevel();
    this._actionGetGroupPublisher();
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
      const Publisher = this.Filterspublishers;
      const { matpel } = this;
      const { level } = this;
      const { type } = this;
      this.$router.push({
        path: "/banksoals?",
        query: { _id: Publisher, matpel, level, type: type }
      });
      setTimeout(() => {
        this._acrtionFilterSoal(Publisher, matpel, level, type);
      }, 300);
      //
      // window.location.search ='?id='+data;
    },
    _actionGetAll() {
      this.isBusy = true;
      this.$axios
        .get(`banksoal?page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.items = responseData.data;
            this.totalRows = responseData.total;
          }
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isBusy = false;
        });
    },
    _acrtionFilterSoal(id, matpel, level, type) {
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
          }
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isBusy = false;
        });
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
        .post("delete-bank-soal", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          console.log(response);
          this.$notify({
            group: "foo",
            type: "success",
            title: "Berhasil!",
            text: "Berhasil Hapus Soal"
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
        path: "/edit-bank-soal",
        query: { _id: data._id }
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
