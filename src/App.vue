<template>
  <div id="app" class="app">
    <notifications group="foo" />
    <notifications group="alert" position="top center" />
    <router-view />
  </div>
</template>
<style>
@font-face {
  font-family: "ElliotSans-Regular";
  src: url("../src/assets/font/ElliotSans-Regular.woff") format("woff");
}
@font-face {
  font-family: "ElliotSans-Medium";
  src: url("../src/assets/font/ElliotSans-Medium.woff") format("woff");
}
@font-face {
  font-family: "ElliotSans-Bold";
  src: url("../src/assets/font/ElliotSans-Bold.woff") format("woff");
}
@font-face {
  font-family: "ElliotSans-Light";
  src: url("../src/assets/font/ElliotSans-Light.woff") format("woff");
}
.app {
  font-family: "ElliotSans-Medium";
  font-size: 14px;
}
p {
  color: black;
  /* font-family: monospace; */
}
</style>
