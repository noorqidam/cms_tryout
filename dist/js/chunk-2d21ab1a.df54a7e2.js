(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21ab1a"],{bd35:function(t,a,s){"use strict";s.r(a);var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("h3",{staticClass:"text-center"},[t._v("Detail Report Sesi Ujian")]),s("h4",{staticClass:"text-center"},[t._v(t._s(t.Ujian))])]),t._l(t.sesiUjian,(function(a,i){return s("div",{key:i,staticClass:"col-12 col-md-4"},[s("div",{staticClass:"card px-2"},[s("table",{staticClass:"table table-hover"},[s("thead",[s("tr",{staticClass:"text-center bg-info"},[s("td",{attrs:{colspan:"3"}},[t._v("Sesi Ujian "+t._s(i+1))])])]),s("tbody",[s("tr",[s("td",[t._v("Nama Sesi Ujian")]),s("td",{attrs:{colspan:"3"}},[t._v("\n                "+t._s(a.sesi_ujian)+"\n              ")])]),s("tr",[s("td",[t._v("Peserta")]),s("td",{attrs:{colspan:"3"}},[t._v("\n                "+t._s(a.peserta.jumlahPeserta)+"\n              ")])]),s("tr",[s("td",[t._v("Lihat Detail")]),s("td",[s("router-link",{staticClass:"btn btn-sm btn-info text-white",attrs:{to:{path:"/p/ujian/report-detail-ujian-sesi/"+t.ujian_id+"/sesi/"+a.sesi_id}}},[s("i",{staticClass:"fa fa-leanpub"}),t._v(" Detail\n                ")])],1),s("td",[s("router-link",{staticClass:"btn btn-sm btn-success text-white",attrs:{to:{path:"/p/ujian/review-sesi-ujian",query:{ujian_id:t.ujian_id,sesi_ujian:a.sesi_id}}}},[s("i",{staticClass:"fa fa-pencil"}),t._v(" Review\n                ")])],1)])])])])])}))],2)])},e=[],n={name:"ReportSesiUjian",data:function(){return{currentPage:1,perPage:100,totalRows:0,ujian_id:null,token:null,sesiUjian:[],Ujian:null}},mounted:function(){this.token=sessionStorage.getItem("session_token");var t=this.$route.params.ujian_id;this.ujian_id=t,this._actionGetUjianPerSesi()},methods:{_actionGetUjianPerSesi:function(){var t=this,a={ujian_id:this.ujian_id};this.$axios.post("detail-ujian-per-sesi",a,{headers:{"x-access-token":this.token}}).then((function(a){"true"==a.data.success&&(t.sesiUjian=a.data.data,t.Ujian=t.sesiUjian[0].ujian_name)})).catch((function(t){console.log(t)}))},_actionDetailUjianPeserta:function(t,a){this.$router.push({path:"/ujian/report-peserta-ujian",query:{ujian_id:t,sesi_ujian:a}})}}},r=n,o=s("2877"),u=Object(o["a"])(r,i,e,!1,null,"74b732a1",null);a["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d21ab1a.df54a7e2.js.map