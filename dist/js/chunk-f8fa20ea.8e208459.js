(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f8fa20ea"],{"086f":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[t._m(0),a("div",{staticClass:"col-md-3 justify"},[a("div",{staticClass:"col-md-1 offset-9"},[a("button",{staticClass:"btn btn-sm btn-dark mr-1",on:{click:t._actionDownloadRecap}},[a("i",{staticClass:"fa fa-file-excel-o"})])])]),a("div",{staticClass:"col-md-12 card scrollable"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-sm table-striped table-hover"},[a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col-1"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.selectAll,expression:"selectAll"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.selectAll)?t._i(t.selectAll,null)>-1:t.selectAll},on:{click:t.select,change:function(e){var a=t.selectAll,s=e.target,i=!!s.checked;if(Array.isArray(a)){var l=null,c=t._i(a,l);s.checked?c<0&&(t.selectAll=a.concat([l])):c>-1&&(t.selectAll=a.slice(0,c).concat(a.slice(c+1)))}else t.selectAll=i}}})]),a("th",{attrs:{scope:"col-1"}},[t._v("\n                No\n              ")]),a("th",{attrs:{scope:"col"}},[t._v("\n                Email\n              ")]),a("th",{attrs:{scope:"col"}},[t._v("\n                Total Soal\n              ")]),a("th",{attrs:{scope:"col"}},[t._v("\n                Total Soal Dijawab\n              ")]),a("th",{attrs:{scope:"col"}},[t._v("\n                Jawaban di review\n              ")]),a("th",{attrs:{scope:"col"}},[t._v("\n                Skor\n              ")]),a("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("\n                Actions\n              ")])])]),0!==t.dataPeserta.length?a("tbody",t._l(t.dataPeserta,(function(e,s){return a("tr",{key:s},[0==e.isReviewed?a("th",[a("input",{attrs:{type:"checkbox",disabled:""}})]):a("th",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.selected,expression:"selected"}],attrs:{type:"checkbox"},domProps:{value:e.email,checked:Array.isArray(t.selected)?t._i(t.selected,e.email)>-1:t.selected},on:{change:function(a){var s=t.selected,i=a.target,l=!!i.checked;if(Array.isArray(s)){var c=e.email,n=t._i(s,c);i.checked?n<0&&(t.selected=s.concat([c])):n>-1&&(t.selected=s.slice(0,n).concat(s.slice(n+1)))}else t.selected=l}}})]),a("th",[t._v("\n                "+t._s(s+1)+"\n              ")]),a("td",[t._v(t._s(e.email))]),a("td",[t._v(t._s(e.jumlah_soal))]),a("td",[t._v(t._s(e.jumlah_dijawab))]),a("td",[t._v(t._s(e.jawaban_di_review))]),a("td",[e.skor>=70?a("span",{staticClass:"badge badge-success",staticStyle:{"font-size":"12px"}},[t._v("\n                  "+t._s(e.skor)+"\n                ")]):"0/0"==e.soal_di_review?a("span",{staticClass:"badge badge-dark",staticStyle:{"font-size":"12px"}},[t._v("\n                  Belum Di Nilai\n                ")]):e.skor<=70?a("span",{staticClass:"badge badge-danger",staticStyle:{"font-size":"12px"}},[t._v("\n                  "+t._s(e.skor)+"\n                ")]):t._e()]),0==e.isReviewed?a("td",{staticClass:"text-center"},[a("span",{staticClass:"badge badge-info btn text-white",staticStyle:{"font-size":"12px"},on:{click:function(a){return t._actionReviewNilaiPeserta(e.user_id)}}},[t._v("Nilai Peserta")])]):a("td",{staticClass:"text-center"},[a("span",{staticClass:"badge badge-primary btn text-white",staticStyle:{"font-size":"12px"},on:{click:function(a){return t._actionReviewNilaiPeserta(e.user_id)}}},[t._v("Edit Nilai Peserta")]),a("button",{staticClass:"badge badge-success btn ml-2 mt-md-0 mt-1",staticStyle:{"font-size":"12px"},on:{click:function(a){return t._actionSendEmail(e.email)}}},[a("i",{staticClass:"fa fa-paper-plane"}),t._v(" Kirim Email\n                ")])])])})),0):a("tbody",[t._m(1)])])])]),""!=t.selected?a("div",{staticClass:"col-md-12"},[a("button",{staticClass:"btn btn-success",on:{click:t._actionShowModalEmail}},[a("i",{staticClass:"fa fa-envelope"}),t._v("\n        Kirim Multiple Email\n      ")]),a("div",{staticClass:"col-md-12"},[a("b-modal",{attrs:{size:"md","hide-footer":"",title:"Kirim Email Ke","header-bg-variant":"info"},model:{value:t.modalEmail,callback:function(e){t.modalEmail=e},expression:"modalEmail"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12 text-center"},[t._l(t.selected,(function(e){return a("span",{key:e,staticClass:"badge badge-info text-white m-1",staticStyle:{"font-size":"14px"}},[t._v("\n                "+t._s(e)+"\n              ")])})),a("div",{staticClass:"text-center mt-3"},[a("button",{staticClass:"btn btn-success btn-sm"},[a("i",{staticClass:"fa fa-paper-plane"}),t._v("\n                  Ya!\n                ")]),a("button",{staticClass:"btn btn-danger btn-sm ml-2",on:{click:function(e){t.modalEmail=!1}}},[a("i",{staticClass:"fa fa-close"}),t._v("\n                  Tidak!\n                ")])])],2)])])],1)]):t._e(),a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"col-md-12"},[a("b-modal",{attrs:{size:"md","hide-footer":"","hide-header":""},model:{value:t.modalEmailPersonal,callback:function(e){t.modalEmailPersonal=e},expression:"modalEmailPersonal"}},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12 text-center"},[a("p",[t._v("Kirim Email ke:")]),a("span",[t._v(t._s(t.dataEmail))]),a("div",{staticClass:"text-center mt-3"},[a("button",{staticClass:"btn btn-success btn-sm"},[a("i",{staticClass:"fa fa-paper-plane"}),t._v("\n                  Ya!\n                ")]),a("button",{staticClass:"btn btn-danger btn-sm ml-2",on:{click:function(e){t.modalEmailPersonal=!1}}},[a("i",{staticClass:"fa fa-close"}),t._v("\n                  Tidak!\n                ")])])])])])],1)])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-9"},[a("h3",[t._v("Review Peserta Quiz")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",{staticClass:"text-center"},[a("td",{attrs:{colspan:"6"}},[t._v("Tidak ada data Peserta")])])}],l=(a("ac6a"),a("1146")),c=a.n(l),n={name:"ReviewPesertaQuiz",data:function(){return{quiz_id:null,token:null,dataPeserta:[],selected:[],selectAll:!1,modalEmail:!1,modalEmailPersonal:!1,dataEmail:[]}},mounted:function(){this.token=sessionStorage.getItem("session_token");var t=this.$route.query.quiz_id;this.quiz_id=t,this._actionGetPeserta()},methods:{_actionGetPeserta:function(){var t=this;this.$axios.get("review-quiz?quiz_id="+this.quiz_id,{headers:{"x-access-token":this.token}}).then((function(e){"true"==e.data.success&&(t.dataPeserta=e.data.data)})).catch((function(t){return console.log(t)}))},_actionReviewNilaiPeserta:function(t){this.$router.push({path:"/quiz/review-nilai-peserta-quiz",query:{quiz_id:this.quiz_id,user_id:t}})},_actionDownloadRecap:function(){var t=c.a.utils.book_new();t.Props={Title:"Export Data Filter",Subject:"REKAP",Author:"EDUTORE",CreatedDate:new Date};var e=[],a=this.dataPeserta;if(a.length<1)this.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Tidak ada data yang di rekap"});else{var s=["No","Email"],i=[{wch:8},{wch:35},{wch:40},{wch:30},{wch:30},{wch:30},{wch:30},{wch:30},{wch:40},{wch:30}];e.push(s);var l=0;a.forEach((function(t){var a=[++l,t.email];e.push(a)}));var n=c.a.utils.aoa_to_sheet(e);n["!cols"]=i;var o="review_peserta_quiz";c.a.utils.book_append_sheet(t,n,"REKAP"),c.a.writeFile(t,"rekap_"+o+".xlsx")}},select:function(){if(this.selected=[],!this.selectAll)for(var t in this.dataPeserta)this.selected.push(this.dataPeserta[t].email)},_actionShowModalEmail:function(){this.modalEmail=!0},_actionSendEmail:function(t){this.dataEmail=t,this.modalEmailPersonal=!0}}},o=n,r=(a("9e94"),a("2877")),d=Object(r["a"])(o,s,i,!1,null,"757f9cbc",null);e["default"]=d.exports},"9e94":function(t,e,a){"use strict";var s=a("d64c"),i=a.n(s);i.a},d64c:function(t,e,a){}}]);
//# sourceMappingURL=chunk-f8fa20ea.8e208459.js.map