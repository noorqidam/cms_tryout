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
      <h5 class="text-center">Live Quiz</h5>
      <div v-if="items.length > 0">
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
                    <i class="fa fa-calendar ml-1"></i> {{ _actionViewDate(item.start_date) }}
                    {{ item.times }}
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
                      :to="{ path: '/live-quiz/detail-peserta', query: { _id: item._id } }"
                      class="btn btn-sm btn-dark m-1"
                    >
                      <i class="fa fa-users"></i> View Peserta
                    </router-link>
                    <router-link
                      v-if="item.type_start === 'REALTIMESOAL'"
                      :to="{ path: '/live-quiz/trigger-quiz', query: { _id: item._id } }"
                      class="btn btn-sm btn-dark"
                    >
                      <i class="fa fa-leanpub"></i>
                    </router-link>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
          <!-- <div class="card">
          <div class="card-body">
            <h4 class="title">{{ item.judul_quiz }}</h4>
            <p class="p">
              {{ item }}
            </p>
            <router-link :to="{ path: '/live-quiz-detail', query: { _id: item._id } }" class="btn btn-sm">
              <i class="fa fa-users"></i>
            </router-link>
            <router-link
              v-if="item.type_start === 'REALTIMESOAL'"
              :to="{ path: '/live-trigger-quiz', query: { _id: item._id } }"
              class="btn btn-sm"
            >
              <i class="fa fa-leanpub"></i>
            </router-link>
          </div>
        </div> -->
        </div>
      </div>
      <div v-else class="col-md-12">
        <div class="text-center">
          <h2>
            Tidak Ada Live Quiz Berlangsung
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import io from "socket.io-client";
import moment from "moment";
export default {
  name: "MonitoringQuizAdmin",
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
    _actionGetQuizLive() {
      this.$axios
        .get("live-quiz", { headers: { "x-access-token": this.token } })
        .then(response => (this.items = response.data.data));
    },
    _actionViewDate(tgl) {
      if (tgl) {
        moment().locale("id");
        return moment(tgl).format("DD MMMM YYYY");
      }
      return "";
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    }
    // _actionTriggerSoal() {
    //   const socket = io("https://api-tryout.edutore.net/api/v1/");

    //   socket.on("show_question", data => {
    //     if (data) {
    //       this.$notify({
    //         group: "foo",
    //         title: "Yay .. ",
    //         text: `New Question ${JSON.stringify(data)}`
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style scoped></style>
