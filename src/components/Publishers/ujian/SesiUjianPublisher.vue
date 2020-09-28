<template>
  <div class="row">
    <div class="col-md-12">
      <!-- <b-breadcrumb :items="breadcrumb"></b-breadcrumb> -->
      <div class="card">
        <div class="card-body">
          <div class="row mb-1">
            <div class="col-md-12">
              <h4 class="h4 text-center text-uppercase">{{ detail.sesi_ujian }}</h4>
              <!-- <strong> Durasi Ujian :{{ jam }} {{ menit }} </strong> -->
              Jumlah Soal <b> {{ totalRows }} </b>
              <router-link
                :to="{
                  path: '/p/ujian/banksoal-sesi-ujian',
                  query: { _id: detail._id, sesi_ujian: detail.sesi_ujian }
                }"
                class="btn btn-sm btn-primary right-0"
              >
                <i class="fa fa-plus"></i> Soal
              </router-link>
            </div>
            <button class="btn btn-md btn-danger" @click="actionDeleteSesiUjian">
              <i class="fa fa-trash-o"></i> Hapus Sesi
            </button>
          </div>

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
            <template v-slot:cell(deleted)="row">
              <b-button size="sm" class="btn-danger" @click="_actionDeleted(row.item._id)">
                <i class="fa fa-trash" />
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
                <b-spinner class="align-middle" variant="dark" type="grow" label="Loading .."> </b-spinner>
                Loading ..
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SesiUjianUjianPublisher",
  data() {
    return {
      items: [],
      Form: {},
      detail: {},
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
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
      duration: null,
      jam: null,
      menit: null,
      seesi_ujian_id: null,
      ujian_id: null
    };
  },
  mounted() {
    const id = this.$route.params.sesi_id;
    this.sesi_ujian_id = id;
    this.ujian_id = this.$route.params.ujian_id;
    this.token = sessionStorage.getItem("session_token");
    this._actionGetSoalBySesiUjianId(id);
  },
  methods: {
    _actionGetSoalBySesiUjianId(id) {
      this.$axios
        .get(`publisher-sesi-ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.items = responseData.data.soals;
            this.totalRows = this.items.length;
            this.detail = response.data.data;
            // let duration = this.detail.duration;
            // let jam = duration.substring(0, 2);
            // let menit = duration.substring(3, 5);
            this.isBusy = false;
            // if (jam !== "00") {
            //   this.jam = jam + "Jam";
            // }

            // this.menit = menit + " Menit";
          }
          this.isBusy = false;
        })
        .catch(err => {
          console.log(err);
          this.isBusy = false;
        });
    },
    _actionDeleted(id) {
      const data = {
        sesi_ujian_id: this.detail._id,
        soal_id: id
      };
      this.$axios
        .post("publisher-sesi-ujian/remove-soals", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Yay",
            text: response.data.message
          });

          this._removeItems(id);
          //this._actionGetSoalBySesiUjianId(id);
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            type: "error",
            text: "Ada Kesalahan di Server "
          });
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    _removeItems(id) {
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
    actionDeleteSesiUjian() {
      let data = {
        sesi_ujian_id: this.sesi_ujian_id
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
            path: "/p/ujian/ujian-detail",
            query: { _id: this.ujian_id }
          });
        })
        .catch(err => {
          console.log(err);
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
