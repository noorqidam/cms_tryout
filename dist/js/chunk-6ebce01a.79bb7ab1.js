(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ebce01a"],{"35e6":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[t._v("\n          Loading...\n        ")])])])],1),a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-2 card p-0 fixed",staticStyle:{"max-height":"900px"}},[a("form",[t._m(0),a("div",{staticClass:"col-sm-12",staticStyle:{"max-height":"220px",overflow:"scroll"}},t._l(t.GroupPublisher,(function(e){return a("div",{key:e._id,staticClass:"margin:0;float:left"},[a("li",{staticStyle:{"list-style":"none",left:"0"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.Filterspublishers,expression:"Filterspublishers"}],attrs:{type:"checkbox"},domProps:{value:e._id,checked:Array.isArray(t.Filterspublishers)?t._i(t.Filterspublishers,e._id)>-1:t.Filterspublishers},on:{change:[function(a){var s=t.Filterspublishers,i=a.target,l=!!i.checked;if(Array.isArray(s)){var r=e._id,n=t._i(s,r);i.checked?n<0&&(t.Filterspublishers=s.concat([r])):n>-1&&(t.Filterspublishers=s.slice(0,n).concat(s.slice(n+1)))}else t.Filterspublishers=l},t._actionFilter]}}),t._v("\n                "+t._s(e._id)+" ("+t._s(e.count)+")\n              ")])])})),0),a("hr"),t._m(1),a("div",{staticClass:"ml-1"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.Filter,expression:"Filter"}],attrs:{type:"text"},domProps:{value:t.Filter},on:{input:function(e){e.target.composing||(t.Filter=e.target.value)}}})]),a("div",{staticClass:"col-sm-12",staticStyle:{"max-height":"400px",overflow:"scroll"}},t._l(t.filteredList,(function(e){return a("div",{key:e._id},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.matpel,expression:"matpel"}],attrs:{type:"checkbox"},domProps:{value:e._id,checked:Array.isArray(t.matpel)?t._i(t.matpel,e._id)>-1:t.matpel},on:{change:[function(a){var s=t.matpel,i=a.target,l=!!i.checked;if(Array.isArray(s)){var r=e._id,n=t._i(s,r);i.checked?n<0&&(t.matpel=s.concat([r])):n>-1&&(t.matpel=s.slice(0,n).concat(s.slice(n+1)))}else t.matpel=l},t._actionFilter]}}),t._v("\n                "+t._s(e._id)+" ("+t._s(e.count)+")\n              ")])])})),0),a("hr"),t._m(2),a("div",{staticClass:"col-md-12",staticStyle:{"max-height":"180px",overflow:"scroll"}},t._l(t.GroupLevel,(function(e){return a("div",{key:e._id,staticStyle:{"margin-left":"0"}},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.level,expression:"level"}],attrs:{type:"checkbox"},domProps:{value:e._id,checked:Array.isArray(t.level)?t._i(t.level,e._id)>-1:t.level},on:{change:[function(a){var s=t.level,i=a.target,l=!!i.checked;if(Array.isArray(s)){var r=e._id,n=t._i(s,r);i.checked?n<0&&(t.level=s.concat([r])):n>-1&&(t.level=s.slice(0,n).concat(s.slice(n+1)))}else t.level=l},t._actionFilter]}}),t._v("\n                "+t._s(e._id)+" ("+t._s(e.count)+")\n              ")])])})),0),t._m(3),a("div",{staticClass:"col-md-12",staticStyle:{"max-height":"180px",overflow:"scroll"}},t._l(t.GroupType,(function(e){return a("div",{key:e.name,staticStyle:{"margin-left":"0"}},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],attrs:{type:"radio",id:e.name},domProps:{value:e.name,checked:t._q(t.type,e.name)},on:{change:function(a){t.type=e.name}}}),t._v("\n                "+t._s(e.label)+"\n              ")])])})),0)])]),a("div",{staticClass:"col-md-10"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row justify-content-end mb-1"},[a("div",{staticClass:"col-sm-auto"},[a("router-link",{staticClass:"btn btn-sm btn-outline-primary",attrs:{to:{path:"/create-bank-soal"}}},[a("i",{staticClass:"fa fa-plus"}),t._v(" Soal\n                ")])],1),a("div",{staticClass:"col-sm-auto"},[a("label",{staticClass:"text-bold",attrs:{for:""}},[t._v("\n                  Total Soal "),a("b",[t._v(" "+t._s(t._formatPrice(t.totalRows))+" ")])])])]),a("div",[a("b-table",{attrs:{"show-empty":"",small:"","sticky-header":"","head-variant":"dark",responsive:"",items:t.items,fields:t.attribute,"current-page":t.currentPage,filter:t.filter,"filter-included-fields":t.filterOn,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection,busy:t.isBusy},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(No)",fn:function(e){return[t._v("\n                  "+t._s(e.index+1+(t.currentPage-1)*t.perPage)+"\n                ")]}},{key:"cell(soal)",fn:function(e){return[e.item.soal_text?a("div",{staticStyle:{"max-width":"250px"}},[a("p",{domProps:{innerHTML:t._s(e.item.soal_text)}})]):t._e()]}},{key:"cell(images)",fn:function(e){return[e.item.soal_image?a("div",[e.item.soal_image?a("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathImagesQ+e.item.soal_image,expression:"pathImagesQ + data.item.soal_image",modifiers:{container:!0}}],staticStyle:{heigth:"60pxwidth:auto","max-width":"200px"},attrs:{alt:e.item.soal_image,srcset:""}}):t._e()]):t._e()]}},{key:"cell(free)",fn:function(e){return[a("div",[e.item.free_trial?a("span",{staticClass:"badge badge-success"},[t._v(" Trial ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" Non Trial ")])])]}},{key:"cell(actions)",fn:function(t){return[a("b-button",{attrs:{size:"sm"},on:{click:t.toggleDetails}},[a("i",{staticClass:"fa fa-angle-down"})])]}},{key:"cell(edit)",fn:function(e){return[a("b-button",{attrs:{variant:"primary",size:"sm"},on:{click:function(a){return t._actionEditSoal(e.item)}}},[a("i",{staticClass:"fa fa-pencil"})])]}},{key:"cell(delete)",fn:function(e){return[a("b-button",{attrs:{variant:"danger",size:"sm"},on:{click:function(a){return t._actionDeleteSoal(e)}}},[a("i",{staticClass:"fa fa-trash-o"})])]}},{key:"row-details",fn:function(e){return[a("b-card",[t._v("\n                    "+t._s(e.item.tag)+"\n                  ")]),e.item.jawabans.length>0?a("b-card",[a("ol",{attrs:{type:"A"}},t._l(e.item.jawabans,(function(e,s){return a("li",{key:s},[a("label",{domProps:{innerHTML:t._s(e.jawaban_text)}}),t._v(" (point\n                        "),a("span",{staticClass:"badge badge-light"},[t._v(" "+t._s(e.point)+" ")]),t._v(" )\n                      ")])})),0)]):a("b-card",[t._v("\n                    Tidak ada pilihan jawaban\n                  ")]),e.item.publish?a("span",{staticClass:"badge badge-success"},[t._v(" Publish ")]):a("span",{staticClass:"badge badge-danger"},[t._v(" Un Publish ")])]}},{key:"table-busy",fn:function(){return[a("div",{staticClass:"text-center text-dark my-2"},[a("b-spinner",{staticClass:"align-middle",attrs:{variant:"dark",type:"grow",label:"Loading .."}}),t._v(" Loading\n                    ..\n                  ")],1)]},proxy:!0}])})],1),a("div",{staticClass:"row justify-content-end"},[a("div",{staticClass:"col-sm-auto"},[a("b-pagination",{attrs:{"total-rows":t.totalRows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"text-left pl-1",attrs:{for:""}},[a("b",[t._v(" Publishers ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"pl-1",attrs:{for:""}},[a("b",[t._v(" Matapelajaran ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"pl-1",attrs:{for:""}},[a("b",[t._v(" Kategory ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("label",{staticClass:"pl-1",attrs:{for:""}},[a("b",[t._v(" Type ")])])}],l=(a("6b54"),a("a481"),{name:"BankSoal",data:function(){return{items:[],perPage:200,totalRows:0,isLoading:!1,token:null,pathImages:"https://storage.googleapis.com/edutore-cdn/public/module/thumb/",pathImagesQ:"https://storage.googleapis.com/edutore-cdn/public/soal/question/",pathImagesAnswer:"https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",pathPembahasan:"https://storage.googleapis.com/edutore-cdn/public/soal/discussion/",Filterspublishers:[],matpel:[],level:[],GroupMatpel:[],GroupLevel:[],GroupPublisher:[],GroupType:[{name:"true",label:"TRIAL"},{name:"false",label:"NON TRIAL"}],type:"",showD:[],attribute:["No",{key:"soal",label:"Soal text",sortable:!0,sortDirection:"desc"},{key:"images",label:"Soal Image",sortable:!0,class:"text-center"},{key:"type_soal",label:"Tipe Soal",sortable:!0,class:"text-center"},{key:"category_id",label:"Kategory",sortable:!0,class:"text-center"},{key:"matpel_id",label:"Mata pelajaran",sortable:!0,class:"text-center"},{key:"free",label:"Free"},{key:"publisher_id",label:"Publisher",sortable:!0,class:"text-center"},{key:"actions",label:"Actions"},{key:"edit",label:"Edit"},{key:"delete",label:"Delete"}],currentPage:1,sortBy:"",sortDesc:!1,sortDirection:"asc",filter:null,filterOn:[],isBusy:!0,Filter:null}},computed:{filteredList:function(){var t=this;return this.Filter?this.GroupMatpel.filter((function(e){return e._id.toLowerCase().indexOf(t.Filter.toLowerCase())>-1})):this.GroupMatpel}},watch:{currentPage:function(){var t=this.$route.query;if(console.log(t),t){var e=this.Filterspublishers,a=this.matpel,s=this.level,i=this.type;this._acrtionFilterSoal(e,a,s,i)}},type:function(){var t=this.$route.query;if(console.log(t),t){var e=this.Filterspublishers,a=this.matpel,s=this.level,i=this.type;this._acrtionFilterSoal(e,a,s,i)}}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this._actionGetAll(),this._actionGetGroupmatpel(),this._actionGetGroupLevel(),this._actionGetGroupPublisher()},methods:{_actionGetGroupmatpel:function(){var t=this;this.$axios.get("group/matapelajaran",{headers:{"x-access-token":this.token}}).then((function(e){"true"===e.data.success&&(t.GroupMatpel=e.data.data)})).catch((function(t){console.log(t)}))},_actionGetGroupLevel:function(){var t=this;this.$axios.get("group/level",{headers:{"x-access-token":this.token}}).then((function(e){"true"===e.data.success&&(t.GroupLevel=e.data.data)})).catch((function(t){console.log(t)}))},_actionGetGroupPublisher:function(){var t=this;this.$axios.get("group/publisher",{headers:{"x-access-token":this.token}}).then((function(e){"true"===e.data.success&&(t.GroupPublisher=e.data.data)})).catch((function(t){console.log(t)}))},_actionFilter:function(){var t=this,e=this.Filterspublishers,a=this.matpel,s=this.level,i=this.type;this.$router.push({path:"/banksoals?",query:{_id:e,matpel:a,level:s,type:i}}),setTimeout((function(){t._acrtionFilterSoal(e,a,s,i)}),300)},_actionGetAll:function(){var t=this;this.isBusy=!0,this.$axios.get("banksoal?page=".concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(e){var a=e.data;"true"===e.data.success&&(t.items=a.data,t.totalRows=a.total),t.isBusy=!1})).catch((function(e){console.log(e),t.isBusy=!1}))},_acrtionFilterSoal:function(t,e,a,s){var i=this;this.isBusy=!0,this.$axios.get("banksoal/filter?_id=".concat(t,"&matpel=").concat(e,"&level=").concat(a,"&type=").concat(s,"&page=").concat(this.currentPage,"&limit=").concat(this.perPage),{headers:{"x-access-token":this.token}}).then((function(t){i.isBusy=!1,i.items=[],"true"===t.data.success&&(i.items=t.data.data,i.totalRows=t.data.total),i.isBusy=!1})).catch((function(t){console.log(t),i.isBusy=!1}))},_formatPrice:function(t){var e=(t/1).toFixed(0).replace(".",",");return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1},_actionDeleteSoal:function(t){var e=this,a={_id:t.item._id};this.$axios.post("delete-bank-soal",a,{headers:{"x-access-token":this.token}}).then((function(a){console.log(a),e.$notify({group:"foo",type:"success",title:"Berhasil!",text:"Berhasil Hapus Soal"}),e.shuffle_items(t.item._id)})).catch((function(t){e.$notify({group:"foo",type:"error",title:"Opps ",text:t.response.data.message})}))},shuffle_items:function(t){var e=this.items.map((function(t){return t._id})).indexOf(t);this.items.splice(e,1),this.totalRows=this.items.length},_actionEditSoal:function(t){this.$router.push({path:"/edit-bank-soal",query:{_id:t._id}})}}}),r=l,n=(a("8e40"),a("2877")),o=Object(n["a"])(r,s,i,!1,null,"317c47b2",null);e["default"]=o.exports},3846:function(t,e,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},"6b54":function(t,e,a){"use strict";a("3846");var s=a("cb7c"),i=a("0bfb"),l=a("9e1e"),r="toString",n=/./[r],o=function(t){a("2aba")(RegExp.prototype,r,t,!0)};a("79e5")((function(){return"/a/b"!=n.call({source:"a",flags:"b"})}))?o((function(){var t=s(this);return"/".concat(t.source,"/","flags"in t?t.flags:!l&&t instanceof RegExp?i.call(t):void 0)})):n.name!=r&&o((function(){return n.call(this)}))},8793:function(t,e,a){},"8e40":function(t,e,a){"use strict";var s=a("8793"),i=a.n(s);i.a},a481:function(t,e,a){"use strict";var s=a("cb7c"),i=a("4bf8"),l=a("9def"),r=a("4588"),n=a("0390"),o=a("5f1b"),c=Math.max,u=Math.min,d=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,f=function(t){return void 0===t?t:String(t)};a("214f")("replace",2,(function(t,e,a,v){return[function(s,i){var l=t(this),r=void 0==s?void 0:s[e];return void 0!==r?r.call(s,l,i):a.call(String(l),s,i)},function(t,e){var i=v(a,t,this,e);if(i.done)return i.value;var d=s(t),p=String(this),h="function"===typeof e;h||(e=String(e));var g=d.global;if(g){var b=d.unicode;d.lastIndex=0}var _=[];while(1){var y=o(d,p);if(null===y)break;if(_.push(y),!g)break;var k=String(y[0]);""===k&&(d.lastIndex=n(p,l(d.lastIndex),b))}for(var x="",w=0,C=0;C<_.length;C++){y=_[C];for(var S=String(y[0]),P=c(u(r(y.index),p.length),0),F=[],G=1;G<y.length;G++)F.push(f(y[G]));var $=y.groups;if(h){var A=[S].concat(F,P,p);void 0!==$&&A.push($);var L=String(e.apply(void 0,A))}else L=m(S,p,P,F,$,e);P>=w&&(x+=p.slice(w,P)+L,w=P+S.length)}return x+p.slice(w)}];function m(t,e,s,l,r,n){var o=s+t.length,c=l.length,u=h;return void 0!==r&&(r=i(r),u=p),a.call(n,u,(function(a,i){var n;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,s);case"'":return e.slice(o);case"<":n=r[i.slice(1,-1)];break;default:var u=+i;if(0===u)return a;if(u>c){var p=d(u/10);return 0===p?a:p<=c?void 0===l[p-1]?i.charAt(1):l[p-1]+i.charAt(1):a}n=l[u-1]}return void 0===n?"":n}))}}))}}]);
//# sourceMappingURL=chunk-6ebce01a.79bb7ab1.js.map