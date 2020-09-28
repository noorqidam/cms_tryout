<template>
  <div class="col-md-12">
    <div class="row">
      <!-- <div class="col-md-1 offset-9">
        <button class="btn btn-sm btn-dark mr-1" @click="_actionDownloadRecap">
          <i class="fa fa-file-excel-o"></i>
        </button>
      </div> -->
      <div class="col-md-12 card scrollable">
        <h3 class="h3 text-center p-2">Review Peserta Ujian</h3>
        <div class="table-responsive">
          <table class="table table-sm table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col-1">
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </th>
                <th scope="col-1">
                  No
                </th>
                <th scope="col">
                  Email
                </th>
                <th scope="col">
                  Total Soal
                </th>
                <th scope="col">
                  Total Soal Esay
                </th>
                <th scope="col">
                  Jawaban di review
                </th>
                <th scope="col">
                  Skor
                </th>
                <th scope="col" class="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody v-if="dataPeserta.length !== 0">
              <tr v-for="(pesertaUjian, index) in dataPeserta" :key="index">
                <th v-if="pesertaUjian.isReviewed == true">
                  <input type="checkbox" disabled />
                </th>
                <th v-else>
                  <input type="checkbox" :value="pesertaUjian.email" v-model="selected" />
                </th>
                <th>
                  {{ index + 1 }}
                </th>
                <td>{{ pesertaUjian.email }}</td>
                <td>{{ pesertaUjian.total_soal }}</td>
                <td>{{ pesertaUjian.total_soal_esay }}</td>
                <td>{{ pesertaUjian.jawaban_di_review }}</td>
                <td>
                  <span v-if="pesertaUjian.skor >= 70" class="badge badge-success" style="font-size:12px">
                    {{ pesertaUjian.skor }}
                  </span>
                  <span
                    v-else-if="pesertaUjian.soal_di_review == '0/0'"
                    class="badge badge-dark"
                    style="font-size:12px"
                  >
                    Belum Di Nilai
                  </span>
                  <span v-else-if="pesertaUjian.skor <= 70" class="badge badge-danger" style="font-size:12px">
                    {{ pesertaUjian.skor }}
                  </span>
                </td>
                <td v-if="pesertaUjian.isReviewed == false" class="text-center">
                  <span
                    class="badge badge-info btn text-white"
                    style="font-size:12px"
                    @click="_actionReviewNilaiPeserta(pesertaUjian.user_id)"
                    >Nilai Peserta</span
                  >
                </td>
                <td v-else-if="pesertaUjian.jumlah_soal == 0" class="text-center">
                  <span class="badge badge-info text-white" style="font-size:12px">Tidak Ada Review</span>
                </td>
                <td v-else class="text-center">
                  <span
                    class="badge badge-primary btn text-white"
                    style="font-size:12px"
                    @click="_actionReviewNilaiPeserta(pesertaUjian.user_id)"
                    >Edit Nilai Peserta</span
                  >
                  <button
                    class="badge badge-success btn ml-2 mt-md-0 mt-1"
                    style="font-size:12px"
                    @click="_actionSendEmail(pesertaUjian.email)"
                  >
                    <i class="fa fa-paper-plane"></i> Kirim Email
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="6">Tidak ada data Peserta</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="selected != ''" class="col-md-12">
        <button class="btn btn-success" @click="_actionShowModalEmail">
          <i class="fa fa-envelope"></i>
          Kirim Multiple Email
        </button>
        <!-- Modal Send Email -->
        <div class="col-md-12">
          <b-modal v-model="modalEmail" size="md" hide-footer title="Kirim Email Ke" header-bg-variant="info">
            <div class="row">
              <div class="col-md-12 text-center">
                <span
                  v-for="peserta in selected"
                  :key="peserta"
                  class="badge badge-info text-white m-1"
                  style="font-size: 14px"
                >
                  {{ peserta }}
                </span>
                <div class="text-center mt-3">
                  <button class="btn btn-success btn-sm">
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
      <!-- Modal Send Email Personal -->
      <div class="col-md-12">
        <div class="col-md-12">
          <b-modal v-model="modalEmailPersonal" size="md" hide-footer hide-header>
            <div class="row">
              <div class="col-md-12 text-center">
                <p>Kirim Email ke:</p>
                <span>{{ dataEmail }}</span>
                <div class="text-center mt-3">
                  <button class="btn btn-success btn-sm">
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
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
export default {
  name: "ReviewPesertaUjian",
  data() {
    return {
      ujian_id: null,
      sesi_id: null,
      token: null,
      dataPeserta: [],
      selected: [],
      selectAll: false,
      modalEmail: false,
      modalEmailPersonal: false,
      dataEmail: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.params.ujian_id;
    let sesi_id = this.$route.params.sesi_id;
    this.sesi_id = sesi_id;
    this.ujian_id = id;
    this._actionGetPeserta();
  },
  methods: {
    _actionGetPeserta() {
      this.$axios
        .get("review-sesi-ujian/peserta-sesi?ujian_id=" + this.ujian_id + "&sesi_id=" + this.sesi_id, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success == "true") {
            this.dataPeserta = response.data.data;
          }
        })
        .catch(err => console.log(err));
    },
    _actionReviewNilaiPeserta(user_id) {
      // this.$router.push({
      //   path: "/p/ujian/assesment-sesi-ujian/" + this.ujian_id + "/sesi/" + this.sesi_id + "/user/" + user_id
      // });
      this.$router.push({
        path: "/p/ujian/assesment-sesi-ujian/",
        query: { ujian_id: this.ujian_id, sesi_id: this.sesi_id, user_id: user_id }
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
        let Attributes = ["No", "Email"];
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
          let dataPeserta = [++n, element.email];
          parseData.push(dataPeserta);
        });
        const ws = xlsx.utils.aoa_to_sheet(parseData);
        ws["!cols"] = wscols;
        let name = "review_peserta_ujian";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP");
        xlsx.writeFile(wb, "rekap_" + name + ".xlsx");
      }
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
    },
    _actionSendEmail(email) {
      this.dataEmail = email;
      this.modalEmailPersonal = true;
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
