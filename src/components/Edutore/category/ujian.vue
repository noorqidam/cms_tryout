<template>
  <div class="row">
    <div class="col-md-12">
      <button class="btn btn-sm btn-info" @click="_actionShowModal">
        <i class="fa fa-plus"></i>
      </button>
    </div>
    <div class="col-md-12">
      <b-modal
        v-model="showModal"
        size="lg"
        hide-footer=""
        title="Add Category Ujian"
        header-bg-variant="primary"
      >
        <div class="row">
          <div class="col-md-12">
            <form v-on:submit.prevent="_actionCreate">
              <div class="form-group row">
                <label for="" class="col-sm-4"> Title </label>
                <div class="col-sm-8">
                  <ValidationProvider rules="required|min:3" v-slot="{ errors }">
                    <input v-model="form.title" type="text" name="Judul Kategori" class="form-control" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-4"> Publish </label>
                <div class="col-sm-3">
                  <cswitch
                    type="default"
                    variant="success"
                    :pill="true"
                    :checked="false"
                    v-model="form.publish"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="" class="col-sm-4"> Description </label>
                <div class="col-sm-8">
                  <input type="text" v-model="form.description" class="form-control form-control-sm" />
                </div>
              </div>
              <div class="form group row justify-content-center">
                <div class="col-md-2">
                  <button class="btn btn-block btn-primary"><i class="fa fa-save"></i> Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </b-modal>
    </div>
    <div class="col-md-12 mt-2">
      <table class="table table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Publish</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, i) in items">
            <tr :key="item.id">
              <td>{{ (currentPage - 1) * perPage + ++i }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.description }}</td>
              <td>
                <span v-if="item.publish" class="badge badge-success"> Publish </span>
                <span v-else class="badge badge-danger"> Unpublish</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import cswitch from "../../Switch";

export default {
  name: "CategoryUjian",
  components: { cswitch },
  data() {
    return {
      form: {},
      items: [],
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      showModal: false,
      token: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetData();
  },
  methods: {
    _actionGetData() {
      this.$axios.get("category-ujian").then(response => {
        this.items = response.data.data.rows;
        this.totalRows = response.data.data.count;
      });
    },
    _actionShowModal() {
      this.showModal = true;
    },
    _actionCreate() {
      const data = this.form;
      this.$axios
        .post("category-ujian", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            title: "Success",
            text: response.data.message
          });
          this.showModal = false;
          this._actionGetData(this.currentPage);
        })
        .catch(err => {
          this.$notify({
            group: "foo",
            title: "error",
            text: err.response.data.message
          });
        });
    }
  }
};
</script>

<style scoped></style>
