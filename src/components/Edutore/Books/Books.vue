<template>
  <div class="col-md-12">
    <div class="row">
      <div class="col-md-2">
        <div class="col-md-12 card" style="min-height:380px;max-height:400px">
          <form class="form-horizontal">
            <label for="matpel">Mata Pelajaran</label>
            <div class="mb-2">
              <input type="text" v-model="Filter" />
            </div>
            <div style="min-height:75px;max-height:140px;overflow: auto">
              <div v-for="m in filteredList" :key="m._id">
                <li style="list-style :none">
                  <input type="checkbox" v-model="matpel" :value="m._id" @change="_actionFilter" />
                  {{ m._id }} ({{ m.count }})
                </li>
              </div>
              <div v-for="m in mata_pelajaran" :key="m.title" class="mt-1">
                <li style="list-style :none">
                  <input type="checkbox" v-model="matpel" :value="m.title" />
                  {{ m.title }} (15)
                </li>
              </div>
            </div>
            <hr />
            <label for="" class="pl-1">Kategory</label>
            <div style="min-height:75px;max-height:100px;overflow: auto">
              <div style="margin-left:0" v-for="l in moduletype" :key="l._id">
                <li style="list-style:none;">
                  <input type="checkbox" v-model="level" :value="l._id" @change="_actionFilter" />
                  {{ l.type }} (5)
                </li>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-10" style="min-height: 590px;max-height: 580px;overflow: auto">
        <div class="row">
          <div class="col-md-3 col-6" :key="index" v-for="(item, index) in paginatedItems">
            <div class="card card-custom" @click="_actionDetailsBook(item._id)">
              <div class="card-body text-center p-1 height-card">
                <img v-if="item.image" v-lazy.container="pathImages + item.image" class="img-fluid" alt="" />
              </div>
              <div class="pl-2 pr-2 pb-1">
                <p style="min-height: 30px" v-if="item.module_name.length > 30">
                  {{ item.module_name.substr(0, 35) }}....
                </p>
                <p style="min-height: 30px" v-else>{{ item.module_name }}</p>
                <span class="badge badge-info text-white" style="font-size:13px">
                  Rp {{ formatPrice(item.price) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-10 offset-md-2">
        <b-pagination
          @change="onPageChanged"
          :total-rows="totalRows"
          :per-page="perPage"
          v-model="currentPage"
          align="fill"
          first-number
          last-number
          class="mt-2"
          style="place-content: center"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BooksAdmin",
  data() {
    return {
      token: null,
      Filter: "",
      matpel: "",
      level: "",
      GroupMatpel: [],
      // moduletype: [],
      moduletype: [{ type: "Pelajar" }, { type: "Umum" }],
      mata_pelajaran: [
        { title: "Matematika" },
        { title: "Seni Budaya" },
        { title: "Bahasa Indonesia" },
        { title: "Bahasa Inggris" },
        { title: "Sains/IPA" },
        { title: "IPS" },
        { title: "Biologi" },
        { title: "Kimia" }
      ],
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      paginatedItems: [],
      currentPage: 1,
      perPage: 20,
      totalRows: null,
      items: []
    };
  },
  methods: {
    paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(page_number * page_size, (page_number + 1) * page_size);
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    _actionGetAllBooks() {
      this.$axios
        .get("books?limit=200", { headers: { "x-access-token": this.token } })
        .then(response => {
          this.items = response.data.data.rows;
          this.paginate(this.perPage, 0);
          this.totalRows = this.items.length;
        })
        .catch(err => {
          console.log(err);
        });
    },
    _actionDetailsBook(id) {
      this.$router.push({
        path: "/books/details-book/" + id
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
        path: "/books?",
        query: { matpel, level }
      });
      setTimeout(() => {}, 300);
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGetAllBooks();
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
  }
};
</script>

<style scoped>
.card-custom {
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 5px;
  margin-top: 5px;
  background-color: #fff;
  cursor: pointer;
}
.card-custom:hover {
  transform: translateY(-5px);
  opacity: 0.8;
  transition: 0.4s all ease;
}
.height-card {
  min-height: 335px;
}
@media (min-width: 230.98px) {
  .height-card {
    min-height: 0px;
  }
  .card-custom {
    height: 253px;
  }
}
@media (min-width: 330.98px) {
  .height-card {
    min-height: 0px;
  }
  .card-custom {
    height: 273px;
  }
}
@media (min-width: 375.98px) {
  .height-card {
    min-height: 0px;
  }
  .card-custom {
    height: 300px;
  }
}
@media (min-width: 464.98px) {
  .height-card {
    min-height: 0px;
  }
  .card-custom {
    height: 270px;
  }
}
@media (min-width: 768.98px) {
  .card-custom {
    height: 400px;
  }
}
</style>
