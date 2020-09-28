<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          {{ sesi.sesi_ujian }} || sesi {{ sesi._id }}
          <form v-on:submit.prevent="_actionStored">
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
            <!-- <div class="form-group row">
              <label for="" class="col-sm-4"> Durasi Ujian </label>
              <div class="col-sm-8">
                <input type="time" v-model="sesi.duration" required />
              </div>
            </div> -->
            <div class="form-group row">
              <label for="" class="col-sm-4"> Sesi Ujian </label>
              <div class="col-sm-8">
                <input type="text" v-model="sesi.sesi_ujian" class="form-control" required />
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <div class="col-md-3">
                <button class="btn btn-block btn-primary"><i class="fa fa-save"></i> Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <table class="table table-sm table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Soal Text</th>
                <th>Soal Image</th>
                <th>Tipe Soal</th>
                <th>Category</th>
                <th>Matapelajaran</th>
                <th>Tipe Soal</th>
                <th>Publisher</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody style="color:black">
              <template v-for="(item, i) in SoalUjian">
                <tr :key="item.value.id">
                  <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                  <td><p v-html="item.value.soal_text"></p></td>
                  <td>
                    <img
                      v-if="item.value.soal_image"
                      v-lazy.container="pathImagesQ + item.value.soal_image"
                      :alt="item.value.soal_image"
                      srcset=""
                      style="heigth:60pxwidth:auto;max-width:200px"
                    />
                  </td>
                  <td>{{ item.value.type_soal }}</td>
                  <td>{{ item.value.category_id }}</td>
                  <td>{{ item.value.matpel_id }}</td>
                  <td>{{ item.value.type_soal }}</td>
                  <td>{{ item.value.publisher_id }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="deleteIndexDbkey(item)">
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
  name: "AddSoalUjian",
  data() {
    return {
      items: [],
      SoalUjian: [],
      sesi: {},
      ujian: {},
      ujian_id: null,
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      db: null,
      sesi_id: null
    };
  },
  async mounted() {
    this.token = sessionStorage.getItem("session_token");
    const id = this.$route.query._id;
    this._actionGetUjianByid(id);
    this.db = await this.getDb();
  },
  methods: {
    _actionGetUjianByid(id) {
      this.$axios
        .get(`publisher-sesi-ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.sesi = responseData.data;
            this.ujian = responseData.data.ujian_id;
            this.ujian_id = this.ujian.ujian_id._id;
            this.sesi_id = this.sesi._id;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionStored() {
      let NewSoalUjian = [];
      /*** Set in Array SoalUjian 
       * beacause data in Storage DB Soal
       * soal_id: "5dca31bfa963690e623ef1f4"
          value: {_id: "5dca31bfa963690e623ef1f4", soal_text: "", 
          soal_image: "ql3qkMXMhP9PILO0gWMn_1551412686.png", 
          category_id: "SD/MI", matpel_id: "IPA", …}
          id: key @params id { autoincrement }
      */
      this.SoalUjian.forEach(element => {
        NewSoalUjian.push(element.value);
      });
      const data = {
        ujian_id: this.ujian._id,
        sesi_id: this.sesi._id,
        soal: NewSoalUjian
      };

      this.$axios
        .post("publisher-soal-ujian/sub-soal", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Success ",
            text: response.data.message
          });
          this.deleteStoreDb();
          this.$router.push({
            path: "/p/ujian/ujian-detail",
            query: { _id: this.ujian._id }
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
    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open("Ujian", 3);
        if (!window.indexedDB) {
          alert("Browser anda tidak mendukung IndexDB");
        }
        request.onerror = e => {
          console.log("Error opening DB", e);
          reject("Error");
        };
        request.onsuccess = e => {
          console.log("Success Open DB");
          resolve(e.target.result);
          let db = request.result;
          let data = db.transaction("ujian", "readwrite");
          let storeQuiz = data.objectStore("ujian");
          this.coutIndexDb(storeQuiz);
          this.listSoalCart(storeQuiz);
        };
        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          if (!db.objectStoreNames.contains("ujian")) {
            let store = db.createObjectStore("ujian", { autoIncrement: true, keyPath: "id" });
            store.createIndex("soal_id", "soal_id", { unique: true });
          }
        };
      });
    },
    async coutIndexDb(transaction) {
      console.log("count indexDB");
      let self = this;
      var countRequest = transaction.count();
      countRequest.onsuccess = function() {
        console.log(countRequest.result);
        self.totalCart = countRequest.result;
      };
    },
    async listSoalCart(Soal) {
      let self = this;
      Soal.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          self.SoalUjian.push(cursor.value);
          cursor.continue();
          console.log("print value " + cursor.value);
        } else {
          console.log("No more entries!");
        }
      };
    },
    async deleteIndexDbkey(soal) {
      console.log(soal);
      let soal_id = soal.id;
      let getTransaction = this.db.transaction("ujian", "readwrite");
      getTransaction.onerror = e => {
        console.log("Error", e);
      };
      getTransaction.oncomplete = e => {
        console.log(e);
      };

      let storeQuiz = getTransaction.objectStore("ujian");
      storeQuiz.delete(soal_id);
      this.SoalUjian = [];
      this.listSoalCart(storeQuiz);
    },
    async deleteStoreDb() {
      return new Promise((resolve, reject) => {
        let getTransaction = this.db.transaction(["ujian"], "readwrite");
        getTransaction.onerror = e => {
          console.log("Error", e);
          reject("Error");
        };
        getTransaction.oncomplete = e => {
          console.log(e);
          resolve();
        };
        let delStore = getTransaction.objectStore("ujian");
        delStore.clear();
      });
    }
  }
};
</script>

<style scoped></style>
