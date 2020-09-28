import Vue from "vue";
import "./registerServiceWorker";
import bootstrapVue from "bootstrap-vue";
import axios from "axios";
// import VueFormWizard from 'vue-form-wizard'
// import "vue-form-wizard/dist/vue-form-wizard.min.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Notifications from "vue-notification";
import Multiselect from "vue-multiselect";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./plugin/Veevalidate";
import VCalendar from "v-calendar";
import VueQuillEditor from "vue-quill-editor";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import VueApexCharts from "vue-apexcharts";
import { MonthPicker, MonthPickerInput } from "vue-month-picker";
import "./assets/css/vue-range-slider.css";
import VueLazyload from "vue-lazyload";
// import vuetimeline from "@growthbunker/vuetimeline";
import router from "./router";
import store from "./store";

const App = () => import("./App.vue");

Vue.use(VueTimepicker);
Vue.use(VueQuillEditor);
Vue.use(VCalendar);
Vue.use(VueSweetalert2);

Vue.component("apexchart", VueApexCharts);
// register globally
Vue.component("multiselect", Multiselect);
Vue.component("quillEditor", VueQuillEditor);

Vue.use(bootstrapVue);
// Vue.use(VueFormWizard);
Vue.use(Notifications);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "https://storage.googleapis.com/edutore-cdn/edutpre.png",
  loading: "https://storage.googleapis.com/edutore-cdn/edutpre.png",
  attempt: 1
});
Vue.use(MonthPicker);
Vue.use(MonthPickerInput);

Vue.use({
  // eslint-disable-next-line no-shadow
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$axios = axios.create({
      baseURL: "http://localhost:3000/app/api-admin/v1/"
      // baseURL: "https://api-tryout.edutore.net/api-admin/v1/"
    });
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
