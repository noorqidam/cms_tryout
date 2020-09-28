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
    <div class="col-md-12 card">
      <form v-on:submit.prevent="_actionSearch">
        <div class="form-group row my-2">
          <label for="search" class="my-2 ml-5" style="font-size: 14px">Cari Quiz</label>
          <div class="col-sm-6">
            <multiselect
              v-model="value"
              :options="dataQuiz"
              id="search-quiz"
              label="judul_quiz"
              track-by="judul_quiz"
              placeholder="Cari Quiz disini"
              open-direction="bottom"
              :searchable="true"
              :close-on-select="true"
              :internal-search="false"
              :clear-on-select="false"
              @search-change="asyncFind"
            >
              <span slot="noResult">Tidak ada Quiz dengan judul tersebut.</span>
            </multiselect>
          </div>
          <div class="col-sm-auto mt-1">
            <button class="btn btn-outline-primary btn-sm">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </form>
      <div class="col-md-12">
        <b-table
          show-empty
          sticky-header
          head-variant="dark"
          responsive
          :fields="attribute"
          :items="items"
          :current-page="currentPage"
          :busy="isBusy"
        >
          <template v-slot:cell(No)="data">
            {{ data.index + 1 + (currentPage - 1) * perPage }}
          </template>
          <template v-slot:cell(quiz_banner)="data">
            <img
              v-if="data.item.quiz_banner"
              :src="pathImages + data.item.quiz_banner"
              :alt="data.item.quiz_banner"
              :srcset="pathImages + data.item.quiz_banner"
              style="width:200px;height:auto"
            />
          </template>
          <template v-slot:cell(is_premium)="data">
            <span v-if="data.item.is_premium" class="badge badge-success"> Premuim </span>
            <span v-else class="badge badge-danger"> Free </span>
          </template>
          <template v-slot:cell(waktu)="data">
            {{ _actionViewDate(data.item.start_date) }} {{ data.item.times }} s/d
            {{ _actionViewDate(data.item.end_date) }}
            {{ data.item.end_times }}
          </template>
          <template v-slot:cell(publish)="data">
            <span v-if="data.item.publish" class="badge badge-primary"> Publish </span>
            <span v-else class="badge badge-danger"> UnPublish</span>
          </template>
          <template v-slot:cell(is_private)="data">
            <span v-if="data.item.is_private" class="badge badge-primary"> Y </span>
            <span v-else class="badge badge-danger"> N </span>
          </template>
          <template v-slot:cell(detail)="data">
            <button class="btn btn-sm btn-primary" @click="_actionView(data.item._id)">
              <i class="fa fa-list"></i> Detail
            </button>
          </template>
          <template v-slot:cell(report)="data">
            <button
              class="btn btn-sm btn-success"
              @click="_actionReport(data.item._id, data.item.type_start)"
            >
              <i class="fa fa-leanpub"></i> Report
            </button>
          </template>
        </b-table>
      </div>
      <hr />
      <div class="row justify-content-end">
        <div class="col-sm-auto">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"></b-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "IndexQuiz",
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 20,
      totalRows: 0,
      isLoading: false,
      token: null,
      isBusy: true,
      pathImages: "https://storage.googleapis.com/edutore-cdn/tryout/",
      value: [],
      options: [
        { quiz: "Vue.js", language: "JavaScript" },
        { quiz: "Adonis", language: "JavaScript" },
        { quiz: "Rails", language: "Ruby" },
        { quiz: "Sinatra", language: "Ruby" },
        { quiz: "Laravel", language: "PHP" },
        { quiz: "Phoenix", language: "Elixir" }
      ],
      attribute: [
        "No",
        {
          key: "judul_quiz",
          label: "Judul",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "quiz_banner",
          label: "Banner",
          class: "text-center"
        },
        {
          key: "type_quiz",
          label: "Tipe Quiz",
          sortable: true,
          class: "text-center"
        },
        {
          key: "is_premium",
          label: "Premium",
          sortable: true,
          class: "text-center"
        },
        {
          key: "category_quiz",
          label: "Kategori",
          sortable: true,
          class: "text-center"
        },
        {
          key: "penyelenggara",
          label: "Penyelenggara",
          sortable: true,
          class: "text-center"
        },
        {
          key: "type_start",
          label: "Tipe Start",
          sortable: true,
          class: "text-center"
        },
        {
          key: "waktu",
          label: "Waktu"
        },
        {
          key: "publish",
          label: "Publish",
          sortable: true,
          class: "text-center"
        },
        {
          key: "is_private",
          label: "Private",
          class: "text-center"
        },
        { key: "detail", label: "Detail", class: "text-center" },
        { key: "report", label: "Report", class: "text-center" }
      ],
      dataQuiz: []
    };
  },
  watch: {
    currentPage() {
      this._actionGetAll();
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetAll();
  },
  methods: {
    _actionViewDate(tgl) {
      if (tgl) {
        moment().locale("id");
        return moment(tgl).format("DD MMMM YYYY");
      }
      return "";
    },
    _actionView(id) {
      this.$router.push({
        path: "/quiz/quiz-detail",
        query: { _id: id }
      });
    },
    _actionReport(id, type_start) {
      if (type_start == "RACE") {
        this.$router.push({
          path: "/quiz/report-peserta-quiz",
          query: { quiz_id: id }
        });
      } else if (type_start == "REALTIMESOAL") {
        this.$router.push({
          path: "/quiz/report-peserta-quiz-realtime/" + id
        });
      }
    },
    _actionGetAll() {
      this.isBusy = true;
      this.$axios
        .get(`quiz?page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.totalRows = response.data.count;
          }
          this.isLoading = false;
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
          this.isBusy = false;
        });
    },
    asyncFind(query) {
      if (query.length > 3) {
        this.isBusy = true;
        this.$axios
          .get("quiz/search?judul=" + query, { headers: { "x-access-token": this.token } })
          .then(response => {
            this.items = response.data.data;
            this.dataQuiz = this.items;
            this.totalRows = response.data.count;
            this.isBusy = false;
          })
          .catch(err => {
            console.log(err);
            this.items = [];
            this.isBusy = false;
          });
      }
    },
    _actionSearch() {
      this.isBusy = true;
      this.$axios
        .get("quiz/search?judul=" + this.value.judul_quiz, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.items = response.data.data;
          this.totalRows = response.data.count;
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.items = [];
          this.isBusy = false;
        });
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
.table-responsive {
  max-height: 600px;
  overflow: auto;
}
thead tr:nth-child(1) th {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style>
