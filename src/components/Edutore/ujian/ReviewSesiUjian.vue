<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12">
        <h3>Review Sesi Ujian {{ judul_ujian }}</h3>
      </div>
      <div v-if="sesiUjian.length > 0" class="col-md-12">
        <div class="row">
          <div
            v-for="(sesi, index) in sesiUjian"
            :key="index"
            class="col-5 col-md-3 card-custom mr-2 mb-2 bg-white"
          >
            <table class="table table-hover">
              <thead>
                <tr class="text-center bg-info">
                  <td colspan="2">Sesi Ujian {{ index + 1 }}</td>
                </tr>
                <tr>
                  <td>Nama Sesi Ujian</td>
                  <td>
                    {{ sesi.sesi_ujian }}
                  </td>
                </tr>
                <tr>
                  <td>Peserta</td>
                  <td>
                    {{ sesi.total_peserta }}
                  </td>
                </tr>
                <tr>
                  <td colspan="2" class="text-center">
                    <button
                      class="btn btn-info text-white"
                      style="font-size: 13px"
                      @click="_actionReviewPeserta(ujian_id, sesi.sesi_id)"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <div v-else class="col-md-12 card">
        <h4 class="text-center">Tidak Ada Data</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReviewSesiUjian",
  data() {
    return {
      ujian_id: null,
      token: null,
      sesiUjian: [],
      judul_ujian: ""
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.query.ujian_id;
    this.ujian_id = id;
    this._actionGetUjianPerSesi();
  },
  methods: {
    _actionGetUjianPerSesi() {
      this.$axios
        .get("review-sesi-ujian?ujian_id=" + this.ujian_id, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.sesiUjian = response.data.data;
            this.judul_ujian = response.data.judul_ujian;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionReviewPeserta(id, sesi_id) {
      this.$router.push({
        path: "/ujian/review-peserta-ujian",
        query: { ujian_id: id, sesi_ujian: sesi_id }
      });
    }
  }
};
</script>

<style scoped>
.card-custom {
  border-radius: 3px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  max-height: 300px;
  max-width: 300px;
}
</style>
