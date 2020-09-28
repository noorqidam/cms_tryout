<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12 mb-3">
        <h3>Detail Report Quiz</h3>
      </div>
      <div class="card col-12 col-md-3" style="max-height: 250px">
        <table class="bg-white table table-hover">
          <thead>
            <tr class="text-center bg-info">
              <td colspan="2">
                Rekap Quiz
              </td>
            </tr>
            <tr>
              <td>Total Peserta</td>
              <td>
                {{ dataQuiz.peserta }}
              </td>
            </tr>
            <tr>
              <td>Lulus</td>
              <td>
                {{ dataQuiz.lulus }}
              </td>
            </tr>
            <tr>
              <td>Tidak Lulus</td>
              <td>
                {{ dataQuiz.tidakLulus }}
              </td>
            </tr>
          </thead>
        </table>
        <button v-if="selected != ''" class="btn btn-success mb-2" @click="_actionShowModalEmail">
          <i class="fa fa-envelope"></i>
          Kirim Multiple Email
        </button>
      </div>
      <div class="col-12 col-md-8 card ml-md-5 scrollable">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th scope="col-1">
                  <input type="checkbox" v-model="selectAll" @click="select" />
                </th>
                <th scope="col-1">No</th>
                <th scope="col-1">Nama</th>
                <th scope="col-1">Email</th>
                <th scope="col-1">Sekolah</th>
                <th scope="col-1">Kelas</th>
                <th scope="col-1">Skor</th>
                <th scope="col-1">Actions</th>
              </tr>
            </thead>
            <tbody v-if="dataPeserta">
              <tr v-for="(rating, index) in dataPeserta" :key="index">
                <th>
                  <input type="checkbox" :value="rating" v-model="selected" />
                </th>
                <th>
                  {{ index + 1 }}
                </th>
                <td>{{ rating.name }}</td>
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
                  <button
                    class="badge badge-success btn ml-2"
                    style="font-size: 11px"
                    @click="_actionSendEmail(rating)"
                  >
                    Kirim Email
                  </button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <th colspan="8" class="text-center">Tidak ada data peserta</th>
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
        <!-- Modal Send Email -->
        <div class="col-md-12">
          <b-modal v-model="modalEmail" size="md" hide-footer hide-header scrollable>
            <div class="row">
              <div class="col-md-12 text-center">
                <h5>Kirim Email ke:</h5>
                <span
                  v-for="peserta in selected"
                  :key="peserta.user_id"
                  class="badge badge-info text-white m-1"
                  style="font-size: 16px"
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
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "reportDetailQuiz",
  data() {
    return {
      quiz_id: null,
      dataPeserta: [],
      dataQuiz: [],
      modalEmailPersonal: false,
      modalEmail: false,
      dataEmail: [],
      selected: [],
      selectAll: false,
      dataSelected: {},
      dataEmailPersonal: {},
      dataDetailQuiz: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.quiz_id = this.$route.params.quiz_id;
    this._actionGetReportQuiz();
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
    _actionGetReportQuiz() {
      let data = {
        quiz_id: this.quiz_id
      };
      this.$axios
        .post("rating-peserta-quiz", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.dataQuiz = response.data.data;
            this.dataPeserta = this.dataQuiz.ratingNilai;
            this.dataDetailQuiz = response.data.quiz;
          }
        })
        .catch(err => console.log(err));
    },
    _actionSendEmail(data) {
      this.dataEmail = data.email;
      this.modalEmailPersonal = true;
      let a = [];
      a.push({
        email: this.dataEmail,
        nama_peserta: data.name,
        judul_quiz: this.dataDetailQuiz.judul_quiz,
        penyelenggara: this.dataDetailQuiz.penyelenggara,
        start_date: this.dataDetailQuiz.start_date,
        times: this.dataDetailQuiz.times,
        end_times: this.dataDetailQuiz.end_times,
        jumlah_soal: data.totalSoal,
        skor: data.score,
        jawaban_benar: data.jawaban_benar,
        jawaban_salah: data.jawaban_salah
      });
      this.dataEmailPersonal = a;
    },
    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (let i in this.dataPeserta) {
          this.selected.push(this.dataPeserta[i]);
        }
      }
    },
    _actionShowModalEmail() {
      this.modalEmail = true;
      let b = [];
      this.selected.forEach(a => {
        b.push({
          email: a.email,
          nama_peserta: a.name,
          judul_quiz: this.dataDetailQuiz.judul_quiz,
          penyelenggara: this.dataDetailQuiz.penyelenggara,
          start_date: this.dataDetailQuiz.start_date,
          times: this.dataDetailQuiz.times,
          end_times: this.dataDetailQuiz.end_times,
          jumlah_soal: a.totalSoal,
          skor: a.score,
          jawaban_benar: a.jawaban_benar,
          jawaban_salah: a.jawaban_salah
        });
      });
      this.dataSelected = b;
    },
    _actionPostEmail() {
      const data = this.dataSelected;
      this.$axios
        .post("send-email-quiz", data, { headers: { "x-access-token": this.token } })
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
    _actionPostEmailPersonal() {
      const data = this.dataEmailPersonal;
      this.$axios
        .post("send-email-quiz", data, { headers: { "x-access-token": this.token } })
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
  /* overflow: auto; */
}
</style>
