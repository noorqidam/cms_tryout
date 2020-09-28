<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12 mb-3">
        <h3>Detail Report Quiz</h3>
      </div>
      <div class="col-12 col-md-3 card">
        <table class="table table-hover">
          <thead>
            <tr class="text-center bg-info">
              <td colspan="2">
                Hasil Quiz
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
      <div class="col-12 col-md-8 card ml-md-5 scrollable">
        <table class="table table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col-1">No</th>
              <th scope="col-1">Email</th>
              <th scope="col-1">Sekolah</th>
              <th scope="col-1">Kelas</th>
              <th scope="col-1">Skor</th>
              <th scope="col-1">Actions</th>
            </tr>
          </thead>
          <tbody v-if="dataPeserta">
            <tr v-for="(rating, index) in dataPeserta.ratingNilai" :key="index">
              <th>
                {{ index + 1 }}
              </th>
              <td>
                {{ rating.email }}
              </td>
              <td>{{ rating.nama_sekolah }}</td>
              <td v-if="rating.kelas == 'No Data'">
                {{ rating.kelas }}
              </td>
              <td v-else>{{ rating.kelas }}</td>
              <td v-if="rating.score >= 70">
                <span class="badge badge-success" style="font-size: 11px">
                  {{ rating.score }}
                </span>
              </td>
              <td v-else-if="rating.score < 70">
                <span class="badge badge-danger" style="font-size: 11px">
                  {{ rating.score }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-dark">
                  <i class="fa fa-file-excel-o"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <th colspan="6" class="text-center">Tidak ada data peserta</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reportDetailQuizPublisher",
  data() {
    return {
      quiz_id: null,
      dataPeserta: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.quiz_id = this.$route.params.quiz_id;
    this._actionGetReportQuiz();
  },
  methods: {
    _actionGetReportQuiz() {
      let data = {
        quiz_id: this.quiz_id
      };
      this.$axios
        .post("rating-peserta-quiz", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.dataPeserta = response.data.data;
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.scrollable {
  max-height: 600px;
  overflow: scroll;
}
</style>
