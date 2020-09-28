<template>
  <div class="row">
    <div class="col-md-12">
      <b-tabs content-class="mt-3" justified>
        <b-tab title="Identitas">
          <div class="row">
            <div class="col-md-12">
              <div class="row mr-1">
                <div class="col-md-8 offset-md-4">
                  <router-link
                    :to="{ path: '/ujian/jadwal-sesi-ujian/' + ujian_id }"
                    class="col-9 col-md-3 ml-3 mb-2 btn btn-sm btn-info text-white"
                    style="font-size: 13px"
                  >
                    <i class="fa fa-calendar" /> Jadwal Sesi Ujian
                  </router-link>
                  <router-link
                    :to="{
                      path: '/ujian-add-soal',
                      query: { ujian_id: ujian._id }
                    }"
                    class="btn btn-md btn-default float-right"
                  >
                    <i class="fa fa-plus" />
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="col-md-12 mb-2">
                <div class="row">
                  <div class="col-md-12 col-12">
                    <router-link
                      :to="{ path: '/edit-ujian', query: { ujian_id: ujian._id } }"
                      class="col-12 mb-2 btn btn-sm btn-primary"
                      style="font-size: 13px"
                    >
                      <i class="fa fa-pencil" /> Edit
                    </router-link>
                  </div>
                  <div class="col-md-6 col-6">
                    <router-link
                      :to="{ path: '/ujian/report-sesi-ujian', query: { ujian_id: ujian._id } }"
                      class="btn btn-block btn-sm text-white"
                      style="font-size:13px;background-color:#26A69A"
                    >
                      <i class="fa fa-user" /> Report Peserta
                    </router-link>
                  </div>
                  <div class="col-md-6 col-6">
                    <router-link
                      :to="{ path: '/ujian/review-sesi-ujian', query: { ujian_id: ujian._id } }"
                      class="btn btn-block btn-sm text-white"
                      style="font-size:13px;background-color:#F57C00"
                    >
                      <i class="fa fa-book" /> Review Ujian
                    </router-link>
                  </div>
                </div>
              </div>

              <div class="card">
                <img
                  v-if="ujian.ujian_banner"
                  v-lazy.container="pathUjian + ujian.ujian_banner"
                  :alt="ujian.ujian_banner"
                  class="img-thumbnail"
                />
                <img
                  v-else
                  v-lazy.container="pathUjian + 'edutore.jpg'"
                  :alt="'edutore.jpg'"
                  :srcset="pathUjian + 'edutore.jpg'"
                  class="img-thumbnail"
                />
                <div class="card-body">
                  <h5 class="card-title text-uppercase">
                    {{ ujian.judul_ujian }}
                  </h5>
                  <!-- <i class="fa fa-users"> {{ ujian.type_ujian }}</i> <br> -->
                  <div>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {{ ujian.penyelenggara }}
                    </h6>
                    <span class="badge badge-success"> {{ ujian.is_premium ? "Berbayar" : "Gratis" }} </span>
                    <br />
                  </div>

                  <i class="fa fa-calendar" /> <strong> {{ formatDate(ujian.start_date) }}</strong>
                  <p class="card-text">
                    <!-- {{ ujian }} -->
                  </p>
                  <span v-if="ujian.publish" class="badge badge-primary">
                    <i class="fa fa-eye" /> Publish
                  </span>
                  <span v-else class="badge badge-danger"> <i class="fa fa-eye-slash" /> UnPublish</span>
                  <br />
                  <!-- Access  -->
                  <span v-if="ujian.is_private" class="badge badge-primary">
                    <i class="fa fa-lock" /> Private
                  </span>
                  <span v-else class="badge badge-success"> <i class="fa fa-users" /> Umum </span>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <b-list-group v-for="detail in details" :key="detail._id">
                <b-list-group-item
                  href="#"
                  class="flex-column align-items-start"
                  @click="actionShow(ujian_id, detail._id)"
                >
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">
                      {{ detail.sesi_ujian }}
                    </h5>
                    <hr />
                    <small> {{ formatDate(detail.createdAt) }} </small>
                  </div>
                  <!-- Durasi <small> {{ detail.duration }} </small> <br /> -->
                  Total Soal <strong>{{ detail.soals.length }}</strong>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </b-tab>
        <b-tab title="Peserta" lazy @click="actionListen">
          <div class="row">
            <div class="col-md-12">
              <button class="btn btn-sm btn-default" @click="showModalPeserta">
                <i class="fa fa-plus" />
              </button>
              <b-modal v-model="modalPeserta" centered hide-footer="" title="Tambah Peserta Ujian">
                <form @submit.prevent="actionAddPeserta">
                  <input id="" v-model="FormPeserta.email" type="email" class="form-control" required />
                  <div class="row justify-content-center mt-2">
                    <div class="col-md-3">
                      <button class="btn btn-block btn-dark">
                        Tambah
                      </button>
                    </div>
                  </div>
                </form>
              </b-modal>
            </div>
            <div class="col-md-12">
              <b-table
                show-empty
                small
                sticky-header
                head-variant="dark"
                responsive
                :items="items"
                :fields="attrPeserta"
                :current-page="currentPage"
                :filter="filter"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :busy="isBusy"
                @filtered="onFiltered"
              >
                <template v-slot:cell(No)="data">
                  {{ data.index + 1 }}
                </template>
                <template v-slot:cell(actions)="data">
                  <button class="btn btn-sm btn-danger" @click="actionDelete(data.item)">
                    <i class="fa fa-trash" />
                  </button>
                </template>
              </b-table>
            </div>
          </div>
        </b-tab>
        <!-- <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab> -->
      </b-tabs>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "DetailUjian",
  data() {
    return {
      items: [],
      ujian: {},
      details: [],
      showCalendar: false,
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathUjian: "https://storage.googleapis.com/edutore-cdn/tryout/",
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      sticky: true,
      attrPeserta: [
        "No",
        { key: "email", label: "Email", class: "text-left" },
        { key: "_id", label: "Nomor Registrasi", class: "text-left" },
        { key: "actions", label: "Actions" }
      ],
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      isBusy: false,
      filterOn: [],
      totalSoal: 0,
      modalPeserta: false,
      FormPeserta: {},
      ujian_id: null
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => ({ text: f.label, value: f.key }));
    }
  },
  mounted() {
    const auth = sessionStorage.getItem("authorized");
    if (auth === "EDUTORE") {
      const id = this.$route.query._id;
      this.ujian_id = id;
      this.token = sessionStorage.getItem("session_token");
      this.actionGetUjianByid(id);
      this.actionGetSoalByUjianId(id);
    } else {
      this.$router.push({ path: "/publisher/ujian/semua-ujian" });
    }
  },
  methods: {
    actionGetUjianByid(id) {
      this.$axios
        .get(`ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          console.log(response.da);
          const responseData = response.data;
          if (response.data.success === "true") {
            this.ujian = responseData.data;
            // this.attrs[0].dates.push(this.ujian.start_date)
            // this.showCalendar = true
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    actionGetSoalByUjianId(id) {
      this.$axios
        .get(`soal-ujian/ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            console.log(response.data.data);
            this.items = responseData.data[0].soals;
            this.details = response.data.data;
            this.totalSoal = this.items.length;
            // this.totalRows = responseData.data.paginator.itemCount;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    actionListen() {
      this.$axios
        .get(`peserta-ujian/ujian_id/${this.ujian._id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.items = response.data.data;
          // this.totalRowsPeserta = response.data
        });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    actionShow(ujian_id, id) {
      this.$router.push({
        path: `/ujian/${ujian_id}/sesi-ujian`,
        query: { ujian_id, _id: id }
      });
    },
    showModalPeserta() {
      this.modalPeserta = true;
    },
    actionAddPeserta() {
      const data = {
        email: this.FormPeserta.email,
        ujian_id: this.ujian._id
      };
      this.$axios
        .post("peserta-ujian", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            title: "Success Add ",
            text: response.data.message
          });
          this.modalPeserta = false;
          this.FormPeserta = {};
          this.actionListen();
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opss .. ",
            text: "Ada Kesalahan di Server"
          });
        });
    },
    actionDelete(item) {
      const data = {
        _id: item._id,
        ujian_id: item.ujian_id._id
      };
      this.$axios
        .post("peserta-ujian/remove-peserta", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            text: response.data.message
          });
          this.actionListen();
        })
        .catch(() => {
          this.$notify({
            group: "foo",
            type: "error",
            text: "Ada Kesalahan di Server "
          });
        });
    },
    formatDate(tgl) {
      return moment(tgl).format("dddd, MMMM Do YYYY");
    }
  }
};
</script>
<style scoped>
.b-table-sticky-header {
  overflow-y: auto;
  max-height: 600px;
}
h5 {
  color: black;
}
</style>
