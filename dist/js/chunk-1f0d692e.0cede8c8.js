(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f0d692e"],{3846:function(a,t,s){s("9e1e")&&"g"!=/./g.flags&&s("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:s("0bfb")})},"5b46":function(a,t,s){"use strict";s.r(t);var e=function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("b-alert",{attrs:{show:a.dismissCountDown,dismissible:"",variant:"info"},on:{dismissed:function(t){a.dismissCountDown=0},"dismiss-count-down":a.countDownChanged}},[a._v("\n      List dibawah ini adalah Ujian yang sedang berlangsung. "),s("br"),a._v("\n      anda dapat melihat peserta yang menjawab dengan "),s("b",[a._v("mengklick")]),a._v(" Tombol\n      "),s("button",[a._v("View Peserta")]),a._v(" Pada Masing-masing Card List Ujian\n      ")]),s("h5",{staticClass:"text-center"},[a._v("\n      Live Ujian\n    ")]),a.items.length>0?s("div",a._l(a.items,(function(t){return s("div",{key:t._id},[s("b-card",{staticStyle:{margin:"0px"},attrs:{"no-body":""}},[s("b-row",{staticClass:"overflow-hidden",attrs:{"no-gutters":""}},[s("b-col",{attrs:{sm:"2"}},[t.ujian_banner?s("b-card-img",{staticStyle:{height:"auto",width:"180px",margin:"10px",padding:"5px"},attrs:{src:a.pathImages+t.ujian_banner}}):s("b-card-img",{staticStyle:{height:"auto",width:"180px",margin:"10px",padding:"5px"},attrs:{src:a.pathImages+"edutore.jpg"}})],1),s("b-col",{attrs:{sm:"10"}},[s("b-card-body",[s("h2",{staticClass:"h5"},[a._v(a._s(t.judul_ujian))]),s("b-card-text",[s("i",{staticClass:"fa fa-home"}),a._v(" "+a._s(t.penyelenggara)+" ")]),s("b-card-text",[s("i",{staticClass:"fa fa-calendar ml-1"}),a._v(" "+a._s(a._actionViewDate(t.start_date))+"\n                  "+a._s(t.times)+"\n                  "),t.is_premium?s("span",{staticClass:"badge badge-primary"},[a._v(" Free ")]):s("span",{staticClass:"badge badge-danger"},[a._v(" Berbayar ")]),t.publish?s("span",{staticClass:"ml-1 badge badge-primary"},[s("i",{staticClass:"fa fa-eye"}),a._v(" Publish\n                  ")]):s("span",{staticClass:"ml-1 badge badge-danger"},[s("i",{staticClass:"fa fa-eye-slash"}),a._v(" UnPublish")]),t.is_private?s("span",{staticClass:"ml-1 badge badge-primary"},[s("i",{staticClass:"fa fa-lock"}),a._v(" Private\n                  ")]):s("span",{staticClass:"ml-1 badge badge-danger"},[s("i",{staticClass:"fa fa-users"}),a._v(" Umum ")]),s("br"),s("span",[s("i",{staticClass:"fa fa-user"})]),a._v(" "+a._s(t.createdBy)+"\n                ")]),s("b-card-text",[s("router-link",{staticClass:"btn btn-sm btn-dark",attrs:{to:{path:"/live-ujian/detail-peserta",query:{_id:t._id}}}},[s("i",{staticClass:"fa fa-users"}),a._v(" View Peserta\n                  ")])],1)],1)],1)],1)],1)],1)})),0):s("div",{staticClass:"col-md-12"},[a._m(0)])],1)])},n=[function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("div",{staticClass:"text-center"},[s("h2",[a._v("\n          Tidak Ada Live Ujian Berlangsung\n        ")])])}],i=(s("6b54"),{name:"IndexTryoutAdmin",data:function(){return{items:[],token:null,pathImages:"https://storage.googleapis.com/edutore-cdn/tryout/",dismissCountDown:10}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this._actionGetTestLive()},methods:{countDownChanged:function(a){this.dismissCountDown=a},_actionGetTestLive:function(){var a=this;this.$axios.get("publisher-live-ujian",{headers:{"x-access-token":this.token}}).then((function(t){return a.items=t.data.data}))},_actionViewDate:function(a){return a&&new Date(a).toString(),""}}}),r=i,c=s("2877"),o=Object(c["a"])(r,e,n,!1,null,"68a09f98",null);t["default"]=o.exports},"6b54":function(a,t,s){"use strict";s("3846");var e=s("cb7c"),n=s("0bfb"),i=s("9e1e"),r="toString",c=/./[r],o=function(a){s("2aba")(RegExp.prototype,r,a,!0)};s("79e5")((function(){return"/a/b"!=c.call({source:"a",flags:"b"})}))?o((function(){var a=e(this);return"/".concat(a.source,"/","flags"in a?a.flags:!i&&a instanceof RegExp?n.call(a):void 0)})):c.name!=r&&o((function(){return c.call(this)}))}}]);
//# sourceMappingURL=chunk-1f0d692e.0cede8c8.js.map