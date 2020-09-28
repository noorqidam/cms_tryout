<template>
  <div class="col-md-12">
    <!-- modal -->
    <b-modal
      v-model="isLoading"
      size="sm"
      centered=""
      hide-footer=""
      hide-header=""
      body-bg-variant="default"
    >
      <div class="row">
        <div class="col-md-12">
          Loading...
        </div>
      </div>
    </b-modal>
    <!-- End modal -->
    <div class="row">
      <div class="col-md-9 mb-3">
        <h3 class="h3 text-center">Report Nilai Quiz {{ email }}</h3>
      </div>
      <div class="col-md-3 justify">
        <div class="col-md-1 offset-9">
          <button class="btn btn-sm btn-dark mr-1" @click="_actionDownloadRecap">
            <i class="fa fa-file-excel-o"></i>
          </button>
        </div>
      </div>
      <div class="col-12 col-md-3 card" style="max-height: 300px">
        <table class="table  table-sm table-hover">
          <thead>
            <tr class="text-center bg-dark">
              <td colspan="2" style="color:white">
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
                {{ items.Benar }}
              </td>
            </tr>
            <tr>
              <td>Salah</td>
              <td>
                {{ items.Salah }}
              </td>
            </tr>
            <tr>
              <td>Skor</td>
              <td>
                {{ items.Score }}
              </td>
            </tr>
            <tr>
              <td>Status Lulus</td>
              <td>
                <strong> {{ items.Lulus }}</strong>
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div class="col-12 col-md-8 card ml-md-5 scrollable">
        <table class="table table-sm table-hover">
          <thead class="thead-dark">
            <tr>
              <th scope="col-1" colspan="5" class="h3 text-center">
                Rekapipulasi Jawaban Quiz
              </th>
            </tr>
            <tr>
              <th scope="col-1">No</th>
              <th scope="col-1">Soal</th>
              <th scope="col-1">Jawaban</th>
              <th scope="col-1">Status Jawaban</th>
              <th scope="col-1">Nilai</th>
            </tr>
          </thead>
          <tbody v-if="soalDiJawab.length != 0">
            <tr v-for="(dijawab, index) in soalDiJawab" :key="index">
              <th>
                {{ index + 1 }}
              </th>
              <td v-if="dijawab.soal_id.soal_text">
                <p v-html="dijawab.soal_id.soal_text" />
              </td>
              <td v-if="dijawab.jawaban.jawaban">
                <p v-html="dijawab.jawaban.jawaban" />
              </td>
              <td>
                <span v-if="dijawab.jawaban.Benar == 'Benar'" class="badge badge-success">
                  {{ dijawab.jawaban.Benar }}
                </span>
                <span v-else class="badge badge-danger">{{ dijawab.jawaban.Benar }}</span>
              </td>
              <td>
                {{ dijawab.jawaban.Point }}
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
</template>

<script>
import xlsx from "xlsx";
export default {
  name: "ReportDetailQuizPeserta",
  data() {
    return {
      items: [],
      soalDiJawab: [],
      soalTidakDiJawab: [],
      token: null,
      id: null,
      email: "",
      user_id: null,
      currentPage: 1,
      perPage: 100,
      attributes: ["No", { key: "soal", label: "Soal" }, { key: "jawaban", label: "Jawaban" }],
      isLoading: true
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.id = this.$route.params.quiz_id;
    this.email = this.$route.query.email;
    this.user_id = this.$route.query.user_id;
    this._actionGetDetailPeserta();
    console.log(this.id);
  },
  methods: {
    _actionGetDetailPeserta() {
      let data = {
        quiz_id: this.id,
        email: this.email,
        user_id: this.user_id
      };
      this.$axios
        .post("detail-nilai-peserta-quiz?quiz_id=" + this.id, data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.soalDiJawab = response.data.data.SoalDiJawab;
            this.soalTidakDiJawab = response.data.data.SoalTidakDiJawab;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
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
      let data = this.soalDiJawab;
      if (data.length < 1) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Opss .. ",
          text: "Tidak ada data yang di rekap"
        });
      } else {
        let Attributes = ["No", "Soal", "Jawaban Peserta", "Hasil Jawaban", "Point"];
        let wscols = [{ wch: 8 }, { wch: 75 }, { wch: 40 }, { wch: 30 }, { wch: 30 }];
        parseData.push(Attributes);

        let n = 0;
        data.forEach(element => {
          let soal = element.soal_id;
          let jawaban = element.jawaban;
          let fixSoal = soal.soal_text.replace(/<(.|\n)*?>/g, "");
          let fixJawaban = jawaban.jawaban.replace(/<(.|\n)*?>/g, "");
          let nilaiPeserta = [++n, fixSoal, fixJawaban, element.jawaban.Benar, element.jawaban.Point];
          parseData.push(nilaiPeserta);
        });
        const ws = xlsx.utils.aoa_to_sheet(parseData);
        ws["!cols"] = wscols;
        let name = "detail_nilai_quiz";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP");
        /* generate file and send to client */
        xlsx.writeFile(wb, "rekap_" + name + ".xlsx");
      }
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
