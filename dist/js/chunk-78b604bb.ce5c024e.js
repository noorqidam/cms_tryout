(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78b604bb"],{"32d9":function(t,i,s){},4392:function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("h3",[t._v("Review Sesi Ujian "+t._s(t.judul_ujian))])]),t.sesiUjian.length>0?s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row"},t._l(t.sesiUjian,(function(i,a){return s("div",{key:a,staticClass:"col-5 col-md-3 card-custom mr-2 mb-2 bg-white"},[s("table",{staticClass:"table table-hover"},[s("thead",[s("tr",{staticClass:"text-center bg-info"},[s("td",{attrs:{colspan:"2"}},[t._v("Sesi Ujian "+t._s(a+1))])]),s("tr",[s("td",[t._v("Nama Sesi Ujian")]),s("td",[t._v("\n                  "+t._s(i.sesi_ujian)+"\n                ")])]),s("tr",[s("td",[t._v("Peserta")]),s("td",[t._v("\n                  "+t._s(i.total_peserta)+"\n                ")])]),s("tr",[s("td",{staticClass:"text-center",attrs:{colspan:"2"}},[s("button",{staticClass:"btn btn-info text-white",staticStyle:{"font-size":"13px"},on:{click:function(s){return t._actionReviewPeserta(t.ujian_id,i.sesi_id)}}},[t._v("\n                    Review\n                  ")])])])])])])})),0)]):s("div",{staticClass:"col-md-12 card"},[s("h4",{staticClass:"text-center"},[t._v("Tidak Ada Data")])])])])},e=[],n={name:"ReviewSesiUjian",data:function(){return{ujian_id:null,token:null,sesiUjian:[],judul_ujian:""}},mounted:function(){this.token=sessionStorage.getItem("session_token");var t=this.$route.query.ujian_id;this.ujian_id=t,this._actionGetUjianPerSesi()},methods:{_actionGetUjianPerSesi:function(){var t=this;this.$axios.get("review-sesi-ujian?ujian_id="+this.ujian_id,{headers:{"x-access-token":this.token}}).then((function(i){"true"==i.data.success&&(t.sesiUjian=i.data.data,t.judul_ujian=i.data.judul_ujian)})).catch((function(t){console.log(t)}))},_actionReviewPeserta:function(t,i){this.$router.push({path:"/ujian/review-peserta-ujian",query:{ujian_id:t,sesi_ujian:i}})}}},c=n,u=(s("e0ba"),s("2877")),o=Object(u["a"])(c,a,e,!1,null,"8fc1fe26",null);i["default"]=o.exports},e0ba:function(t,i,s){"use strict";var a=s("32d9"),e=s.n(a);e.a}}]);
//# sourceMappingURL=chunk-78b604bb.ce5c024e.js.map