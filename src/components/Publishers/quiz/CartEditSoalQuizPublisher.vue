<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="_actionStored">
            <div class="form-group row">
              <label for="" class="col-sm-4"> Judul Quiz </label>
              <div class="col-sm-8">
                {{ quiz.judul_quiz }}
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-4"> Premium </label>
              <div class="col-sm-8">
                <span v-if="quiz.is_premium" class="badeg badge-success"> Premium </span>
                <span v-else class="badge badge-primary font-xl"> Free </span>
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-4"> Kategori Quiz </label>
              <div class="col-sm-8">
                {{ quiz.category_quiz }}
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-4"> Tipe Quiz </label>
              <div class="col-sm-8">
                {{ quiz.type_quiz }}
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-4"> Tipe Start Quiz </label>
              <div class="col-sm-8">
                {{ quiz.type_start }}
              </div>
            </div>
            <div class="form-group row">
              <label for="" class="col-sm-4"> Penyelenggara Ujian </label>
              <div class="col-sm-8">
                {{ quiz.penyelenggara }}
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <div class="col-md-3">
                <button class="btn btn-block btn-primary"><i class="fa fa-save" /> Tambah</button>
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
                <th>Category</th>
                <th>Matapelajaran</th>
                <th>Publisher</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody style="color:black">
              <template v-for="(soal, i) in SoalQuiz">
                <tr :key="soal.id">
                  <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                  <td v-html="soal.value.soal_text" />
                  <td>
                    <img
                      v-if="soal.value.soal_image"
                      v-lazy.container="pathImagesQ + soal.value.soal_image"
                      :alt="soal.value.soal_image"
                      srcset=""
                      style="heigth:60pxwidth:auto;max-width:200px"
                    />
                  </td>
                  <td>{{ soal.value.category_id }}</td>
                  <td>{{ soal.value.matpel_id }}</td>
                  <td>{{ soal.value.publisher_id }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="deleteIndexDbkey(soal)">
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
  name: "CartSoalQuizPublisher",
  data() {
    return {
      items: [],
      Form: {},
      quiz: {},
      currentPage: 1,
      perPage: 100,
      totalRows: 0,
      isLoading: false,
      token: null,
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      errors_message: null,
      db: null,
      SoalQuiz: []
    };
  },
  async created() {
    this.db = await this.getDb();
  },
  mounted() {
    // let auth = sessionStorage.getItem("authorized");
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.query._id;
    this._actionGetQuizByid(id);
  },
  methods: {
    _actionGetQuizByid(id) {
      this.$axios
        .get("publisher-quiz/" + id, { headers: { "x-access-token": this.token } })
        .then(response => {
          let responseData = response.data;
          if (response.data.success === "true") {
            this.quiz = responseData.data;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionStored() {
      let NewSoalQuiz = [];
      this.SoalQuiz.forEach(element => {
        NewSoalQuiz.push(element.value);
      });

      let data = {
        quiz_id: this.quiz._id,
        soal: NewSoalQuiz
      };
      this.$axios
        .post("publisher-soal-quiz/sub-soal", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            type: "success",
            title: "Success ",
            text: response.data.message
          });
          this.deleteStoreDb();
          this.$router.push({
            path: "/p/quiz/detail-quiz",
            query: { _id: this.quiz._id }
          });
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            group: "foo",
            title: "Opps !",
            text: err.response.data
          });
          console.log(err.response);
        });
    },
    async getDb() {
      return new Promise((resolve, reject) => {
        let request = window.indexedDB.open("soal_quiz", 3);
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
          let data = db.transaction("quizs", "readwrite");
          let storeQuiz = data.objectStore("quizs");
          this.coutIndexDb(storeQuiz);
          this.listSoalCart(storeQuiz);
        };
        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          if (!db.objectStoreNames.contains("quizs")) {
            let store = db.createObjectStore("quizs", { autoIncrement: true, keyPath: "id" });
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
          self.SoalQuiz.push(cursor.value);
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
      let getTransaction = this.db.transaction("quizs", "readwrite");
      getTransaction.onerror = e => {
        console.log("Error", e);
      };
      getTransaction.oncomplete = e => {
        console.log(e);
      };

      let storeQuiz = getTransaction.objectStore("quizs");
      storeQuiz.delete(soal_id);
      this.SoalQuiz = [];
      this.listSoalCart(storeQuiz);
    },
    async deleteStoreDb() {
      return new Promise((resolve, reject) => {
        let getTransaction = this.db.transaction(["quizs"], "readwrite");
        getTransaction.onerror = e => {
          console.log("Error", e);
          reject("Error");
        };
        getTransaction.oncomplete = e => {
          console.log(e);
          resolve();
        };
        let delStore = getTransaction.objectStore("quizs");
        delStore.clear();
      });
    }
  }
};
</script>
