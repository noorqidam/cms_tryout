import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import id from "vee-validate/dist/locale/id.json";

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});
extend("pos", value => {
  return "some error" + value;
});
localize("id", id);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
