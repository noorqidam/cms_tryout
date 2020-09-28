<template>
  <div class="row">
    <div class="col-md-12">
      <b-modal
        v-model="isloading"
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
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="actionCreateJadwal">
            <div class="form-group row border-bottom">
              <label for="" class="col-sm-2 font-size-2"> Nama Ujian </label>
              <div class="col-md-9">
                <h3 class="h3">{{ Ujian.judul_ujian }}</h3>
              </div>
            </div>

            <div class="ml-2 pl-2 m-1">
              <ul>
                <li v-for="(sesi, i) in SesiUjian" :key="sesi._id" type="1">
                  <div class="form-group row">
                    <label for="" class="col-sm-3">Nama Sesi </label>
                    <div class="col-md-9">
                      {{ sesi.sesi_ujian }}
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-3"> Urutan Sesi </label>
                    <div class="col-sm-3">
                      <select v-model="Positions[i]" class="form-control">
                        <option value="">
                          -- Pilih --
                        </option>
                        <option v-for="p in position" :value="p" :key="p">
                          {{ p }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-3"> Di Mulai Pada Jam </label>
                    <div class="col-sm-3">
                      <input type="time" v-model="StartTime[i]" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-3">
                      Waktu Mengerjakan / Durasi <small class="badge badge-info">Menit</small>
                    </label>
                    <div class="col-sm-3">
                      <input type="number" v-model="Durations[i]" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="form-group row">
              <div class="col-md-12">
                <div class="row justify-content-left">
                  <div class="col-sm-2">
                    <button class="btn btn-block btn-primary">Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatejadwalUjian",
  data() {
    return {
      Positions: [],
      StartTime: [],
      Durations: [],
      Ujian: {},
      SesiUjian: [],
      token: null,
      position: 0,
      isloading: true,
      ujian_id: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.params.ujian_id;
    this.ujian_id = id;
    this.actionGetUjianById(id);
    this.actionGetSesiUjianByUjianId(id);
  },
  methods: {
    actionGetUjianById(id) {
      this.$axios
        .get(`ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.Ujian = response.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    actionGetSesiUjianByUjianId(id) {
      this.$axios
        .get("publisher-sesi-in-ujian/" + id, { headers: { "x-access-token": this.token } })
        .then(response => {
          this.SesiUjian = response.data.data;
          this.position = this.SesiUjian.length;
          this.isloading = false;
          console.log(this.SesiUjian);
        })
        .catch(err => {
          this.isloading = false;
          console.log(err);
        });
    },
    actionCreateJadwal() {
      let SesiDetail = [];
      for (let index = 0; index < this.position; index++) {
        SesiDetail.push({
          position: this.Positions[index],
          sesi_id: this.SesiUjian[index]._id,
          sesi_ujian: this.SesiUjian[index].sesi_ujian,
          start_time: this.StartTime[index],
          duration: this.Durations[index]
        });
      }
      let JadwalData = {
        ujian_id: this.Ujian._id,
        schedule: SesiDetail
      };
      console.log(JadwalData);
      this.$axios
        .post("publisher-jadwal-ujian?ujian_id=" + this.ujian_id, JadwalData, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.$notify({
              group: "foo",
              title: "Success Add ",
              text: response.data.message
            });
          }
          this.$router.push({
            path: "/ujian/ujian-detail/" + this.ujian_id
          });
        })
        .catch(() => {
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opss .. ",
            text: "Ada Kesalahan di Server"
          });
        });
    }
  }
};
</script>

<style scoped></style>
