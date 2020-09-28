<template>
  <div v-if="isLoading === false" class="col-md-12">
    <div class="row">
      <div class="col-md-9">
        <h3>Detail Report Peserta Ujian</h3>
      </div>
      <div class="col-md-3 text-right">
        <div class="col-md-12">
          <button class="btn btn-sm btn-dark mr-1" @click="_actionDownloadRecap">
            <i class="fa fa-file-excel-o"></i> Download Rekap
          </button>
        </div>
      </div>
      <div class="col-md-12 card">
        <div class="table-responsive">
          <table class="table table-md table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <!-- <th scope="col-1">
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </th> -->
                <th scope="col-1">
                  No
                </th>
                <th scope="col">Nama</th>
                <th scope="col">
                  Email
                </th>
                <th scope="col">
                  Sekolah
                </th>
                <th scope="col">
                  Kelas
                </th>
                <th scope="col">
                  Terjawab
                </th>
                <th scope="col">
                  Skor PG
                </th>
                <th scope="col">
                  Skor Essay
                </th>
                <th scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody v-if="dataPeserta.length > 0">
              <tr v-for="(pesertaUjian, index) in dataPeserta" :key="index">
                <!-- <th>
                  <input type="checkbox" :value="pesertaUjian.email" v-model="selected" />
                </th> -->
                <th>
                  {{ index + 1 }}
                </th>
                <td>{{ pesertaUjian.name }}</td>
                <td>{{ pesertaUjian.email }}</td>
                <td>{{ pesertaUjian.nama_sekolah }}</td>
                <td v-if="pesertaUjian.kelas == 'No Data'" class="text-center" style="width:5%">
                  {{ pesertaUjian.kelas }}
                </td>
                <td v-else class="text-center" style="width:5%">
                  {{ pesertaUjian.kelas }} -
                  {{ pesertaUjian.sub_kelas ? pesertaUjian.sub_kelas.toUpperCase() : null }}
                </td>
                <td>{{ pesertaUjian.answered }} / {{ pesertaUjian.totalSoal }}</td>
                <td>
                  <span
                    v-if="pesertaUjian.score_pg >= 70"
                    class="badge badge-success"
                    style="font-size: 12px"
                  >
                    {{ pesertaUjian.score_pg }}
                  </span>
                  <span
                    v-else-if="pesertaUjian.score_pg < 70"
                    class="badge badge-danger"
                    style="font-size: 12px"
                  >
                    {{ pesertaUjian.score_pg }}
                  </span>
                </td>
                <td>
                  <span
                    v-if="pesertaUjian.score_esay >= 70"
                    class="badge badge-success"
                    style="font-size: 12px"
                  >
                    {{ pesertaUjian.score_esay }}
                  </span>
                  <span
                    v-else-if="pesertaUjian.score_esay < 70"
                    class="badge badge-danger"
                    style="font-size: 12px"
                  >
                    {{ pesertaUjian.score_esay }}
                  </span>
                  <span v-else>
                    Tidak ada Essay
                  </span>
                </td>
                <td>
                  <span
                    class="badge badge-info btn text-white"
                    style="font-size: 12px"
                    @click="_actionDetailNilaiUjianPeserta(sesi_id, pesertaUjian.user_id)"
                    >Details</span
                  >
                  <!-- <button class="badge badge-success btn ml-2" @click="_actionSendEmail(pesertaUjian.email)">
                    <i class="fa fa-paper-plane"></i>
                  </button> -->
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="9">Tidak ada data Peserta</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Modal Send Email Personal -->
      <div class="col-md-12">
        <div class="col-md-12">
          <b-modal v-model="modalEmailPersonal" size="md" hide-footer hide-header>
            <div class="row">
              <div class="col-md-12 text-center">
                <h5>Kirim Email ke:</h5>
                <span>{{ dataEmail }}</span>
                <div class="text-center mt-3">
                  <button class="btn btn-success btn-sm" @click="_actionPostEmailPersonal">
                    <i class="fa fa-paper-plane"></i>
                    Ya!
                  </button>
                  <button class="btn btn-danger btn-sm ml-2" @click="modalEmailPersonal = false">
                    <i class="fa fa-close"></i>
                    Tidak!
                  </button>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
      </div>
      <!-- End Modal Send Email Personal -->
      <div v-if="selected != ''" class="col-md-12">
        <button class="btn btn-success" @click="_actionShowModalEmail">
          <i class="fa fa-envelope"></i>
          Kirim Multiple Email
        </button>
        <!-- Modal Send Email -->
        <div class="col-md-12">
          <b-modal v-model="modalEmail" size="md" hide-footer hide-header>
            <div class="row">
              <div class="col-md-12 text-center">
                <h5>Kirim Email ke:</h5>
                <span
                  v-for="peserta in selected"
                  :key="peserta"
                  class="badge badge-info text-white m-1"
                  style="font-size: 16px"
                >
                  {{ peserta }}
                </span>
                <div class="text-center mt-3">
                  <button class="btn btn-success btn-sm" @click="_actionPostEmail">
                    <i class="fa fa-paper-plane"></i>
                    Ya!
                  </button>
                  <button class="btn btn-danger btn-sm ml-2" @click="modalEmail = false">
                    <i class="fa fa-close"></i>
                    Tidak!
                  </button>
                </div>
              </div>
            </div>
          </b-modal>
        </div>
        <!-- End Send Email -->
      </div>
    </div>
  </div>
  <div v-else>
    Loading....
  </div>
</template>

<script>
import xlsx from "xlsx";
export default {
  name: "DetailReportSesiUjianPeserta",
  data() {
    return {
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      ujian_id: null,
      sesi_id: null,
      token: null,
      dataPeserta: [],
      modalEmailPersonal: false,
      modalEmail: false,
      dataEmail: [],
      selected: [],
      selectAll: false,
      dataSelected: {},
      isLoading: false
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.params.ujian_id;
    let sesi_id = this.$route.params.sesi_id;
    this.sesi_id = sesi_id;
    this.ujian_id = id;
    this._actionGetPesertaUjian();
  },
  methods: {
    _actionGetPesertaUjian() {
      this.isLoading = true;
      let data = {
        ujian_id: this.ujian_id,
        sesi_id: this.sesi_id
      };
      this.$axios
        .post("rating-peserta-ujian", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.dataPeserta = response.data.data;
            this.isLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionDetailNilaiUjianPeserta(id, user_id) {
      this.$router.push({
        path: "/p/ujian/report-nilai-peserta-ujian",
        query: { ujian_id: this.ujian_id, sesi_id: id, user_id: user_id }
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
      let data = this.dataPeserta;
      if (data.length < 1) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Opss .. ",
          text: "Tidak ada data yang di rekap"
        });
      } else {
        let Attributes = ["No", "Nama", "Email", "Sekolah", "Kelas", "Terjawab", "Skor PG", "Skor Essay"];
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
            element.kelas + " - " + element.sub_kelas,
            element.answered + " / " + element.totalSoal,
            element.score_pg,
            element.score_esay
          ];
          parseData.push(dataPeserta);
        });
        const ws = xlsx.utils.aoa_to_sheet(parseData);
        ws["!cols"] = wscols;
        let name = "nilai_peserta_ujian";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP");
        xlsx.writeFile(wb, "rekap_" + name + ".xlsx");
      }
    },
    _actionSendEmail(email) {
      this.dataEmail = email;
      this.modalEmailPersonal = true;
      console.log(email);
    },
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.dataPeserta) {
          this.selected.push(this.dataPeserta[i].email);
        }
      }
    },
    _actionShowModalEmail() {
      this.modalEmail = true;
      console.log(this.selected);
      let b = [];
      this.selected.forEach(a => {
        b.push({
          email: a,
          ujian_name: this.ujian_id,
          test: "yaya",
          ini: "talkshow"
        });
      });
      this.dataSelected = b;
    },
    _actionPostEmail() {
      console.log(this.dataSelected);
      this.modalEmail = false;
      this.selected = [];
      this.selectAll = false;
      this.dataSelected = {};
    },
    _actionPostEmailPersonal() {
      console.log(this.dataEmail);
      const data = {
        email: this.dataEmail
      };
      console.log(data);
      this.modalEmailPersonal = false;
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
