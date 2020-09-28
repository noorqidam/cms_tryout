<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <form v-on:submit.prevent="actionCreate">
            <div class="form-group row">
              <label for="" class="col-sm-2"> Kode Referal </label>
              <div class="col-sm-8">
                <multiselect
                  v-model="referal_code"
                  :options="options"
                  :custom-label="nameWithLang"
                  :loading="isLoadingSearch"
                  placeholder="Select one"
                  label="referal_code"
                  track-by="referal_code"
                  @search-change="asyncFind"
                >
                </multiselect>
                <!-- <pre class="language-json"><code>{{ Form.referal_code  }}</code></pre> -->
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> Sekolah </label>
              <div class="col-sm-5">
                <input type="text" v-model="Form.school" class="form-control form-control-sm" />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> Kelas </label>
              <div class="col-sm-1">
                <input type="text" v-model="Form.kelas" class="form-control form-control-sm" />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> Sub Kelas </label>
              <div class="col-sm-1">
                <input type="text" v-model="Form.sub_kelas" class="form-control form-control-sm" />
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-2"> Aktif </label>
              <div class="col-sm-3">
                <cswitch
                  type="default"
                  variant="success"
                  :pill="true"
                  :checked="false"
                  v-model="Form.actived"
                />
              </div>
            </div>
            <div class="form group row justify-content-center">
              <div class="col-md-2">
                <button class="btn btn-block btn-primary"><i class="fa fa-save"></i> Simpan</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cswitch from "../../Switch";

export default {
  name: "CreateReferalRegister",
  components: { cswitch },
  data() {
    return {
      Form: {},
      items: [],
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      showModal: false,
      token: null,
      options: [],
      referal_code: null,
      isLoadingSearch: false
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.actionGetData();
  },
  methods: {
    actionGetData() {
      this.$axios.get("category-ujian").then(response => {
        this.items = response.data.data.rows;
        this.totalRows = response.data.data.count;
      });
    },
    actionShowModal() {
      this.showModal = true;
    },
    actionCreate() {
      const data = {
        referal_code: this.referal_code.referal_code,
        school: this.Form.school,
        kelas: this.Form.kelas,
        sub_kelas: this.Form.sub_kelas,
        actived: this.Form.actived
      };
      this.$axios
        .post("referal-register", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            title: "Success",
            text: response.data.message
          });
          this.showModal = false;
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            title: "error",
            text: err.response.data.message
          });
        });
    },
    nameWithLang({ referal_code, agent_name }) {
      return ` ${referal_code} | ${agent_name}`;
    },
    asyncFind(query) {
      if (query.length > 2) {
        this.isLoadingSearch = true;
        this.$axios
          .get("master-referal/search?referal_code=" + query, {
            headers: { "x-access-token": this.token }
          })
          .then(response => {
            this.options = response.data.data.rows;
            this.isLoadingSearch = false;
          })
          .catch(() => {
            this.isLoadingSearch = false;
          });
      }
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped></style>
