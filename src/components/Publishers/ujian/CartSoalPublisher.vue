<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
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

            <div class="form-group row">
              <label for="" class="col-sm-4"> Sesi Ujian </label>
              <div class="col-sm-8">
                <input type="text" v-model="Form.sesi_ujian" class="form-control" required />
              </div>
            </div>
            <div class="form-group row justify-content-center">
              <div class="col-md-3">
                <button class="btn btn-block btn-primary"><i class="fa fa-save"></i></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <b-table
            show-empty
            small
            sticky-header
            head-variant="dark"
            responsive
            :items="SoalUjian"
            :fields="attribute"
          >
            <template v-slot:cell(No)="data">
              {{ data.index + 1 }}
            </template>
            <template v-slot:cell(soal)="data">
              <div v-if="data.item.value.soal_text">
                <p v-html="data.item.value.soal_text"></p>
              </div>
            </template>
            <template v-slot:cell(images)="data">
              <div v-if="data.item.value.soal_image">
                <img
                  v-if="data.item.value.soal_image"
                  v-lazy.container="pathImagesQ + data.item.value.soal_image"
                  :alt="data.item.value.soal_image"
                  srcset=""
                  style="heigth:60pxwidth:auto;max-width:200px"
                />
              </div>
            </template>
            <template v-slot:cell(category_id)="data">
              <div v-if="data.item.value.category_id">
                <p v-html="data.item.value.category_id"></p>
              </div>
            </template>
            <template v-slot:cell(matpel_id)="data">
              <div v-if="data.item.value.matpel_id">
                <p v-html="data.item.value.matpel_id"></p>
              </div>
            </template>
            <template v-slot:cell(type_soal)="data">
              <div v-if="data.item.value.type_soal">
                <p v-html="data.item.value.type_soal"></p>
              </div>
            </template>
            <template v-slot:cell(publisher_id)="data">
              <div v-if="data.item.value.publisher_id">
                <p v-html="data.item.value.publisher_id"></p>
              </div>
            </template>
            <template v-slot:cell(actions)="row">
              <b-button size="sm" @click="row.toggleDetails">
                <i class="fa fa-angle-down"></i>
              </b-button>
            </template>
            <template v-slot:cell(deleted)="row">
              <b-button size="sm" variant="danger" @click="deleteIndexDbkey(row.item)">
                <i class="fa fa-trash-o"></i>
              </b-button>
            </template>

            <template v-slot:row-details="row">
              <b-card v-if="row.item.value.jawabans.length > 0">
                <ol type="A">
                  <li v-for="(value, key) in row.item.value.jawabans" :key="key">
                    <label v-html="value.jawaban_text"></label> (point
                    <span class="badge badge-light"> {{ value.point }} </span> )
                  </li>
                </ol>
              </b-card>
              <b-card v-else>
                Tidak ada pilihan jawaban
              </b-card>
            </template>
            <template v-slot:table-busy>
              <div class="text-center text-dark my-2">
                <b-spinner class="align-middle" variant="dark" type="grow" label="Loading .."> </b-spinner>
                Loading ..
              </div>
            </template>
            <!-- <template v-slot:cell(pilih)="data">
              <input type="checkbox" v-model="Pilih" /> {{ data }}
            </template> -->
          </b-table>
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
      db: null,
      attribute: [
        "No",
        {
          key: "soal",
          label: "Soal text",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "images",
          label: "Soal Image",
          sortable: true,
          class: "text-center"
        },
        {
          key: "type_soal",
          label: "Tipe Soal",
          sortable: true,
          class: "text-center"
        },
        {
          key: "category_id",
          label: "Kategory",
          sortable: true,
          class: "text-center"
        },
        {
          key: "matpel_id",
          label: "Mata pelajaran",
          sortable: true,
          class: "text-center"
        },
        {
          key: "type_soal",
          label: "Tipe Soal",
          sortable: true,
          class: "text-center"
        },
        {
          key: "publisher_id",
          label: "Publisher",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" },
        { key: "deleted", label: "Hapus" }
      ]
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
        .get(`publisher-ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          const responseData = response.data;
          if (response.data.success === "true") {
            this.ujian = responseData.data;
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
        duration: this.Form.duration,
        sesi_ujian: this.Form.sesi_ujian,
        soal: NewSoalUjian
      };
      console.log(data);
      this.$axios
        .post("publisher-soal-ujian", data, { headers: { "x-access-token": this.token } })
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
