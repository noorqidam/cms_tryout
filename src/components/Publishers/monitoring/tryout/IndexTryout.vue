<template>
  <div class="row">
    <div class="col-md-12 mt-0">
      <b-alert
        :show="dismissCountDown"
        dismissible
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        variant="info"
      >
        List dibawah ini adalah Ujian yang sedang berlangsung. <br />
        anda dapat melihat peserta yang menjawab dengan <b>mengklick</b> Tombol
        <button>View Peserta</button> Pada Masing-masing Card List Ujian
        <!-- <span> label Info berakhir pada {{ dismissCountDown }}</span> -->
      </b-alert>
      <h3 class="h5 text-center">
        Live Ujian
      </h3>
      <div v-for="item in items" :key="item._id">
        <b-card no-body style="margin:0px">
          <b-row no-gutters class="overflow-hidden">
            <b-col sm="2">
              <b-card-img
                v-if="!item.ujian_banner"
                :src="pathImages + 'edutore.jpg'"
                style="height:auto;width:180px;margin:10px;padding:5px"
              ></b-card-img>
              <b-card-img
                v-else
                :src="pathImages + item.ujian_banner"
                style="height:auto;width:180px;margin:10px;padding:5px"
              ></b-card-img>
            </b-col>
            <b-col sm="10">
              <b-card-body>
                <h2 class="h5">{{ item.judul_ujian }}</h2>
                <b-card-text> <i class="fa fa-home"></i> {{ item.penyelenggara }} </b-card-text>
                <b-card-text>
                  <i class="fa fa-calendar ml-1"></i> {{ _actionViewDate(item.start_date) }} {{ item.times }}
                  <span v-if="item.is_premium" class="badge badge-primary"> Free </span>
                  <span v-else class="badge badge-danger"> Berbayar </span>
                  <span v-if="item.publish" class="ml-1 badge badge-primary">
                    <i class="fa fa-eye"></i> Publish
                  </span>
                  <span v-else class="ml-1 badge badge-danger">
                    <i class="fa fa-eye-slash"></i> UnPublish</span
                  >
                  <span v-if="item.is_private" class="ml-1 badge badge-primary">
                    <i class="fa fa-lock"></i> Private
                  </span>
                  <span v-else class="ml-1 badge badge-danger"> <i class="fa fa-users"></i> Umum </span>
                  <br />
                  <span> <i class="fa fa-user"></i> </span> {{ item.createdBy }}
                </b-card-text>
                <b-card-text>
                  <router-link
                    :to="{ path: '/p/ujian/live-ujian-detail-peserta', query: { _id: item._id } }"
                    class="btn btn-sm btn-dark"
                  >
                    <i class="fa fa-users"></i> View Peserta
                  </router-link>
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IndexTryout",
  data() {
    return {
      items: [],
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/tryout/",
      dismissCountDown: 10
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetTestLive();
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    _actionGetTestLive() {
      this.$axios
        .get("publisher-live-ujian", { headers: { "x-access-token": this.token } })
        .then(response => (this.items = response.data.data));
    },
    _actionViewDate(tgl) {
      if (tgl) {
        new Date(tgl).toString();
      }
      return "";
    }
  }
};
</script>

<style scoped></style>
