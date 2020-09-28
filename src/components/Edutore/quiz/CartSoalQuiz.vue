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
            <!-- <div class="form-group row">
              <label for="" class="col-sm-4"> Durasi Quiz </label>
              <div class="col-sm-8">
                <input v-model="Form.durations" type="time" required />
              </div>
            </div> -->
            <div class="form-group row justify-content-center">
              <div class="col-md-3">
                <button class="btn btn-block btn-primary">
                  <i class="fa fa-save" />
                </button>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody style="color:black">
              <template v-for="(soal, i) in quizs">
                <tr :key="soal.id">
                  <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                  <td>{{ soal.value.soal_text }}</td>
                  <td>
                    <!-- <img
                      v-if="soal[0].soal_image"
                      v-lazy.container="pathImagesQ + soal.soal_image"
                      :alt="soal.soal_image"
                      srcset=""
                      style="heigth:60pxwidth:auto;max-width:200px"
                    >  -->
                  </td>
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
  name: "CartSoalQuiz",
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
      quizs: null,
      DB_NAME: "tryout",
      DB_VERSION: 3,
      totalCart: 0
    };
  },
  async created() {
    this.db = await this.getDb();
    this.quizs = await this._actionGetStoreQuiz();
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.query._id;
    this._actionGetQuizByid(id);
    this._actionGetSoalByUjianId();
    this._actionGetStoreQuiz();
  },
  methods: {
    _actionGetQuizByid(id) {
      this.$axios
        .get("quiz/" + id, { headers: { "x-access-token": this.token } })
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
    _actionGetSoalByUjianId() {
      let soalCart = localStorage.getItem("soal");
      this.items = JSON.parse(soalCart);
    },
    _actionStored() {
      let newQuizs = [];
      this.quizs.forEach(data => {
        newQuizs.push(data.value);
      });
      console.log(newQuizs);
      let data = {
        quiz_id: this.quiz._id,
        soal: newQuizs
      };
      console.log(data);
      this.$axios
        .post("soal-quiz/sub-soal", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.$notify({
            group: "foo",
            title: "Success Add ",
            text: response.data.message
          });
          console.log(response);
          this.deleteStoreDb();
          this.$router.push({
            path: "/quiz/quiz-detail",
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
    async _actionGetStoreQuiz() {
      return new Promise((resolve, reject) => {
        let getTransaction = this.db.transaction(["quizs"], "readonly");
        getTransaction.onerror = e => {
          console.log("Error", e);
          reject("Error");
        };
        getTransaction.oncomplete = e => {
          console.log(e);
          resolve(quizs);
        };
        let getStore = getTransaction.objectStore("quizs");
        let quizs = [];

        getStore.openCursor().onsuccess = e => {
          let cursor = e.target.result;
          if (cursor) {
            quizs.push(cursor.value);
            cursor.continue();
            console.log(quizs);
          }
        };
      });
    },
    async deleteIndexedDbByKey(soal) {
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
      this.quizs = [];
      this.listSoalFromCart(storeQuiz);
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
    },
    async listSoalFromCart(Soal) {
      let self = this;
      Soal.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          self.quizs.push(cursor.value);
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
          console.log("Success Open DB 2");
          resolve(e.target.result);
        };
        request.onupgradeneeded = e => {
          console.log("onupgradeneeded");
          let db = e.target.result;
          if (!db.objectStoreNames.contains("quizs") && !db.objectStoreNames.contains("ujians")) {
            let objectStore = db.createObjectStore("quizs", { autoIncrement: true, keyPath: "id" });
            let objectStore2 = db.createObjectStore("ujians", { autoIncrement: true, keyPath: "id" });
            objectStore.createIndex("quiz_id", "quiz_id", { unique: true });
            objectStore2.createIndex("ujian_id", "ujian_id", { unique: true });
          }
        };
      });
    }
  }
};
</script>
