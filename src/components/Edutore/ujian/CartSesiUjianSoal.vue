<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          {{ key_id }}
          <br />
          <div class="form-group row">
            <label for="" class="col-sm-4"> Nama Ujian </label>
            <div class="col-sm-8">
              {{ ujian.judul_ujian }}
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-4"> Premium </label>
            <div class="col-sm-8">
              <span v-if="ujian.is_premium" class="badeg badge-success"> Premium </span>
              <span v-else class="badge badge-primary font-xl"> Free </span>
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-4"> Tipe Ujian </label>
            <div class="col-sm-8">
              {{ ujian.type_ujian }}
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-4"> Penyelenggara Ujian </label>
            <div class="col-sm-8">
              {{ ujian.penyelenggara }}
            </div>
          </div>
          <div class="form-group row">
            <label for="" class="col-sm-4"> Sesi Ujian </label>
            <div class="col-sm-8">
              <input v-model="sesi_ujian" type="text" class="form-control" required />
            </div>
          </div>
          <div class="form-group row justify-content-center">
            <div class="col-md-3">
              <button class="btn btn-block btn-primary" @click="_actionStored">
                <i class="fa fa-save" /> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table class="table table-sm table-bordered table-striped table-hover">
            <thead class="thead-dark">
              <tr>
                <th>No</th>
                <th>Soal Text</th>
                <th>Soal Image</th>
                <th>Tipe Soal</th>
                <th>Category</th>
                <th>Matapelajaran</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody style="color:black">
              <template v-for="(soal, i) in ujians">
                <tr :key="soal.id">
                  <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                  <td><p v-html="soal.value.soal_text" /></td>
                  <td>
                    <img
                      v-if="soal.value.soal_image"
                      v-lazy.container="pathImagesQ + soal.value.soal_image"
                      :alt="soal.value.soal_image"
                      srcset=""
                      style="heigth:60pxwidth:auto;max-width:200px"
                    />
                  </td>
                  <td>{{ soal.value.type_soal }}</td>
                  <td>{{ soal.value.category_id }}</td>
                  <td>{{ soal.value.matpel_id }}</td>
                  <td>{{ soal.value.publisher_id }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="deleteIndexedDbByKey(soal)">
                      <i class="fa fa-trash"></i>
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
  name: "AddCartSesiSoalUjian",
  data() {
    return {
      items: [],
      Form: {},
      ujian: {},
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      key_id: null,
      sesi_ujian: {},
      duration: null,
      db: null,
      ujians: null,
      DB_NAME: "tryout",
      DB_VERSION: 3,
      totalCart: 0,
      ujian_id: null
    };
  },
  async created() {
    this.db = await this.getDb();
    this.ujians = await this._actionGetStoreQuiz();
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.query.sesi_id;
    this.ujian_id = this.$route.query.ujian_id;
    this.key_id = id;
    this._actionGetUjianByid(id);
    this._actionGetSoalByUjianId();
  },
  methods: {
    _actionGetUjianByid(id) {
      this.$axios
        .get("sesi-ujian/" + id, { headers: { "x-access-token": this.token } })
        .then(response => {
          let responseData = response.data;
          if (response.data.success === "true") {
            this.ujian = responseData.data.ujian_id;
            this.sesi_ujian = responseData.data.sesi_ujian;
            this.duration = responseData.data.duration;
            console.log(this.ujian);
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionGetSoalByUjianId() {
      let soalCart = localStorage.getItem("soal");
      this.items = JSON.parse(soalCart);
    },
    _actionStored() {
      let newUjians = [];
      this.ujians.forEach(data => {
        newUjians.push(data.value);
      });
      let data = {
        _id: this.key_id,
        soal: newUjians
      };
      this.$axios
        .post("sesi-ujian/sub-soal", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            title: "Success Add ",
            text: response.data.message
          });
          this.deleteStoreDb();
          this.$router.push({
            path: "/ujian/ujian-detail/" + this.ujian_id
          });
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            title: "Opps !",
            text: "Something Wrong"
          });
        });
    },
    async _actionGetStoreQuiz() {
      return new Promise((resolve, reject) => {
        let getTransaction = this.db.transaction(["ujians"], "readonly");
        getTransaction.onerror = e => {
          console.log("Error", e);
          reject("Error");
        };
        getTransaction.oncomplete = e => {
          console.log(e);
          resolve(ujians);
        };
        let getStore = getTransaction.objectStore("ujians");
        let ujians = [];

        getStore.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            ujians.push(cursor.value);
            cursor.continue();
            console.log(ujians);
          }
        };
      });
    },
    async deleteIndexedDbByKey(soal) {
      let soal_id = soal.id;
      let getTransaction = this.db.transaction("ujians", "readwrite");
      getTransaction.onerror = e => {
        console.log("Error", e);
      };
      getTransaction.oncomplete = e => {
        console.log(e);
      };
      let storeUjian = getTransaction.objectStore("ujians");
      storeUjian.delete(soal_id);
      this.ujians = [];
      this.listSoalFromCart(storeUjian);
    },
    async deleteStoreDb() {
      return new Promise((resolve, reject) => {
        let getTransaction = this.db.transaction(["ujians"], "readwrite");
        getTransaction.onerror = e => {
          console.log("Error", e);
          reject("Error");
        };
        getTransaction.oncomplete = e => {
          console.log(e);
          resolve();
        };
        let delStore = getTransaction.objectStore("ujians");
        delStore.clear();
      });
    },
    async listSoalFromCart(Soal) {
      let self = this;
      Soal.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          self.ujians.push(cursor.value);
          cursor.continue();
          console.log("print value " + cursor.value);
        } else {
          console.log("No more entries");
        }
      };
    },
    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);
        request.onerror = e => {
          console.log("Error opening DB", e);
          reject("Error");
        };
        request.onsuccess = e => {
          console.log("Success Open DB 2 cart sesi ujian");
          resolve(e.target.result);
        };
        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          if (!db.objectStoreNames.contains("ujians") && !db.objectStoreNames.contains("quizs")) {
            let objectStore = db.createObjectStore("ujians", { autoIncrement: true, keyPath: "id" });
            let objectStore2 = db.createObjectStore("quizs", { autoIncrement: true, keyPath: "id" });
            objectStore.createIndex("ujian_id", "ujian_id", { unique: true });
            objectStore2.createIndex("quiz_id", "quiz_id", { unique: true });
          }
        };
      });
    }
  }
};
</script>

<style scoped></style>
