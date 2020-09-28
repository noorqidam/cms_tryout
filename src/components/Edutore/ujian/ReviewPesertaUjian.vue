<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-9">
        <h3>Review Peserta Ujian</h3>
        <h5>{{ dataUjian.judul_ujian }} - {{ judul_sesi }}</h5>
      </div>
      <div class="col-md-3 justify mb-1" style="text-align: -webkit-right; align-self: flex-end">
        <div class="col-md-12">
          <button class="btn btn-sm btn-dark mr-1" @click="_actionDownloadRecap">
            Download Rekap <i class="fa fa-file-excel-o"></i>
          </button>
        </div>
      </div>
      <div class="col-md-12 card">
        <div class="table-responsive">
          <table class="table table-md table-striped table-hover" id="table-peserta" style="font-size: 12px">
            <thead class="thead-dark">
              <tr>
                <th>
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </th>
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
                  Total Soal
                </th>
                <th class="text-center">
                  PG Dijawab
                </th>
                <th class="text-center">
                  Essay Dijawab
                </th>
                <th class="text-center">
                  Jawaban di review
                </th>
                <th class="text-center">
                  Skor PG
                </th>
                <th class="text-center">
                  Skor Essay
                </th>
                <th class="text-center">
                  Nilai Akhir
                </th>
                <th class="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody v-if="dataPeserta.length > 0" class="text-center tableBody">
              <tr v-for="(pesertaUjian, index) in dataPeserta" :key="index">
                <th v-if="pesertaUjian.isReviewed == false">
                  <input type="checkbox" disabled />
                </th>
                <th v-else>
                  <input type="checkbox" :value="pesertaUjian" v-model="selected" />
                </th>
                <th>
                  {{ index + 1 }}
                </th>
                <td>{{ pesertaUjian.nama_peserta }}</td>
                <td>{{ pesertaUjian.email }}</td>
                <td>{{ pesertaUjian.total_soal_all }}</td>
                <td>{{ pesertaUjian.dijawab_pg }}/{{ pesertaUjian.total_soal_pg }}</td>
                <td>{{ pesertaUjian.dijawab_esay }}/{{ pesertaUjian.total_soal_esay }}</td>
                <td>{{ pesertaUjian.jawaban_di_review }}/{{ pesertaUjian.dijawab_esay }}</td>
                <td>
                  <span v-if="pesertaUjian.skor_pg >= 70" class="badge badge-success" style="font-size:12px">
                    {{ pesertaUjian.skor_pg }}/100
                  </span>
                  <span
                    v-else-if="pesertaUjian.skor_pg <= 70"
                    class="badge badge-danger"
                    style="font-size:12px"
                  >
                    {{ pesertaUjian.skor_pg }}/100
                  </span>
                </td>
                <td>
                  <span
                    v-if="pesertaUjian.skor_esay >= 70"
                    class="badge badge-success"
                    style="font-size:12px"
                  >
                    {{ pesertaUjian.skor_esay }}/100
                  </span>
                  <span
                    v-else-if="pesertaUjian.skor_esay <= 70"
                    class="badge badge-danger"
                    style="font-size:12px"
                  >
                    {{ pesertaUjian.skor_esay }}/100
                  </span>
                </td>
                <td v-if="pesertaUjian.isReviewed == true">
                  <span
                    v-if="pesertaUjian.nilai_akhir >= 70"
                    class="badge badge-success"
                    style="font-size:12px"
                  >
                    {{ pesertaUjian.nilai_akhir }}
                  </span>
                  <span
                    v-else-if="pesertaUjian.nilai_akhir <= 70"
                    class="badge badge-danger"
                    style="font-size:12px"
                  >
                    {{ pesertaUjian.nilai_akhir }}
                  </span>
                </td>
                <td v-else-if="pesertaUjian.isReviewed == false">
                  Belum di Nilai
                </td>
                <td v-if="pesertaUjian.isReviewed == false" class="text-center">
                  <span
                    class="badge badge-info btn text-white"
                    style="font-size:12px"
                    @click="_actionReviewNilaiPeserta(pesertaUjian.user_id)"
                    >Beri Nilai Peserta</span
                  >
                </td>
                <td v-else-if="pesertaUjian.jumlah_soal == 0" class="text-center">
                  <span class="badge badge-info text-white" style="font-size:12px">Tidak Ada Review</span>
                </td>
                <td v-else class="text-center">
                  <span
                    class="badge badge-primary btn text-white mb-1"
                    style="font-size:12px"
                    @click="_actionReviewNilaiPeserta(pesertaUjian.user_id)"
                    >Edit Nilai Peserta</span
                  >
                  <button
                    class="badge badge-success btn ml-2 mt-md-0 mt-1"
                    style="font-size:12px"
                    @click="_actionSendEmail(pesertaUjian)"
                  >
                    <i class="fa fa-paper-plane"></i> Kirim Email
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr class="text-center">
                <td colspan="12">Tidak ada data Peserta</td>
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
                  :key="peserta.user_id"
                  class="badge badge-info text-white m-1"
                  style="font-size: 14px"
                >
                  {{ peserta.email }}
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
      <!-- Modal Send Email Personal -->
      <div class="col-md-12">
        <div class="col-md-12">
          <b-modal v-model="modalEmailPersonal" size="md" hide-footer hide-header>
            <div class="row">
              <div class="col-md-12 text-center">
                <p>Kirim Email ke:</p>
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
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
import io from "socket.io-client";
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
      dataEmail: [],
      dataEmailPersonal: {},
      dataSelected: {},
      dataUjian: [],
      judul_sesi: ""
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.query.ujian_id;
    let sesi_id = this.$route.query.sesi_ujian;
    this.sesi_id = sesi_id;
    this.ujian_id = id;
    this._actionGetPeserta();
  },
  methods: {
    _actionRealtime() {
      // const socket = io("http://localhost:3000");
      const socket = io("https://api-tryout.edutore.net");
      socket.on(
        "email_sent",
        function(data) {
          if (data) {
            this.$notify({
              group: "foo",
              title: "Berhasik kirim email ke",
              text: data.info.email
            });
          }
        }.bind(this)
      );
    },
    _actionGetPeserta() {
      this.$axios
        .get("review-sesi-ujian/peserta-sesi?ujian_id=" + this.ujian_id + "&sesi_id=" + this.sesi_id, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success == "true") {
            this.dataPeserta = response.data.data;
            this.dataUjian = response.data.ujian;
            this.judul_sesi = response.data.sesi_ujian;
          }
        })
        .catch(err => console.log(err));
    },
    _actionReviewNilaiPeserta(user_id) {
      this.$router.push({
        path: "/ujian/review-nilai-peserta-ujian",
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
        let Attributes = [
          "No",
          "Nama",
          "Email",
          "Total Soal",
          "Total Soal PG / Dijawab",
          "Total Soal Essay / Dijawab",
          "Jawaban di review",
          "Skor PG",
          "Skor Essay",
          "Nilai Akhir"
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
          let dataPeserta = [
            ++n,
            element.nama_peserta,
            element.email,
            element.total_soal_all,
            element.total_soal_pg + "/" + element.dijawab_pg,
            element.total_soal_esay + "/" + element.dijawab_esay,
            element.jawaban_di_review + "/" + element.dijawab_esay,
            element.skor_pg,
            element.skor_esay,
            element.nilai_akhir
          ];
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
          if (this.dataPeserta[i].isReviewed === true) {
            this.selected.push(this.dataPeserta[i]);
          }
        }
      }
    },
    _actionShowModalEmail() {
      this.modalEmail = true;
      let b = [];
      this.selected.forEach(a => {
        b.push({
          email: a.email,
          nama_peserta: a.nama_peserta,
          judul_ujian: this.dataUjian.judul_ujian,
          sesi_ujian: this.judul_sesi,
          penyelenggara: this.dataUjian.penyelenggara,
          start_date: this.dataUjian.start_date,
          times: this.dataUjian.times,
          end_times: this.dataUjian.end_times,
          jumlah_soal: a.total_soal_pg,
          skor: a.nilai_akhir,
          jawaban_benar: a.point_pg,
          jawaban_salah: a.total_soal_pg - a.point_pg
        });
      });
      this.dataSelected = b;
    },
    _actionPostEmail() {
      const data = this.dataSelected;
      this.$axios
        .post("send-email-ujian/sesi-ujian", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this._actionRealtime();
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            type: "error",
            title: "Gagal Mengirim Email"
          });
        });
      this.modalEmail = false;
      this.selected = [];
      this.selectAll = false;
      this.dataSelected = {};
    },
    _actionSendEmail(data) {
      this.dataEmail = data.email;
      this.modalEmailPersonal = true;
      let a = [];
      a.push({
        email: data.email,
        nama_peserta: data.nama_peserta,
        judul_ujian: this.dataUjian.judul_ujian,
        sesi_ujian: this.judul_sesi,
        penyelenggara: this.dataUjian.penyelenggara,
        start_date: this.dataUjian.start_date,
        times: this.dataUjian.times,
        end_times: this.dataUjian.end_times,
        jumlah_soal: data.total_soal_pg,
        skor: data.nilai_akhir,
        jawaban_benar: data.point_pg,
        jawaban_salah: data.total_soal_pg - data.point_pg
      });
      this.dataEmailPersonal = a;
    },
    _actionPostEmailPersonal() {
      const data = this.dataEmailPersonal;
      this.$axios
        .post("send-email-ujian/sesi-ujian", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this._actionRealtime();
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            type: "error",
            title: "Gagal Mengirim Email"
          });
        });
      this.modalEmailPersonal = false;
      this.dataEmailPersonal = {};
    }
  }
};
</script>

<style scoped>
.scrollable {
  max-height: 600px;
  overflow: auto;
}
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
