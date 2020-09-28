<template>
  <div class="row">
    <div class="col-md-6">
      <b-modal
        v-model="isLoading"
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
      <div class="card">
        <div class="card-body">
          <div class="row justify-content-end">
            <div class="col-md-auto">
              <label for=""> Total Rp {{ formatPrice(totalDebet) }} </label>
            </div>
          </div>
          <div class="row justify-content-end">
            <div class="col-ms-2 mr-2" v-if="items.length > 0">
              <button class="btn btn-block btn-default" @click="_actionDownloadRekap">
                <i class="fa fa-file-excel-o"></i>
              </button>
            </div>
          </div>

          <table class="table table-sm table-bordered table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>Category</th>
                <th>Description</th>
                <th>Price Order</th>
                <th>Amount</th>
                <th style="width:10%">Date</th>
                <th>Publisher</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, i) in items">
                <tr :key="item.id">
                  <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                  <td>{{ item.category }}</td>
                  <td>{{ item.information }}</td>
                  <td class="text-right">{{ formatPrice(item.price_order) }}</td>
                  <td class="text-right">{{ formatPrice(item.amount) }}</td>
                  <td class="text-center">{{ formatDate(item.date_cutoff) }}</td>
                  <td>{{ item.publisher ? item.publisher.name : item.publisher_id }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="row justify-content-end">
          <div class="col-sm-auto mr-2">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              aria-controls="my-table"
            ></b-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import xlsx from "xlsx";
import moment from "moment";

export default {
  name: "Debet",
  data() {
    return {
      items: [],
      currentPage: 1,
      perPage: 500,
      totalRows: 0,
      totalDebet: 0,
      session_token: null,
      isLoading: true,
      id: 0,
      name: null
    };
  },
  watch: {
    currentPage(val) {
      this._actionGetTransaction(this.id);
    }
  },
  methods: {
    _actionGetTransaction(id) {
      this.isLoading = true;
      this.$axios
        .get(`transaction/publisher/${id}?&page=${this.currentPage}&limit=${this.perPage}`, {
          headers: { "x-access-token": this.session_token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data.rows;
            this.totalRows = response.data.data.count;
            this.totalDebet = response.data.debet;
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(tgl) {
      return moment(tgl).format("DD-MM-YYYY");
    },
    _actionDownloadRekap() {
      const wb = xlsx.utils.book_new();
      wb.Props = {
        Title: "Export Data Filter",
        Subject: "REKAP",
        Author: "Rohmatmret",
        CreatedDate: new Date()
      };
      const ParseData = [];

      const data = this.items;
      if (this.items.length < 1) {
        this.$swal({
          type: "error",
          text: "Item Untuk Di Rekap tidak ada",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        // No	Date	Category	Description	Price Order	Amount	Count Access Subscription	Duration	Publisher	Buyer
        const Attributes = ["NO", "DATE", "CATEGORY", "DESCRIPTION", "AMOUNT", "PUBLISHER"];
        const wscols = [
          { wch: 8 }, // "characters"
          { wch: 35 }, // "pixels"
          { wch: 40 }, // "pixels"
          { wch: 30 }, // "pixels"
          { wch: 30 }, // "pixels"
          { wch: 30 }, // "pixels"
          { wch: 30 }, // "pixels"
          { wch: 30 }, // "pixels"
          { wch: 40 }, // "pixels"
          { wch: 30 } // "pixels"
        ];
        ParseData.push(Attributes);
        let n = 0;
        data.forEach(element => {
          const dataG = [
            ++n,
            this.formatDate(element.date_cutoff),
            element.category,
            element.information,
            element.amount,
            element.publisher ? element.publisher.name : element.publisher_id
          ];

          ParseData.push(dataG);
        });

        const ws = xlsx.utils.aoa_to_sheet(ParseData);
        ws["!cols"] = wscols;
        const name = "sale";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP");
        /* generate file and send to client */
        xlsx.writeFile(wb, `pendapatan_publisher_${this.name}.xlsx`);
      }
    }
  },
  mounted() {
    this.session_token = sessionStorage.getItem("session_token");
    const { id } = this.$route.query;
    this.name = this.$route.query.name;
    this.id = id;
    this._actionGetTransaction(id);
  }
};
</script>
