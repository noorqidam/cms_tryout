<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="col-md-12">
          <h3 class="text-center mt-1">Detail Report Peserta Quiz</h3>
          <div class="row justify-content-end pt-2">
            <div class="col-md-2">
              <button class="btn btn-sm btn-dark" @click="DownloadReport">
                <i class="fa fa-file-excel-o"></i> Download
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table table-sm table-hover table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col-1">
                  No
                </th>
                <th>Nama</th>
                <th scope="col">
                  Email
                </th>
                <th>
                  Sekolah
                </th>
                <th>Kelas</th>
                <th>Jumlah Soal</th>
                <th>Di Jawab</th>
                <th>Tidak Di Jawab</th>
                <th scope="col">
                  Nilai
                </th>
                <th scope="col">
                  Tampilkan
                </th>
              </tr>
            </thead>
            <tbody v-if="dataPeserta.length > 0">
              <tr v-for="(pesertaQuiz, index) in dataPeserta" :key="index">
                <th>
                  {{ (currentPage - 1) * perPage + ++index }}
                </th>
                <td>{{ pesertaQuiz.name }}</td>
                <td>{{ pesertaQuiz.email }}</td>
                <td>{{ pesertaQuiz.nama_sekolah }}</td>
                <td>{{ pesertaQuiz.kelas }}</td>
                <td>{{ pesertaQuiz.totalSoal }}</td>
                <td>{{ pesertaQuiz.answered }}</td>
                <td>{{ pesertaQuiz.totalSoal - pesertaQuiz.answered }}</td>
                <td>{{ pesertaQuiz.score }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-primary"
                    @click="_actionDetailQuizPeserta(quiz_id, pesertaQuiz.email, pesertaQuiz.user_id)"
                  >
                    Details
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <th colspan="4" class="text-center">
                <h3>Tidak Ada Data</h3>
              </th>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
export default {
  name: "ReportQuizPublisher",
  data() {
    return {
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      quiz_id: null,
      token: null,
      dataPeserta: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.params.quiz_id;
    this.quiz_id = id;
    this._actionGetPesertaQuiz();
  },
  methods: {
    _actionGetPesertaQuiz() {
      let data = {
        quiz_id: this.quiz_id
      };
      this.$axios
        .post("rating-peserta-quiz", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.dataPeserta = response.data.data.ratingNilai;
            console.log(response.data.data.ratingNilai);
          }
        })
        .catch(err => console.log(err));
    },
    _actionDetailQuizPeserta(id, email, user_id) {
      this.$router.push({
        path: "/p/quiz/report-detail-quiz/" + id,
        query: { _id: id, email: email, user_id: user_id }
      });
    },
    DownloadReport() {
      const wb = xlsx.utils.book_new();
      wb.Props = {
        Title: "Export Data Filter",
        Subject: "REKAP",
        Author: "EDUTORE",
        CreatedDate: new Date()
      };
      let parseData = [];
      let data = this.dataPeserta;
      if (data.length < 1) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Opss .. ",
          text: "Tidak ada data yang di rekap"
        });
      } else {
        let Attributes = [
          "No",
          "Nama",
          "Email",
          "Sekolah",
          "Kelas",
          "Jumlah Soal",
          "Soal Yang di Jawab",
          "Soal tidak di Jawab",
          "Nilai"
        ];
        let wscols = [
          { wch: 8 },
          { wch: 35 },
          { wch: 40 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 30 },
          { wch: 40 },
          { wch: 30 }
        ];
        parseData.push(Attributes);
        let n = 0;
        data.forEach(element => {
          let nilaiPeserta = [
            ++n,
            element.name,
            element.email,
            element.nama_sekolah,
            element.kelas + " " + element.sub_kelas,
            element.totalSoal,
            element.answered,
            element.totalSoal - element.answered,
            element.score
          ];
          parseData.push(nilaiPeserta);
        });
        const ws = xlsx.utils.aoa_to_sheet(parseData);
        ws["!cols"] = wscols;
        let name = "RekapQuiz";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP");
        /* generate file and send to client */
        xlsx.writeFile(wb, "rekap_" + name + ".xlsx");
      }
    }
  }
};
</script>

<style scoped></style>
