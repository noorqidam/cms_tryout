<template>
  <div class="row">
    <div class="col-md-12">
      <!-- <b-breadcrumb :items="breadcrumb"></b-breadcrumb> -->
      <div class="card mt-1">
        <div class="card-body">
          <h4 class="h4 text-center text-uppercase">
            {{ detail.sesi_ujian }}
          </h4>
          <strong> Total Soal : {{ totalSoal }}</strong> <br />
          <router-link
            :to="{
              path: '/sesi-soal-ujian',
              query: { ujian_id: ujian_id, sesi_id: detail._id }
            }"
            class="btn btn-sm mb-2"
          >
            <i class="fa fa-plus" /> Tambah Soal
          </router-link>
          <button class="btn btn-sm btn-danger ml-2 mb-2" @click="_actionDeleteSesi(sesi_id)">
            <i class="fa fa-trash" /> Hapus Sesi
          </button>
          <b-table
            show-empty
            small
            sticky-header
            head-variant="dark"
            responsive
            :items="paginatedItems"
            :fields="attribute"
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
            <template v-slot:cell(actions)="row">
              <b-button size="sm" @click="row.toggleDetails">
                <i class="fa fa-angle-down" />
              </b-button>
            </template>
            <template v-slot:cell(deleted)="row">
              <b-button size="sm" class="btn-danger" @click="_actionDeleted(row.item._id)">
                <i class="fa fa-trash" />
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
                <b-spinner class="align-middle" variant="dark" type="grow" label="Loading .." /> Loading ..
              </div>
            </template>
          </b-table>
        </div>
        <div class="col-md-12">
          <b-pagination
            @change="onPageChanged"
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            align="fill"
            first-number
            last-number
            class="mt-2"
            style="place-content: center"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddSoalUjian",
  data() {
    return {
      items: [],
      Form: {},
      detail: {},
      currentPage: 1,
      perPage: 10,
      totalRows: null,
      isLoading: false,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
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
        { key: "publisher_id", label: "Publisher", sortable: true, class: "text-center" },
        { key: "actions", label: "Actions" },
        { key: "deleted", label: "Hapus" }
      ],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      isBusy: true,
      Filter: null,
      breadcrumb: [{ text: "Ujian", href: "/ujian", active: true }],
      sesi_id: null,
      ujian_id: null,
      totalSoal: 0,
      paginatedItems: []
    };
  },
  mounted() {
    let id = this.$route.query._id;
    let ujian_id = this.$route.query.ujian_id;
    this.sesi_id = id;
    this.ujian_id = ujian_id;
    this.token = sessionStorage.getItem("session_token");
    this._actionGetSoalBySesiUjianId(id);
  },
  methods: {
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    _actionGetSoalBySesiUjianId(id) {
      this.$axios
        .get("sesi-ujian/" + id, { headers: { "x-access-token": this.token } })
        .then(response => {
          let responseData = response.data;
          if (response.data.success === "true") {
            this.items = responseData.data.soals;
            this.paginate(this.perPage, 0);
            this.totalRows = this.items.length;
            this.detail = response.data.data;
            this.totalSoal = this.items.length;
            this.isBusy = false;
          }
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isBusy = false;
        });
    },
    _actionDeleted(id) {
      let data = {
        sesi_ujian_id: this.detail._id,
        soal_id: id
      };
      this.$axios
        .post("sesi-ujian/remove-soals", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            text: response.data.message
          });
          let id = this.$route.query._id;
          this._actionGetSoalBySesiUjianId(id);
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Ada Kesalahan di Server "
          });
          console.log(err);
        });
    },
    _actionDeleteSesi(id) {
      let data = {
        sesi_ujian_id: id
      };
      this.$axios
        .post("publisher-sesi-ujian/sesiujian", data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Yay",
            text: response.data.message
          });
          this.$router.push({
            path: "/ujian/ujian-detail/" + this.ujian_id
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
