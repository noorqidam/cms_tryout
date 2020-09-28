<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-sm table-striped table-hover">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Photo</th>
                  <th>Email</th>
                  <th>Sesi Ujian</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, no) in users">
                  <tr :key="no">
                    <td>
                      {{ ++no }}
                    </td>
                    <td class="text-center" v-if="item.photo">
                      <img :src="item.photo" alt="" style="height:70px;width:auto" />
                    </td>
                    <td v-else class="text-center">
                      <div class="img-avatar img-thumbnail badge-primary" style="height:70px;width:auto">
                        <span class="text-center text-capitalize" style="font-size:3.5em">
                          {{ item.email ? item.email.substring(0, 1) : null }}
                        </span>
                      </div>
                    </td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.sesi_name }}</td>
                    <td>
                      {{ item.total_point }}
                      <i
                        v-if="no == '1'"
                        class="fa fa-trophy fa-lg"
                        style="color:gold;font-size:44px;padding:10px"
                      />
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "DetailUjianLiveAdmin",
  data() {
    return {
      users: [],
      items: {},
      token: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    const id = this.$route.query._id;
    this._action_reatime(id);
    this._actionGetRealtimePoint();
  },
  methods: {
    // _action_reatime() {
    //   // show_ratting
    //   // const socket = io('http://localhost:2000')
    //   const socket = io("https://api-tryout.edutore.com");

    //   socket.on(`show_ratting${this.id}`, data => {
    //     console.log(JSON.stringify(data));
    //     if (data) {
    //       // this.users = data;
    //       // this.$notify({
    //       //   group: "foo",
    //       //   title: "Yay .. "
    //       // });
    //     }
    //   });
    // },
    _action_reatime(id) {
      console.log("listen " + id);
      // show_ratting
      //const socket = io("http://localhost:3000");
      const socket = io("https://api-tryout.edutore.com", { transports: ["websocket", "polling"] });
      // eslint-disable-next-line prettier/prettier
       socket.on("jawab_soal_ujian" + id , function (data) {
          console.log("ada " + JSON.stringify(data));
          if (data) {
            // eslint-disable-next-line no-console
            // this.$notify({
            //   group: "foo",
            //   title: "Peserta .. ",
            //   text: data.info ? data.info.email + "Menjawab" : null
            // });

            setTimeout(() => {
              this._actionGetRealtimePoint();
            }, 500);
          }
          // eslint-disable-next-line prettier/prettier
      }.bind(this))
    },
    _actionGetRealtimePoint() {
      let data = {
        ujian_id: this.id
      };
      this.$axios
        .post("realtime-point-ujian", data, { headers: { "x-access-token": this.token } })
        .then(response => (this.users = response.data.data))
        .catch(err => {
          console.log(err);
        });
    }
    // _actionGetDetail(id) {
    //   this.$axios
    //     .get(`live-test/${id}`, { headers: { "x-access-token": this.token } })
    //     .then(response => (this.item = response.data.data))
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // _actionGetLiveUserTest(id) {
    //   this.$axios
    //     .get(`ratting-test?quiz_id=${id}`, { headers: { "x-access-token": this.token } })
    //     .then(response => (this.item = response.data.data))
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // _actionTriggerSoal() {}
  }
};
</script>

<style scoped></style>
