<template>
  <div class="row">
    <div class="col-md-6">
      <b-modal
        v-model="isLoading"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
      >
        <div class="row">
          <div class="col-md-12">
            Loading...
          </div>
        </div>
      </b-modal>
    </div>
    <div class="col-md-12 mb-3 text-right">
      <button class="btn btn-primary btn-sm" @click="_actionCreatePublisher">
        <i class="fa fa-plus"></i>
        Tambah
      </button>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table class="table table-sm table-bordered table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Publisher Name</th>
                <th>Address</th>
                <th>Email</th>
                <th>View</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, i) in items">
                <tr :key="item.id">
                  <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.address }}</td>
                  <td>{{ item.email }}</td>
                  <!-- <td> <button class="btn btn-sm btn-default" @click="_actionViewModule(item)"> <i class="fa fa-search"></i> </button> </td>
                    <td> <button class="btn btn-sm btn-default" @click="_actionViewLangganan(item)"> <i class="fa fa-search"></i> </button> </td> -->
                  <td>
                    <button class="btn btn-sm btn-default" @click="_actionView(item)">
                      <i class="fa fa-search"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <i
                      class="fa fa-pencil text-success mr-2 mt-2"
                      style="font-size: 18px; cursor: pointer"
                      @click="_actionEdit(item.id, item.name)"
                    ></i>
                    <i
                      class="fa fa-trash text-danger"
                      style="font-size: 18px; cursor: pointer"
                      @click="_actionDelete(item.id)"
                    ></i>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Publisher",
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      totalDebet: 0,
      session_token: null,
      isLoading: true
    };
  },
  watch: {
    currentPage() {
      this._actionGetTransaction();
    }
  },
  methods: {
    _actionGetTransaction() {
      this.isLoading = true;
      this.$axios
        .get(`publishers?&page=${this.currentPage}&limit=${100}`, {
          headers: { "x-access-token": this.session_token }
        })
        .then(response => {
          if (response.data.success === "true") {
            const data = response.data.data.rows.filter(item => {
              return item.status_delete === false;
            });
            this.items = data;
            this.totalRows = response.data.data.count;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(tgl) {
      return moment(tgl).format("DD-MM-YYYY");
    },
    _actionView(item) {
      this.$router.push({ path: "/reports/pendapatan-publishers", query: { id: item.id, name: item.name } });
    },
    _actionViewModule(item) {
      this.$router.push({ path: "/reports/pendapatan-publishers", query: { id: item.id, name: item.name } });
    },
    _actionViewLangganan(item) {
      this.$router.push({
        path: "/reports/rekap-langganan",
        query: { publisher_id: item.id, name: item.name }
      });
    },
    _actionCreatePublisher() {
      this.$router.push({
        path: "/publisher/create"
      });
    },
    _actionEdit(id, name) {
      this.$router.push({
        path: "/publisher/edit/" + id,
        query: { publisher_name: name }
      });
    },
    _actionDelete(id) {
      this.$axios
        .delete("publishers/" + id, { headers: { "x-access-token": this.session_token } })
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              title: "Hapus Publishers Berhasil ",
              text: response.data.message
            });
          }
          this._actionGetTransaction();
        })
        .catch(() => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opss .. ",
            text: "Ada Kesalahan di Server"
          });
        });
    }
  },
  mounted() {
    this.session_token = sessionStorage.getItem("session_token");
    this._actionGetTransaction();
  }
};
</script>

<style lang="scss" scoped></style>
