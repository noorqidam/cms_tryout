<template>
  <div class="row">
    <div class="col-md-12">
      <router-link
        v-if="JadwalUjian.length < 1"
        :to="{ path: '/p/ujian/create-jadwal-sesi-ujian/' + ujian_id }"
        class="btn btn-sm btn-primary"
      >
        <i class="fa fa-pencil"></i> buat Jadwal Ujian
      </router-link>
      <router-link
        v-else
        :to="{ path: '/p/ujian/edit-jadwal-sesi-ujian/' + ujian_id }"
        class="btn btn-sm btn-warning"
      >
        <i class="fa fa-pencil"></i> Ubah Jadwal Ujian
      </router-link>
      <button v-if="JadwalUjian.length > 0" class="btn btn-md btn-danger ml-1" @click="DeleteJadwal">
        <i class="fa fa-trash"></i> Hapus Jadwal
      </button>
    </div>
    <div class="col-md-12 container mt-1 pt-1">
      <div class="card bg-primary">
        <div class="card-body">
          <h1 class="h1">{{ ujian.judul_ujian }}</h1>
        </div>
      </div>
      <div class="row" v-for="j in JadwalUjian" :key="j._id">
        <div class="col-md-12">
          <div class="timeline-item" :date-is="j.start_time">
            <div class="card">
              <div class="card-body">
                <h3>{{ j.sesi_ujian }}</h3>
                <br />
                <label for="" class="mr-1"> Mulai Jam {{ j.start_time }}</label>
                <label for=""> Durasi {{ j.duration }} <strong>Menit</strong> </label>
              </div>
            </div>
          </div>
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
      JadwalUjian: [],
      SesiUjian: [],
      token: null,
      ujian: {},
      ujian_id: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    let id = this.$route.params.ujian_id;
    this.ujian_id = id;
    this.actionGetJadwalUjianById(id);
  },
  methods: {
    actionGetJadwalUjianById(id) {
      this.$axios
        .get(`publisher-jadwal-ujian/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => {
          let objs = response.data.data.schedule;
          this.ujian = response.data.ujian;
          let FixData = objs.sort((a, b) => (a.position > b.position ? 1 : b.position > a.position ? -1 : 0));
          this.JadwalUjian = FixData;
        })
        .catch(err => {
          console.log(err);
        });
    },
    DeleteJadwal() {
      let data = {
        ujian_id: this.ujian_id
      };
      this.$axios
        .post("publisher-hapus-jadwal-ujian", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            this.$notify({
              group: "foo",
              title: "Berhasil hapus Jadwal ",
              text: response.data.message
            });
          }
          this.$router.push({
            path: "/p/ujian/ujian-detail",
            query: { _id: this.ujian_id }
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
