(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02670d2c"],{"32f2":function(t,e,a){},a02e:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12 text-right mb-2"},[a("router-link",{staticClass:"btn btn-sm btn-info text-white",attrs:{to:{path:"/p/category-quiz"}}},[a("i",{staticClass:"fa fa-plus"}),t._v(" Tambah Kategori\n    ")])],1),a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("ValidationObserver",{ref:"form"},[a("form",{on:{submit:function(e){return e.preventDefault(),t._actionCreate(e)}}},[a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Judul Quiz ")]),a("div",{staticClass:"col-md-9"},[a("ValidationProvider",{attrs:{rules:"required|min:10"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.judul_quiz,expression:"Form.judul_quiz"}],staticClass:"form-control",attrs:{type:"text",name:"Judul Quiz"},domProps:{value:t.Form.judul_quiz},on:{input:function(e){e.target.composing||t.$set(t.Form,"judul_quiz",e.target.value)}}}),a("span",{staticClass:"text-danger"},[t._v(t._s(s[0]))])]}}])})],1)]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v("\n                Banner Quiz "),a("br"),a("small",{staticClass:"text-secondary"},[t._v("* ukuran. 400x600")]),a("br"),a("small",{staticClass:"text-secondary"},[t._v("* max. 150kb")])]),a("div",{staticClass:"col-sm-3"},[a("ValidationProvider",{ref:"provider",attrs:{name:"image",rules:"image|size:150|ext:jpeg,jpg,png"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file"},on:{change:t._changeFile}}),a("span",{staticClass:"text-danger"},[t._v(t._s(s[0]))])]}}])})],1),t.banner?a("div",{staticClass:"col-sm-4"},[a("img",{staticClass:"img-thumbnail",attrs:{id:"imgsc",src:t.banner,alt:""}})]):a("div",{staticClass:"col-sm-4",attrs:{id:"preview"}},[a("i",[t._v(" No Preview Image ")])]),t.banner?a("div",{staticClass:"col-sm-2"},[a("span",{staticClass:"btn btn-sm btn-danger",staticStyle:{cursor:"pointer"},on:{click:t._actionClearFile}},[a("i",{staticClass:"fa fa-times"})])]):t._e()]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Tipe Quiz ")]),a("div",{staticClass:"col-sm-3"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.Form.type_quiz,expression:"Form.type_quiz"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.Form,"type_quiz",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("\n                    -- Pilih --\n                  ")]),a("option",{attrs:{value:"MANDIRI"}},[t._v("\n                    MANDIRI\n                  ")]),a("option",{attrs:{value:"BERSAMA"}},[t._v("\n                    BERSAMA\n                  ")])])]),a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Kategori Quiz ")]),a("div",{staticClass:"col-sm-2"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.Form.category_quiz,expression:"Form.category_quiz"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.Form,"category_quiz",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("\n                    -- Pilih --\n                  ")]),t._l(t.category_quiz,(function(e){return a("option",{key:e.id,domProps:{value:e.title}},[t._v("\n                    "+t._s(e.title)+"\n                  ")])}))],2)])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Tanggal Mulai Quiz ")]),a("div",{staticClass:"col-sm-3"},[a("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"example-datepicker",locale:"id"},model:{value:t.Form.start_date,callback:function(e){t.$set(t.Form,"start_date",e)},expression:"Form.start_date"}})],1),a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Tanggal Berakhir Quiz ")]),a("div",{staticClass:"col-sm-3"},[a("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"end_date",locale:"id"},model:{value:t.Form.start_date,callback:function(e){t.$set(t.Form,"start_date",e)},expression:"Form.start_date"}})],1)]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Di mulai Pada Jam ")]),a("div",{staticClass:"col-sm-2"},[a("vue-timepicker",{model:{value:t.Form.times,callback:function(e){t.$set(t.Form,"times",e)},expression:"Form.times"}})],1),a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Berakhir pada jam ")]),a("div",{staticClass:"col-sm-2"},[a("vue-timepicker",{model:{value:t.Form.end_times,callback:function(e){t.$set(t.Form,"end_times",e)},expression:"Form.end_times"}})],1)]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Tipe Start ")]),a("div",{staticClass:"col-sm-2"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.Form.type_start,expression:"Form.type_start"}],staticClass:"form-control",attrs:{required:""},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.Form,"type_start",e.target.multiple?a:a[0])}}},[a("option",[t._v(" -- PIlih -- ")]),a("option",{attrs:{value:"REALTIMESOAL"}},[t._v("\n                    REALTIME SOAL\n                  ")]),a("option",{attrs:{value:"RACE"}},[t._v("\n                    RACE\n                  ")])])]),a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Metode Penilaian ")]),a("div",{staticClass:"col-sm-2"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.Form.metode_penilaian,expression:"Form.metode_penilaian"}],staticClass:"form-control",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.Form,"metode_penilaian",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:""}},[t._v("\n                    -- PIlih --\n                  ")]),a("option",{attrs:{value:"NORMAL"}},[t._v("\n                    NORMAL\n                  ")]),a("option",{attrs:{value:"UTBK"}},[t._v("\n                    UTBK\n                  ")]),a("option",{attrs:{value:"DINAMIS"}},[t._v("\n                    DINAMIS\n                  ")]),a("option",{attrs:{value:"BOBOT"}},[t._v("\n                    BOBOT\n                  ")])])])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Berbayar ")]),a("div",{staticClass:"col-sm-5"},[a("cswitch",{attrs:{type:"default",variant:"success",pill:!0,checked:!1},model:{value:t.Form.is_premium,callback:function(e){t.$set(t.Form,"is_premium",e)},expression:"Form.is_premium"}})],1)]),t.Form.is_premium?a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Harga "),a("small",[t._v(" (Rp)")])]),a("div",{staticClass:"col-sm-3"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.price,expression:"Form.price"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.Form.price},on:{input:function(e){e.target.composing||t.$set(t.Form,"price",e.target.value)}}})]),a("div",{staticClass:"col-sm-2"},[a("strong",{staticClass:"control-label"},[t._v(" "+t._s(t._formatPrice(t.Form.price)))])])]):t._e(),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Private ")]),a("div",{staticClass:"col-sm-5"},[a("cswitch",{attrs:{type:"default",variant:"success",pill:!0,checked:!1},model:{value:t.Form.is_private,callback:function(e){t.$set(t.Form,"is_private",e)},expression:"Form.is_private"}})],1)]),t.Form.is_private?a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Access PIN ")]),a("div",{staticClass:"col-sm-5"},["checkbox"===t.typeFiled?a("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.pin,expression:"Form.pin"}],staticClass:"form-control",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.Form.pin)?t._i(t.Form.pin,null)>-1:t.Form.pin},on:{change:function(e){var a=t.Form.pin,s=e.target,r=!!s.checked;if(Array.isArray(a)){var i=null,o=t._i(a,i);s.checked?o<0&&t.$set(t.Form,"pin",a.concat([i])):o>-1&&t.$set(t.Form,"pin",a.slice(0,o).concat(a.slice(o+1)))}else t.$set(t.Form,"pin",r)}}}):"radio"===t.typeFiled?a("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.pin,expression:"Form.pin"}],staticClass:"form-control",attrs:{type:"radio"},domProps:{checked:t._q(t.Form.pin,null)},on:{change:function(e){return t.$set(t.Form,"pin",null)}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.pin,expression:"Form.pin"}],staticClass:"form-control",attrs:{type:t.typeFiled},domProps:{value:t.Form.pin},on:{input:function(e){e.target.composing||t.$set(t.Form,"pin",e.target.value)}}}),"password"===t.typeFiled?a("span",{staticClass:"fa fa-fw fa-eye field-icon toggle-password",on:{click:t.showPin}}):a("span",{staticClass:"fa fa-fw fa-eye-slash field-icon toggle-password",on:{click:t.showPin}})])]):t._e(),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v("\n                Durasi Tampil Soal\n                "),a("br"),a("small",[t._v("* Detik (Untuk Type Quiz RealtimeSoal )")])]),a("div",{staticClass:"col-sm-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.durasi_soal,expression:"Form.durasi_soal"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.Form.durasi_soal},on:{input:function(e){e.target.composing||t.$set(t.Form,"durasi_soal",e.target.value)}}})]),a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Durasi Pengerajaan Soal "),a("small",[t._v("* Menit")])]),a("div",{staticClass:"col-sm-2"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.waktu_pengerjaan,expression:"Form.waktu_pengerjaan"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.Form.waktu_pengerjaan},on:{input:function(e){e.target.composing||t.$set(t.Form,"waktu_pengerjaan",e.target.value)}}})])]),a("div",{staticClass:"form-group row"},[a("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Keterangan ")]),a("div",{staticClass:"col-sm-5"},[a("quill-editor",{attrs:{options:t.editorOption},model:{value:t.Form.description,callback:function(e){t.$set(t.Form,"description",e)},expression:"Form.description"}})],1)]),a("div",{staticClass:"form-group row justify-content-center"},[a("div",{staticClass:"col-sm-3"},[a("button",{staticClass:"btn btn-block btn-primary"},[t._v("\n                  Buat\n                ")])])])])])],1)])])])},r=[],i=(a("6b54"),a("96cf"),a("3b8d")),o=(a("a481"),a("75c6")),n=a("fea2"),l=a("9339"),c=a.n(l),m=a("f318"),u=a.n(m);c.a.register("modules/imageResize",u.a);var p={name:"CreateQuizPublisher",components:{cswitch:o["a"],VueTimepicker:n["a"]},data:function(){return{Form:{is_premium:!1,is_private:!1,publish:!1},publishers:[],category_quiz:[],banner:null,token:null,dragValue:null,range:{start:new Date,end:new Date},attrs:[{key:"today",highlight:!0,dates:new Date}],tanggal_ujian:new Date,typeFiled:"password",editorOption:{modules:{imageResize:!0}}}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this._actionGetCategoryQuiz()},methods:{_actionGetCategoryQuiz:function(){var t=this;this.$axios.get("category-quiz",{headers:{"x-access-token":this.token}}).then((function(e){t.category_quiz=e.data.data.rows}))},_actionCreate:function(){var t=this;this.$refs.form.validate().then((function(e){if(e){var a=new FormData,s=t.Form.times.HH+":"+t.Form.times.mm,r=t.Form.end_times.HH+":"+t.Form.end_times.mm;a.append("judul_quiz",t.Form.judul_quiz),a.append("quiz_slug",t.Form.judul_quiz.replace(/\s+/g,"-").toLowerCase()),a.append("category_quiz",t.Form.category_quiz),a.append("type_quiz",t.Form.type_quiz),a.append("is_premium",t.Form.is_premium),a.append("is_private",t.Form.is_private),a.append("quiz_banner",t.Form.banner),a.append("start_date",t.Form.start_date),a.append("end_date",t.Form.start_date),a.append("type_start",t.Form.type_start),a.append("times",s),a.append("end_times",r),a.append("durations",t.Form.durations),a.append("publish",t.Form.publish),a.append("durasi_soal",t.Form.durasi_soal),a.append("description",t.Form.description),a.append("metode_penilaian",t.Form.metode_penilaian),a.append("waktu_pengerjaan",t.Form.waktu_pengerjaan),t.Form.is_private&&a.append("pin",t.Form.pin),t.Form.is_premium&&a.append("price",t.Form.price),t.$axios.post("publisher-quiz",a,{headers:{"x-access-token":t.token}}).then((function(e){"true"==e.data.success&&t.$notify({group:"foo",title:"Success Add ",text:e.data.message}),t.$router.push({path:"/p/quiz"})})).catch((function(){t.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}else t.$notify({group:"foo",type:"error",title:"Membuat Quiz Gagal!",text:"Pastikan form terisi dengan benar."})}))},_changeFile:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,s,r,i,o=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$refs.provider.validate(e);case 2:a=t.sent,s=a.valid,s&&(r=e.target.files,i=new FileReader,i.readAsDataURL(e.target.files[0]),i.onload=function(t){o.banner=t.target.result,o.Form.banner=r[0]});case 5:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),_actionClearFile:function(t){t.preventDefault(),document.getElementById("image").value="",this.banner=""},showPin:function(){this.typeFiled="password"===this.typeFiled?"text":"password"},_formatPrice:function(t){if(t){var e=(t/1).toFixed(0).replace(".",",");return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}}}},d=p,v=(a("b81c"),a("2877")),f=Object(v["a"])(d,s,r,!1,null,"39f988d2",null);e["default"]=f.exports},b81c:function(t,e,a){"use strict";var s=a("32f2"),r=a.n(s);r.a}}]);
//# sourceMappingURL=chunk-02670d2c.0bb98291.js.map