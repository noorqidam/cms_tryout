<template>
  <div class="row">
    <div class="col-md-12">
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
    <div class="col-md-12">
      {{ this.$route.query }}
      <div class="row">
        <!-- <div class="col-md-2 card" style="max-height:600px">
          <form>
            <label for="" class="text-left"> <b> Publishers </b>  </label>
            <div class="col-sm-12">
              <input type="checkbox" v-model="Filterspublishers" value="Edutore" @click="_actionFilter"> Edutore
            </div>

            <label for=""> <b> Matapelajaran </b>  </label>
            <div class="col-sm-12">
              <input type="checkbox" name="" id=""> IPA
            </div>

          </form>
          <div class="cards">
            <div class="card-body">

            </div>
          </div>
        </div> -->
        <div class="col-md-10">
          <div class="card">
            <div class="card-body">
              <h4 class="text-center h4">Bank Soal Filter</h4>
              <div class="row justify-content-end">
                <div class="col-sm-auto">
                  <label for="" class="text-bold">
                    Total Soal <b> {{ _formatPrice(totalRows) }} </b>
                  </label>
                </div>
              </div>
              <div style="overflow-x:auto;">
                <table class="table table-sm table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Soal Text</th>
                      <th>Soal Image</th>
                      <th>Category</th>
                      <th>Matapelajaran</th>
                      <th>Publisher</th>
                    </tr>
                  </thead>
                  <tbody style="color:black">
                    <template v-for="(item, i) in items">
                      <tr :key="item.id">
                        <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                        <td><p v-html="item.soal_text"></p></td>
                        <td>
                          <img
                            v-if="item.soal_image"
                            v-lazy.container="pathImagesQ + item.soal_image"
                            :alt="item.soal_image"
                            srcset=""
                            style="heigth:60pxwidth:auto;max-width:200px"
                          />
                        </td>
                        <td>{{ item.category_id }}</td>
                        <td>{{ item.matpel_id }}</td>
                        <td>{{ item.publisher_id }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>

              <div class="row justify-content-end">
                <div class="col-sm-auto">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                  ></b-pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BankSoal",
  data() {
    return {
      items: [],
      currentPage: 12,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      pathPembahasan: "https://storage.googleapis.com/edutore-cdn/public/soal/discussion/",
      Filterspublishers: []
    };
  },
  watch: {
    currentPage() {
      this._actionGetAll();
    }
    // Filterspublishers: function(val){
    //   this.$router.push({
    //     path:'/bank-soals/filter',
    //     query:{ val : val}
    //   })
    // }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetAll();
  },
  methods: {
    _actionFilter() {
      this.$router.push({
        path: "/bank-soals/filter",
        query: { _id: this.Filterspublishers }
      });
    },
    _actionGetAll() {
      this.$axios
        .get(`banksoal?page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.items = responseData.data.items;
            this.totalRows = responseData.data.paginator.itemCount;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>

<style scoped>
img[lazy="loading"] {
  /*your style here*/
  background-color: rgb(165, 157, 157);
}
img[lazy="error"] {
  /*your style here*/
  background-color: rgb(144, 105, 105);
}
</style>
