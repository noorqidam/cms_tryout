<template>
  <div class="row">
    <div v-if="isLoading === false" class="col-md-12">
      <h3 class="text-center">Recycle Bin Quiz</h3>
      <div class="col-md-12 card">
        <div class="col-md-12">
          <div class="col-md-6 m-1 float-right">
            <b-form-group label-for="filterInput" class="mb-0">
              <b-input-group size="sm">
                <b-form-input
                  v-model="filter"
                  type="search"
                  id="filterInput"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </div>
        </div>
        <b-table
          show-empty
          sticky-header
          head-variant="dark"
          responsive
          :items="paginatedItems"
          :fields="attribute"
          :filter="filter"
          style="max-height: 700px"
        >
          <template v-slot:cell(No)="data">
            {{ data.index + 1 + (currentPage - 1) * perPage }}
          </template>
          <template v-slot:cell(quiz_banner)="data">
            <div v-if="data.item.quiz_banner">
              <img
                v-if="data.item.quiz_banner"
                v-lazy.container="pathImages + data.item.quiz_banner"
                :alt="data.item.quiz_banner"
                style="max-width:100px"
              />
            </div>
          </template>
          <template v-slot:cell(is_premium)="data">
            <span v-if="data.item.is_premium" class="badge badge-danger"> Premuim </span>
            <span v-else class="badge badge-success"> Free </span>
          </template>
          <template v-slot:cell(actions)="row">
            <button class="btn btn-danger" @click="_actionRecycle(row.item._id)">
              <i class="fa fa-recycle"></i>
            </button>
          </template>
        </b-table>
        <hr />
        <!-- PAGINATION -->
        <div class="row justify-content-end">
          <div class="col-sm-auto">
            <b-pagination
              @change="onPageChanged"
              :total-rows="totalRows"
              :per-page="perPage"
              v-model="currentPage"
            />
          </div>
        </div>
        <!-- END PAGINATION -->
      </div>
    </div>
    <div v-else>
      <h3>Loading ...</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "TrashQuiz",
  data: () => ({
    token: null,
    isLoading: false,
    // TABLE
    items: [],
    currentPage: 1,
    perPage: 10,
    totalRows: 0,
    attribute: [
      "No",
      {
        key: "judul_quiz",
        label: "Judul Quiz",
        sortable: true,
        sortDirection: "desc"
      },
      {
        key: "quiz_banner",
        label: "Banner"
      },
      {
        key: "type_quiz",
        label: "Tipe Quiz",
        sortable: true
      },
      {
        key: "is_premium",
        label: "Premium",
        sortable: true
      },
      {
        key: "category_quiz",
        label: "Kategori",
        sortable: true
      },
      {
        key: "penyelenggara",
        label: "Penyelenggara",
        sortable: true
      },
      { key: "actions", label: "Actions" }
    ],
    paginatedItems: [],
    pathImages: "https://storage.googleapis.com/edutore-cdn/tryout/",
    // END TABLE
    filter: null
  }),
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetTrashQuiz();
  },
  methods: {
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    _actionGetTrashQuiz() {
      this.isLoading = true;
      this.$axios
        .get("trash-quiz", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.isLoading = false;
            this.totalRows = this.items.length;
            this.paginate(this.perPage, 0);
          }
          this.isLoading = false;
        })
        .catch(err => {
          const error = err.response.data;
          console.log(error);
          this.isLoading = false;
        });
    },
    _actionRecycle(id) {
      let data = {
        quiz_id: id
      };
      console.log(data);
      this.$axios
        .post("trash-quiz", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            text: response.data.message
          });
          this._actionGetTrashQuiz();
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Ada Kesalahan di Server"
          });
          console.log(err);
        });
    }
  }
};
</script>
