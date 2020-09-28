<template>
  <div class="app">
    <AppHeader />

    <div class="app-body">
      <notifications group="foo" position="top right" />
      <Sidebar :navItems="nav" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>

    <AppFooter />
  </div>
</template>
<script>
import io from "socket.io-client";
// import navPublisher from "../_navPublisher";
import AppHeader from "../components/Header/Header.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import AppFooter from "../components/Footer.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
// import _nav from "../_nav";

export default {
  name: "full",
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  data() {
    return {
      nav: [],
      url: "",
      showChat: false,
      visible: true
    };
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      //console.log(this.$route);
      return [];
      //return this.$route.matched;
    }
  },
  mounted() {
    const authorized = sessionStorage.getItem("authorized");
    const menu = JSON.parse(sessionStorage.getItem("menu"));
    if (authorized === "PARTNER") {
      this.nav = menu;
      this.nav.push(
        {
          name: "Siswa",
          url: "/p/siswa",
          icon: "fa fa-users"
        },
        {
          name: "Trash",
          url: "/trash",
          icon: "fa fa-trash",
          children: [
            {
              name: "Ujian",
              url: "/p/trash/ujian",
              icon: "fa fa-leanpub"
            },
            {
              name: "Quiz",
              url: "/p/trash/quiz",
              icon: "fa fa-leanpub"
            }
          ]
        }
      );
    } else if (authorized === "EDUTORE") {
      this.nav = menu;
      this.nav.push({
        name: "Trash",
        url: "/trash",
        icon: "fa fa-trash",
        children: [
          {
            name: "Ujian",
            url: "/trash/ujian",
            icon: "fa fa-leanpub"
          },
          {
            name: "Quiz",
            url: "/trash/quiz",
            icon: "fa fa-leanpub"
          }
        ]
      });
    } else {
      this.nav = menu;
    }
  },
  methods: {
    actionShow() {
      this.showChat = true;
      this.visible = false;
    },
    actionHide() {
      this.showChat = false;
      this.visible = true;
    },
    actionRealtimeOrder() {
      // var socket = io('http://35.187.250.230:2000');
      const socket = io("https://api.edutore.com");

      socket.on("order_module", data => {
        if (data) {
          this.$notify({
            group: "foo",
            title: "Yay .. ",
            text: `New Order Module ${data.order_nomor}`
          });
        }
      });
      socket.on("order_langganan", data => {
        if (data) {
          this.$notify({
            group: "foo",
            title: "Yay .. ",
            text: `New Order Langganan ${data.order_nomor}`
          });
        }
      });
      socket.on("kritik", data => {
        if (data) {
          this.$notify({
            group: "foo",
            type: "warn",
            title: "Yah.. ",
            text: `Ada Kritik ${data.order_nomor}`
          });
        }
      });
    }
  }
};
</script>
<style>
@import url("../assets/css/bootstrap.min.css");
@import url("../assets/css/style.css");
@import url("../assets/font-awesome/css/font-awesome.min.css");
.main {
  font-size: 11px;
}
/* .app {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana,
    sans-serif;
} */
</style>
