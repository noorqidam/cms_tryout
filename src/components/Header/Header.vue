<template>
  <header class="app-header navbar">
    <button
      class="navbar-toggler mobile-sidebar-toggler d-lg-none"
      type="button"
      @click="mobileSidebarToggle"
    >
      <i class="fa fa-bars" aria-hidden="true"></i>
    </button>
    <b-link class="navbar-brand" to="/"> </b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <i class="fa fa-bars" aria-hidden="true"></i>
    </button>
    <b-navbar-nav class="ml-auto mr-2">
      <b-nav-item> </b-nav-item>
      <b-nav-item>
        {{ name }}
        <b-dropdown
          :text="name"
          variant="link"
          toggle-class="text-decoration-none"
          no-caret
          @click="showDetail"
        >
          <template slot="button-content"><span class="fa fa-user-circle"></span></template>
          <b-dropdown-item> </b-dropdown-item>
          <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>
          <b-dropdown-item> <i class="fa fa-user"></i> Profile </b-dropdown-item>
          <b-dropdown-item><i class="fa fa-wrench"></i> Settings</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item><i class="fa fa-shield"></i> </b-dropdown-item>
          <b-dropdown-item @click="actionLogout()"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
        </b-dropdown>
      </b-nav-item>
    </b-navbar-nav>
    <div class="mr-3"></div>
  </header>
</template>
<script>
import HeaderDropdownAccnt from "./HeaderDropdownAccnt.vue";
import HeaderDropdownTasks from "./HeaderDropdownTasks.vue";
import HeaderDropdownNotif from "./HeaderDropdownNotif.vue";
import HeaderDropdownMssgs from "./HeaderDropdownMssgs.vue";

export default {
  name: "headers",
  data() {
    return {
      name: ""
    };
  },
  components: {
    HeaderDropdownAccnt,
    HeaderDropdownTasks,
    HeaderDropdownNotif,
    HeaderDropdownMssgs
  },
  methods: {
    sidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-hidden");
    },
    sidebarMinimize(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-minimized");
    },
    mobileSidebarToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("sidebar-mobile-show");
    },
    asideToggle(e) {
      e.preventDefault();
      document.body.classList.toggle("aside-menu-hidden");
    },
    actionLogout() {
      sessionStorage.clear();
      this.$router.push({
        path: "/login"
      });
    },
    showDetail() {
      this.$router.push({
        path: "/users"
      });
    }
  },
  created() {
    this.name = sessionStorage.getItem("username");
  }
};
</script>
<style>
.navbar-nav .nav-link,
.navbar-nav .navbar .dropdown-toggle,
.navbar .navbar-nav .dropdown-toggle {
  color: white;
}
</style>
