<template>
  <div class="row">
    <div class="col-md-12 mb-2">
      <div class="col-md-12 text-center">
        <h5>Report Ujian</h5>
      </div>
      <div v-for="item in items" :key="item._id" class="col-md-12">
        <div
          v-if="_actionEndDate(item.end_date) == false"
          @click="_actionViewDetail(item._id)"
          class="card hover"
          style="margin:5px"
        >
          <div class="row">
            <div class="col-md-1 text-center align-self-center">
              <img
                v-if="item.ujian_banner"
                :src="pathImages + item.ujian_banner"
                class="img-fluid p-2"
                :alt="item.ujian_banner"
              />
              <img
                v-else
                src="https://storage.googleapis.com/edutore-cdn/edutpre.png"
                class="img-fluid p-2"
                style="width:150px"
                alt="edutore"
              />
            </div>
            <div class="col-md-11">
              <div class="ml-2 py-2">
                <h5>{{ item.judul_ujian }}</h5>
                <div class="ml-1 mb-1">
                  <em>{{ item.penyelenggara }}</em>
                </div>
                <div>
                  <i class="fa fa-calendar ml-1"></i> {{ _actionViewDate(item.start_date) }} {{ item.times }}
                </div>
                <div class="mb-2 mt-1">
                  <span v-if="item.is_premium == true" class="badge badge-danger"> Berbayar </span>
                  <span v-else class="badge badge-success"> Free </span>
                  <span v-if="item.publish == true" class="ml-1 badge badge-primary">
                    <i class="fa fa-eye"></i> Publish
                  </span>
                  <span v-else class="ml-1 badge badge-danger">
                    <i class="fa fa-eye-slash"></i> UnPublish</span
                  >
                  <span v-if="item.is_private == true" class="ml-1 badge badge-primary">
                    <i class="fa fa-lock"></i> Private
                  </span>
                  <span v-else class="ml-1 badge badge-info text-white">
                    <i class="fa fa-users"></i> Umum
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="row justify-content-end mt-2">
        <div class="col-sm-auto">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"></b-pagination>
        </div>
      </div> -->
    </div>
    <!-- <div class="col-md-3">
      Popular Ujian
    </div> -->
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ReportUjian",
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/tryout/"
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
    _actionEndDate(end_date) {
      return moment().isBefore(moment(end_date));
    },
    _actionViewDetail(id) {
      this.$router.push({
        path: "/report/detail-ujian/" + id
      });
    },
    _actionGetAll() {
      this.$axios
        .get(`ujian?page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.no-gutters {
  margin-right: 0;
  margin-left: 0;
  max-height: 120px;
}
.hover:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
</style>
