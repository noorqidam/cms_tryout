<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <h3 class="text-center">Detail Report Sesi Ujian</h3>
        <h4 class="text-center">{{ Ujian }}</h4>
      </div>
      <div v-for="(sesi, index) in sesiUjian" :key="index" class="col-12 col-md-4">
        <div class="card px-2">
          <table class="table table-hover">
            <thead>
              <tr class="text-center bg-info">
                <td colspan="3">Sesi Ujian {{ index + 1 }}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nama Sesi Ujian</td>
                <td colspan="3">
                  {{ sesi.sesi_ujian }}
                </td>
              </tr>
              <tr>
                <td>Peserta</td>
                <td colspan="3">
                  {{ sesi.peserta.jumlahPeserta }}
                </td>
              </tr>
              <!-- <tr>
                <td>Lulus</td>
                <td colspan="3">
                  {{ sesi.peserta.lulus }}
                </td>
              </tr>
              <tr>
                <td>Tidak Lulus</td>
                <td colspan="3">
                  {{ sesi.peserta.tidakLulus }}
                </td>
              </tr> -->
              <tr>
                <td>Lihat Detail</td>
                <td>
                  <router-link
                    :to="{ path: '/p/ujian/report-detail-ujian-sesi/' + ujian_id + '/sesi/' + sesi.sesi_id }"
                    class="btn btn-sm btn-info text-white"
                  >
                    <i class="fa fa-leanpub"></i> Detail
                  </router-link>
                </td>
                <td>
                  <!-- <router-link
                  :to="{ path: '/p/ujian/review-sesi-ujian/' + ujian_id + '/sesi/' + sesi.sesi_id }"
                  class="btn btn-sm btn-success text-white"
                >
                  <i class="fa fa-pencil"></i> Review
                </router-link> -->
                  <router-link
                    :to="{
                      path: '/p/ujian/review-sesi-ujian',
                      query: { ujian_id: ujian_id, sesi_ujian: sesi.sesi_id }
                    }"
                    class="btn btn-sm btn-success text-white"
                  >
                    <i class="fa fa-pencil"></i> Review
                  </router-link>
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
// import xlsx from "xlsx";
export default {
  name: "ReportSesiUjian",
  data() {
    return {
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      ujian_id: null,
      token: null,
      sesiUjian: [],
      Ujian: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.params.ujian_id;
    this.ujian_id = id;
    this._actionGetUjianPerSesi();
  },
  methods: {
    _actionGetUjianPerSesi() {
      let data = {
        ujian_id: this.ujian_id
      };
      this.$axios
        .post("detail-ujian-per-sesi", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.sesiUjian = response.data.data;
            this.Ujian = this.sesiUjian[0].ujian_name;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionDetailUjianPeserta(id, sesi_id) {
      this.$router.push({
        path: "/ujian/report-peserta-ujian",
        query: { ujian_id: id, sesi_ujian: sesi_id }
      });
    }
  }
};
</script>

<style scoped></style>
