<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12 mb-3">
        <h3>Report Nilai Ujian</h3>
      </div>
      <!-- <div class="col-md-3 justify">
        <div class="col-md-1 offset-9">
          <button class="btn btn-sm btn-dark mr-1" @click="_actionDownloadRecap">
            <i class="fa fa-file-excel-o"></i>
          </button>
        </div>
      </div> -->
      <div class="col-12 col-md-3 card" style="max-height: 370px">
        <table class="table table-hover">
          <thead>
            <tr class="text-center bg-info">
              <td colspan="2">
                Nilai Ujian
              </td>
            </tr>
            <tr>
              <td>Total Soal</td>
              <td>
                {{ items.totalSoal }}
              </td>
            </tr>
            <tr>
              <td>PG Dijawab</td>
              <td>
                {{ items.pg_dijawab }}
              </td>
            </tr>
            <tr>
              <td>Essay Dijawab</td>
              <td>
                {{ items.esay_dijawab }}
              </td>
            </tr>
            <tr>
              <td>PG Benar</td>
              <td>
                {{ items.pg_Benar }}
              </td>
            </tr>
            <tr>
              <td>PG Salah</td>
              <td>
                {{ items.pg_Salah }}
              </td>
            </tr>
            <tr>
              <td>Skor PG</td>
              <td v-if="items.score_pg >= 70">
                <span class="badge badge-success" style="font-size: 12px">
                  {{ items.score_pg }}
                </span>
              </td>
              <td v-else-if="items.score_pg < 70">
                <span class="badge badge-danger" style="font-size: 12px">
                  {{ items.score_pg }}
                </span>
              </td>
            </tr>
            <tr>
              <td>Skor Essay</td>
              <td v-if="items.score_esay >= 70">
                <span class="badge badge-success" style="font-size: 12px">
                  {{ items.score_esay }}
                </span>
              </td>
              <td v-else-if="items.score_esay === null">
                Tidak ada Essay
              </td>
              <td v-else-if="items.score_esay < 70">
                <span class="badge badge-danger" style="font-size: 12px">
                  {{ items.score_esay }}
                </span>
              </td>
            </tr>
            <!-- <tr>
              <td>Status Lulus</td>
              <td>
                {{ items.Lulus }}
              </td>
            </tr> -->
          </thead>
        </table>
      </div>
      <div class="col-12 col-md-8 card ml-md-5 table-responsive">
        <table class="table table-sm table-striped table-hover">
          <thead class="thead-dark">
            <!-- <tr>
              <th scope="col-1" colspan="5" class="text-center">Soal di Jawab</th>
            </tr> -->
            <tr>
              <th scope="col-1">No</th>
              <th scope="col-1">Soal</th>
              <th scope="col-1">Type Soal</th>
              <th scope="col-1">Jawaban Peserta</th>
              <th scope="col-1">Hasil Jawaban</th>
              <th scope="col-1">Point</th>
            </tr>
          </thead>
          <tbody v-if="soalDiJawab.length !== 0">
            <tr v-for="(dijawab, index) in soalDiJawab" :key="index">
              <th>
                {{ index + 1 }}
              </th>
              <td v-if="dijawab.soal_id.soal_text">
                <p v-html="dijawab.soal_id.soal_text" />
              </td>
              <td>
                {{ dijawab.soal_id ? dijawab.soal_id.type_soal : null }}
              </td>
              <td v-if="dijawab.jawaban.jawaban">
                <p v-html="dijawab.jawaban.jawaban" />
              </td>
              <td>
                <span v-if="dijawab.jawaban.benar == 'Benar'" class="badge badge-success">
                  {{ dijawab.jawaban.benar }}
                </span>
                <span v-else class="badge badge-danger">{{ dijawab.jawaban.benar }}</span>
              </td>
              <td>
                {{ dijawab.jawaban.point }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr class="text-center">
              <td colspan="5">Tidak ada Soal yang di Jawab</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="col-md-4 card ml-md-5">
        <b class="text-center m-md-3">Soal tidak di jawab</b>
        <b-table show-empty responsive :items="soalTidakDiJawab" :fields="attributes">
          <template v-slot:cell(No)="data">
            {{ data.index + 1 }}
          </template>
          <template v-slot:cell(soal)="data">
            <div v-if="data.item.soal_text">
              <p v-html="data.item.soal_text" />
            </div>
          </template>
          <template v-slot:cell(jawaban)="row">
            <b-button size="sm" @click="row.toggleDetails">
              <i class="fa fa-angle-down" />
            </b-button>
          </template>
          <template v-slot:row-details="row">
            <b-card v-if="row.item.jawabans.length > 0">
              <ol type="A">
                <li v-for="(value, key) in row.item.jawabans" :key="key">
                  <label v-html="value.jawaban_text" />
                </li>
              </ol>
            </b-card>
            <b-card v-else>
              Tidak ada pilihan jawaban
            </b-card>
          </template>
        </b-table>
      </div> -->
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
export default {
  name: "ReportnilaiPesertaUjian",
  data() {
    return {
      items: [],
      soalDiJawab: [],
      soalTidakDiJawab: [],
      token: null,
      sesi_id: null,
      ujian_id: null,
      user_id: null,
      currentPage: 1,
      perPage: 100,
      attributes: ["No", { key: "soal", label: "Soal" }, { key: "jawaban", label: "Jawaban" }]
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.sesi_id = this.$route.query.sesi_id;
    this.ujian_id = this.$route.query.ujian_id;
    this.user_id = this.$route.query.user_id;
    this._actionGetDetailNilaiPesertaUjian();
  },
  methods: {
    _actionGetDetailNilaiPesertaUjian() {
      let data = {
        sesi_id: this.sesi_id,
        user_id: this.user_id
      };
      this.$axios
        .post("detail-nilai-peserta-ujian?ujian_id=" + this.ujian_id, data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
            this.soalDiJawab = response.data.data.SoalDiJawab;
            this.soalTidakDiJawab = response.data.data.SoalTidakDiJawab;
          }
        })
        .catch(err => console.log(err));
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
            element.soal_id.soal_text,
            element.jawaban.jawaban,
            element.jawaban.benar,
            element.jawaban.point
          ];
          parseData.push(nilaiPeserta);
        });
        const ws = xlsx.utils.aoa_to_sheet(parseData);
        ws["!cols"] = wscols;
        let name = "detail_nilai_ujian";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP");
        /* generate file and send to client */
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
