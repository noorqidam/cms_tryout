<template>
  <div class="row">
    <div class="col-md-12">
      <template v-for="item in items">
        <div class="mb-4" :key="item.soal_id">
          <div class="card" style="margin-bottom:1px">
            <div class="card-header">
              <div class="media flex-wrap w-100 align-items-center">
                <img
                  v-if="item.photo"
                  :src="item.photo"
                  class="d-block ui-w-40 rounded-circle"
                  :alt="item.photo"
                />
                <img
                  v-else
                  src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg"
                  class="d-block ui-w-40 rounded-circle"
                  alt=""
                />
                <div class="media-body ml-3">
                  <a href="javascript:void(0)" data-abc="true">
                    <span class="font-lg">{{ item.attr ? item.attr.name : email }}</span>
                  </a>
                  <div class="text-muted small">{{ item.attr ? formatDate(item.attr.createdAt) : null }}</div>
                </div>
                <div class="text-muted small ml-3">
                  <div class="font-lg">
                    Type Soal <span class="badge badge-success badge-pill"> {{ item.type_soal }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p v-html="item.soal_text" />
              <img
                v-if="item.soal_image"
                :src="pathImagesQ + item.soal_image"
                :alt="item.soal_image"
                class="img img-thumbnail"
              />
              <blockquote class="col-md-12 info">
                <strong> Jawaban </strong>
                <p class="text-justify" v-html="item.jawaban_text"></p>
                <br />
                <!-- <code> Status -> {{ soal.pembahasan.is_show ? 'displayed' :'No displayed'}}</code> -->
              </blockquote>
            </div>
            <div class="d-flex flex-wrap justify-content-between align-items-center">
              <div class="font-lg ml-2">
                Point / Nilai <strong class="ml-2"> {{ item.point }} </strong>
              </div>
              <div class="px-4 pt-3 mb-1">
                <!-- Element to collapse -->
              </div>
              <div class="m-3 pt-2">
                <b-button-group v-if="item.type_soal === 'ESAY'">
                  <!-- <b-button variant="success" @click="JawabBenar(item)">
                    <i class="fa fa-check"> </i> Benar</b-button
                  >
                  <b-button variant="danger" @click="JawabSalah(item)">
                    <i class="fa fa-times"></i> Salah</b-button
                  > -->
                  <b-button
                    v-if="item.type_soal === 'ESAY' && item.isReviewed == true"
                    v-b-toggle="item.soal_id"
                    variant="dark"
                  >
                    <i class="fa fa-comment"></i> Review
                  </b-button>
                  <b-button
                    v-if="item.type_soal === 'ESAY' && item.isReviewed == false"
                    v-b-toggle="item.soal_id"
                    variant="dark"
                  >
                    <i class="fa fa-comment"></i> Edit Review
                  </b-button>
                </b-button-group>
                <b-button-group v-else>
                  <b-button v-if="item.point > 0" variant="success">
                    <i class="fa fa-check"></i> Benar {{ item.point }}
                  </b-button>
                  <b-button v-else variant="danger"> <i class="fa fa-times"></i>{{ item.point }}</b-button>
                </b-button-group>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row justify-content-end">
              <div class="col-md-12">
                <b-collapse :id="item.soal_id" class="row">
                  <div class="card">
                    <div class="card-body">
                      <div class="form-group row">
                        <label for="" class="col-sm-3"> Nilai </label>
                        <div class="col-sm-9">
                          <range-slider
                            class="slider"
                            min="0"
                            max="100"
                            step="2"
                            v-model="nilai[item.soal_id]"
                          >
                          </range-slider>
                          <strong> {{ nilai[item.soal_id] }} </strong>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="" class="col-sm-3"> Catatan </label>
                        <div class="col-sm-5">
                          <textarea
                            v-model="comments[item.soal_id]"
                            cols="10"
                            rows="4"
                            class="form-control"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <b-button variant="primary" class="m-1">
                      Simpan
                    </b-button>
                  </div>
                </b-collapse>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import Accordion from "./component/Accordion";
import RangeSlider from "vue-range-slider";
export default {
  name: "AssesmentSesiUjian",
  components: { RangeSlider },
  data() {
    return {
      page: 0,
      page2: 3,
      perPage: 1,
      showModal: false,
      icon: true,
      icon2: true,
      showButtonEnd: false,
      showModalGoTo: false,
      form: {},
      user_id: null,
      ujian_id: null,
      sesi_id: null,
      items: [],
      email: "",
      showModalEnd: false,
      btnDisabled: false,
      doneReview: false,
      token: null,
      total_nilai: null,
      total_soal: null,
      soal_dijawab: null,
      showReview: false,
      showFormNilai: [],
      comments: [],
      nilai: [],
      pathImages: "https://storage.googleapis.com/edutore-cdn/public/module/thumb/",
      pathImagesQ: "https://storage.googleapis.com/edutore-cdn/public/soal/question/",
      pathImagesAnswer: "https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",
      profile_default: "https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583246/AAA/2.jpg"
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.user_id = this.$route.params.user_id;
    this.ujian_id = this.$route.params.ujian_id;
    this.sesi_id = this.$route.params.sesi_id;
    this._actionGetReview();
  },
  methods: {
    _actionShowModalEnd() {
      this.showModalEnd = true;
    },
    _actionSubmitReview() {
      this.showModalEnd = false;
      this.$router.push({
        path: "/ujian/review-peserta-ujian",
        query: { ujian_id: this.ujian_id, sesi_ujian: this.sesi_id }
      });
    },
    nextPage() {
      const next = this.page++;
      const currentPage = this.page;
      const itemReview = this.items.length;
      const maxItemReview = itemReview - 1;
      if (currentPage === maxItemReview) {
        next;
        this.showButtonEnd = true;
        this.btnDisabled = true;
      } else {
        next;
        this.showButtonEnd = false;
      }
    },
    prevPage() {
      const prev = this.page--;
      const currentPage = this.page;
      const itemReview = this.items.length;
      const maxItemReview = itemReview - 1;
      if (currentPage != maxItemReview) {
        prev;
        this.showButtonEnd = false;
      }
    },
    _actionGetReview() {
      this.$axios
        .get(
          "review-sesi-ujian/jawaban-peserta?ujian_id=" +
            this.ujian_id +
            "&sesi_id=" +
            this.sesi_id +
            "&user_id=" +
            this.user_id,
          {
            headers: { "x-access-token": this.token }
          }
        )
        .then(response => {
          if (response.data.success === "true") {
            let objs = response.data.data;
            let itemsDesc = objs.sort((a, b) =>
              a.type_soal > b.type_soal ? -1 : b.type_soal > a.type_soal ? 1 : 0
            );
            console.log(itemsDesc);
            this.items = itemsDesc;
            this.email = response.data.email;
            this.doneReview = response.data.isReviewed;
            this.total_nilai = response.data.temp_score;
            this.total_soal = response.data.total_soal;
            this.soal_dijawab = response.data.soal_dijawab;
          }
        })
        .catch(err => console.log(err));
    },
    _actionShowModal(soal, nilai, comment) {
      this.showModal = true;
      this.form = {
        soal_id: soal,
        nilai: nilai,
        comment: comment
      };
    },
    _actionGetNumber(no) {
      this.page = no;
      this.showModalGoTo = false;
    },
    JawabBenar(item) {
      this._actionSubmitNilai(item.soal_id, 1, null);
    },
    JawabSalah(item) {
      this._actionSubmitNilai(item.soal_id, 0, null);
    },
    _actionSubmitNilai(soal, nilai, comment) {
      let data = {
        user_id: this.user_id,
        soal_id: soal,
        point: nilai,
        comment: comment
      };
      this.$axios
        .post("review-sesi-ujian?ujian_id=" + this.ujian_id + "&sesi_id=" + this.sesi_id, data, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.$notify({
              type: "succes",
              group: "foo",
              title: "Berhasil ",
              text: "Soal " + soal
            });
            const currentPage = this.page;
            const itemReview = this.items.length;
            const maxItemReview = itemReview - 1;
            const toMaxReview = itemReview - 2;
            if (currentPage === maxItemReview) {
              this.showModal = false;
              this._actionGetReview();
              this.showButtonEnd = true;
              this.btnDisabled = false;
            } else if (currentPage === toMaxReview) {
              this.showModal = false;
              this.page++;
              this._actionGetReview();
              this.showButtonEnd = true;
              this.btnDisabled = true;
            } else {
              this.showModal = false;
              this.page++;
              this._actionGetReview();
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({
            type: "error",
            group: "foo",
            title: "error",
            text: "Opps ..! Tidak Bisa Review"
          });
        });
    },
    _actionShowReview() {
      this.showReview = !this.showReview;
    },
    formatDate(tgl) {
      return new Date(tgl).toString();
    }
  }
};
</script>

<style scoped>
.scrollable {
  max-height: 600px;
  overflow: auto;
}
.card-custom {
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  background-color: #fff;
}
.card-custom2 {
  border-radius: 3px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
.card-custom3 {
  border-radius: 3px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
.card-custom4 {
  border-radius: 3px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  min-height: 70px;
  background-color: #f2f2f2;
}
.customList {
  min-height: 25px;
  min-width: 25px;
  border: 1px solid #fff;
  border-radius: 3px;
  margin-right: 10px;
  text-align: center;
  cursor: pointer;
}
.customList:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  color: #fff;
  transform: translateY(-6px);
}
blockquote.info {
  background: rgba(8, 148, 226, 0.038);
}
blockquote {
  line-height: 1.6;
  position: relative;
  margin: 25px 0;
  background: #f9eff1;
  padding: 20px;
}

blockquote {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  margin-inline-end: 40px;
}
blockquote.info::before {
  background: #0894e2;
}
blockquote strong:first-of-type {
  display: block;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 700;
}
blockquote.info strong {
  color: #0894e2;
}
blockquote.danger strong {
  color: #c72819;
}
blockquote::before {
  height: 100%;
  width: 5px;
  content: "";
  background: #ed2945;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}
.range-slider {
  display: inline-block;
  padding: 0 10px;
  height: 20px;
  min-width: 250px;
  max-width: 350px;
}
</style>
