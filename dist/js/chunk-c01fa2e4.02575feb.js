(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c01fa2e4"],{1334:function(a,t,e){"use strict";var s=e("d067"),i=e.n(s);i.a},"2a8c":function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"col-md-12"},[e("b-modal",{attrs:{size:"sm",centered:"","hide-footer":"","hide-header":"","body-bg-variant":"default"},model:{value:a.isLoading,callback:function(t){a.isLoading=t},expression:"isLoading"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[a._v("\n        Loading...\n      ")])])]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-9 mb-3"},[e("h3",{staticClass:"h3 text-center"},[a._v("Report Nilai Quiz "+a._s(a.email))])]),e("div",{staticClass:"col-md-3 justify"},[e("div",{staticClass:"col-md-1 offset-9"},[e("button",{staticClass:"btn btn-sm btn-dark mr-1",on:{click:a._actionDownloadRecap}},[e("i",{staticClass:"fa fa-file-excel-o"})])])]),e("div",{staticClass:"col-12 col-md-3 card",staticStyle:{"max-height":"300px"}},[e("table",{staticClass:"table  table-sm table-hover"},[e("thead",[a._m(0),e("tr",[e("td",[a._v("Total Soal")]),e("td",[a._v("\n              "+a._s(a.items.totalSoal)+"\n            ")])]),e("tr",[e("td",[a._v("Di Jawab")]),e("td",[a._v("\n              "+a._s(a.items.dijawab)+"\n            ")])]),e("tr",[e("td",[a._v("Benar")]),e("td",[a._v("\n              "+a._s(a.items.Benar)+"\n            ")])]),e("tr",[e("td",[a._v("Salah")]),e("td",[a._v("\n              "+a._s(a.items.Salah)+"\n            ")])]),e("tr",[e("td",[a._v("Skor")]),e("td",[a._v("\n              "+a._s(a.items.Score)+"\n            ")])]),e("tr",[e("td",[a._v("Status Lulus")]),e("td",[e("strong",[a._v(" "+a._s(a.items.Lulus))])])])])])]),e("div",{staticClass:"col-12 col-md-8 card ml-md-5 scrollable"},[e("table",{staticClass:"table table-sm table-hover"},[a._m(1),0!=a.soalDiJawab.length?e("tbody",a._l(a.soalDiJawab,(function(t,s){return e("tr",{key:s},[e("th",[a._v("\n              "+a._s(s+1)+"\n            ")]),t.soal_id.soal_text?e("td",[e("p",{domProps:{innerHTML:a._s(t.soal_id.soal_text)}})]):a._e(),t.jawaban.jawaban?e("td",[e("p",{domProps:{innerHTML:a._s(t.jawaban.jawaban)}})]):a._e(),e("td",["Benar"==t.jawaban.Benar?e("span",{staticClass:"badge badge-success"},[a._v("\n                "+a._s(t.jawaban.Benar)+"\n              ")]):e("span",{staticClass:"badge badge-danger"},[a._v(a._s(t.jawaban.Benar))])]),e("td",[a._v("\n              "+a._s(t.jawaban.Point)+"\n            ")])])})),0):e("tbody",[a._m(2)])])])])],1)},i=[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("tr",{staticClass:"text-center bg-dark"},[e("td",{staticStyle:{color:"white"},attrs:{colspan:"2"}},[a._v("\n              Nilai Quiz\n            ")])])},function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("thead",{staticClass:"thead-dark"},[e("tr",[e("th",{staticClass:"h3 text-center",attrs:{scope:"col-1",colspan:"5"}},[a._v("\n              Rekapipulasi Jawaban Quiz\n            ")])]),e("tr",[e("th",{attrs:{scope:"col-1"}},[a._v("No")]),e("th",{attrs:{scope:"col-1"}},[a._v("Soal")]),e("th",{attrs:{scope:"col-1"}},[a._v("Jawaban")]),e("th",{attrs:{scope:"col-1"}},[a._v("Status Jawaban")]),e("th",{attrs:{scope:"col-1"}},[a._v("Nilai")])])])},function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("tr",[e("th",{staticClass:"text-center",attrs:{colspan:"5"}},[a._v("Tidak ada soal yang di jawab")])])}],n=(e("a481"),e("ac6a"),e("1146")),r=e.n(n),l={name:"ReportDetailQuizPeserta",data:function(){return{items:[],soalDiJawab:[],soalTidakDiJawab:[],token:null,id:null,email:"",user_id:null,currentPage:1,perPage:100,attributes:["No",{key:"soal",label:"Soal"},{key:"jawaban",label:"Jawaban"}],isLoading:!0}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this.id=this.$route.params.quiz_id,this.email=this.$route.query.email,this.user_id=this.$route.query.user_id,this._actionGetDetailPeserta(),console.log(this.id)},methods:{_actionGetDetailPeserta:function(){var a=this,t={quiz_id:this.id,email:this.email,user_id:this.user_id};this.$axios.post("detail-nilai-peserta-quiz?quiz_id="+this.id,t,{headers:{"x-access-token":this.token}}).then((function(t){"true"===t.data.success&&(a.items=t.data.data,a.soalDiJawab=t.data.data.SoalDiJawab,a.soalTidakDiJawab=t.data.data.SoalTidakDiJawab),a.isLoading=!1})).catch((function(t){console.log(t),a.isLoading=!1}))},_actionDownloadRecap:function(){var a=r.a.utils.book_new();a.Props={Title:"Export Data Filter",Subject:"REKAP",Author:"EDUTORE",CreatedDate:new Date};var t=[],e=this.soalDiJawab;if(e.length<1)this.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Tidak ada data yang di rekap"});else{var s=["No","Soal","Jawaban Peserta","Hasil Jawaban","Point"],i=[{wch:8},{wch:75},{wch:40},{wch:30},{wch:30}];t.push(s);var n=0;e.forEach((function(a){var e=a.soal_id,s=a.jawaban,i=e.soal_text.replace(/<(.|\n)*?>/g,""),r=s.jawaban.replace(/<(.|\n)*?>/g,""),l=[++n,i,r,a.jawaban.Benar,a.jawaban.Point];t.push(l)}));var l=r.a.utils.aoa_to_sheet(t);l["!cols"]=i;var o="detail_nilai_quiz";r.a.utils.book_append_sheet(a,l,"REKAP"),r.a.writeFile(a,"rekap_"+o+".xlsx")}}}},o=l,c=(e("1334"),e("2877")),d=Object(c["a"])(o,s,i,!1,null,"699e2e9d",null);t["default"]=d.exports},a481:function(a,t,e){"use strict";var s=e("cb7c"),i=e("4bf8"),n=e("9def"),r=e("4588"),l=e("0390"),o=e("5f1b"),c=Math.max,d=Math.min,u=Math.floor,h=/\$([$&`']|\d\d?|<[^>]*>)/g,v=/\$([$&`']|\d\d?)/g,_=function(a){return void 0===a?a:String(a)};e("214f")("replace",2,(function(a,t,e,b){return[function(s,i){var n=a(this),r=void 0==s?void 0:s[t];return void 0!==r?r.call(s,n,i):e.call(String(n),s,i)},function(a,t){var i=b(e,a,this,t);if(i.done)return i.value;var u=s(a),h=String(this),v="function"===typeof t;v||(t=String(t));var p=u.global;if(p){var w=u.unicode;u.lastIndex=0}var m=[];while(1){var g=o(u,h);if(null===g)break;if(m.push(g),!p)break;var k=String(g[0]);""===k&&(u.lastIndex=l(h,n(u.lastIndex),w))}for(var S="",x=0,C=0;C<m.length;C++){g=m[C];for(var D=String(g[0]),j=c(d(r(g.index),h.length),0),J=[],y=1;y<g.length;y++)J.push(_(g[y]));var $=g.groups;if(v){var P=[D].concat(J,j,h);void 0!==$&&P.push($);var L=String(t.apply(void 0,P))}else L=f(D,h,j,J,$,t);j>=x&&(S+=h.slice(x,j)+L,x=j+D.length)}return S+h.slice(x)}];function f(a,t,s,n,r,l){var o=s+a.length,c=n.length,d=v;return void 0!==r&&(r=i(r),d=h),e.call(l,d,(function(e,i){var l;switch(i.charAt(0)){case"$":return"$";case"&":return a;case"`":return t.slice(0,s);case"'":return t.slice(o);case"<":l=r[i.slice(1,-1)];break;default:var d=+i;if(0===d)return e;if(d>c){var h=u(d/10);return 0===h?e:h<=c?void 0===n[h-1]?i.charAt(1):n[h-1]+i.charAt(1):e}l=n[d-1]}return void 0===l?"":l}))}}))},d067:function(a,t,e){}}]);
//# sourceMappingURL=chunk-c01fa2e4.02575feb.js.map