<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="_actionCreate">
            <div class="form-group row">
              <label for="" class="col-sm-3"> Username </label>
              <div class="col-sm-5">
                <input type="text" v-model="Form.username" class="form-control" required />
                {{ fulUsername }}
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3"> Password </label>
              <div class="col-sm-5">
                <input v-model="Form.password" :type="typeFiled" class="form-control" />
                <span
                  v-if="typeFiled === 'password'"
                  class="fa fa-fw fa-eye field-icon toggle-password"
                  @click="showPin"
                />
                <span
                  v-else
                  class="fa fa-fw fa-eye-slash field-icon toggle-password"
                  @click="showPin"
                  required
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3"> Role </label>
              <div class="col-sm-5">
                <select v-model="Form.role" class="form-control">
                  <option value=""> -- Pilih --</option>
                  <option value="STAF">STAF</option>
                  <option value="AUTHOR">AUTHOR</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-3"> Menu </label>
              <div class="col-sm-5">
                <table class="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Menu</th>
                      <th>Pilih</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(m, i) in menu">
                      <tr :key="m.id" :value="m">
                        <td>{{ ++i }}</td>
                        <td>{{ m.name }}</td>
                        <td>
                          <input type="checkbox" :key="m.id" v-model="mymenu" :value="m" :id="m.id" />
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <div class="col-sm-3">
                <button class="btn btn-block btn-primary">
                  Buat
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import cswitch from "../../Switch";
export default {
  name: "UserCreate",
  // components: { cswitch },
  data() {
    return {
      Form: {},
      menu: [],
      typeFiled: "password",
      mymenu: [],
      token: null,
      accountkey: null
    };
  },
  computed: {
    fulUsername: function() {
      // `this` points to the vm instance
      if (this.Form.username) {
        return this.Form.username + "@" + this.accountkey;
      }
      return null;
    }
  },
  mounted() {
    this.actionGetMasterMenu();
    this.token = sessionStorage.getItem("session_token");
    this.accountkey = sessionStorage.getItem("accountkey");
  },
  methods: {
    showPin() {
      this.typeFiled = this.typeFiled === "password" ? "text" : "password";
    },
    actionGetMasterMenu() {
      this.$axios.post("publisher-master-menu").then(response => {
        if (response.data.success == "true") {
          this.menu = response.data.data.rows;
        }
      });
    },
    _actionCreate() {
      let data = {
        username: this.Form.username + "@" + this.accountkey,
        password: this.Form.password,
        menus: this.mymenu,
        role: this.Form.role
      };
      this.$axios
        .post("publisher-add-admin", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              title: "Success Add ",
              text: response.data.message
            });
          }
          this.$router.push({ path: "/p/setting/admin" });
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            type: "error",
            text: err.response.data
          });
        });
    }
  }
};
</script>

<style scoped>
.field-icon {
  float: right;
  margin-left: -45px;
  margin-top: -25px;
  position: relative;
  z-index: 1;
}
</style>
