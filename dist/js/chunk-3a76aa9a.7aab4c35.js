(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a76aa9a"],{3723:function(t,e,a){"use strict";var i=a("6780"),n=a.n(i);n.a},3846:function(t,e,a){a("9e1e")&&"g"!=/./g.flags&&a("86cc").f(RegExp.prototype,"flags",{configurable:!0,get:a("0bfb")})},6780:function(t,e,a){},"6b54":function(t,e,a){"use strict";a("3846");var i=a("cb7c"),n=a("0bfb"),l=a("9e1e"),r="toString",s=/./[r],o=function(t){a("2aba")(RegExp.prototype,r,t,!0)};a("79e5")((function(){return"/a/b"!=s.call({source:"a",flags:"b"})}))?o((function(){var t=i(this);return"/".concat(t.source,"/","flags"in t?t.flags:!l&&t instanceof RegExp?n.call(t):void 0)})):s.name!=r&&o((function(){return s.call(this)}))},a481:function(t,e,a){"use strict";var i=a("cb7c"),n=a("4bf8"),l=a("9def"),r=a("4588"),s=a("0390"),o=a("5f1b"),c=Math.max,u=Math.min,d=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,m=/\$([$&`']|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};a("214f")("replace",2,(function(t,e,a,h){return[function(i,n){var l=t(this),r=void 0==i?void 0:i[e];return void 0!==r?r.call(i,l,n):a.call(String(l),i,n)},function(t,e){var n=h(a,t,this,e);if(n.done)return n.value;var d=i(t),p=String(this),m="function"===typeof e;m||(e=String(e));var f=d.global;if(f){var _=d.unicode;d.lastIndex=0}var y=[];while(1){var b=o(d,p);if(null===b)break;if(y.push(b),!f)break;var x=String(b[0]);""===x&&(d.lastIndex=s(p,l(d.lastIndex),_))}for(var k="",w=0,S=0;S<y.length;S++){b=y[S];for(var C=String(b[0]),P=c(u(r(b.index),p.length),0),A=[],I=1;I<b.length;I++)A.push(v(b[I]));var F=b.groups;if(m){var B=[C].concat(A,P,p);void 0!==F&&B.push(F);var $=String(e.apply(void 0,B))}else $=g(C,p,P,A,F,e);P>=w&&(k+=p.slice(w,P)+$,w=P+C.length)}return k+p.slice(w)}];function g(t,e,i,l,r,s){var o=i+t.length,c=l.length,u=m;return void 0!==r&&(r=n(r),u=p),a.call(s,u,(function(a,n){var s;switch(n.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,i);case"'":return e.slice(o);case"<":s=r[n.slice(1,-1)];break;default:var u=+n;if(0===u)return a;if(u>c){var p=d(u/10);return 0===p?a:p<=c?void 0===l[p-1]?n.charAt(1):l[p-1]+n.charAt(1):a}s=l[u-1]}return void 0===s?"":s}))}}))},d432:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-2"},[a("div",{staticClass:"col-md-12 card",staticStyle:{"min-height":"380px","max-height":"400px"}},[a("form",{staticClass:"form-horizontal"},[a("label",{attrs:{for:"matpel"}},[t._v("Mata Pelajaran")]),a("div",{staticClass:"mb-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.Filter,expression:"Filter"}],attrs:{type:"text"},domProps:{value:t.Filter},on:{input:function(e){e.target.composing||(t.Filter=e.target.value)}}})]),a("div",{staticStyle:{"min-height":"75px","max-height":"140px",overflow:"auto"}},[t._l(t.filteredList,(function(e){return a("div",{key:e._id},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.matpel,expression:"matpel"}],attrs:{type:"checkbox"},domProps:{value:e._id,checked:Array.isArray(t.matpel)?t._i(t.matpel,e._id)>-1:t.matpel},on:{change:[function(a){var i=t.matpel,n=a.target,l=!!n.checked;if(Array.isArray(i)){var r=e._id,s=t._i(i,r);n.checked?s<0&&(t.matpel=i.concat([r])):s>-1&&(t.matpel=i.slice(0,s).concat(i.slice(s+1)))}else t.matpel=l},t._actionFilter]}}),t._v("\n                "+t._s(e._id)+" ("+t._s(e.count)+")\n              ")])])})),t._l(t.mata_pelajaran,(function(e){return a("div",{key:e.title,staticClass:"mt-1"},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.matpel,expression:"matpel"}],attrs:{type:"checkbox"},domProps:{value:e.title,checked:Array.isArray(t.matpel)?t._i(t.matpel,e.title)>-1:t.matpel},on:{change:function(a){var i=t.matpel,n=a.target,l=!!n.checked;if(Array.isArray(i)){var r=e.title,s=t._i(i,r);n.checked?s<0&&(t.matpel=i.concat([r])):s>-1&&(t.matpel=i.slice(0,s).concat(i.slice(s+1)))}else t.matpel=l}}}),t._v("\n                "+t._s(e.title)+" (15)\n              ")])])}))],2),a("hr"),a("label",{staticClass:"pl-1",attrs:{for:""}},[t._v("Kategory")]),a("div",{staticStyle:{"min-height":"75px","max-height":"100px",overflow:"auto"}},t._l(t.moduletype,(function(e){return a("div",{key:e._id,staticStyle:{"margin-left":"0"}},[a("li",{staticStyle:{"list-style":"none"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.level,expression:"level"}],attrs:{type:"checkbox"},domProps:{value:e._id,checked:Array.isArray(t.level)?t._i(t.level,e._id)>-1:t.level},on:{change:[function(a){var i=t.level,n=a.target,l=!!n.checked;if(Array.isArray(i)){var r=e._id,s=t._i(i,r);n.checked?s<0&&(t.level=i.concat([r])):s>-1&&(t.level=i.slice(0,s).concat(i.slice(s+1)))}else t.level=l},t._actionFilter]}}),t._v("\n                "+t._s(e.type)+" (5)\n              ")])])})),0)])])]),a("div",{staticClass:"col-md-10",staticStyle:{"min-height":"590px","max-height":"580px",overflow:"auto"}},[a("div",{staticClass:"row"},t._l(t.paginatedItems,(function(e,i){return a("div",{key:i,staticClass:"col-md-3 col-6"},[a("div",{staticClass:"card card-custom",on:{click:function(a){return t._actionDetailsBook(e._id)}}},[a("div",{staticClass:"card-body text-center p-1 height-card"},[e.image?a("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:t.pathImages+e.image,expression:"pathImages + item.image",modifiers:{container:!0}}],staticClass:"img-fluid",attrs:{alt:""}}):t._e()]),a("div",{staticClass:"pl-2 pr-2 pb-1"},[e.module_name.length>30?a("p",{staticStyle:{"min-height":"30px"}},[t._v("\n                "+t._s(e.module_name.substr(0,35))+"....\n              ")]):a("p",{staticStyle:{"min-height":"30px"}},[t._v(t._s(e.module_name))]),a("span",{staticClass:"badge badge-info text-white",staticStyle:{"font-size":"13px"}},[t._v("\n                Rp "+t._s(t.formatPrice(e.price)))])])])])})),0)]),a("div",{staticClass:"col-md-10 offset-md-2"},[a("b-pagination",{staticClass:"mt-2",staticStyle:{"place-content":"center"},attrs:{"total-rows":t.totalRows,"per-page":t.perPage,align:"fill","first-number":"","last-number":""},on:{change:t.onPageChanged},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])},n=[],l=(a("6b54"),a("a481"),{name:"BooksAdmin",data:function(){return{token:null,Filter:"",matpel:"",level:"",GroupMatpel:[],moduletype:[{type:"Pelajar"},{type:"Umum"}],mata_pelajaran:[{title:"Matematika"},{title:"Seni Budaya"},{title:"Bahasa Indonesia"},{title:"Bahasa Inggris"},{title:"Sains/IPA"},{title:"IPS"},{title:"Biologi"},{title:"Kimia"}],pathImages:"https://storage.googleapis.com/edutore-cdn/public/module/thumb/",paginatedItems:[],currentPage:1,perPage:20,totalRows:null,items:[]}},methods:{paginate:function(t,e){var a=this.items;this.paginatedItems=a.slice(e*t,(e+1)*t)},onPageChanged:function(t){this.paginate(this.perPage,t-1)},_actionGetAllBooks:function(){var t=this;this.$axios.get("books?limit=200",{headers:{"x-access-token":this.token}}).then((function(e){t.items=e.data.data.rows,t.paginate(t.perPage,0),t.totalRows=t.items.length})).catch((function(t){console.log(t)}))},_actionDetailsBook:function(t){this.$router.push({path:"/books/details-book/"+t})},formatPrice:function(t){if(t){var e=(t/1).toFixed(0).replace(".",",");return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}return"0"},_actionFilter:function(){var t=this.matpel,e=this.level;this.$router.push({path:"/books?",query:{matpel:t,level:e}}),setTimeout((function(){}),300)}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this._actionGetAllBooks()},computed:{filteredList:function(){var t=this;return this.Filter?this.GroupMatpel.filter((function(e){return e._id.toLowerCase().indexOf(t.Filter.toLowerCase())>-1})):this.GroupMatpel}}}),r=l,s=(a("3723"),a("2877")),o=Object(s["a"])(r,i,n,!1,null,"3d7cba49",null);e["default"]=o.exports}}]);
//# sourceMappingURL=chunk-3a76aa9a.7aab4c35.js.map