(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6dd0f95e"],{"4c73":function(a,t,e){"use strict";e.r(t);var i=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"row",staticStyle:{color:"black"}},[e("div",{staticClass:"col-md-12"},[e("b-tabs",{attrs:{"content-class":"mt-3",justified:"",pills:"",card:""}},[e("b-tab",{attrs:{title:"Detail Ujian"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-12"},[e("b-modal",{attrs:{"hide-footer":"",centered:"",title:"Upload Banner"},model:{value:a.showModalImage,callback:function(t){a.showModalImage=t},expression:"showModalImage"}},[e("ValidationObserver",{ref:"formBanner"},[e("form",{on:{submit:function(t){return t.preventDefault(),a.handleSubmit(t)}}},[a.banner?a._e():e("div",{staticClass:"col-sm-12"},[e("ValidationProvider",{ref:"provider",attrs:{name:"image",rules:"image|size:150|ext:jpeg,jpg,png"},scopedSlots:a._u([{key:"default",fn:function(t){var i=t.errors;return[e("input",{staticClass:"form-control-file",attrs:{id:"upload",type:"file"},on:{change:a.changeFile}}),e("span",{staticClass:"text-danger"},[a._v(a._s(i[0]))])]}}],null,!1,4101184262)})],1),e("div",{staticClass:"row justify"},[a.banner?e("div",{staticClass:"col-sm-6"},[e("img",{staticClass:"img-thumbnail",attrs:{id:"imgsc",src:a.banner,alt:""}})]):a._e(),a.banner?e("div",{staticClass:"col-sm-2"},[e("span",{staticClass:"badge badge-danger btn btn-sm",on:{click:a.actionClearFile}},[a._v(" x ")])]):a._e()]),e("div",{staticClass:"row justify-content-center mt-2"},[e("div",{staticClass:"col-sm-5"},[e("button",{staticClass:"btn btn-block btn-primary"},[e("i",{staticClass:"fa fa-upload"}),a._v(" Upload")])])])])])],1)],1),e("div",{staticClass:"col-md-12"},[e("ValidationObserver",{ref:"form"},[e("form",{on:{submit:function(t){return t.preventDefault(),a.actionUpdate(t)}}},[e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Nama Ujian ")]),e("div",{staticClass:"col-md-9"},[e("ValidationProvider",{attrs:{rules:"required|min:10"},scopedSlots:a._u([{key:"default",fn:function(t){var i=t.errors;return[e("input",{directives:[{name:"model",rawName:"v-model",value:a.ujian.judul_ujian,expression:"ujian.judul_ujian"}],staticClass:"form-control",attrs:{type:"text",name:"Judul Ujian"},domProps:{value:a.ujian.judul_ujian},on:{input:function(t){t.target.composing||a.$set(a.ujian,"judul_ujian",t.target.value)}}}),e("span",{staticClass:"text-danger"},[a._v(a._s(i[0]))])]}}])})],1)]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v("\n                    Banner\n                    "),e("br"),e("small",{staticClass:"text-secondary"},[a._v("* ukuran. 400x600")]),e("br"),e("small",{staticClass:"text-secondary"},[a._v("* max. 150kb")])]),e("div",{staticClass:"col-sm-3"},[a.ujian.ujian_banner?e("img",{directives:[{name:"lazy",rawName:"v-lazy.container",value:a.pathUjian+a.ujian.ujian_banner,expression:"pathUjian + ujian.ujian_banner",modifiers:{container:!0}}],staticClass:"img-thumbnail",attrs:{alt:a.ujian.ujian_banner}}):a._e()]),e("div",{staticClass:"col-sm-auto"},[e("span",{staticClass:"fa fa-pencil",staticStyle:{cursor:"pointer"},on:{click:a.actionShowModal}},[a._v("\n                      Ganti Banner\n                    ")])])]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Tipe Ujian ")]),e("div",{staticClass:"col-sm-3"},[e("select",{directives:[{name:"model",rawName:"v-model",value:a.ujian.type_ujian,expression:"ujian.type_ujian"}],staticClass:"form-control",on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,(function(a){return a.selected})).map((function(a){var t="_value"in a?a._value:a.value;return t}));a.$set(a.ujian,"type_ujian",t.target.multiple?e:e[0])}}},[e("option",{attrs:{value:""}},[a._v("\n                        -- Pilih --\n                      ")]),e("option",{attrs:{value:"MANDIRI"}},[a._v("\n                        MANDIRI\n                      ")]),e("option",{attrs:{value:"BERSAMA"}},[a._v("\n                        BERSAMA\n                      ")])])]),e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Kategori Ujian ")]),e("div",{staticClass:"col-sm-2"},[e("select",{directives:[{name:"model",rawName:"v-model",value:a.ujian.category_ujian,expression:"ujian.category_ujian"}],staticClass:"form-control",on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,(function(a){return a.selected})).map((function(a){var t="_value"in a?a._value:a.value;return t}));a.$set(a.ujian,"category_ujian",t.target.multiple?e:e[0])}}},[e("option",{attrs:{value:""}},[a._v("--Pilih --")]),a._l(a.category_ujian,(function(t){return e("option",{key:t.title,domProps:{value:t.title}},[a._v("\n                        "+a._s(t.title)+"\n                      ")])}))],2)])]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Tanggal Mulai Quiz ")]),e("div",{staticClass:"col-sm-3"},[e("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"example-datepicker",locale:"id"},model:{value:a.start_date,callback:function(t){a.start_date=t},expression:"start_date"}})],1),e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Tanggal Berakhir Quiz ")]),e("div",{staticClass:"col-sm-3"},[e("b-form-datepicker",{staticClass:"mb-2",attrs:{id:"end_date",locale:"id"},model:{value:a.end_date,callback:function(t){a.end_date=t},expression:"end_date"}})],1)]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Di mulai Pada Jam ")]),e("div",{staticClass:"col-sm-2"},[e("vue-timepicker",{model:{value:a.ujian.times,callback:function(t){a.$set(a.ujian,"times",t)},expression:"ujian.times"}})],1),e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Berakhir pada jam ")]),e("div",{staticClass:"col-sm-2"},[e("vue-timepicker",{model:{value:a.ujian.end_times,callback:function(t){a.$set(a.ujian,"end_times",t)},expression:"ujian.end_times"}})],1)]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Metode Penilaian ")]),e("div",{staticClass:"col-sm-3"},[e("select",{directives:[{name:"model",rawName:"v-model",value:a.ujian.metode_penilaian,expression:"ujian.metode_penilaian"}],staticClass:"form-control",attrs:{required:""},on:{change:function(t){var e=Array.prototype.filter.call(t.target.options,(function(a){return a.selected})).map((function(a){var t="_value"in a?a._value:a.value;return t}));a.$set(a.ujian,"metode_penilaian",t.target.multiple?e:e[0])}}},[e("option",{attrs:{value:""}},[a._v("\n                        -- PIlih --\n                      ")]),e("option",{attrs:{value:"NORMAL"}},[a._v("\n                        NORMAL\n                      ")]),e("option",{attrs:{value:"UTBK"}},[a._v("\n                        UTBK\n                      ")]),e("option",{attrs:{value:"DINAMIS"}},[a._v("\n                        DINAMIS\n                      ")]),e("option",{attrs:{value:"BOBOT"}},[a._v("\n                        BOBOT\n                      ")])])])]),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Berbayar ")]),e("div",{staticClass:"col-sm-5"},[e("cswitch",{attrs:{type:"default",variant:"success",pill:!0,checked:!1},model:{value:a.ujian.is_premium,callback:function(t){a.$set(a.ujian,"is_premium",t)},expression:"ujian.is_premium"}})],1)]),a.ujian.is_premium?e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Harga "),e("small",[a._v(" (Rp)")])]),e("div",{staticClass:"col-sm-3"},[e("input",{directives:[{name:"model",rawName:"v-model",value:a.ujian.price,expression:"ujian.price"}],staticClass:"form-control",attrs:{type:"number"},domProps:{value:a.ujian.price},on:{input:function(t){t.target.composing||a.$set(a.ujian,"price",t.target.value)}}})]),e("div",{staticClass:"col-sm-2"},[e("strong",{staticClass:"control-label"},[a._v(" "+a._s(a.formatPrice(a.ujian.price)))])])]):a._e(),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Private ")]),e("div",{staticClass:"col-sm-5"},[e("cswitch",{attrs:{type:"default",variant:"success",pill:!0,checked:!1},model:{value:a.ujian.is_private,callback:function(t){a.$set(a.ujian,"is_private",t)},expression:"ujian.is_private"}})],1)]),a.ujian.is_private?e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Access PIN ")]),e("div",{staticClass:"col-sm-5"},["checkbox"===a.typeFiled?e("input",{directives:[{name:"model",rawName:"v-model",value:a.acces_pin,expression:"acces_pin"}],staticClass:"form-control",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(a.acces_pin)?a._i(a.acces_pin,null)>-1:a.acces_pin},on:{change:function(t){var e=a.acces_pin,i=t.target,s=!!i.checked;if(Array.isArray(e)){var n=null,o=a._i(e,n);i.checked?o<0&&(a.acces_pin=e.concat([n])):o>-1&&(a.acces_pin=e.slice(0,o).concat(e.slice(o+1)))}else a.acces_pin=s}}}):"radio"===a.typeFiled?e("input",{directives:[{name:"model",rawName:"v-model",value:a.acces_pin,expression:"acces_pin"}],staticClass:"form-control",attrs:{type:"radio"},domProps:{checked:a._q(a.acces_pin,null)},on:{change:function(t){a.acces_pin=null}}}):e("input",{directives:[{name:"model",rawName:"v-model",value:a.acces_pin,expression:"acces_pin"}],staticClass:"form-control",attrs:{type:a.typeFiled},domProps:{value:a.acces_pin},on:{input:function(t){t.target.composing||(a.acces_pin=t.target.value)}}}),"password"===a.typeFiled?e("span",{staticClass:"fa fa-fw fa-eye field-icon toggle-password",staticStyle:{cursor:"pointer"},on:{click:a.showPin}}):e("span",{staticClass:"fa fa-fw fa-eye-slash field-icon toggle-password",staticStyle:{cursor:"pointer"},on:{click:a.showPin}})])]):a._e(),a.JadwalUjian.length>0?e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Publish ")]),e("div",{staticClass:"col-sm-5"},[e("cswitch",{attrs:{type:"default",variant:"success",pill:!0,checked:!1},model:{value:a.ujian.publish,callback:function(t){a.$set(a.ujian,"publish",t)},expression:"ujian.publish"}})],1)]):a._e(),e("div",{staticClass:"form-group row"},[e("label",{staticClass:"col-sm-2",attrs:{for:""}},[a._v(" Keterangan ")]),e("div",{staticClass:"col-sm-5"},[e("quill-editor",{attrs:{options:a.editorOption},model:{value:a.ujian.description,callback:function(t){a.$set(a.ujian,"description",t)},expression:"ujian.description"}})],1)]),e("div",{staticClass:"form-group row justify-content-center"},[e("div",{staticClass:"col-sm-3"},[e("button",{staticClass:"btn btn-block btn-primary"},[a._v("\n                      Update\n                    ")])])])])])],1),e("div",{staticClass:"col-sm-12"},[e("div",{staticClass:"row justify-content-end"},[e("div",{staticClass:"col-sm-2"},[e("button",{staticClass:"btn btn-block btn-danger",on:{click:function(t){return a._deleteUjian(a.ujian._id)}}},[e("i",{staticClass:"fa fa-trash"}),a._v(" Hapus Ujian\n                ")])])])])])]),e("b-tab",{attrs:{title:"Sesi Ujian"},on:{click:a.actionGetSoalByUjianId}},[e("div",{staticClass:"row"},[e("router-link",{staticClass:"btn btn-md btn-default",attrs:{to:{path:"/p/ujian/create-sesi-ujian",query:{ujian_id:a.ujian._id,judul_ujian:a.ujian.ujian_slug}}}},[e("i",{staticClass:"fa fa-plus"}),a._v(" Tambah Sesi Ujian\n          ")]),e("div",{staticClass:"col-md-12 pt-2"},a._l(a.details,(function(t){return e("b-list-group",{key:t._id},[e("b-list-group-item",{staticClass:"flex-column align-items-start mt-2",attrs:{href:"#"},on:{click:function(e){return a.actionShowDetailSesiUjian(t._id)}}},[a._v("\n                "+a._s(t._id)+"\n                "),e("div",{staticClass:"d-flex w-100 justify-content-between"},[e("h5",{staticClass:"mb-1"},[a._v("\n                    "+a._s(t.sesi_ujian)+"\n                  ")]),e("hr"),e("small",[a._v(" "+a._s(a.formatDate(t.createdAt))+" ")])]),a._v("\n\n                Total Soal "),e("strong",[a._v(a._s(t.soals.length))])])],1)})),1)],1)]),e("b-tab",{attrs:{title:"Jadwal Ujian"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[a.JadwalUjian.length<1?e("router-link",{staticClass:"btn btn-sm btn-primary",attrs:{to:{path:"/p/ujian/create-jadwal-sesi-ujian/"+a.ujian_id}}},[e("i",{staticClass:"fa fa-pencil"}),a._v(" Buat Jadwal Ujian\n            ")]):e("router-link",{staticClass:"btn btn-sm btn-warning",attrs:{to:{path:"/p/ujian/edit-jadwal-sesi-ujian/"+a.ujian_id}}},[e("i",{staticClass:"fa fa-pencil"}),a._v(" Ubah Jadwal Ujian\n            ")]),a.JadwalUjian.length>0?e("button",{staticClass:"btn btn-md btn-danger ml-1",on:{click:a.DeleteJadwal}},[e("i",{staticClass:"fa fa-trash"}),a._v(" Hapus Jadwal\n            ")]):a._e()],1),e("div",{staticClass:"col-md-12 container mt-1 pt-1"},[e("div",{staticClass:"card bg-primary"},[e("div",{staticClass:"card-body"},[e("h1",{staticClass:"h1"},[a._v(a._s(a.formUjian.judul_ujian))])])]),a._l(a.JadwalUjian,(function(t){return e("div",{key:t._id,staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"timeline-item",attrs:{"date-is":t.start_time}},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("h3",[a._v(a._s(t.sesi_ujian))]),e("br"),e("label",{staticClass:"mr-1",attrs:{for:""}},[a._v(" Mulai Jam "+a._s(t.start_time))]),e("label",{attrs:{for:""}},[a._v(" Durasi "+a._s(t.duration)+" "),e("strong",[a._v("Menit")])])])])])])])}))],2)])])],1)],1)])},s=[],n=(e("55dd"),e("6b54"),e("a481"),e("96cf"),e("3b8d")),o=e("75c6"),r=e("fea2"),l=e("c1df"),c=e.n(l),u=e("9339"),d=e.n(u),p=e("f318"),m=e.n(p);d.a.register("modules/imageResize",m.a);var f={name:"DetailUjianPublisher",components:{cswitch:o["a"],VueTimepicker:r["a"]},data:function(){return{items:[],peserta:[],ujian:{},details:[],showCalendar:!1,currentPage:1,perPage:100,totalRows:0,isLoading:!1,token:null,pathUjian:"https://storage.googleapis.com/edutore-cdn/tryout/",pathImages:"https://storage.googleapis.com/edutore-cdn/public/module/thumb/",pathImagesQ:"https://storage.googleapis.com/edutore-cdn/public/soal/question/",pathImagesAnswer:"https://storage.googleapis.com/edutore-cdn/public/soal/answer_choice/",dragValue:null,range:{start:null,end:null},attrs:[{highlight:!0,dates:[]}],sticky:!0,attrPeserta:["No",{key:"email",label:"Email",class:"text-left"},{key:"_id",label:"Nomor Registrasi",class:"text-left"},{key:"actions",label:"Actions"}],pageOptions:[5,10,15],sortBy:"",sortDesc:!1,sortDirection:"asc",filter:null,isBusy:!1,filterOn:[],totalSoal:0,modalPeserta:!1,FormPeserta:{},start_date:null,end_date:null,showModalImage:!1,banner:null,Newbanner:null,typeFiled:"password",acces_pin:null,ujian_id:null,formUjian:{},JadwalUjian:[],editorOption:{modules:{imageResize:!0}},category_ujian:[]}},computed:{sortOptions:function(){return this.fields.filter((function(a){return a.sortable})).map((function(a){return{text:a.label,value:a.key}}))}},mounted:function(){var a=this.$route.query._id;this.ujian_id=a,this.token=sessionStorage.getItem("session_token"),this.actionGetUjianByid(a),this.actionGetJadwalUjianById(a),this.actionGetCategoryUjian()},methods:{actionGetCategoryUjian:function(){var a=this;this.$axios.get("category-ujian",{headers:{"x-access-token":this.token}}).then((function(t){"true"==t.data.success&&(a.category_ujian=t.data.data.rows)}))},actionGetUjianByid:function(a){var t=this;this.$axios.get("publisher-ujian/".concat(a),{headers:{"x-access-token":this.token}}).then((function(a){var e=a.data;if("true"===a.data.success){t.ujian=e.data,t.start_date=new Date(e.data.start_date),t.end_date=new Date(e.data.end_date);var i=a.data.ujian_access;t.acces_pin=i?i.acces_pin:null}t.isLoading=!1})).catch((function(a){console.log(a),t.isLoading=!1}))},actionGetSoalByUjianId:function(){var a=this,t=this.$route.query._id;this.$axios.get("publisher-soal-ujian/ujian/".concat(t),{headers:{"x-access-token":this.token}}).then((function(t){var e=t.data;"true"===t.data.success&&(console.log(t.data.data),a.items=e.data[0].soals,a.details=t.data.data,a.totalSoal=a.items.length),a.isLoading=!1})).catch((function(t){console.log(t),a.isLoading=!1}))},actionListen:function(){var a=this;this.$axios.get("peserta-ujian/ujian_id/".concat(this.ujian._id),{headers:{"x-access-token":this.token}}).then((function(t){a.peserta=t.data.data}))},onFiltered:function(a){this.totalRows=a.length,this.currentPage=1},actionShowDetailSesiUjian:function(a){this.$router.push({path:"/p/ujian/sesi-ujian/"+this.ujian_id+"/"+a})},showModalPeserta:function(){this.modalPeserta=!0},actionAddPeserta:function(){var a=this,t={email:this.FormPeserta.email,ujian_id:this.ujian._id};this.$axios.post("peserta-ujian",t,{headers:{"x-access-token":this.token}}).then((function(t){a.$notify({group:"foo",title:"Success Add ",text:t.data.message}),a.actionListen()})).catch((function(t){console.log(t),a.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))},actionDelete:function(a){var t=this,e={_id:a._id,ujian_id:a.ujian_id._id};this.$axios.post("peserta-ujian/remove-peserta",e,{headers:{"x-access-token":this.token}}).then((function(a){t.$notify({group:"foo",text:a.data.message}),t.actionListen()})).catch((function(){t.$notify({group:"foo",type:"error",text:"Ada Kesalahan di Server "})}))},formatDate:function(a){return c()(a).format("dddd, MMMM Do YYYY")},actionShowModal:function(){this.showModalImage=!0},changeFile:function(){var a=Object(n["a"])(regeneratorRuntime.mark((function a(t){var e,i,s,n,o=this;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,this.$refs.provider.validate(t);case 2:e=a.sent,i=e.valid,i&&(s=t.target.files,n=new FileReader,n.readAsDataURL(t.target.files[0]),n.onload=function(a){o.banner=a.target.result,o.Newbanner=s[0]});case 5:case"end":return a.stop()}}),a,this)})));function t(t){return a.apply(this,arguments)}return t}(),actionClearFile:function(a){a.preventDefault(),this.banner=null,this.Newbanner=null},actionUpdate:function(){var a=this;this.$refs.form.validate().then((function(t){if(t){if(t){a.btn_loading=!0;var e={judul_ujian:a.ujian.judul_ujian,ujian_slug:a.ujian.judul_ujian.replace(/\s+/g,"-").toLowerCase(),category_ujian:a.ujian.category_ujian,type_ujian:a.ujian.type_ujian,is_premium:a.ujian.is_premium,is_private:a.ujian.is_private,start_date:a.start_date,end_date:a.end_date,type_start:a.ujian.type_start,times:a.ujian.times,end_times:a.ujian.end_times,durations:a.ujian.durations,publish:a.ujian.publish,durasi_soal:a.ujian.durasi_soal,description:a.ujian.description,metode_penilaian:a.ujian.metode_penilaian,waktu_pengerjaan:a.ujian.waktu_pengerjaan,pin:a.acces_pin};a.$axios.put("publisher-ujian/".concat(a.ujian._id),e,{headers:{"x-access-token":a.token}}).then((function(t){"true"===t.data.success&&a.$notify({group:"foo",type:"success",title:"Success",text:t.data.message}),a.$router.push({path:"/p/ujian"})})).catch((function(t){console.log(t),a.btn_loading=!0,a.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}}else a.$notify({group:"foo",type:"error",title:"Edit Ujian Gagal",text:"Pastikan telah mengisi form dengan benar."})}))},handleSubmit:function(){var a=this;this.$refs.formBanner.validate().then((function(t){if(t){var e=new FormData;e.append("ujian_banner",a.Newbanner),e.append("judul_ujian",a.ujian.judul_ujian),e.append("ujian_id",a.ujian._id),a.$axios.post("publisher-update-banner-ujian",e,{headers:{"x-access-token":a.token}}).then((function(t){"true"===t.data.success&&a.$notify({group:"foo",title:"Success",text:" Upload Banner"}),a.showModalImage=!1,a.banner=null,a.actionGetUjianByid(a.ujian._id)})).catch((function(t){console.log(t),a.btn_loading=!0,a.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}else a.$notify({group:"foo",type:"error",title:"Oopss ..",text:"Ganti Banner Gagal"})}))},showPin:function(){this.typeFiled="password"===this.typeFiled?"text":"password"},formatPrice:function(a){if(a){var t=(a/1).toFixed(0).replace(".",",");return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}return"0"},_deleteUjian:function(a){var t=this;this.$swal({title:"Apakah Anda Yakin akan Hapus Ujian ini ?",text:this.ujian.judul_ujian,icon:"question",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",cancelButtonText:"Tidak",confirmButtonText:"Ya, Hapus !"}).then((function(e){if(e.value){var i={ujian_id:a};t.$axios.post("publisher-delete-ujian",i,{headers:{"x-access-token":t.token}}).then((function(a){t.$notify({group:"foo",title:"Berhasil ",text:a.data.message}),t.$router.push({path:"/p/ujian"})})).catch((function(a){console.log(a),t.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}}))},actionGetJadwalUjianById:function(a){var t=this;this.$axios.get("publisher-jadwal-ujian/".concat(a),{headers:{"x-access-token":this.token}}).then((function(a){var e=a.data.data.schedule;t.formUjian=a.data.ujian;var i=e.sort((function(a,t){return a.position>t.position?1:t.position>a.position?-1:0}));t.JadwalUjian=i})).catch((function(a){console.log(a)}))},DeleteJadwal:function(){var a=this,t={ujian_id:this.ujian_id};this.$axios.post("publisher-hapus-jadwal-ujian",t,{headers:{"x-access-token":this.token}}).then((function(t){"true"===t.data.success&&a.$notify({group:"foo",title:"Berhasil hapus Jadwal ",text:t.data.message}),window.location.reload()})).catch((function(){a.$notify({group:"foo",type:"error",title:"Opss .. ",text:"Ada Kesalahan di Server"})}))}}},v=f,_=(e("fbef"),e("2877")),h=Object(_["a"])(v,i,s,!1,null,"14068931",null);t["default"]=h.exports},"6b1b":function(a,t,e){},fbef:function(a,t,e){"use strict";var i=e("6b1b"),s=e.n(i);s.a}}]);
//# sourceMappingURL=chunk-6dd0f95e.8a4c8338.js.map