<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12 mb-3">
        <h3>Detail Report Peserta Quiz</h3>
      </div>
      <!-- <div class="col-md-3 justify mb-2" style="text-align: -webkit-right; align-self: flex-end">
        <div class="col-md-12">
          <button class="btn btn-sm btn-dark mr-1" @click="_actionDownloadRecap">
            Download <i class="fa fa-file-excel-o"></i>
          </button>
        </div>
      </div> -->
      <div class="col-12 col-md-3 card" style="max-height: 200px">
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
      <div class="col-md-8 col-12 card  ml-md-5">
        <div class="table-responsive">
          <table class="table table-md table-striped table-hover" id="table-peserta" style="font-size: 12px">
            <thead class="thead-dark">
              <tr>
                <th scope="col-1">No</th>
                <th scope="col-1">Nama</th>
                <th scope="col-1">Email</th>
                <th scope="col-1">Sekolah</th>
                <th scope="col-1">Kelas</th>
                <th scope="col-1">Skor</th>
                <th scope="col-1">Actions</th>
              </tr>
            </thead>
            <tbody v-if="dataPeserta" class="tableBody">
              <tr v-for="(rating, index) in dataPeserta.ratingNilai" :key="index">
                <th>
                  {{ index + 1 }}
                </th>
                <td>{{ rating.name }}</td>
                <td>{{ rating.email }}</td>
                <td>{{ rating.nama_sekolah }}</td>
                <td>{{ rating.kelas }}</td>
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
                  <span
                    class="badge badge-info btn text-white"
                    style="font-size: 13px"
                    @click="_actionDetailQuizPeserta(quiz_id, rating.user_id)"
                    >Details
                  </span>
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
  </div>
</template>

<script>
import xlsx from "xlsx";
export default {
  name: "DetailNilaiPesertaQuiz",
  data() {
    return {
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      quiz_id: null,
      token: null,
      dataPeserta: [],
      dataExcel: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.query.quiz_id;
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
            this.dataPeserta = response.data.data;
            this.dataExcel = response.data.data.ratingNilai;
          }
        })
        .catch(err => console.log(err));
    },
    _actionDetailQuizPeserta(id, user_id) {
      this.$router.push({
        path: "/quiz/report-nilai-peserta-quiz",
        query: { quiz_id: id, user_id: user_id }
      });
    },
    _actionDownloadRecap() {
      const wb = xlsx.utils.book_new();
      wb.Props = {
        Title: "Export Data Filter",
        Subject: "REKAP",
        Author: "EDUTORE",
        CreatedDate: new Date()
      };
      let parseData = [];
      let data = this.dataExcel;
      if (data.length < 1) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Opss .. ",
          text: "Tidak ada data yang di rekap"
        });
      } else {
        let Attributes = ["No", "Nama", "Email", "Sekolah", "Kelas", "Score"];
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
          let dataPeserta = [
            ++n,
            element.name,
            element.email,
            element.nama_sekolah,
            element.kelas,
            element.score
          ];
          console.log(dataPeserta);
          parseData.push(dataPeserta);
        });
        const ws = xlsx.utils.aoa_to_sheet(parseData);
        ws["!cols"] = wscols;
        let name = "nilai_peserta_quiz";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP");
        xlsx.writeFile(wb, "rekap_" + name + ".xlsx");
      }
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
