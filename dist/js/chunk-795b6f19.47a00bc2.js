(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-795b6f19"],{"3f71":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return!1===t.isLoading?e("section",[e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row"},[t._m(0),e("div",{staticClass:"col-12 col-md-3 card",staticStyle:{"max-height":"200px"}},[e("table",{staticClass:"table table-hover"},[e("thead",[t._m(1),e("tr",[e("td",[t._v("Total Peserta")]),e("td",[t._v("\n                "+t._s(t.dataPeserta.peserta)+"\n              ")])]),e("tr",[e("td",[t._v("Lulus")]),e("td",[t._v("\n                "+t._s(t.dataPeserta.lulus)+"\n              ")])]),e("tr",[e("td",[t._v("Tidak Lulus")]),e("td",[t._v("\n                "+t._s(t.dataPeserta.tidakLulus)+"\n              ")])])])])]),e("div",{staticClass:"col-md-8 col-12 card  ml-md-5"},[e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table table-md table-striped table-hover",staticStyle:{"font-size":"12px"},attrs:{id:"table-peserta"}},[t._m(2),t.dataPeserta?e("tbody",{staticClass:"text-center tableBody"},t._l(t.dataPeserta.ratingNilai,(function(a,s){return e("tr",{key:s},[e("th",[t._v("\n                  "+t._s(s+1)+"\n                ")]),e("td",[t._v(t._s(a.name))]),e("td",[t._v(t._s(a.email))]),e("td",[t._v(t._s(a.nama_sekolah))]),e("td",[t._v(t._s(a.kelas))]),e("td",{staticStyle:{"font-size":"16px"}},[a.score>=70?e("span",{staticClass:"badge badge-success"},[t._v("\n                    "+t._s(a.score)+"\n                  ")]):t._e(),a.score<70?e("span",{staticClass:"badge badge-danger"},[t._v("\n                    "+t._s(a.score)+"\n                  ")]):t._e()]),e("td",[e("span",{staticClass:"badge badge-info btn text-white",staticStyle:{"font-size":"13px"},on:{click:function(e){return t._actionDetailQuizPeserta(t.quiz_id,a.user_id)}}},[t._v("Details\n                  ")])])])})),0):e("tbody",[t._m(3)])])])])])])]):e("section",[e("div",{staticClass:"col-md-12"},[t._v("\n    Loading....\n  ")])])},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"col-md-12 mb-3"},[e("h3",[t._v("Detail Report Quiz")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("tr",{staticClass:"text-center bg-info"},[e("td",{attrs:{colspan:"2"}},[t._v("\n                Rekap Quiz\n              ")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",{staticClass:"thead-dark"},[e("tr",[e("th",[t._v("\n                  No\n                ")]),e("th",{staticClass:"text-center"},[t._v("\n                  Nama\n                ")]),e("th",{staticClass:"text-center"},[t._v("\n                  Email\n                ")]),e("th",{staticClass:"text-center"},[t._v("\n                  Sekolah\n                ")]),e("th",{staticClass:"text-center"},[t._v("\n                  Kelas\n                ")]),e("th",{staticClass:"text-center"},[t._v("\n                  Skor\n                ")]),e("th",{staticClass:"text-center"},[t._v("\n                  Action\n                ")])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("tr",{staticClass:"text-center"},[e("td",{attrs:{colspan:"7"}},[t._v("Tidak ada data Peserta")])])}],n={name:"ReportQuizRealtimeAdmin",data:function(){return{quiz_id:null,token:null,dataPeserta:[],isLoading:!1}},mounted:function(){this.quiz_id=this.$route.params.quiz_id,this.token=sessionStorage.getItem("session_token"),this._actionGetPeserta()},methods:{_actionGetPeserta:function(){var t=this;this.isLoading=!0;var a={quiz_id:this.quiz_id};this.$axios.post("rating-peserta-quiz-realtime",a,{headers:{"x-access-token":this.token}}).then((function(a){"true"===a.data.success&&(t.isLoading=!1,t.dataPeserta=a.data.data)})).catch((function(a){console.log(a),t.isLoading=!1}))},_actionDetailQuizPeserta:function(t,a){this.$router.push({path:"/quiz/report-nilai-peserta-quiz-realtime/"+t+"/"+a})}}},c=n,r=(e("5ffe"),e("2877")),l=Object(r["a"])(c,s,i,!1,null,"f2afa6fa",null);a["default"]=l.exports},"5b99":function(t,a,e){},"5ffe":function(t,a,e){"use strict";var s=e("5b99"),i=e.n(s);i.a}}]);
//# sourceMappingURL=chunk-795b6f19.47a00bc2.js.map