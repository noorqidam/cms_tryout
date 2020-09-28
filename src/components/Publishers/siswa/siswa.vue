<template>
  <div class="row">
    <div class="col-md-12 pt-2">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-2 m-1">
              <button class="btn btn-sm btn-default" @click="actionGetSiswa">
                <i class="fa fa-refresh"></i> Muat Ulang
              </button>
            </div>
          </div>
          <table class="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Sekolah</th>
                <th>Kelas</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(siswa, i) in items">
                <tr :key="siswa._id">
                  <td>{{ ++i }}</td>
                  <td>{{ siswa.name }}</td>
                  <td>{{ siswa.email }}</td>
                  <td>{{ siswa.school }}</td>
                  <td>{{ siswa.kelas }} {{ siswa.sub_kelas }}</td>
                  <td>{{ new Date(siswa.createdAt) }}</td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="row justify-content-end">
            <div class="col-sm-auto">
              <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"></b-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiswaInPublisher",
  data() {
    return {
      items: [],
      kelas: null,
      token: null,
      currentPage: 1,
      perPage: 200,
      totalRows: 0
    };
  },
  watch: {
    currentPage() {
      this.actionGetSiswa();
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.actionGetSiswa();
  },
  methods: {
    actionGetSiswa() {
      this.$axios
        .get(`publisher-siswa-list?&page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          this.items = response.data.data.rows;
          this.totalRows = response.data.data.count;
        });
    },
    actionFilterSiswa() {
      this.$axios
        .get(`publisher-siswa-list?kelas=${this.kelas}&page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          this.items = response.data.data.rows;
          this.totalRows = response.data.data.count;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
