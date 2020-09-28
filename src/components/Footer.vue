<template>
  <footer class="app-footer">
    <span>
      <a
        href="https://tryout.edutore.net"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buka Situs tryout"
      >
        CMS Tryout Edutore
      </a>
      &copy; {{ year }} By Gramedia
    </span>
    <!-- <svg class="heart" viewBox="0 0 32 29.6">
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,
        11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </svg> -->
    <!-- <span class="ml-auto text-right"> Ip {{ ip }} in {{ location }}</span> -->
  </footer>
</template>
<script>
import moment from "moment";

export default {
  name: "footers",
  data() {
    return {
      year: "",
      ip: "",
      location: ""
    };
  },
  mounted() {
    this.actionYear();
    // this.actionGetIp();
  },
  methods: {
    actionYear() {
      // eslint-disable-next-line no-return-assign
      return (this.year = moment().format("YYYY"));
    },
    actionGetIp() {
      // https://api.ipify.org/?format=json
      this.$axios.get("http://www.geoplugin.net/json.gp").then(response => {
        this.ip = response.data.geoplugin_request;
        this.location = response.data.geoplugin_city;
      });
    }
  }
};
</script>
<style>
.heart {
  fill: red;
  position: relative;
  height: 20px;
  top: 5px;
  margin-bottom: 8px;
  width: 50px;
  animation: pulse 1.5s ease infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
