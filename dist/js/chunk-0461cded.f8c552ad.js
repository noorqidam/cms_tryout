(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0461cded"],{3846:function(t,e,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},"6b54":function(t,e,a){"use strict";a("3846");var n=a("cb7c"),i=a("0bfb"),s=a("9e1e"),r="toString",o=/./[r],c=function(t){a("2aba")(RegExp.prototype,r,t,!0)};a("79e5")((function(){return"/a/b"!=o.call({source:"a",flags:"b"})}))?c((function(){var t=n(this);return"/".concat(t.source,"/","flags"in t?t.flags:!s&&t instanceof RegExp?i.call(t):void 0)})):o.name!=r&&c((function(){return o.call(this)}))},a481:function(t,e,a){"use strict";var n=a("cb7c"),i=a("4bf8"),s=a("9def"),r=a("4588"),o=a("0390"),c=a("5f1b"),u=Math.max,l=Math.min,d=Math.floor,f=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,p=function(t){return void 0===t?t:String(t)};a("214f")("replace",2,(function(t,e,a,v){return[function(n,i){var s=t(this),r=void 0==n?void 0:n[e];return void 0!==r?r.call(n,s,i):a.call(String(s),n,i)},function(t,e){var i=v(a,t,this,e);if(i.done)return i.value;var d=n(t),f=String(this),h="function"===typeof e;h||(e=String(e));var b=d.global;if(b){var m=d.unicode;d.lastIndex=0}var _=[];while(1){var x=c(d,f);if(null===x)break;if(_.push(x),!b)break;var k=String(x[0]);""===k&&(d.lastIndex=o(f,s(d.lastIndex),m))}for(var w="",y=0,C=0;C<_.length;C++){x=_[C];for(var $=String(x[0]),S=u(l(r(x.index),f.length),0),P=[],L=1;L<x.length;L++)P.push(p(x[L]));var E=x.groups;if(h){var A=[$].concat(P,S,f);void 0!==E&&A.push(E);var D=String(e.apply(void 0,A))}else D=g($,f,S,P,E,e);S>=y&&(w+=f.slice(y,S)+D,y=S+$.length)}return w+f.slice(y)}];function g(t,e,n,s,r,o){var c=n+t.length,u=s.length,l=h;return void 0!==r&&(r=i(r),l=f),a.call(o,l,(function(a,i){var o;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,n);case"'":return e.slice(c);case"<":o=r[i.slice(1,-1)];break;default:var l=+i;if(0===l)return a;if(l>u){var f=d(l/10);return 0===f?a:f<=u?void 0===s[f-1]?i.charAt(1):s[f-1]+i.charAt(1):a}o=s[l-1]}return void 0===o?"":o}))}}))},ad87:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6"},[a("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:t.isLoading,callback:function(e){t.isLoading=e},expression:"isLoading"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[t._v("\n          Loading...\n        ")])])])],1),a("div",{staticClass:"col-md-12 mb-3 text-right"},[a("button",{staticClass:"btn btn-primary btn-sm",on:{click:t._actionCreatePublisher}},[a("i",{staticClass:"fa fa-plus"}),t._v("\n      Tambah\n    ")])]),a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("table",{staticClass:"table table-sm table-bordered table-hover"},[t._m(0),a("tbody",[t._l(t.items,(function(e,n){return[a("tr",{key:e.id},[a("td",[t._v(t._s((t.currentPage-1)*t.perPage+ ++n))]),a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.address))]),a("td",[t._v(t._s(e.email))]),a("td",[a("button",{staticClass:"btn btn-sm btn-default",on:{click:function(a){return t._actionView(e)}}},[a("i",{staticClass:"fa fa-search"})])]),a("td",{staticClass:"text-center"},[a("i",{staticClass:"fa fa-pencil text-success mr-2 mt-2",staticStyle:{"font-size":"18px",cursor:"pointer"},on:{click:function(a){return t._actionEdit(e.id,e.name)}}}),a("i",{staticClass:"fa fa-trash text-danger",staticStyle:{"font-size":"18px",cursor:"pointer"},on:{click:function(a){return t._actionDelete(e.id)}}})])])]}))],2)])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("No")]),a("th",[t._v("Publisher Name")]),a("th",[t._v("Address")]),a("th",[t._v("Email")]),a("th",[t._v("View")]),a("th",[t._v("Actions")])])])}],s=(a("7f7f"),a("6b54"),a("a481"),a("c1df")),r=a.n(s),o={name:"Publisher",data:function(){return{items:[],currentPage:1,perPage:100,totalRows:0,totalDebet:0,session_token:null,isLoading:!0}},watch:{currentPage:function(){this._actionGetTransaction()}},methods:{_actionGetTransaction:function(){var t=this;this.isLoading=!0,this.$axios.get("publishers?&page=".concat(this.currentPage,"&limit=",100),{headers:{"x-access-token":this.session_token}}).then((function(e){if("true"===e.data.success){var a=e.data.data.rows.filter((function(t){return!1===t.status_delete}));t.items=a,t.totalRows=e.data.data.count}t.isLoading=!1})).catch((function(e){console.log(e),t.isLoading=!1}))},formatPrice:function(t){var e=(t/1).toFixed(0).replace(".",",");return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")},formatDate:function(t){return r()(t).format("DD-MM-YYYY")},_actionView:function(t){this.$router.push({path:"/reports/pendapatan-publishers",query:{id:t.id,name:t.name}})},_actionViewModule:function(t){this.$router.push({path:"/reports/pendapatan-publishers",query:{id:t.id,name:t.name}})},_actionViewLangganan:function(t){this.$router.push({path:"/reports/rekap-langganan",query:{publisher_id:t.id,name:t.name}})},_actionCreatePublisher:function(){this.$router.push({path:"/publisher/create"})},_actionEdit:function(t,e){this.$router.push({path:"/publisher/edit/"+t,query:{publisher_name:e}})},_actionDelete:function(t){var e=this;this.$axios.delete("publishers/"+t,{headers:{"x-access-token":this.session_token}}).then((function(t){"true"==t.data.success&&e.$notify({group:"foo",title:"Hapus Publishers Berhasil ",text:t.data.message}),e._actionGetTransaction()})).catch((function(){e.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}},mounted:function(){this.session_token=sessionStorage.getItem("session_token"),this._actionGetTransaction()}},c=o,u=a("2877"),l=Object(u["a"])(c,n,i,!1,null,"af5e40a4",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-0461cded.f8c552ad.js.map