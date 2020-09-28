<template>
  <div class="row">
    <div class="col-md-12">
      <router-link :to="{ path: '/p/admin/create' }" class="btn btn-sm btn-primary">
        <i class="fa fa-plus"></i> Admin
      </router-link>
    </div>
    <div class="col-md-12 pt-2">
      <div class="card">
        <div class="card-body">
          <table class="table table-sm table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Username</th>
                <th>Role</th>
                <th>Register</th>
                <th>Status</th>
                <th>Suspend</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(admin, i) in items">
                <tr :key="admin.id">
                  <td>{{ ++i }}</td>
                  <td>{{ admin.username }}</td>
                  <td>{{ admin.role }}</td>
                  <td>{{ new Date(admin.createdAt) }}</td>
                  <td>
                    <span v-if="!admin.suspend" class="badge badge-pill badge-success">
                      Active
                    </span>
                    <span v-else class="badge badge-pill badge-danger"> In Active </span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="actionSuspend(admin)">
                      <i class="fa fa-ban"></i> Suspend
                    </button>
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
export default {
  name: "Userlist",
  data() {
    return {
      items: [],
      token: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.actionGetAdmin();
  },
  methods: {
    actionGetAdmin() {
      this.$axios
        .get("publisher-admin-list", { headers: { "x-access-token": this.token } })
        .then(response => {
          this.items = response.data.data.rows;
        });
    },
    actionSuspend() {
      console.log("di klick");
      this.$swal({
        icon: "info",
        text: "Development",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 3000
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
