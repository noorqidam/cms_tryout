(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b6327"],{"1baa":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[!1===e.isLoading?a("div",{staticClass:"col-md-12"},[a("h3",{staticClass:"text-center"},[e._v("Recycle Bin Quiz")]),a("div",{staticClass:"col-md-12 card"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"col-md-6 m-1 float-right"},[a("b-form-group",{staticClass:"mb-0",attrs:{"label-for":"filterInput"}},[a("b-input-group",{attrs:{size:"sm"}},[a("b-form-input",{attrs:{type:"search",id:"filterInput",placeholder:"Type to Search"},model:{value:e.filter,callback:function(t){e.filter=t},expression:"filter"}}),a("b-input-group-append",[a("b-button",{attrs:{disabled:!e.filter},on:{click:function(t){e.filter=""}}},[e._v("Clear")])],1)],1)],1)],1)]),a("b-table",{staticStyle:{"max-height":"700px"},attrs:{"show-empty":"","sticky-header":"","head-variant":"dark",responsive:"",items:e.paginatedItems,fields:e.attribute,filter:e.filter},scopedSlots:e._u([{key:"cell(No)",fn:function(t){return[e._v("\n          "+e._s(t.index+1+(e.currentPage-1)*e.perPage)+"\n        ")]}},{key:"cell(quiz_banner)",fn:function(t){return[t.item.quiz_banner?a("div",[t.item.quiz_banner?a("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:e.pathImages+t.item.quiz_banner,expression:"pathImages + data.item.quiz_banner",modifiers:{container:!0}}],staticStyle:{"max-width":"100px"},attrs:{alt:t.item.quiz_banner}}):e._e()]):e._e()]}},{key:"cell(is_premium)",fn:function(t){return[t.item.is_premium?a("span",{staticClass:"badge badge-danger"},[e._v(" Premuim ")]):a("span",{staticClass:"badge badge-success"},[e._v(" Free ")])]}},{key:"cell(actions)",fn:function(t){return[a("button",{staticClass:"btn btn-danger",on:{click:function(a){return e._actionRecycle(t.item._id)}}},[a("i",{staticClass:"fa fa-recycle"})])]}}],null,!1,726655563)}),a("hr"),a("div",{staticClass:"row justify-content-end"},[a("div",{staticClass:"col-sm-auto"},[a("b-pagination",{attrs:{"total-rows":e.totalRows,"per-page":e.perPage},on:{change:e.onPageChanged},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)])],1)]):a("div",[a("h3",[e._v("Loading ...")])])])},n=[],s={name:"TrashQuizPublisher",data:function(){return{token:null,isLoading:!1,items:[],currentPage:1,perPage:10,totalRows:0,attribute:["No",{key:"judul_quiz",label:"Judul Quiz",sortable:!0,sortDirection:"desc"},{key:"quiz_banner",label:"Banner"},{key:"type_quiz",label:"Tipe Quiz",sortable:!0},{key:"is_premium",label:"Premium",sortable:!0},{key:"category_quiz",label:"Kategori",sortable:!0},{key:"penyelenggara",label:"Penyelenggara",sortable:!0},{key:"actions",label:"Actions"}],paginatedItems:[],pathImages:"https://storage.googleapis.com/edutore-cdn/tryout/",filter:null}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this._actionGetTrashQuiz()},methods:{paginate:function(e,t){var a=this.items;this.paginatedItems=a.slice(t*e,(t+1)*e)},onPageChanged:function(e){this.paginate(this.perPage,e-1)},_actionGetTrashQuiz:function(){var e=this;this.isLoading=!0,this.$axios.get("publisher-trash-quiz",{headers:{"x-access-token":this.token}}).then((function(t){"true"===t.data.success&&(e.items=t.data.data,e.isLoading=!1,e.totalRows=e.items.length,e.paginate(e.perPage,0)),e.isLoading=!1})).catch((function(t){var a=t.response.data;console.log(a),e.isLoading=!1}))},_actionRecycle:function(e){var t=this,a={quiz_id:e};this.$axios.post("publisher-trash-quiz",a,{headers:{"x-access-token":this.token}}).then((function(e){t.$notify({group:"foo",type:"success",text:e.data.message}),t._actionGetTrashQuiz()})).catch((function(e){t.$notify({group:"foo",type:"error",text:"Ada Kesalahan di Server"}),console.log(e)}))}}},r=s,o=a("2877"),l=Object(o["a"])(r,i,n,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b6327.8fa1f648.js.map