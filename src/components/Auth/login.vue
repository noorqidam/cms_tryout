<template>
  <div class="app flex-row align-items-center">
    <b-modal
      v-model="is_loading"
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
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5">
          <!-- <button class="btn btn-sm btn-block btn-info" @click="actionStoredDB">Stored DB</button> -->
          <b-card-group>
            <b-card no-body class="p-2 border-blue">
              <b-card-body>
                <form v-on:submit.prevent="actionLogin">
                  <div class="form-group row">
                    <div class="form-group">
                      <div class="col-sm-4">
                        <img
                          src="https://storage.googleapis.com/edutore-cdn/edutpre.png"
                          alt="edutore"
                          style="height:45px;width:auto;margin:auto"
                        />
                      </div>
                    </div>
                    <div class="col-md-12 text-center">
                      <strong class="h4">LOGIN </strong>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <span class="input-group-addon">
                      <i class="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      v-model="Form.username"
                      class="form-control"
                      placeholder="Username"
                      autocomplete="username email"
                      required
                    />
                  </div>
                  <div class="input-group mb-4">
                    <span class="input-group-addon">
                      <i class="fa fa-key"></i>
                    </span>
                    <input
                      type="password"
                      v-model="Form.password"
                      class="form-control"
                      placeholder="Password"
                      autocomplete="current-password"
                      required
                    />
                  </div>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" type="submit" class="px-4">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </form>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// import { TesseractWorker } from 'tesseract.js';
// const worker = new TesseractWorker();
export default {
  name: "Login",
  data() {
    return {
      Form: {},
      is_loading: false
    };
  },
  methods: {
    actionLogin() {
      const data = this.Form;
      this.is_loading = true;
      this.$axios
        .post("login", data)
        .then(response => {
          this.is_loading = false;
          if (response.data.success == "true") {
            console.log(response.data.data);
            sessionStorage.setItem("username", response.data.data.username);
            sessionStorage.setItem("session_token", response.data.data.token);
            sessionStorage.setItem("authorized", response.data.data.authorized);
            sessionStorage.setItem("accountkey", response.data.data.accountkey);
            sessionStorage.setItem("role", response.data.data.role);
            sessionStorage.setItem("_id", response.data.data.id);
            sessionStorage.setItem("menu", JSON.stringify(response.data.data.menu));
            this.$swal({
              type: "success",
              text: response.data.message,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
            const authName = sessionStorage.getItem("authorized");
            if (authName === "EDUTORE") {
              this.$router.push({ path: "/" });
            } else if (authName === "PARTNER") {
              this.$router.push({ path: "/p" });
            } else {
              this.$router.push({ path: "/login" });
            }
          } else {
            this.is_loading = false;
            this.$swal({
              type: "error",
              text: response.data.message,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
          }
        })
        .catch(err => {
          console.log(err.message);
          if (err.message === "Network Error") {
            this.is_loading = false;
            this.$swal({
              type: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              title: "Server Off",
              text: "Server Terlalu Banyak Memproses"
            });
          } else if (err.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            this.is_loading = false;
            this.$swal({
              type: "error",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              text: err.response.data.message
            });
          } else if (err.request) {
            // The request was made but no response was received
            // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(err.request);
            this.is_loading = false;
            this.$swal({
              type: "error",
              // text: err.request,
              text: "No response was received",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
            this.is_loading = false;
            this.$swal({
              type: "error",
              text: err.message,
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000
            });
          }
        });
    }
  },
  mounted() {
    this.$notify({
      group: "foo",
      type: "error",
      title: "Welcome",
      text: "Please Login !"
    });
  }
};
</script>
