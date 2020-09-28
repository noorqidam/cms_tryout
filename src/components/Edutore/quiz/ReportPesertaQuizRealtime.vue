<template>
  <section v-if="isLoading === false">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="col-md-12 mb-3">
            <h3>Detail Report Quiz</h3>
          </div>
        </div>
        <div class="col-12 col-md-3 card" style="max-height: 200px">
          <table class="table table-hover">
            <thead>
              <tr class="text-center bg-info">
                <td colspan="2">
                  Rekap Quiz
                </td>
              </tr>
              <tr>
                <td>Total Peserta</td>
                <td>
                  {{ dataPeserta.peserta }}
                </td>
              </tr>
              <tr>
                <td>Lulus</td>
                <td>
                  {{ dataPeserta.lulus }}
                </td>
              </tr>
              <tr>
                <td>Tidak Lulus</td>
                <td>
                  {{ dataPeserta.tidakLulus }}
                </td>
              </tr>
            </thead>
          </table>
        </div>
        <div class="col-md-8 col-12 card  ml-md-5">
          <div class="table-responsive">
            <table
              class="table table-md table-striped table-hover"
              id="table-peserta"
              style="font-size: 12px"
            >
              <thead class="thead-dark">
                <tr>
                  <th>
                    No
                  </th>
                  <th class="text-center">
                    Nama
                  </th>
                  <th class="text-center">
                    Email
                  </th>
                  <th class="text-center">
                    Sekolah
                  </th>
                  <th class="text-center">
                    Kelas
                  </th>
                  <th class="text-center">
                    Skor
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody v-if="dataPeserta" class="text-center tableBody">
                <tr v-for="(pesertaQuiz, index) in dataPeserta.ratingNilai" :key="index">
                  <th>
                    {{ index + 1 }}
                  </th>
                  <td>{{ pesertaQuiz.name }}</td>
                  <td>{{ pesertaQuiz.email }}</td>
                  <td>{{ pesertaQuiz.nama_sekolah }}</td>
                  <td>{{ pesertaQuiz.kelas }}</td>
                  <td style="font-size: 16px">
                    <span v-if="pesertaQuiz.score >= 70" class="badge badge-success">
                      {{ pesertaQuiz.score }}
                    </span>
                    <span v-if="pesertaQuiz.score < 70" class="badge badge-danger">
                      {{ pesertaQuiz.score }}
                    </span>
                  </td>
                  <td>
                    <span
                      @click="_actionDetailQuizPeserta(quiz_id, pesertaQuiz.user_id)"
                      class="badge badge-info btn text-white"
                      style="font-size: 13px"
                      >Details
                    </span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr class="text-center">
                  <td colspan="7">Tidak ada data Peserta</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else>
    <div class="col-md-12">
      Loading....
    </div>
  </section>
</template>

<script>
export default {
  name: "ReportQuizRealtimeAdmin",
  data: () => ({
    quiz_id: null,
    token: null,
    dataPeserta: [],
    isLoading: false
  }),
  mounted() {
    this.quiz_id = this.$route.params.quiz_id;
    this.token = sessionStorage.getItem("session_token");
    this._actionGetPeserta();
  },
  methods: {
    _actionGetPeserta() {
      this.isLoading = true;
      let data = {
        quiz_id: this.quiz_id
      };
      this.$axios
        .post("rating-peserta-quiz-realtime", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.isLoading = false;
            this.dataPeserta = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionDetailQuizPeserta(id, user_id) {
      this.$router.push({
        path: "/quiz/report-nilai-peserta-quiz-realtime/" + id + "/" + user_id
      });
    }
  }
};
</script>

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
