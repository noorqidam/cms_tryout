(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c763e614"],{"59a8":function(t,e,a){},"60bc":function(t,e,a){"use strict";var s=a("59a8"),i=a.n(s);i.a},"7c48":function(t,e,a){},ee30:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[t._v("\n          Loading...\n        ")])])])],1),a("div",{staticClass:"col-md-12 card"},[a("form",{on:{submit:function(e){return e.preventDefault(),t._actionSearch(e)}}},[a("div",{staticClass:"form-group row my-2"},[a("label",{staticClass:"my-2 ml-5",staticStyle:{"font-size":"14px"},attrs:{for:"search"}},[t._v("Cari Quiz")]),a("div",{staticClass:"col-sm-6"},[a("multiselect",{attrs:{options:t.dataQuiz,id:"search-quiz",label:"judul_quiz","track-by":"judul_quiz",placeholder:"Cari Quiz disini","open-direction":"bottom",searchable:!0,"close-on-select":!0,"internal-search":!1,"clear-on-select":!1},on:{"search-change":t.asyncFind},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},[a("span",{attrs:{slot:"noResult"},slot:"noResult"},[t._v("Tidak ada Quiz dengan judul tersebut.")])])],1),t._m(0)])]),a("div",{staticClass:"col-md-12"},[a("b-table",{attrs:{"show-empty":"","sticky-header":"","head-variant":"dark",responsive:"",fields:t.attribute,items:t.items,"current-page":t.currentPage,busy:t.isBusy},scopedSlots:t._u([{key:"cell(No)",fn:function(e){return[t._v("\n          "+t._s(e.index+1+(t.currentPage-1)*t.perPage)+"\n        ")]}},{key:"cell(quiz_banner)",fn:function(e){return[e.item.quiz_banner?a("img",{staticStyle:{width:"200px",height:"auto"},attrs:{src:t.pathImages+e.item.quiz_banner,alt:e.item.quiz_banner,srcset:t.pathImages+e.item.quiz_banner}}):t._e()]}},{key:"cell(is_premium)",fn:function(e){return[e.item.is_premium?a("span",{staticClass:"badge badge-success"},[t._v(" Premuim ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" Free ")])]}},{key:"cell(waktu)",fn:function(e){return[t._v("\n          "+t._s(t._actionViewDate(e.item.start_date))+" "+t._s(e.item.times)+" s/d\n          "+t._s(t._actionViewDate(e.item.end_date))+"\n          "+t._s(e.item.end_times)+"\n        ")]}},{key:"cell(publish)",fn:function(e){return[e.item.publish?a("span",{staticClass:"badge badge-primary"},[t._v(" Publish ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" UnPublish")])]}},{key:"cell(is_private)",fn:function(e){return[e.item.is_private?a("span",{staticClass:"badge badge-primary"},[t._v(" Y ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" N ")])]}},{key:"cell(detail)",fn:function(e){return[a("button",{staticClass:"btn btn-sm btn-primary",on:{click:function(a){return t._actionView(e.item._id)}}},[a("i",{staticClass:"fa fa-list"}),t._v(" Detail\n          ")])]}},{key:"cell(report)",fn:function(e){return[a("button",{staticClass:"btn btn-sm btn-success",on:{click:function(a){return t.showReport(e.item)}}},[a("i",{staticClass:"fa fa-leanpub"}),t._v(" Report\n          ")])]}}])})],1),a("hr"),a("div",{staticClass:"row justify-content-end"},[a("div",{staticClass:"col-sm-auto"},[a("b-pagination",{attrs:{"total-rows":t.totalRows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-sm-auto mt-1"},[a("button",{staticClass:"btn btn-outline-primary btn-sm"},[a("i",{staticClass:"fa fa-search"})])])}],n=a("c1df"),c=a.n(n),r={name:"IndexQuizPublisher",data:function(){return{items:[],currentPage:1,perPage:100,totalRows:0,isLoading:!0,token:null,isBusy:!0,value:[],pathImages:"https://storage.googleapis.com/edutore-cdn/quiz/",attribute:["No",{key:"judul_quiz",label:"Judul",sortable:!0,sortDirection:"desc"},{key:"quiz_banner",label:"Banner",class:"text-center"},{key:"type_quiz",label:"Tipe Quiz",sortable:!0,class:"text-center"},{key:"is_premium",label:"Premium",sortable:!0,class:"text-center"},{key:"category_quiz",label:"Kategori",sortable:!0,class:"text-center"},{key:"penyelenggara",label:"Penyelenggara",sortable:!0,class:"text-center"},{key:"type_start",label:"Tipe Start",sortable:!0,class:"text-center"},{key:"waktu",label:"Waktu"},{key:"publish",label:"Publish",sortable:!0,class:"text-center"},{key:"is_private",label:"Private",class:"text-center"},{key:"detail",label:"Detail",class:"text-center"},{key:"report",label:"Report",class:"text-center"}],dataQuiz:[]}},watch:{currentPage:function(){this._actionGetAll()}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this._actionGetAll()},methods:{_actionViewDate:function(t){return t?c()(t).format("DD MMMM YYYY"):""},_actionView:function(t){this.$router.push({path:"/p/quiz/detail-quiz",query:{_id:t}})},_actionGetAll:function(){var t=this;this.isBusy=!0,this.$axios.get("publisher-quiz?page=".concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){"true"===e.data.success&&(t.items=e.data.data,t.totalRows=e.data.count),t.isLoading=!1,t.isBusy=!1})).catch((function(e){console.log(e),t.isLoading=!1,t.isBusy=!1}))},showReport:function(t){this.$router.push({path:"/p/quiz/report-quiz/"+t._id,query:{judul_quiz:t.judul_quiz,type_quiz:t.type_quiz}})},asyncFind:function(t){var e=this;t.length>3&&(this.isBusy=!0,this.$axios.get("publisher-quiz/search?judul="+t,{headers:{"x-access-token":this.token}}).then((function(t){e.items=t.data.data,e.dataQuiz=e.items,e.totalRows=t.data.count,e.isBusy=!1})).catch((function(t){console.log(t),e.items=[],e.isBusy=!1})))},_actionSearch:function(){var t=this;this.isBusy=!0,this.$axios.get("publisher-quiz/search?judul="+this.value.judul_quiz,{headers:{"x-access-token":this.token}}).then((function(e){t.items=e.data.data,t.totalRows=e.data.count,t.isBusy=!1})).catch((function(e){console.log(e),t.items=[],t.isBusy=!1}))}}},l=r,u=(a("60bc"),a("f92b"),a("2877")),o=Object(u["a"])(l,s,i,!1,null,"115b8502",null);e["default"]=o.exports},f92b:function(t,e,a){"use strict";var s=a("7c48"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-c763e614.9b2498b5.js.map