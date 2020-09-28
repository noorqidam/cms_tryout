<template>
  <b-nav-item-dropdown id="my-nav-dropdown" text="Dropdown" toggle-class="nav-link-custom" right>
    <b-dropdown-item>one</b-dropdown-item>
    <b-dropdown-item>two</b-dropdown-item>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item>three</b-dropdown-item>
  </b-nav-item-dropdown>
  <!-- <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <i class="fa fa-user-circle"></i>
        </template>
         <b-dropdown-item><i class="fa fa-bell-o"></i> {{ name }} <b-badge variant="info">{{itemsCount}}</b-badge></b-dropdown-item>
        <b-dropdown-header tag="div" class="text-center"><strong>Settings</strong></b-dropdown-header>
        <b-dropdown-item @click="showDetail">
          <i class="fa fa-user"></i> Profile
        </b-dropdown-item>
        <b-dropdown-item @click="actionLogout()"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown> -->
</template>
<script>
export default {
  name: "header-dropdown-accnt",
  data: () => ({ itemsCount: 42, name: "" }),
  methods: {
    actionLogout() {
      sessionStorage.clear();
      this.$router.push({
        path: "/login"
      });
    },
    showDetail() {
      this.$router.push({
        name: "users"
      });
    }
  },
  created() {
    this.name = sessionStorage.getItem("username");
  }
};
</script>
