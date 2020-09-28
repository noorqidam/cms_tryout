<template>
  <div class="row">
    <div class="col-md-2">
      <form class="form-horizontal">
        <label for="" class="pl-1"> <b> Matapelajaran </b> </label>
        <div class="ml-1">
          <input type="text" v-model="Filter" />
        </div>
        <div class="col-sm-12" style="max-height:400px;overflow: scroll;">
          <div v-for="m in filteredList" :key="m._id">
            <li style="list-style :none">
              <input type="checkbox" v-model="matpel" :value="m._id" @change="_actionFilter" />
              {{ m._id }} ({{ m.count }})
            </li>
          </div>
        </div>
        <hr />
        <label for="" class="pl-1"> <b> Kategory </b> </label>
        <div class="col-md-12" style="max-height:180px;overflow: scroll;">
          <div style="margin-left:0" v-for="l in moduletype" :key="l._id">
            <li style="list-style:none;">
              <input type="checkbox" v-model="level" :value="l._id" @change="_actionFilter" />
              {{ l._id }} ({{ l.count }})
            </li>
          </div>
        </div>
      </form>
    </div>
    <div class="col-md-10">
      <div class="row">
        <div class="col-md-2" v-for="item in items" :key="item._id">
          <router-link :to="{ path: 'detail-book/' + item._id }">
            <div class="p-1 m-0">
              <img
                v-if="item.image"
                v-lazy.container="pathImages + item.image"
                class="img-fluids mt-0"
                alt=""
              />
              <img v-else :src="pathImages + 'edutore.png'" class="img-fluid" alt="edutore" />
              <div class="mt-1 pt-1">
                <p>{{ item.module_name }}</p>
                <span> Rp {{ formatPrice(item.price) }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Books",
  data() {
    return {
      items: [],
      token: null,
      Filter: "",
      matpel: "",
      level: "",
      GroupMatpel: [],
      moduletype: [],
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/"
    };
  },
  computed: {
    filteredList() {
      if (this.Filter) {
        return this.GroupMatpel.filter(
          item => item._id.toLowerCase().indexOf(this.Filter.toLowerCase()) > -1
        );
      }
      return this.GroupMatpel;
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.actionGetAllBooks();
  },
  methods: {
    actionGetAllBooks() {
      this.$axios
        .get("publisher-books", { headers: { "x-access-token": this.token } })
        .then(response => {
          this.items = response.data.data.rows;
          this.moduletype = response.data.data.type;
        })
        .catch(err => {
          console.log(err);
        });
    },
    formatPrice(value) {
      if (value) {
        const val = (value / 1).toFixed(0).replace(".", ",");
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }

      return "0";
    },
    _actionFilter() {
      const { matpel } = this;
      const { level } = this;
      this.$router.push({
        path: "/p/books?",
        query: { matpel, level }
      });
      setTimeout(() => {}, 300);
    }
  }
};
</script>

<style scoped>
.cards {
  margin: 5px auto;
}
.img-fluids {
  height: 220px;
  width: auto;
}
</style>
