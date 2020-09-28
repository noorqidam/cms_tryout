<template>
  <div class="col-md-12">
    <div class="row">
      <h3>Campaign</h3>
      <div class="col-md-12 mb-2">
        <button class="btn btn-sm btn-info" @click="_actionShowModal">
          <i class="fa fa-plus" />
        </button>
      </div>
      <div class="col-md-12">
        <b-modal
          v-model="showModal"
          size="lg"
          hide-footer=""
          title="Add Category Quiz"
          header-bg-variant="primary"
        >
          <div class="row">
            <div class="col-md-12">
              <form @submit.prevent="_actionCreateCampaign">
                <div class="form-group row">
                  <label for="" class="col-sm-4">Campaign Title</label>
                  <div class="col-sm-8">
                    <input
                      v-model="form.campaign_title"
                      type="text"
                      name="title"
                      class="form-control"
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="" class="col-sm-4">Position</label>
                  <div class="col-sm-8">
                    <select v-model="form.position" class="form-control" name="position" required>
                      <option value="">
                        -- PILIH --
                      </option>
                      <option value="Footer">
                        Footer
                      </option>
                      <option value="Kiri">
                        Kiri
                      </option>
                      <option value="Kanan">
                        Kanan
                      </option>
                    </select>
                  </div>
                </div>
                <div class="form-group row">
                  <label for="" class="col-sm-4"> Publish </label>
                  <div class="col-sm-3">
                    <cswitch
                      v-model="form.publish"
                      type="default"
                      variant="success"
                      :pill="true"
                      :checked="false"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="" class="col-sm-4">Link</label>
                  <div class="col-sm-8">
                    <input v-model="form.link" type="text" name="link" class="form-control" required />
                  </div>
                </div>
                <div class="form-group row justify-content-center">
                  <div class="col-md-2">
                    <button class="btn btn-block btn-primary"><i class="fa fa-save" /> Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </b-modal>
      </div>
      <div class="col-md-12">
        <div class="table-responsive">
          <table class="table table-hover table-sm table-bordered table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col-1">
                  No
                </th>
                <th scope="col">
                  Banner
                </th>
                <th scope="col">
                  Campaign Title
                </th>
                <th scope="col">
                  Position
                </th>
                <th scope="col">
                  Publish
                </th>
                <th scope="col">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(campaign, index) in items" :key="campaign._id">
                <th>
                  {{ (currentPage - 1) * perPage + ++index }}
                </th>
                <td>
                  <img src="../../../assets/img/edutore.png" alt="" class="img-fluid" />
                </td>
                <td>{{ campaign.campaign_title }}</td>
                <td>{{ campaign.position }}</td>
                <td>
                  <span v-if="campaign.publish" class="badge badge-success">Publish</span>
                  <span v-else class="badge badge-danger">Unpublish</span>
                </td>
                <td>
                  <a href="https://edutore.com" target="_blank">{{ campaign.link }}</a>
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
import cswitch from "../../Switch";
export default {
  name: "Campaign",
  components: { cswitch },
  data() {
    return {
      items: [],
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesBanner: "https://storage.googleapis.com/edutore-cdn/tryout/",
      token: null,
      currentPage: 1,
      perPage: 100,
      // totalRows: false,
      showModal: false,
      form: {}
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetCampaign();
  },
  methods: {
    _actionGetCampaign() {
      this.$axios
        .get("campaign", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data;
          }
        })
        .catch(err => console.log(err));
    },
    _actionShowModal() {
      this.showModal = true;
    },
    _actionCreateCampaign() {
      let data = this.form;
      this.$axios
        .post("add-campaign", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            title: "Success",
            text: response.data.message
          });
          this.showModal = false;
          console.log(this.form);
          this._actionGetCampaign(this.currentPage);
          this.form = {};
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            title: "error",
            text: "Add Campaign Error"
          });
          this.showModal = false;
        });
    }
  }
};
</script>
<style scoped></style>
