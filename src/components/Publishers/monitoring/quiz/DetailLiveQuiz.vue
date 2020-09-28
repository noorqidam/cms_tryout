<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="h3 text-center">
            {{ items.quiz_id ? items.quiz_id.judul_quiz : null }}
          </h5>
          <br />
          <small>* User Yang Menjawab </small>
          <div>
            <table class="table table-sm table-bordered table-striped">
              <thead>
                <tr>
                  <th style="width:4%">No</th>
                  <th>Nama</th>
                  <th style="width:10%">Photo</th>
                  <th>Email</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, no) in users">
                  <tr :key="no">
                    <td>{{ ++no }}</td>
                    <td>{{ item.name }}</td>
                    <td class="text-center" v-if="item.photo">
                      <img :src="item.photo" alt="" style="height:70px;width:auto" />
                    </td>
                    <td v-else class="text-center">
                      <div class="img-avatar img-thumbnail badge-primary" style="height:70px;width:auto">
                        <span class="text-center text-capitalize" style="font-size:3.5em">
                          {{ item.email.substring(0, 1) }}
                        </span>
                      </div>
                    </td>
                    <td>{{ item.email }}</td>

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
  name: "DetailQuizLivePublisher",
  data() {
    return {
      users: [],
      items: {},
      token: null,
      id: null
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    const id = this.$route.query._id;
    this.id = id;
    this.actionGetDetail(id);
    this._actionGetRealtimePoint();
    this.action_reatime();
  },
  methods: {
    action_reatime() {
      //const socket = io("http://localhost:2000");
      const socket = io("https://api-tryout.edutore.com", { transports: ["websocket", "polling"] });
      socket.on(
        "jawab_quiz" + this.id,
        function(data) {
          if (data) {
            if (data) {
              //this.users = data;
              // this.$notify({
              //   group: "foo",
              //   title: "Info .. ",
              //   text: JSON.stringify(data)
              // });

              setTimeout(() => {
                this._actionGetRealtimePoint();
              }, 500);
            }
          }
        }.bind(this)
      );
    },
    _actionGetRealtimePoint() {
      let data = {
        quiz_id: this.id
      };
      this.$axios
        .post("realtime-point-quiz", data, { headers: { "x-access-token": this.token } })
        .then(response => (this.users = response.data.data))
        .catch(err => {
          console.log(err);
        });
    },
    actionGetDetail(id) {
      this.$axios
        .get(`publisher-live-quiz/${id}`, { headers: { "x-access-token": this.token } })
        .then(response => (this.items = response.data.data))
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped></style>
