<template>
  <div class="row">
    <div class="col-md-12">
      <router-link :to="{ path: '/p/ujian/jadwal-sesi-ujian/' + ujian_id }" class="btn btn-sm btn-primary">
        <i class="fa fa-chevron-circle-left"></i> Kembali
      </router-link>
    </div>

    <div class="col-md-12 mt-1 pt-1">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="actionUpdateJadwal">
            <div class="form-group row border-bottom">
              <label for="" class="col-sm-2 font-size-2"> Nama Ujian </label>
              <div class="col-md-9">
                <h3 class="h3">{{ Ujian.judul_ujian }}</h3>
              </div>
            </div>

            <div class="ml-2 pl-2 m-1">
              <ul>
                <li v-for="sesi in SesiUjian" :key="sesi._id" type="1">
                  <div class="form-group row">
                    <label for="" class="col-sm-3">Nama Sesi </label>
                    <div class="col-md-9">
                      {{ sesi.sesi_ujian }}
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="" class="col-sm-3"> Urutan Sesi </label>
                    <div class="col-sm-3">
                      <select v-model="sesi.position" class="form-control">
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
                      <input type="time" v-model="sesi.start_time" />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="" class="col-sm-3"> Waktu Mengerjakan / Durasi <small>Menit</small> </label>
                    <div class="col-sm-3">
                      <input type="number" v-model="sesi.duration" />
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
  name: "jadwalSesiUjian",
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
    this.actionGetJadwalUjianById(id);
    this.actionGetUjianById(id);
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
    actionGetJadwalUjianById(id) {
      this.$axios
        .get(`publisher-jadwal-ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          let objs = response.data.data.schedule;
          this.position = objs.length;
          let FixData = objs.sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0));
          this.SesiUjian = FixData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    actionUpdateJadwal() {
      this.$router.push({
        path: "/ujian/jadwal-sesi-ujian/" + this.ujian_id
      });
    }
  }
};
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Oswald", sans-serif;
}

h1 {
  font-size: 2rem;
  margin-bottom: 0.5em;
}

p {
  font-family: "Roboto", sans-serif;
  font-size: 0.8rem;
}

.container {
  max-width: 1024px;
  width: 90%;
  margin: 0 auto;
}

.timeline-item {
  padding: 3em 2em 2em;
  position: relative;
  color: rgba(0, 0, 0, 0.7);
  border-left: 2px solid rgba(0, 0, 0, 0.3);
}
.timeline-item p {
  font-size: 1rem;
}
.timeline-item::before {
  content: attr(date-is);
  position: absolute;
  left: 2em;
  font-weight: bold;
  top: 1em;
  display: block;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 0.785rem;
}
.timeline-item::after {
  width: 10px;
  height: 10px;
  display: block;
  top: 1em;
  position: absolute;
  left: -7px;
  border-radius: 10px;
  content: "";
  border: 2px solid rgba(0, 0, 0, 0.3);
  background: white;
}
.timeline-item:last-child {
  -webkit-border-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(60%, rgba(0, 0, 0, 0.3)),
      to(rgba(0, 0, 0, 0))
    )
    1 100%;
  -webkit-border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0)) 1 100%;
  -o-border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0)) 1 100%;
  border-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(60%, rgba(0, 0, 0, 0.3)),
      to(rgba(0, 0, 0, 0))
    )
    1 100%;
  border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0)) 1 100%;
}
</style>
