<template>
  <div class="row">
    <div class="col-md-12">
      <h5 class="text-center">{{ items.judul_quiz }}</h5>
    </div>
    <div class="col-md-12">
      <b-progress v-if="!showButton" :max="max" height="1rem">
        <b-progress-bar :value="timer"> {{ timer }} s </b-progress-bar>
        <!-- <div id="" /> -->
      </b-progress>
    </div>
    <div class="col-md-12">
      <div class="table-responsive">
        <button class="btn btn-sm btn-danger m-1" @click="_actionStopQuiz(items)">
          <i class="fa fa-stop"></i> Hentikan Quiz
        </button>

        <table class="table table-md table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Soal Key</th>
              <th>Tipe Soal</th>
              <th>Kategori Soal</th>
              <th>Matapelajaran</th>
              <th>Kirim Soal</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, no) in soals">
              <tr :key="item._id">
                <td class="text-center">{{ ++no }}</td>
                <td>{{ item._id }}</td>
                <td>
                  {{ item.type_soal }}
                </td>
                <td>{{ item.category_id }}</td>
                <td>{{ item.matpel_id }}</td>
                <td>
                  <button
                    v-if="showButton"
                    class="btn btn-block btn-primary"
                    @click="_actionTriggerSoal(item)"
                  >
                    <i class="fa fa-toggle-right"></i>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TriggerSoalQuizPublisher",
  data() {
    return {
      soals: [],
      items: {},
      showButton: true,
      max: 0,
      timer: 0,
      countdown: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    // const auth = sessionStorage.getItem("authorized");
    const id = this.$route.query._id;
    this._id = id;
    this._actionGetDetail(id);
  },
  methods: {
    _actionGetDetail(id) {
      this.$axios
        .get(`publisher-live-quiz/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          console.log(response.data.data);
          this.items = response.data.data.quiz_id;
          this.max = this.items.durasi_soal;
          this.soals = response.data.data.soals;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionTriggerSoal(item) {
      const dataSoal = {
        soal: item
      };
      this.$axios
        .post("trigger-soal-quiz", dataSoal, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this._actionDeleteSoal(item._id);
            this.actionCounterTimeButton();
            this.$notify({
              group: "foo",
              title: "Yay .. ",
              type: "success",
              text: "Berhasil Kirim Soal"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionDeleteSoal(id) {
      const dataAkhir = this.soals.filter(item => item._id != id);
      this.soals = dataAkhir;
    },
    actionCounterTimeButton() {
      let quiz = this.items;
      this.showButton = false;
      // eslint-disable-next-line no-unused-vars
      let maxtime = parseInt(quiz.durasi_soal) + 4;
      this.max = maxtime;
      this.timer = maxtime;
      this.countdown = setInterval(() => {
        this.timer--;
        if (this.timer === 0) {
          this.showButton = true;
          clearInterval(this.countdown);
        }
      }, 1000);
    },
    _actionStopQuiz() {
      const data = {
        quiz_id: this.items._id
      };
      this.$axios
        .post("trigger-soal-quiz/show-nilai", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              title: "Yay .. ",
              type: "success",
              text: response.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
