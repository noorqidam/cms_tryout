(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7454ceae"],{1593:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-2 card p-0 fixed",staticStyle:{"max-height":"450px"}},[a("form",[e._m(0),a("div",{staticClass:"ml-1 mb-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.Filter,expression:"Filter"}],attrs:{type:"text"},domProps:{value:e.Filter},on:{input:function(t){t.target.composing||(e.Filter=t.target.value)}}})]),a("div",{staticClass:"col-sm-12",staticStyle:{"max-height":"200px",overflow:"auto"}},e._l(e.filteredList,(function(t){return a("div",{key:t._id},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.matpel,expression:"matpel"}],attrs:{type:"checkbox"},domProps:{value:t._id,checked:Array.isArray(e.matpel)?e._i(e.matpel,t._id)>-1:e.matpel},on:{change:[function(a){var s=e.matpel,i=a.target,n=!!i.checked;if(Array.isArray(s)){var r=t._id,o=e._i(s,r);i.checked?o<0&&(e.matpel=s.concat([r])):o>-1&&(e.matpel=s.slice(0,o).concat(s.slice(o+1)))}else e.matpel=n},e._actionFilter]}}),e._v("\n                "+e._s(t._id)+" ("+e._s(t.count)+")\n              ")])])})),0),a("hr"),e._m(1),a("div",{staticClass:"col-md-12",staticStyle:{"max-height":"150px",overflow:"auto"}},e._l(e.GroupLevel,(function(t){return a("div",{key:t._id,staticStyle:{"margin-left":"0"}},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.level,expression:"level"}],attrs:{type:"checkbox"},domProps:{value:t._id,checked:Array.isArray(e.level)?e._i(e.level,t._id)>-1:e.level},on:{change:[function(a){var s=e.level,i=a.target,n=!!i.checked;if(Array.isArray(s)){var r=t._id,o=e._i(s,r);i.checked?o<0&&(e.level=s.concat([r])):o>-1&&(e.level=s.slice(0,o).concat(s.slice(o+1)))}else e.level=n},e._actionFilter]}}),e._v("\n                "+e._s(t._id)+" ("+e._s(t.count)+")\n              ")])])})),0),a("hr"),e._m(2),e.SubGroupLevel?a("div",{staticClass:"col-md-12",staticStyle:{"max-height":"100px",overflow:"auto"}},e._l(e.SubGroupLevel,(function(t){return a("div",{key:t._id,staticStyle:{"margin-left":"0"}},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sub_level,expression:"sub_level"}],attrs:{type:"checkbox"},domProps:{value:t._id,checked:Array.isArray(e.sub_level)?e._i(e.sub_level,t._id)>-1:e.sub_level},on:{change:[function(a){var s=e.sub_level,i=a.target,n=!!i.checked;if(Array.isArray(s)){var r=t._id,o=e._i(s,r);i.checked?o<0&&(e.sub_level=s.concat([r])):o>-1&&(e.sub_level=s.slice(0,o).concat(s.slice(o+1)))}else e.sub_level=n},e._actionFilter]}}),e._v("\n                "+e._s(t._id)+" ("+e._s(t.count)+")\n              ")])])})),0):a("div",{staticClass:"col-md-12"},[e._v("\n            Tidak ada Sub Kategori\n          ")])])]),a("div",{staticClass:"col-md-10"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"form-group row"},[a("div",{staticClass:"col-sm"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"form-control form-control-sm",attrs:{type:"text",placeholder:"Cari disini"},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}})]),a("div",{staticClass:"col-sm-auto"},[a("router-link",{staticClass:"btn btn-sm",attrs:{to:{path:"/p/ujian/cart-soal-ujian",query:{_id:e.ujian_id}}}},[e._v("\n                    Cart Soal\n                    "),a("i",{staticClass:"fa fa-cart-arrow-down"}),a("span",{staticClass:"badge badge-pill badge-success"},[e._v(" "+e._s(e.totalCart))])])],1)]),e.selected.length>0?a("div",{staticClass:"row"},[a("div",{},[e._v("\n                  Di Pilih "),a("b",[e._v(" "+e._s(e.selected.length)+" ")]),a("button",{staticClass:"btn btn-sm btn-success",on:{click:e.actionStoredIndexedDB}},[a("i",{staticClass:"fa fa-send"}),e._v(" Proses\n                  ")])]),a("div",{staticClass:"ml-2"},[a("button",{staticClass:"btn btn-sm btn-danger",on:{click:e.clearSelected}},[a("i",{staticClass:"fa fa-times"}),e._v(" Buang Semua\n                  ")])])]):e._e()]),a("div",{staticClass:"row justify-content-end"},[a("div",{staticClass:"col-sm-auto"},[a("label",{staticClass:"text-bold",attrs:{for:""}},[e._v("\n                  Total Soal "),a("b",[e._v(" "+e._s(e._formatPrice(e.totalRows))+" ")])])])]),a("div",[a("b-table",{ref:"selectableTable",attrs:{selectable:"","select-mode":e.selectMode,"show-empty":"",small:"","sticky-header":"","head-variant":"dark",responsive:"",items:e.items,fields:e.attribute,"current-page":e.currentPage,filter:e.filter,filterIncludedFields:e.filterOn,"sort-by":e.sortBy,"sort-desc":e.sortDesc,"sort-direction":e.sortDirection,busy:e.isBusy},on:{"row-selected":e.onRowSelected,"update:sortBy":function(t){e.sortBy=t},"update:sort-by":function(t){e.sortBy=t},"update:sortDesc":function(t){e.sortDesc=t},"update:sort-desc":function(t){e.sortDesc=t},filtered:e.onFiltered},scopedSlots:e._u([{key:"cell(No)",fn:function(t){return[e._v("\n                  "+e._s(t.index+1)+"\n                ")]}},{key:"cell(soal)",fn:function(t){return[t.item.soal_text?a("div",[a("p",{domProps:{innerHTML:e._s(t.item.soal_text)}})]):e._e()]}},{key:"cell(images)",fn:function(t){return[t.item.soal_image?a("div",[t.item.soal_image?a("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:e.pathImagesQ+t.item.soal_image,expression:"pathImagesQ + data.item.soal_image",modifiers:{container:!0}}],staticStyle:{heigth:"60pxwidth:auto","max-width":"200px"},attrs:{alt:t.item.soal_image,srcset:""}}):e._e()]):e._e()]}},{key:"cell(actions)",fn:function(e){return[a("b-button",{attrs:{size:"sm"},on:{click:e.toggleDetails}},[a("i",{staticClass:"fa fa-angle-down"})])]}},{key:"row-details",fn:function(t){return[t.item.jawabans.length>0?a("b-card",[a("ol",{attrs:{type:"A"}},e._l(t.item.jawabans,(function(t,s){return a("li",{key:s},[a("label",{domProps:{innerHTML:e._s(t.jawaban_text)}}),e._v(" (point\n                        "),a("span",{staticClass:"badge badge-light"},[e._v(" "+e._s(t.point)+" ")]),e._v(" )\n                      ")])})),0)]):a("b-card",[e._v("\n                    Tidak ada pilihan jawaban\n                  ")])]}},{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center text-dark my-2"},[a("b-spinner",{staticClass:"align-middle",attrs:{variant:"dark",type:"grow",label:"Loading .."}}),e._v("\n                    Loading ..\n                  ")],1)]},proxy:!0}])})],1),a("div",{staticClass:"row justify-content-end"},[a("div",{staticClass:"col-sm-auto"},[a("b-pagination",{attrs:{"total-rows":e.totalRows,"per-page":e.perPage},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)])])])])])])])},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"pl-1",attrs:{for:""}},[a("b",[e._v(" Mata Pelajaran ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"pl-1",attrs:{for:""}},[a("b",[e._v(" Kategori ")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("label",{staticClass:"pl-1",attrs:{for:""}},[a("b",[e._v(" Sub Kategori ")])])}],n=(a("ac6a"),a("6b54"),a("a481"),a("96cf"),a("3b8d")),r={name:"BankSoalUjianPublisher",data:function(){return{items:[],perPage:200,totalRows:0,isLoading:!1,token:null,pathImages:"https://storage.googleapis.com/edutore-cdn/public/module/thumb/",pathImagesQ:"https://storage.googleapis.com/edutore-cdn/public/soal/question/",pathImagesAnswer:"https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",pathPembahasan:"https://storage.googleapis.com/edutore-cdn/public/soal/discussion/",Filterspublishers:[],matpel:[],level:[],sub_level:[],GroupMatpel:[],GroupLevel:[],SubGroupLevel:[],GroupPublisher:[],showD:[],attribute:["No",{key:"soal",label:"Soal text",sortable:!0,sortDirection:"desc"},{key:"images",label:"Soal Image",sortable:!0,class:"text-center"},{key:"type_soal",label:"Tipe Soal",sortable:!0,class:"text-center"},{key:"category_id",label:"Kategory",sortable:!0,class:"text-center"},{key:"matpel_id",label:"Mata pelajaran",sortable:!0,class:"text-center"},{key:"publisher_id",label:"Publisher",sortable:!0,class:"text-center"},{key:"actions",label:"Actions"},{key:"pilih",label:"Pilih"}],currentPage:1,sortBy:"",sortDesc:!1,sortDirection:"asc",filter:null,filterOn:[],isBusy:!0,Filter:null,ujian_id:null,selectMode:"multi",selected:[],search:"",totalCart:0,DB_NAME:"Ujian",DB_VERSION:3,db:null}},watch:{currentPage:function(){if(this.$route.query.matpel||this.$route.query.level){var e=this.$route.query.matpel?this.$route.query.matpel:null,t=this.$route.query.level?this.$route.query.level:null,a=this.$route.query.sub_level?this.$route.query.sub_level:null;this._actionQuerySoal(e,t,a)}else console.log("get all"),this._actionGetAll()}},computed:{filteredList:function(){var e=this;return this.Filter?this.GroupMatpel.filter((function(t){return t._id.toLowerCase().indexOf(e.Filter.toLowerCase())>-1})):this.GroupMatpel}},mounted:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return this.token=sessionStorage.getItem("session_token"),t=this.$route.query.ujian_id,this.ujian_id=t,this._actionGetAll(),e.next=6,this.getDb();case 6:this.db=e.sent;case 7:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),methods:{_actionFilter:function(){var e=this.matpel,t=this.level,a=this.sub_level;this._actionQuerySoal(e,t,a)},_actionGetAll:function(){var e=this;this.isBusy=!0,this.$axios.get("publisher-banksoals?page=".concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(t){var a=t.data;"true"===t.data.success&&(e.items=a.data,e.totalRows=a.total,e.GroupMatpel=a.matpel_id,e.GroupLevel=a.category_id,e.SubGroupLevel=a.sub_category_id),e.isBusy=!1})).catch((function(t){console.log(t),e.isBusy=!1}))},_actionQuerySoal:function(e,t,a){var s=this;e.length>0?e.length>0&&t.length>0&&a.length>0?(this.isBusy=!0,this.$axios.get("publisher-banksoals/filter?&matpel=".concat(e,"&level=").concat(t,"&sub_level=").concat(a,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){s.isBusy=!1,s.items=[],"true"===e.data.success&&(s.items=e.data.data,s.totalRows=e.data.total,s.GroupMatpel=e.data.matpel_id?e.data.matpel_id:null,s.GroupLevel=e.data.category_id),s.isBusy=!1})).catch((function(e){console.log(e),s.isBusy=!1}))):e.length>0&&a.length>0?(this.isBusy=!0,this.$axios.get("publisher-banksoals/filter?&matpel=".concat(e,"&sub_level=").concat(a,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){s.isBusy=!1,s.items=[],"true"===e.data.success&&(s.items=e.data.data,s.totalRows=e.data.total,s.GroupMatpel=e.data.matpel_id?e.data.matpel_id:null,s.GroupLevel=e.data.category_id),s.isBusy=!1})).catch((function(e){console.log(e),s.isBusy=!1}))):(this.isBusy=!0,this.$axios.get("publisher-banksoals/filter?&matpel=".concat(e,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){s.isBusy=!1,s.items=[],"true"===e.data.success&&(s.items=e.data.data,s.totalRows=e.data.total,s.GroupMatpel=e.data.matpel_id?e.data.matpel_id:null,s.GroupLevel=e.data.category_id),s.isBusy=!1})).catch((function(e){console.log(e),s.isBusy=!1}))):t.length>0?t.length>0&&a.length>0?(this.isBusy=!0,this.$axios.get("publisher-banksoals/filter?&level=".concat(t,"&sub_level=").concat(a,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){s.isBusy=!1,s.items=[],"true"===e.data.success&&(s.items=e.data.data,s.totalRows=e.data.total,s.GroupMatpel=e.data.matpel_id?e.data.matpel_id:null,s.GroupLevel=e.data.category_id),s.isBusy=!1})).catch((function(e){console.log(e),s.isBusy=!1}))):(this.isBusy=!0,this.$axios.get("publisher-banksoals/filter?&level=".concat(t,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){s.isBusy=!1,s.items=[],"true"===e.data.success&&(s.items=e.data.data,s.totalRows=e.data.total,s.GroupMatpel=e.data.matpel_id?e.data.matpel_id:null,s.GroupLevel=e.data.category_id),s.isBusy=!1})).catch((function(e){console.log(e),s.isBusy=!1}))):a.length>0&&(a.length>0&&e.length>0?(this.isBusy=!0,this.$axios.get("publisher-banksoals/filter?&matpel=".concat(e,"&sub_level=").concat(a,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){s.isBusy=!1,s.items=[],"true"===e.data.success&&(s.items=e.data.data,s.totalRows=e.data.total,s.GroupMatpel=e.data.matpel_id?e.data.matpel_id:null,s.GroupLevel=e.data.category_id),s.isBusy=!1})).catch((function(e){console.log(e),s.isBusy=!1}))):(this.isBusy=!0,this.$axios.get("publisher-banksoals/filter?&sub_level=".concat(a,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){s.isBusy=!1,s.items=[],"true"===e.data.success&&(s.items=e.data.data,s.totalRows=e.data.total,s.GroupMatpel=e.data.matpel_id?e.data.matpel_id:null,s.GroupLevel=e.data.category_id),s.isBusy=!1})).catch((function(e){console.log(e),s.isBusy=!1}))))},_formatPrice:function(e){var t=(e/1).toFixed(0).replace(".",",");return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},onFiltered:function(e){this.totalRows=e.length,this.currentPage=1},onRowSelected:function(e){this.selected=e},selectAllRows:function(){this.$refs.selectableTable.selectAllRows()},clearSelected:function(){this.$refs.selectableTable.clearSelected()},selectThirdRow:function(){this.$refs.selectableTable.selectRow(2)},unselectThirdRow:function(){this.$refs.selectableTable.unselectRow(2)},actionStoredIndexedDB:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.selected,e.next=3,this.addQuizToDb(t);case 3:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),addQuizToDb:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,s){var i=a.db.transaction("ujian","readwrite");i.onerror=function(e){console.log("Error Add",e),s("Error")},i.oncomplete=function(t){console.log(t),e()};var n=i.objectStore("ujian");t.forEach((function(e){console.log("load soal ");var t=a,s=n.index("soal_id"),i=s.get(e._id);i.onsuccess=function(){var a=i.result;if(void 0!==a)console.log("data exist");else{n.put({soal_id:e._id,value:e});var s=n.count();s.onsuccess=function(){t.totalCart=s.result,console.log(t.totalCart)}}},i.onerror=function(e){console.log(e)}})),a.clearSelected()})));case 1:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),listSoalCart:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.db.transaction("ujian","readwrite").objectStore("ujian");case 2:t=e.sent,t.onerror=function(e){console.log("Error Add",e)},t.oncomplete=function(e){console.log(e)},t.openCursor().onsuccess=function(e){var t=e.target.result;t?(console.log("Name for SSN "+t.key+" is "+JSON.stringify(t.value)),t.continue()):console.log("No more entries!")};case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),coutIndexDb:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("count indexDB"),a=this,s=t.count(),s.onsuccess=function(){console.log(s.result),a.totalCart=s.result};case 4:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}(),getDb:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(){var t=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,a){var s=window.indexedDB.open(t.DB_NAME,t.DB_VERSION);window.indexedDB||alert("Browser anda tidak mendukung IndexDB"),s.onerror=function(e){console.log("Error opening DB",e),a("Error")},s.onsuccess=function(a){console.log("Success Open DB"),e(a.target.result);var i=s.result,n=i.transaction("ujian","readwrite"),r=n.objectStore("ujian");t.coutIndexDb(r)},s.onupgradeneeded=function(e){console.log("onupgradeneeded");var t=e.target.result;if(!t.objectStoreNames.contains("ujian")){var a=t.createObjectStore("ujian",{autoIncrement:!0,keyPath:"id"});a.createIndex("soal_id","soal_id",{unique:!0})}}})));case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()}},o=r,l=(a("7719"),a("2877")),c=Object(l["a"])(o,s,i,!1,null,"7252b457",null);t["default"]=c.exports},3846:function(e,t,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},"42af":function(e,t,a){},"6b54":function(e,t,a){"use strict";a("3846");var s=a("cb7c"),i=a("0bfb"),n=a("9e1e"),r="toString",o=/./[r],l=function(e){a("2aba")(RegExp.prototype,r,e,!0)};a("79e5")((function(){return"/a/b"!=o.call({source:"a",flags:"b"})}))?l((function(){var e=s(this);return"/".concat(e.source,"/","flags"in e?e.flags:!n&&e instanceof RegExp?i.call(e):void 0)})):o.name!=r&&l((function(){return o.call(this)}))},7719:function(e,t,a){"use strict";var s=a("42af"),i=a.n(s);i.a},a481:function(e,t,a){"use strict";var s=a("cb7c"),i=a("4bf8"),n=a("9def"),r=a("4588"),o=a("0390"),l=a("5f1b"),c=Math.max,u=Math.min,d=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,g=function(e){return void 0===e?e:String(e)};a("214f")("replace",2,(function(e,t,a,v){return[function(s,i){var n=e(this),r=void 0==s?void 0:s[t];return void 0!==r?r.call(s,n,i):a.call(String(n),s,i)},function(e,t){var i=v(a,e,this,t);if(i.done)return i.value;var d=s(e),p=String(this),h="function"===typeof t;h||(t=String(t));var m=d.global;if(m){var b=d.unicode;d.lastIndex=0}var _=[];while(1){var y=l(d,p);if(null===y)break;if(_.push(y),!m)break;var w=String(y[0]);""===w&&(d.lastIndex=o(p,n(d.lastIndex),b))}for(var k="",x=0,S=0;S<_.length;S++){y=_[S];for(var B=String(y[0]),C=c(u(r(y.index),p.length),0),P=[],R=1;R<y.length;R++)P.push(g(y[R]));var j=y.groups;if(h){var $=[B].concat(P,C,p);void 0!==j&&$.push(j);var D=String(t.apply(void 0,$))}else D=f(B,p,C,P,j,t);C>=x&&(k+=p.slice(x,C)+D,x=C+B.length)}return k+p.slice(x)}];function f(e,t,s,n,r,o){var l=s+e.length,c=n.length,u=h;return void 0!==r&&(r=i(r),u=p),a.call(o,u,(function(a,i){var o;switch(i.charAt(0)){case"$":return"$";case"&":return e;case"`":return t.slice(0,s);case"'":return t.slice(l);case"<":o=r[i.slice(1,-1)];break;default:var u=+i;if(0===u)return a;if(u>c){var p=d(u/10);return 0===p?a:p<=c?void 0===n[p-1]?i.charAt(1):n[p-1]+i.charAt(1):a}o=n[u-1]}return void 0===o?"":o}))}}))}}]);
//# sourceMappingURL=chunk-7454ceae.eefd100f.js.map