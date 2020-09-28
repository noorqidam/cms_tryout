(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60662531"],{"1acf":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12 text-right mb-2"},[e("router-link",{staticClass:"btn btn-sm btn-info text-white",attrs:{to:{path:"/p/category-ujian"}}},[e("i",{staticClass:"fa fa-plus"}),t._v(" Tambah Kategori\n    ")])],1),e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("ValidationObserver",{ref:"form"},[e("form",{on:{submit:function(a){return a.preventDefault(),t.actionCreate(a)}}},[e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Nama Ujian ")]),e("div",{staticClass:"col-md-9"},[e("ValidationProvider",{attrs:{rules:"required|min:10"},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.errors;return[e("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.judul_ujian,expression:"Form.judul_ujian"}],staticClass:"form-control",attrs:{type:"text",name:"Judul Ujian"},domProps:{value:t.Form.judul_ujian},on:{input:function(a){a.target.composing||t.$set(t.Form,"judul_ujian",a.target.value)}}}),e("span",{staticClass:"text-danger"},[t._v(t._s(s[0]))])]}}])})],1)]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v("\n                Banner\n                "),e("br"),e("small",{staticClass:"text-secondary"},[t._v("* ukuran. 400x600")]),e("br"),e("small",{staticClass:"text-secondary"},[t._v("* max. 150kb")])]),e("div",{staticClass:"col-sm-3"},[e("ValidationProvider",{ref:"provider",attrs:{name:"image",rules:"image|size:150|ext:jpeg,jpg,png"},scopedSlots:t._u([{key:"default",fn:function(a){var s=a.errors;return[e("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file"},on:{change:t.changeFile}}),e("span",{staticClass:"text-danger"},[t._v(t._s(s[0]))])]}}])})],1),t.banner?e("div",{staticClass:"col-sm-4"},[e("img",{staticClass:"img-thumbnail",attrs:{id:"imgsc",src:t.banner,alt:""}})]):e("div",{staticClass:"col-sm-4",attrs:{id:"preview"}},[e("i",[t._v(" No Preview Image ")])]),t.banner?e("div",{staticClass:"col-sm-2"},[e("span",{staticClass:"btn btn-sm btn-danger",on:{click:t.actionClearFile}},[e("i",{staticClass:"fa fa-times"})])]):t._e()]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Tipe Ujian ")]),e("div",{staticClass:"col-sm-3"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.Form.type_ujian,expression:"Form.type_ujian"}],staticClass:"form-control",on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.Form,"type_ujian",a.target.multiple?e:e[0])}}},[e("option",{attrs:{value:""}},[t._v("\n                    -- Pilih --\n                  ")]),e("option",{attrs:{value:"MANDIRI"}},[t._v("\n                    MANDIRI\n                  ")]),e("option",{attrs:{value:"BERSAMA"}},[t._v("\n                    BERSAMA\n                  ")])])]),e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Kategori Ujian ")]),e("div",{staticClass:"col-sm-2"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.Form.category_ujian,expression:"Form.category_ujian"}],staticClass:"form-control",on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.Form,"category_ujian",a.target.multiple?e:e[0])}}},[e("option",{attrs:{value:""}},[t._v("--Pilih --")]),t._l(t.category_ujian,(function(a){return e("option",{key:a.title,domProps:{value:a.title}},[t._v("\n                    "+t._s(a.title)+"\n                  ")])}))],2)])]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Tanggal Mulai Quiz ")]),e("div",{staticClass:"col-sm-3"},[e("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"example-datepicker",locale:"id"},model:{value:t.Form.start_date,callback:function(a){t.$set(t.Form,"start_date",a)},expression:"Form.start_date"}})],1),e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Tanggal Berakhir Quiz ")]),"MANDIRI"===t.Form.type_ujian?e("div",{staticClass:"col-sm-3"},[e("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"end_date",locale:"id"},model:{value:t.Form.end_date,callback:function(a){t.$set(t.Form,"end_date",a)},expression:"Form.end_date"}})],1):e("div",{staticClass:"col-sm-3"},[e("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"end_date",locale:"id"},model:{value:t.Form.start_date,callback:function(a){t.$set(t.Form,"start_date",a)},expression:"Form.start_date"}})],1)]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Di mulai Pada Jam ")]),e("div",{staticClass:"col-sm-2"},[e("vue-timepicker",{model:{value:t.Form.times,callback:function(a){t.$set(t.Form,"times",a)},expression:"Form.times"}})],1),e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Berakhir pada jam ")]),e("div",{staticClass:"col-sm-2"},[e("vue-timepicker",{model:{value:t.Form.end_times,callback:function(a){t.$set(t.Form,"end_times",a)},expression:"Form.end_times"}})],1)]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Metode Penilaian ")]),e("div",{staticClass:"col-sm-3"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.Form.metode_penilaian,expression:"Form.metode_penilaian"}],staticClass:"form-control",attrs:{required:""},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,(function(t){return t.selected})).map((function(t){var a="_value"in t?t._value:t.value;return a}));t.$set(t.Form,"metode_penilaian",a.target.multiple?e:e[0])}}},[e("option",{attrs:{value:""}},[t._v("\n                    -- PIlih --\n                  ")]),e("option",{attrs:{value:"NORMAL"}},[t._v("\n                    NORMAL\n                  ")]),e("option",{attrs:{value:"UTBK"}},[t._v("\n                    UTBK\n                  ")]),e("option",{attrs:{value:"DINAMIS"}},[t._v("\n                    DINAMIS\n                  ")]),e("option",{attrs:{value:"BOBOT"}},[t._v("\n                    BOBOT\n                  ")])])])]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Berbayar ")]),e("div",{staticClass:"col-sm-5"},[e("cswitch",{attrs:{type:"default",variant:"success",pill:!0,checked:!1},model:{value:t.Form.is_premium,callback:function(a){t.$set(t.Form,"is_premium",a)},expression:"Form.is_premium"}})],1)]),t.Form.is_premium?e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Harga "),e("small",[t._v(" (Rp)")])]),e("div",{staticClass:"col-sm-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.price,expression:"Form.price"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:t.Form.price},on:{input:function(a){a.target.composing||t.$set(t.Form,"price",a.target.value)}}})]),e("div",{staticClass:"col-sm-2"},[e("strong",{staticClass:"control-label"},[t._v(" "+t._s(t.formatPrice(t.Form.price)))])])]):t._e(),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Private ")]),e("div",{staticClass:"col-sm-5"},[e("cswitch",{attrs:{type:"default",variant:"success",pill:!0,checked:!1},model:{value:t.Form.is_private,callback:function(a){t.$set(t.Form,"is_private",a)},expression:"Form.is_private"}})],1)]),t.Form.is_private?e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Access PIN ")]),e("div",{staticClass:"col-sm-5"},["checkbox"===t.typeFiled?e("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.pin,expression:"Form.pin"}],staticClass:"form-control",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.Form.pin)?t._i(t.Form.pin,null)>-1:t.Form.pin},on:{change:function(a){var e=t.Form.pin,s=a.target,r=!!s.checked;if(Array.isArray(e)){var i=null,o=t._i(e,i);s.checked?o<0&&t.$set(t.Form,"pin",e.concat([i])):o>-1&&t.$set(t.Form,"pin",e.slice(0,o).concat(e.slice(o+1)))}else t.$set(t.Form,"pin",r)}}}):"radio"===t.typeFiled?e("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.pin,expression:"Form.pin"}],staticClass:"form-control",attrs:{type:"radio"},domProps:{checked:t._q(t.Form.pin,null)},on:{change:function(a){return t.$set(t.Form,"pin",null)}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:t.Form.pin,expression:"Form.pin"}],staticClass:"form-control",attrs:{type:t.typeFiled},domProps:{value:t.Form.pin},on:{input:function(a){a.target.composing||t.$set(t.Form,"pin",a.target.value)}}}),"password"===t.typeFiled?e("span",{staticClass:"fa fa-fw fa-eye field-icon toggle-password",staticStyle:{cursor:"pointer"},on:{click:t.showPin}}):e("span",{staticClass:"fa fa-fw fa-eye-slash field-icon toggle-password",staticStyle:{cursor:"pointer"},on:{click:t.showPin}})])]):t._e(),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[t._v(" Keterangan ")]),e("div",{staticClass:"col-sm-5"},[e("quill-editor",{attrs:{options:t.editorOption},model:{value:t.Form.description,callback:function(a){t.$set(t.Form,"description",a)},expression:"Form.description"}})],1)]),e("div",{staticClass:"form-group row justify-content-center"},[e("div",{staticClass:"col-sm-3"},[e("button",{staticClass:"btn btn-block btn-primary"},[t._v("\n                  Buat\n                ")])])])])])],1)])])])},r=[],i=(e("6b54"),e("96cf"),e("3b8d")),o=(e("a481"),e("75c6")),n=e("fea2"),l=e("9339"),c=e.n(l),m=e("f318"),u=e.n(m);c.a.register("modules/imageResize",u.a);var p={name:"CreateUjian",components:{cswitch:o["a"],VueTimepicker:n["a"]},data:function(){return{Form:{is_premium:!1,publish:!1,is_private:!1},publishers:[],banner:null,token:null,dragValue:null,tanggal_ujian:"",count_theme:[],typeFiled:"password",editorOption:{modules:{imageResize:!0}},category_ujian:[]}},mounted:function(){this.token=sessionStorage.getItem("session_token"),this.actionGetCategoryUjian()},methods:{actionGetCategoryUjian:function(){var t=this;this.$axios.get("category-ujian",{headers:{"x-access-token":this.token}}).then((function(a){"true"==a.data.success&&(t.category_ujian=a.data.data.rows)}))},actionGetPublishers:function(){var t=this;this.$axios.get("publishers",{headers:{"x-access-token":this.token}}).then((function(a){t.publishers=a.data.data.rows}))},actionCreate:function(){var t=this;this.$refs.form.validate().then((function(a){if(a){var e=new FormData,s=t.Form.times.HH+":"+t.Form.times.mm,r=t.Form.end_times.HH+":"+t.Form.end_times.mm;e.append("judul_ujian",t.Form.judul_ujian),e.append("ujian_slug",t.Form.judul_ujian.replace(/\s+/g,"-").toLowerCase()),e.append("category_ujian",t.Form.category_ujian),e.append("type_ujian",t.Form.type_ujian),e.append("is_premium",t.Form.is_premium),e.append("is_private",t.Form.is_private),e.append("ujian_banner",t.Form.banner),e.append("start_date",t.Form.start_date),"MANDIRI"===t.Form.type_ujian?e.append("end_date",t.Form.end_date):e.append("end_date",t.Form.start_date),e.append("times",s),e.append("end_times",r),e.append("durations",t.Form.durations),e.append("publish",t.Form.publish),e.append("durasi_soal",t.Form.durasi_soal?t.Form.durasi_soal:120),e.append("description",t.Form.description),e.append("metode_penilaian",t.Form.metode_penilaian),e.append("waktu_pengerjaan",t.Form.waktu_pengerjaan),t.Form.is_private&&e.append("pin",t.Form.pin),t.Form.is_premium&&e.append("price",t.Form.price),t.$axios.post("publisher-ujian",e,{headers:{"Content-Type":"multipart/form-data",path:"tryout/","x-access-token":t.token}}).then((function(a){"true"===a.data.success&&t.$notify({group:"foo",title:"Success Add ",text:a.data.message}),t.$router.push({path:"/p/ujian"})})).catch((function(){t.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}else t.$notify({group:"foo",type:"error",title:"Membuat Ujian Gagal ",text:"Pastikan telah mengisi form dengan benar."})}))},changeFile:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var e,s,r,i,o=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$refs.provider.validate(a);case 2:e=t.sent,s=e.valid,s&&(r=a.target.files,i=new FileReader,i.readAsDataURL(a.target.files[0]),i.onload=function(t){o.banner=t.target.result,o.Form.banner=r[0]});case 5:case"end":return t.stop()}}),t,this)})));function a(a){return t.apply(this,arguments)}return a}(),actionClearFile:function(t){t.preventDefault(),document.getElementById("image").value="",this.banner=""},showPin:function(){this.typeFiled="password"===this.typeFiled?"text":"password"},formatPrice:function(t){if(t){var a=(t/1).toFixed(0).replace(".",",");return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}return"0"}}},d=p,v=(e("209a"),e("2877")),f=Object(v["a"])(d,s,r,!1,null,"0f5b5706",null);a["default"]=f.exports},"209a":function(t,a,e){"use strict";var s=e("ae30"),r=e.n(s);r.a},ae30:function(t,a,e){}}]);
//# sourceMappingURL=chunk-60662531.a3e934a2.js.map