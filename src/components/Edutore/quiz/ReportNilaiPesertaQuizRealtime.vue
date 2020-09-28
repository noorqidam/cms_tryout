<template>
  <div v-if="isLoading === false" class="col-md-12">
    <div class="row">
      <div class="col-md-12 mb-3">
        <h3>Report Nilai Quiz</h3>
      </div>
      <div class="col-12 col-md-3 card" style="max-height: 300px">
        <table class="table table-hover">
          <thead>
            <tr class="text-center bg-info">
              <td colspan="2">
                Nilai Quiz
              </td>
            </tr>
            <tr>
              <td>Total Soal</td>
              <td>
                {{ items.totalSoal }}
              </td>
            </tr>
            <tr>
              <td>Di Jawab</td>
              <td>
                {{ items.dijawab }}
              </td>
            </tr>
            <tr>
              <td>Benar</td>
              <td>
                {{ items.benar }}
              </td>
            </tr>
            <tr>
              <td>Salah</td>
              <td>
                {{ items.salah }}
              </td>
            </tr>
            <tr>
              <td>Skor</td>
              <td v-if="items.nilai >= 70">
                <span class="badge badge-success" style="font-size: 12px">
                  {{ items.nilai }}
                </span>
              </td>
              <td v-else-if="items.nilai < 70">
                <span class="badge badge-danger" style="font-size: 12px">
                  {{ items.nilai }}
                </span>
              </td>
            </tr>
            <tr>
              <td>Status Lulus</td>
              <td v-if="items.lulus === true">
                Lulus
              </td>
              <td v-else>
                Tidak Lulus
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-12 col-md-8 card ml-md-5 scrollable">
        <table class="table table-sm table-striped table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col-1" colspan="5" class="text-center">Soal di Jawab</th>
            </tr>
            <tr>
              <th scope="col-1">No</th>
              <th scope="col-1">Soal</th>
              <th scope="col-1">Jawaban Peserta</th>
              <th scope="col-1">Hasil Jawaban</th>
              <th scope="col-1">Point</th>
            </tr>
          </thead>
          <tbody v-if="soalDiJawab.length != 0">
            <tr v-for="(dijawab, index) in soalDiJawab" :key="index">
              <th>
                {{ index + 1 }}
              </th>
              <td v-if="dijawab.soals[0].soal_text">
                <p v-html="dijawab.soals[0].soal_text" />
              </td>
              <td v-if="dijawab.jawaban.jawaban_text">
                <p v-html="dijawab.jawaban.jawaban_text" />
              </td>
              <td>
                <span v-if="dijawab.jawaban.benar === true" class="badge badge-success">
                  Benar
                </span>
                <span v-else class="badge badge-danger">Salah</span>
              </td>
              <td>
                {{ dijawab.jawaban.point }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <th colspan="5" class="text-center">Tidak ada soal yang di jawab</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else>
    Loading.....
  </div>
</template>

<script>
export default {
  name: "DetailNilaiPesertaQuizRealtimeAdmin",
  data() {
    return {
      items: [],
      soalDiJawab: [],
      soalTidakDiJawab: [],
      token: null,
      quiz_id: null,
      user_id: null,
      currentPage: 1,
      perPage: 100,
      attributes: ["No", { key: "soal", label: "Soal" }, { key: "jawaban", label: "Jawaban" }],
      isLoading: false
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.quiz_id = this.$route.params.quiz_id;
    this.user_id = this.$route.params.user_id;
    this._actionGetDetailPeserta();
  },
  methods: {
    _actionGetDetailPeserta() {
      this.isLoading = true;
      let data = {
        quiz_id: this.quiz_id,
        user_id: this.user_id
      };
      this.$axios
        .post("detail-nilai-peserta-quiz-realtime?quiz_id=" + this.quiz_id, data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.isLoading = false;
            this.items = response.data.data;
            this.soalDiJawab = this.items.answered;
            this.soalTidakDiJawab = this.items.unanswered;
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    }
  }
};
</script>
<style scoped>
.scrollable {
  max-height: 600px;
  overflow: auto;
}
</style>
