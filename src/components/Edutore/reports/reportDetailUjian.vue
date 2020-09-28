<template>
  <div class="col-md-12">
    <div class="col-md-12">
      <b-modal v-model="showModalAction" size="md" hide-footer hide-header>
        <div class="col-md-12">
          <div class="row">
            <!-- <div class="col-md-12">
              <h4 class="text-center">Kirim Email ke :</h4>
              <hr />
              {{ emailPersonal }}
              <b-popover target="popover-1" placement="right" title="Popover!" triggers="hover focus">
                <template v-slot:title>Pilih Sesi</template>
                <button v-for="n in 3" :key="n" class="btn btn-primary btn-sm btn-block">
                  Sesi {{ n++ }}
                </button>
              </b-popover>
            </div> -->
            <div class="col-md-12 text-center">
              <h5>Kirim Email ke:</h5>
              <span>{{ emailPersonal }}</span>
              <div class="text-center mt-3">
                <button class="btn btn-success btn-sm" @click="_actionPostEmailPersonal">
                  <i class="fa fa-paper-plane"></i>
                  Ya!
                </button>
                <button class="btn btn-danger btn-sm ml-2" @click="showModalAction = false">
                  <i class="fa fa-close"></i>
                  Tidak!
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
    <div class="col-md-12 mb-1">
      <div class="row">
        <div style="border-radius: 3px" class="bg-info p-1">PG</div>
        <span class="p-1">: Pilihan Ganda</span>
        <div style="border-left: 1px solid #292b2c" class="mx-1"></div>
        <div style="border-radius: 3px" class="bg-success p-1">ESY</div>
        <span class="p-1">: Essay</span>
        <div style="border-left: 1px solid #292b2c" class="mx-1"></div>
        <div style="border-radius: 3px" class="bg-primary p-1">NS</div>
        <span class="p-1">: Nilai Akhir Sesi</span>
      </div>
    </div>
    <div class="col-md-12 mb-1">
      <div class="row">
        <div class="col-md-12 text-right">
          <button v-if="selected != ''" class="btn btn-info btn-sm text-white" @click="_actionShowModal">
            Kirim Multiple Email
          </button>
          <button v-else disabled class="btn btn-info btn-sm text-white">
            Kirim Multiple Email
          </button>
          <!-- Modal Send Email -->
          <div class="col-md-12">
            <b-modal v-model="modalMultiEmail" size="md" hide-footer hide-header>
              <div class="row">
                <div class="col-md-12">
                  Kirim Email ke :
                </div>
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
                    <button class="btn btn-danger btn-sm ml-2" @click="modalMultiEmail = false">
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
    <div class="row">
      <div class="col-md-12 card scrollable">
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead class="bg-dark text-white">
              <tr>
                <th rowspan="3">
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </th>
                <th rowspan="3">No</th>
                <th rowspan="3" class="text-center">Email</th>
                <th :colspan="tablee" class="text-center">Nilai Sesi</th>
                <th rowspan="3" class="text-center">Nilai Akhir</th>
                <th rowspan="3" class="text-center">Actions</th>
              </tr>
              <tr class="bg-white text-dark">
                <th v-for="(row2, index) in reportPesertaUjian" :key="index" class="text-center">
                  {{ row2.sesi_ujian }}
                </th>
              </tr>
              <tr class="bg-white text-dark">
                <th v-for="(row, index) in tablee" :key="index" class="text-center">PG/ESY/NS</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(items, index) in reportPeserta" :key="index">
                <th v-if="items.is_reviewed == false">
                  <input type="checkbox" disabled />
                </th>
                <th v-else>
                  <input type="checkbox" :value="items" v-model="selected" />
                </th>
                <th>
                  {{ 1 + index++ }}
                </th>
                <td>{{ items.email }}</td>
                <td v-for="(items2, index) in items.sesi" :key="index">
                  <span v-if="items2.nilai_akhir == 'Belum diaprooved dan dinilai'">{{
                    items2.nilai_akhir
                  }}</span>
                  <span v-else>{{ items2.nilai_pg }}/{{ items2.nilai_esay }}/{{ items2.nilai_akhir }}</span>
                </td>
                <td>{{ items.nilai_akhir }}</td>
                <td>
                  <i
                    class="fa fa-chevron-right"
                    style="cursor: pointer"
                    @click="_actionModalPersonal(items)"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "ReportDetailUjian",
  data: () => ({
    reportPeserta: [],
    ujian_id: null,
    token: null,
    tablee: 0,
    selected: [],
    selectAll: false,
    showModalAction: false,
    reportPesertaUjian: [],
    modalMultiEmail: false,
    dataEmail: [],
    dataEmailPersonal: {},
    dataSelected: {},
    dataUjian: [],
    emailPersonal: ""
  }),
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.params.ujian_id;
    this.ujian_id = id;
    this._actionGetReportUjian();
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
    _actionGetReportUjian() {
      this.$axios
        .get("report-ujian-admin/" + this.ujian_id, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success == "true") {
            this.reportPeserta = response.data.data;
            this.reportPesertaUjian = response.data.sesi_ujian;
            this.tablee = this.reportPesertaUjian.length;
            this.dataUjian = response.data.ujian;
          }
        })
        .catch(err => console.log(err.response.data));
    },
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.reportPeserta) {
          if (this.reportPeserta[i].is_reviewed === true) {
            this.selected.push(this.reportPeserta[i]);
          }
        }
      }
    },
    _actionShowModal() {
      this.modalMultiEmail = true;
      let d = [];
      this.selected.forEach(a => {
        let b = [];
        this.reportPesertaUjian.forEach(c => {
          const sesi = a.sesi.filter(data => {
            return data.sesi_id === c._id;
          });
          b.push({
            sesi_ujian: c.sesi_ujian,
            nilai: sesi[0].nilai_akhir
          });
        });
        d.push({
          email: a.email,
          nama_peserta: a.name,
          judul_ujian: this.dataUjian.judul_ujian,
          penyelenggara: this.dataUjian.penyelenggara,
          start_date: this.dataUjian.start_date,
          times: this.dataUjian.times,
          end_times: this.dataUjian.end_times,
          // jumlahsoal: a.totalSoal,
          skor: a.nilai_akhir,
          sesi_ujian: b
        });
      });
      this.dataSelected = d;
    },
    _actionPostEmail() {
      const data = this.dataSelected;
      this.$axios
        .post("send-email-ujian", data, { headers: { "x-access-token": this.token } })
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
      this.selected = [];
      this.selectAll = false;
      this.dataSelected = {};
      this.modalMultiEmail = false;
    },
    _actionModalPersonal(data) {
      this.showModalAction = true;
      this.emailPersonal = data.email;
      let a = [];
      let b = [];
      this.reportPesertaUjian.forEach(c => {
        const sesi = data.sesi.filter(item => {
          return item.sesi_id === c._id;
        });
        b.push({
          sesi_ujian: c.sesi_ujian,
          nilai: sesi[0].nilai_akhir
        });
      });
      a.push({
        email: data.email,
        nama_peserta: data.name,
        judul_ujian: this.dataUjian.judul_ujian,
        penyelenggara: this.dataUjian.penyelenggara,
        start_date: this.dataUjian.start_date,
        times: this.dataUjian.times,
        end_times: this.dataUjian.end_times,
        // jumlahsoal: a.totalSoal,
        skor: data.nilai_akhir,
        sesi_ujian: b
      });
      this.dataEmailPersonal = a;
    },
    _actionPostEmailPersonal() {
      const data = this.dataEmailPersonal;
      this.$axios
        .post("send-email-ujian", data, { headers: { "x-access-token": this.token } })
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
      this.showModalAction = false;
      this.dataEmailPersonal = {};
    }
  }
};
</script>
