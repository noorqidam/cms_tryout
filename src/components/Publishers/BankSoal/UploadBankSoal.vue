<template>
  <div class="row">
    <div class="col-md-12">
      <b-modal
        v-model="is_loading"
        size="sm"
        centered=""
        hide-footer=""
        hide-header=""
        body-bg-variant="default"
      >
        <div class="row">
          <div class="col-md-12">
            Loading...
          </div>
        </div>
      </b-modal>
    </div>
    <div class="col-md-12">
      <router-link :to="{ path: '/p/banksoals' }" class="btn btn-sm btn-dark mb-1">
        <i class="fa fa-backward"></i> Bank Soal
      </router-link>
      <div class="form-group row">
        <label for="" class="col-sm-1"> File </label>
        <div class="col-sm-auto">
          <input type="file" id="file" @change="_changeFile" class="form-control" />
        </div>
        <div class="col-sm-auto">
          <button class="btn btn-sm btn-danger" @click="_actionCancel">
            <i class="fa fa-times"></i> Cancel
          </button>
        </div>
        <div class="col-sm-auto" v-if="items.length > 0">
          <button class="btn btn-sm btn-primary" @click="actionResufleData">
            <i class="fa fa-cloud-upload"></i> Upload
          </button>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <table class="table table-sm table-striped table-bordered table-hover">
            <thead class="text-center">
              <tr class="text-center">
                <th>NO</th>
                <th>Soal Text</th>
                <th>Soal Gambar</th>
                <th>Tipe Soal</th>
                <th>Kategory</th>
                <th>Matapelajaran</th>
                <th>A</th>
                <th>Benar</th>
                <th>Point</th>
                <th>B</th>
                <th>Benar</th>
                <th>Point</th>
                <th>C</th>
                <th>Benar</th>
                <th>Point</th>
                <th>D</th>
                <th>Benar</th>
                <th>Point</th>
                <th>E</th>
                <th>Benar</th>
                <th>Point</th>
                <th>Hapus</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, i) in items">
                <tr :key="i">
                  <td>{{ (currentPage - 1) * perPage + (i + 1) }}</td>
                  <td>{{ item.soal_text }}</td>
                  <td>{{ item.soal_gambar }}</td>
                  <td>{{ item.type_soal }}</td>
                  <td>{{ item.category_id }}</td>
                  <td>{{ item.matple_id }}</td>
                  <td>{{ item.a }}</td>
                  <td>{{ item.benar_a }}</td>
                  <td>{{ item.point_a }}</td>
                  <td>{{ item.b }}</td>
                  <td>{{ item.benar_b }}</td>
                  <td>{{ item.point_b }}</td>
                  <td>{{ item.c }}</td>
                  <td>{{ item.benar_c }}</td>
                  <td>{{ item.point_c }}</td>
                  <td>{{ item.d }}</td>
                  <td>{{ item.benar_d }}</td>
                  <td>{{ item.point_d }}</td>
                  <td>{{ item.e }}</td>
                  <td>{{ item.benar_e }}</td>
                  <td>{{ item.point_e }}</td>
                  <td>
                    <button class="btn btn-sm btn-danger" @click="deleteList(item.id)">
                      <i class="fa fa-trash-o"></i>
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "UploadBanksSoal",
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 1000,
      is_loading: false,
      BankSoals: []
    };
  },
  methods: {
    _changeFile(e) {
      this.is_loading = true;
      var reader = new FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);
      let TableData = Array();

      reader.onload = function() {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, { type: "array" });
        let GetSheets = wb.SheetNames[0];

        /* Get worksheet */
        const worksheet = wb.Sheets[GetSheets];

        let DataRows = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        for (let index = 1; index < DataRows.length; index++) {
          console.log(DataRows[index]);
          TableData.push({
            id: index,
            soal_text: DataRows[index].SOAL,
            soal_gambar: DataRows[index].soal_gambar,
            type_soal: DataRows[index].__EMPTY_2,
            category_id: DataRows[index].__EMPTY_3,
            matple_id: DataRows[index].__EMPTY_4,
            a: DataRows[index].PILIHAN_JAWABAN,
            benar_a: DataRows[index].__EMPTY_5,
            point_a: DataRows[index].__EMPTY_6,
            b: DataRows[index].__EMPTY_7,
            benar_b: DataRows[index].__EMPTY_8,
            point_b: DataRows[index].__EMPTY_9,
            c: DataRows[index].__EMPTY_10,
            benar_c: DataRows[index].__EMPTY_11,
            point_c: DataRows[index].__EMPTY_12,
            d: DataRows[index].__EMPTY_13,
            benar_d: DataRows[index].__EMPTY_14,
            point_d: DataRows[index].__EMPTY_15,
            e: DataRows[index].__EMPTY_16,
            benar_e: DataRows[index].__EMPTY_17,
            point_e: DataRows[index].__EMPTY_18
          });
        }
      };
      this.items = TableData;
      this.is_loading = false;
    },
    _actionCancel() {
      this.items = [];
      document.getElementById("file").value = "";
    },
    deleteList(id) {
      let dataAkhir = this.items.filter(item => item.id != id);
      this.items = dataAkhir;
      this.$notify({
        group: "foo",
        title: "Soal ",
        type: "success",
        text: "Berhasil Hapus"
      });
    },
    actionResufleData() {
      let dataitems = this.items;
      const PromiseBankSoal = dataitems.map(
        e =>
          new Promise(resolve => {
            this.BankSoals.push({
              soal_text: e.soal_text,
              soal_gambar: e.soal_gambar,
              type_soal: e.type_soal,
              category_id: e.category_id,
              matple_id: e.matple_id,
              jawaban: [
                { a: e.a },
                { benar_a: e.benar_a },
                { point_a: e.ponit_a },
                { b: e.b },
                { benar_b: e.benar_b },
                { point_b: e.point_b },
                { c: e.c },
                { benar_c: e.benar_c },
                { point_c: e.ponit_c },
                { d: e.d },
                { benar_d: e.benar_d },
                { point_d: e.point_d },
                { e: e.e },
                { benar_e: e.benar_e },
                { point_e: e.point_e }
              ]
            });
            resolve(true);
          })
      );

      Promise.all(PromiseBankSoal).then(() => {
        //this upload caal
        this.actionUpload();
      });
    },
    actionUpload() {
      let data = this.BankSoals;
      this.$axios
        .post("publisher-create-banksoal/upload", data, { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success == "true") {
            this.$notify({
              group: "foo",
              type: "success",
              title: "Success Upload "
            });
          }

          this.items = [];
        })
        .catch(err => {
          console.log(JSON.stringify(err.response));
          this.$notify({
            group: "foo",
            type: "error",
            title: "Opss .. ",
            text: `Ada Kesalahan di Server ${JSON.stringify(err.response)}`
          });
        });
    }
  }
};
</script>

<style scoped></style>
