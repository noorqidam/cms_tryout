(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5af51023"],{"04be":function(t,e,a){"use strict";var s=a("91a1"),n=a.n(s);n.a},"59a8":function(t,e,a){},"59bd":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[t._v("\n          Loading...\n        ")])])])],1),a("div",{staticClass:"col-md-12 card",staticStyle:{"max-height":"750px"}},[a("form",{on:{submit:function(e){return e.preventDefault(),t._actionSearch(e)}}},[a("div",{staticClass:"form-group row my-2"},[a("label",{staticClass:"my-2 ml-5",staticStyle:{"font-size":"14px"},attrs:{for:"search"}},[t._v("Cari Ujian")]),a("div",{staticClass:"col-sm-6"},[a("multiselect",{attrs:{options:t.dataUjian,id:"search-ujian",label:"judul_ujian","track-by":"judul_ujian",placeholder:"Cari Ujian disini","open-direction":"bottom",searchable:!0,"close-on-select":!0,"internal-search":!1,"clear-on-select":!1},on:{"search-change":t.asyncFind},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("span",{attrs:{slot:"noResult"},slot:"noResult"},[t._v("Tidak ada Ujian dengan judul tersebut.")])])],1),t._m(0)])]),a("div",{staticClass:"col-md-12"},[a("b-table",{attrs:{"show-empty":"","sticky-header":"","head-variant":"dark",responsive:"",fields:t.attribute,items:t.items,"current-page":t.currentPage,busy:t.isBusy},scopedSlots:t._u([{key:"cell(No)",fn:function(e){return[t._v("\n          "+t._s(e.index+1+(t.currentPage-1)*t.perPage)+"\n        ")]}},{key:"cell(ujian_banner)",fn:function(e){return[e.item.ujian_banner?a("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathImages+e.item.ujian_banner,expression:"pathImages + data.item.ujian_banner",modifiers:{container:!0}}],staticStyle:{width:"200px",height:"auto"},attrs:{alt:e.item.ujian_banner,srcset:t.pathImages+e.item.ujian_banner}}):t._e()]}},{key:"cell(is_premium)",fn:function(e){return[e.item.is_premium?a("span",{staticClass:"badge badge-success"},[t._v(" Premuim ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" Free ")])]}},{key:"cell(waktu)",fn:function(e){return[t._v("\n          "+t._s(t.actionViewDate(e.item.start_date))+" "+t._s(e.item.times)+" s/d\n          "+t._s(t.actionViewDate(e.item.end_date))+" "+t._s(e.item.end_times)+"\n        ")]}},{key:"cell(publish)",fn:function(e){return[e.item.publish?a("span",{staticClass:"badge badge-primary"},[t._v(" Publish ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" UnPublish")])]}},{key:"cell(is_private)",fn:function(e){return[e.item.is_private?a("span",{staticClass:"badge badge-primary"},[t._v(" Y ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" N ")])]}},{key:"cell(detail)",fn:function(e){return[a("button",{staticClass:"btn btn-sm btn-primary",on:{click:function(a){return t.actionView(e.item._id)}}},[a("i",{staticClass:"fa fa-list"}),t._v(" Detail\n          ")])]}},{key:"cell(report)",fn:function(e){return[a("button",{staticClass:"btn btn-sm btn-success",on:{click:function(a){return t.reportUjian(e.item._id)}}},[a("i",{staticClass:"fa fa-leanpub"}),t._v(" Report\n          ")])]}}])})],1),a("hr"),a("div",{staticClass:"row justify-content-end"},[a("div",{staticClass:"col-sm-auto"},[a("b-pagination",{attrs:{"total-rows":t.totalRows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-sm-auto mt-1"},[a("button",{staticClass:"btn btn-outline-primary btn-sm"},[a("i",{staticClass:"fa fa-search"})])])}],i=a("c1df"),c=a.n(i),r={name:"IndexUjian",data:function(){return{items:[],currentPage:1,perPage:20,totalRows:0,isLoading:!0,token:null,isBusy:!0,pathImages:"https://storage.googleapis.com/edutore-cdn/tryout/",value:[],attribute:["No",{key:"judul_ujian",label:"Judul",sortable:!0,sortDirection:"desc"},{key:"ujian_banner",label:"Banner",class:"text-center"},{key:"type_ujian",label:"Tipe Ujian",sortable:!0,class:"text-center"},{key:"is_premium",label:"Premium",sortable:!0,class:"text-center"},{key:"category_ujian",label:"Kategori",sortable:!0,class:"text-center"},{key:"waktu",label:"Waktu"},{key:"publish",label:"Publish",sortable:!0,class:"text-center"},{key:"is_private",label:"Private",class:"text-center"},{key:"detail",label:"Detail",class:"text-center"},{key:"report",label:"Report",class:"text-center"}],dataUjian:[]}},watch:{currentPage:function(){this.actionGetAll()}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this.actionGetAll()},methods:{actionViewDate:function(t){return t?(c()().locale("id"),c()(t).format("DD MMMM YYYY")):""},actionView:function(t){this.$router.push({path:"/ujian/ujian-detail/"+t})},reportUjian:function(t){this.$router.push({path:"/ujian/report-sesi-ujian/"+t})},actionGetAll:function(){var t=this;this.isBusy=!0,this.$axios.get("ujian?page=".concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){"true"===e.data.success&&(t.items=e.data.data,t.totalRows=e.data.count),t.isLoading=!1,t.isBusy=!1})).catch((function(e){console.log(e),t.isLoading=!1,t.isBusy=!1}))},asyncFind:function(t){var e=this;t.length>3&&(this.isBusy=!0,this.$axios.get("ujian/search?judul="+t,{headers:{"x-access-token":this.token}}).then((function(t){e.items=t.data.data,e.dataUjian=e.items,e.totalRows=t.data.count,e.isBusy=!1})).catch((function(t){console.log(t),e.items=[],e.isBusy=!1})))},_actionSearch:function(){var t=this;this.isBusy=!0,this.$axios.get("ujian/search?judul="+this.value.judul_ujian,{headers:{"x-access-token":this.token}}).then((function(e){t.items=e.data.data,t.totalRows=e.data.count,t.isBusy=!1})).catch((function(e){console.log(e),t.items=[],t.isBusy=!1}))}}},o=r,l=(a("60bc"),a("04be"),a("2877")),u=Object(l["a"])(o,s,n,!1,null,"4e0b5257",null);e["default"]=u.exports},"60bc":function(t,e,a){"use strict";var s=a("59a8"),n=a.n(s);n.a},"91a1":function(t,e,a){}}]);
//# sourceMappingURL=chunk-5af51023.667efde3.js.map