(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4437e1d5"],{"2c48":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"row mb-1"},[s("div",{staticClass:"col-md-12"},[s("h4",{staticClass:"h4 text-center text-uppercase"},[t._v(t._s(t.detail.sesi_ujian))]),t._v("\n            Jumlah Soal "),s("b",[t._v(" "+t._s(t.totalRows)+" ")]),s("router-link",{staticClass:"btn btn-sm btn-primary right-0",attrs:{to:{path:"/p/ujian/banksoal-sesi-ujian",query:{_id:t.detail._id,sesi_ujian:t.detail.sesi_ujian}}}},[s("i",{staticClass:"fa fa-plus"}),t._v(" Soal\n            ")])],1),s("button",{staticClass:"btn btn-md btn-danger",on:{click:t.actionDeleteSesiUjian}},[s("i",{staticClass:"fa fa-trash-o"}),t._v(" Hapus Sesi\n          ")])]),s("b-table",{attrs:{"show-empty":"",small:"","sticky-header":"","head-variant":"dark",responsive:"",items:t.items,fields:t.attribute,"current-page":t.currentPage,filter:t.filter,filterIncludedFields:t.filterOn,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection,busy:t.isBusy},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(No)",fn:function(e){return[t._v("\n            "+t._s(e.index+1)+"\n          ")]}},{key:"cell(soal)",fn:function(e){return[e.item.soal_text?s("div",[s("p",{domProps:{innerHTML:t._s(e.item.soal_text)}})]):t._e()]}},{key:"cell(images)",fn:function(e){return[e.item.soal_image?s("div",[e.item.soal_image?s("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathImagesQ+e.item.soal_image,expression:"pathImagesQ + data.item.soal_image",modifiers:{container:!0}}],staticStyle:{heigth:"60pxwidth:auto","max-width":"200px"},attrs:{alt:e.item.soal_image,srcset:""}}):t._e()]):t._e()]}},{key:"cell(actions)",fn:function(t){return[s("b-button",{attrs:{size:"sm"},on:{click:t.toggleDetails}},[s("i",{staticClass:"fa fa-angle-down"})])]}},{key:"cell(deleted)",fn:function(e){return[s("b-button",{staticClass:"btn-danger",attrs:{size:"sm"},on:{click:function(s){return t._actionDeleted(e.item._id)}}},[s("i",{staticClass:"fa fa-trash"})])]}},{key:"row-details",fn:function(e){return[e.item.jawabans.length>0?s("b-card",[s("ol",{attrs:{type:"A"}},t._l(e.item.jawabans,(function(e,a){return s("li",{key:a},[s("label",{domProps:{innerHTML:t._s(e.jawaban_text)}}),t._v(" (point\n                  "),s("span",{staticClass:"badge badge-light"},[t._v(" "+t._s(e.point)+" ")]),t._v(" )\n                ")])})),0)]):s("b-card",[t._v("\n              Tidak ada pilihan jawaban\n            ")])]}},{key:"table-busy",fn:function(){return[s("div",{staticClass:"text-center text-dark my-2"},[s("b-spinner",{staticClass:"align-middle",attrs:{variant:"dark",type:"grow",label:"Loading .."}}),t._v("\n              Loading ..\n            ")],1)]},proxy:!0}])})],1)])])])},i=[],n={name:"SesiUjianUjianPublisher",data:function(){return{items:[],Form:{},detail:{},currentPage:1,perPage:100,totalRows:0,isLoading:!1,token:null,pathImages:"https://storage.googleapis.com/edutore-cdn/public/module/thumb/",pathImagesQ:"https://storage.googleapis.com/edutore-cdn/public/soal/question/",pathImagesAnswer:"https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",attribute:["No",{key:"soal",label:"Soal text",sortable:!0,sortDirection:"desc"},{key:"images",label:"Soal Image",sortable:!0,class:"text-center"},{key:"type_soal",label:"Tipe Soal",sortable:!0,class:"text-center"},{key:"category_id",label:"Kategory",sortable:!0,class:"text-center"},{key:"matpel_id",label:"Mata pelajaran",sortable:!0,class:"text-center"},{key:"publisher_id",label:"Publisher",sortable:!0,class:"text-center"},{key:"actions",label:"Actions"},{key:"deleted",label:"Hapus"}],sortBy:"",sortDesc:!1,sortDirection:"asc",filter:null,filterOn:[],isBusy:!0,Filter:null,breadcrumb:[{text:"Ujian",href:"/ujian",active:!0}],duration:null,jam:null,menit:null,seesi_ujian_id:null,ujian_id:null}},mounted:function(){var t=this.$route.params.sesi_id;this.sesi_ujian_id=t,this.ujian_id=this.$route.params.ujian_id,this.token=sessionStorage.getItem("session_token"),this._actionGetSoalBySesiUjianId(t)},methods:{_actionGetSoalBySesiUjianId:function(t){var e=this;this.$axios.get("publisher-sesi-ujian/".concat(t),{headers:{"x-access-token":this.token}}).then((function(t){var s=t.data;"true"===t.data.success&&(e.items=s.data.soals,e.totalRows=e.items.length,e.detail=t.data.data,e.isBusy=!1),e.isBusy=!1})).catch((function(t){console.log(t),e.isBusy=!1}))},_actionDeleted:function(t){var e=this,s={sesi_ujian_id:this.detail._id,soal_id:t};this.$axios.post("publisher-sesi-ujian/remove-soals",s,{headers:{"x-access-token":this.token}}).then((function(s){e.$notify({group:"foo",type:"success",title:"Yay",text:s.data.message}),e._removeItems(t)})).catch((function(t){console.log(t),e.$notify({group:"foo",type:"error",text:"Ada Kesalahan di Server "})}))},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1},_removeItems:function(t){var e=this.items.map((function(t){return t._id})).indexOf(t);this.items.splice(e,1),this.totalRows=this.items.length},actionDeleteSesiUjian:function(){var t=this,e={sesi_ujian_id:this.sesi_ujian_id};this.$axios.post("publisher-sesi-ujian/sesiujian",e,{headers:{"x-access-token":this.token}}).then((function(e){t.$notify({group:"foo",type:"success",title:"Yay",text:e.data.message}),t.$router.push({path:"/p/ujian/ujian-detail",query:{_id:t.ujian_id}})})).catch((function(t){console.log(t)}))}}},o=n,l=(s("7b6e"),s("2877")),r=Object(l["a"])(o,a,i,!1,null,"f6acb400",null);e["default"]=r.exports},"5cd1":function(t,e,s){},"7b6e":function(t,e,s){"use strict";var a=s("5cd1"),i=s.n(a);i.a}}]);
//# sourceMappingURL=chunk-4437e1d5.acafc328.js.map