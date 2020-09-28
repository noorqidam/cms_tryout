<template>
  <div class="row">
    <div class="col-md-12">
      <b-alert
        :show="dismissCountDown"
        dismissible
        @dismissed="dismissCountDown = 0"
        @dismiss-count-down="countDownChanged"
        variant="info"
      >
        List dibawah ini adalah Quiz yang sedang berlangsung. <br />
        anda dapat melihat peserta yang menjawab dengan <b>mengklick</b> Tombol
        <button>View Peserta</button> Pada Masing-masing Card List Quiz
        <!-- <span> label Info berakhir pada {{ dismissCountDown }}</span> -->
      </b-alert>
      <h3 class="h5 text-center">Live Quiz</h3>
      <div v-for="item in items" :key="item._id">
        <b-card no-body>
          <b-row no-gutters class="overflow-hidden">
            <b-col md="2">
              <b-card-img
                v-if="!item.quiz_banner"
                :src="pathImages + 'edutore.jpg'"
                style="height:auto;width:180px;margin:10px;padding:5px"
              ></b-card-img>
              <b-card-img
                v-else
                :src="pathImages + item.quiz_banner"
                style="height:auto;width:180px;margin:10px;padding:5px"
              ></b-card-img>
            </b-col>
            <b-col md="10">
              <b-card-body>
                <h2 class="h5">{{ item.judul_quiz }}</h2>
                <b-card-text> <i class="fa fa-home"></i> {{ item.penyelenggara }} </b-card-text>
                <b-card-text>
                  <i class="fa fa-calendar ml-1"></i> {{ _actionViewDate(item.start_date) }} {{ item.times }}
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
                </b-card-text>
                <b-card-text>
                  <router-link
                    :to="{ path: '/p/quiz/live-quiz-detail-peserta', query: { _id: item._id } }"
                    class="btn btn-sm btn-dark m-1"
                  >
                    <i class="fa fa-users"></i> View Peserta
                  </router-link>
                  <router-link
                    v-if="item.type_start === 'REALTIMESOAL'"
                    :to="{ path: '/p/quiz/live-trigger-soal-quiz', query: { _id: item._id } }"
                    class="btn btn-sm btn-dark"
                  >
                    <i class="fa fa-leanpub"></i>
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
import moment from "moment";
export default {
  name: "MonitoringQuizPublisher",
  data() {
    return {
      items: [],
      token: null,
      dismissCountDown: 10,
      pathImages: "https://storage.googleapis.com/edutore-cdn/tryout/"
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetQuizLive();
    // this._actionTriggerSoal()
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    _actionGetQuizLive() {
      this.$axios
        .get("publisher-live-quiz", { headers: { "x-access-token": this.token } })
        .then(response => (this.items = response.data.data));
    },
    _actionViewDate(tgl) {
      if (tgl) {
        moment().locale("id");
        return moment(tgl).format("DD MMMM YYYY");
      }
      return "";
    }
  }
};
</script>

<style scoped></style>
