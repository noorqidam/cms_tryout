(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c7352"],{5045:function(t,i,s){"use strict";s.r(i);var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:t.isloading,callback:function(i){t.isloading=i},expression:"isloading"}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[t._v("\n          Loading...\n        ")])])])],1),s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("form",{on:{submit:function(i){return i.preventDefault(),t.actionCreateJadwal(i)}}},[s("div",{staticClass:"form-group row border-bottom"},[s("label",{staticClass:"col-sm-2 font-size-2",attrs:{for:""}},[t._v(" Nama Ujian ")]),s("div",{staticClass:"col-md-9"},[s("h3",{staticClass:"h3"},[t._v(t._s(t.Ujian.judul_ujian))])])]),s("div",{staticClass:"ml-2 pl-2 m-1"},[s("ul",t._l(t.SesiUjian,(function(i,a){return s("li",{key:i._id,attrs:{type:"1"}},[s("div",{staticClass:"form-group row"},[s("label",{staticClass:"col-sm-3",attrs:{for:""}},[t._v("Nama Sesi ")]),s("div",{staticClass:"col-md-9"},[t._v("\n                    "+t._s(i.sesi_ujian)+"\n                  ")])]),s("div",{staticClass:"form-group row"},[s("label",{staticClass:"col-sm-3",attrs:{for:""}},[t._v(" Urutan Sesi ")]),s("div",{staticClass:"col-sm-3"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.Positions[a],expression:"Positions[i]"}],staticClass:"form-control",on:{change:function(i){var s=Array.prototype.filter.call(i.target.options,(function(t){return t.selected})).map((function(t){var i="_value"in t?t._value:t.value;return i}));t.$set(t.Positions,a,i.target.multiple?s:s[0])}}},[s("option",{attrs:{value:""}},[t._v("\n                        -- Pilih --\n                      ")]),t._l(t.position,(function(i){return s("option",{key:i,domProps:{value:i}},[t._v("\n                        "+t._s(i)+"\n                      ")])}))],2)])]),s("div",{staticClass:"form-group row"},[s("label",{staticClass:"col-sm-3",attrs:{for:""}},[t._v(" Di Mulai Pada Jam ")]),s("div",{staticClass:"col-sm-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.StartTime[a],expression:"StartTime[i]"}],attrs:{type:"time"},domProps:{value:t.StartTime[a]},on:{input:function(i){i.target.composing||t.$set(t.StartTime,a,i.target.value)}}})])]),s("div",{staticClass:"form-group row"},[t._m(0,!0),s("div",{staticClass:"col-sm-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.Durations[a],expression:"Durations[i]"}],attrs:{type:"number"},domProps:{value:t.Durations[a]},on:{input:function(i){i.target.composing||t.$set(t.Durations,a,i.target.value)}}})])])])})),0)]),t._m(1)])])])])])},e=[function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("label",{staticClass:"col-sm-3",attrs:{for:""}},[t._v("\n                    Waktu Mengerjakan / Durasi "),s("small",{staticClass:"badge badge-info"},[t._v("Menit")])])},function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"form-group row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"row justify-content-left"},[s("div",{staticClass:"col-sm-2"},[s("button",{staticClass:"btn btn-block btn-primary"},[t._v("Simpan")])])])])])}],n={name:"CreatejadwalUjian",data:function(){return{Positions:[],StartTime:[],Durations:[],Ujian:{},SesiUjian:[],token:null,position:0,isloading:!0,ujian_id:null}},mounted:function(){this.token=sessionStorage.getItem("session_token");var t=this.$route.params.ujian_id;this.ujian_id=t,this.actionGetUjianById(t),this.actionGetSesiUjianByUjianId(t)},methods:{actionGetUjianById:function(t){var i=this;this.$axios.get("publisher-ujian/".concat(t),{headers:{"x-access-token":this.token}}).then((function(t){i.Ujian=t.data.data})).catch((function(t){console.log(t)}))},actionGetSesiUjianByUjianId:function(t){var i=this;this.$axios.get("publisher-sesi-in-ujian/"+t,{headers:{"x-access-token":this.token}}).then((function(t){i.SesiUjian=t.data.data,i.position=i.SesiUjian.length,i.isloading=!1})).catch((function(t){i.isloading=!1,console.log(t)}))},actionCreateJadwal:function(){for(var t=this,i=[],s=0;s<this.position;s++)i.push({position:this.Positions[s],sesi_id:this.SesiUjian[s]._id,sesi_ujian:this.SesiUjian[s].sesi_ujian,start_time:this.StartTime[s],duration:this.Durations[s]});var a={ujian_id:this.Ujian._id,schedule:i};console.log(a),this.$axios.post("publisher-jadwal-ujian",a,{headers:{"x-access-token":this.token}}).then((function(i){"true"===i.data.success&&t.$notify({group:"foo",title:"Success Add ",text:i.data.message}),t.$router.push({path:"/p/ujian/ujian-detail",query:{_id:t.ujian_id}})})).catch((function(){t.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}}},o=n,r=s("2877"),l=Object(r["a"])(o,a,e,!1,null,"5db358e0",null);i["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0c7352.b1cb6546.js.map