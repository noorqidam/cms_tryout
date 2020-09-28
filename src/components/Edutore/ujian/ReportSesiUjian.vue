<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-12 text-center">
        <h3>Detail Report Sesi Ujian</h3>
        <h5>{{ ujian_name }}</h5>
      </div>
      <div
        v-for="(sesi, index) in sesiUjian"
        :key="index"
        class="col-6 col-md-3 card ml-2"
        style="max-height: 400px;max-width:305px"
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
                {{ sesi.peserta.jumlahPeserta }}
              </td>
            </tr>
            <!-- <tr>
              <td>Lulus</td>
              <td>
                {{ sesi.peserta.lulus }}
              </td>
            </tr>
            <tr>
              <td>Tidak Lulus</td>
              <td>
                {{ sesi.peserta.tidakLulus }}
              </td>
            </tr> -->
            <tr class="text-center">
              <td colspan="2">
                <button
                  class="btn btn-info text-white mb-2"
                  @click="_actionDetailUjianPeserta(ujian_id, sesi.sesi_id)"
                >
                  <i class="fa fa-leanpub"></i> Details
                </button>

                <button
                  class="btn btn-success text-white ml-2 mb-2"
                  @click="_actionReviewPeserta(ujian_id, sesi.sesi_id)"
                >
                  <i class="fa fa-pencil"></i> Review
                </button>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import xlsx from "xlsx";
export default {
  name: "DetailNilaiPesertaUjian",
  data() {
    return {
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      ujian_id: null,
      token: null,
      sesiUjian: [],
      ujian_name: ""
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
            this.ujian_name = response.data.data[0].ujian_name;
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
    },
    _actionReviewPeserta(id, sesi_id) {
      this.$router.push({
        path: "/ujian/review-peserta-ujian",
        query: { ujian_id: id, sesi_ujian: sesi_id }
      });
    }
    // _actionDownloadRecap() {
    //   const wb = xlsx.utils.book_new();
    //   wb.Props = {
    //     Title: "Export Data Filter",
    //     Subject: "REKAP",
    //     Author: "EDUTORE",
    //     CreatedDate: new Date()
    //   };
    //   let parseData = [];
    //   let data = this.sesiUjian;
    //   if (data.length < 1) {
    //     this.$notify({
    //       group: "foo",
    //       type: "error",
    //       title: "Opss .. ",
    //       text: "Tidak ada data yang di rekap"
    //     });
    //   } else {
    //     let Attributes = ["No", "Nama Sesi Ujian", "Peserta", "Lulus", "Tidak Lulus"];
    //     let wscols = [
    //       { wch: 8 },
    //       { wch: 35 },
    //       { wch: 40 },
    //       { wch: 30 },
    //       { wch: 30 },
    //       { wch: 30 },
    //       { wch: 30 },
    //       { wch: 30 },
    //       { wch: 40 },
    //       { wch: 30 }
    //     ];
    //     parseData.push(Attributes);
    //     let n = 0;
    //     data.forEach(element => {
    //       let dataPeserta = [
    //         ++n,
    //         element.sesi_ujian,
    //         element.peserta.jumlahPeserta,
    //         element.peserta.lulus,
    //         element.peserta.tidakLulus
    //       ];
    //       parseData.push(dataPeserta);
    //     });
    //     const ws = xlsx.utils.aoa_to_sheet(parseData);
    //     ws["!cols"] = wscols;
    //     let name = "detail_sesi_ujian";
    //     xlsx.utils.book_append_sheet(wb, ws, "REKAP");
    //     /* generate file and send to client */
    //     xlsx.writeFile(wb, "rekap_" + name + ".xlsx");
    //   }
    // }
  }
};
</script>

<style scoped></style>
