<template>
  <div class="row">
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
    <div class="col-md-12">
      <div class="card">
        <h4 class="h4 text-center mt-2">Popular Module Sale <small class="text-muted"> All time </small></h4>
        <div class="card-body">
          <!-- <ChartModule /> -->
          <apexchart type="bar" height="350" :options="chartOptionsSales" :series="Saleseries" />
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <h4 class="h4 text-center mt-2">Module Sale</h4>
        <br />
        <div class="col-md-12">
          <b-alert show dismissible>
            <i class="fa fa-info"></i> by default the data is displayed this month <b> {{ month }} </b>
          </b-alert>
        </div>

        <div class="col-md-12">
          <form v-on:submit.prevent="_actionSearch">
            <div class="form-group row">
              <label for="" class="col-sm-auto"> Filter </label>
              <label for="" class="col-sm-auto"> Start Date </label>
              <div class="col-sm-3">
                <input type="date" v-model="start_date" class="form-control" />
              </div>
              <label for=""> End Date </label>
              <div class="col-sm-3">
                <input type="date" v-model="end_date" class="form-control" />
              </div>
              <div class="col-sm-auto">
                <button class="btn btn-block btn-outline-primary">
                  <i class="fa fa-filter"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="row justify-content-end">
          <div class="col-md-1">
            <button class="btn btn-sm btn-dark mr-1" @click="_actionDownloadRekap">
              <i class="fa fa-file-excel-o"></i>
            </button>
          </div>
        </div>
        <div class="row justify-content-end mb-1 mt-1">
          <div class="col-sm-2 mr-2">
            Total Income <strong> {{ _formatPrice(total_pendapatan) }} </strong>
          </div>
          <!--
            <div class="col-sm-auto">
              Total Order <strong>  {{ formatPrice(totalRows) }} </strong>
            </div>
              -->
        </div>
        <div class="card-body">
          <div style="overflow-x:auto;">
            <table class="table table-sm table-bordered table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>User</th>
                  <th>Module</th>
                  <th>Publisher</th>
                  <th>Order Key</th>
                  <th>Price</th>
                  <th>Voucher</th>
                  <th>Voucher Value</th>
                  <th>Pay Price</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, i) in items">
                  <tr :key="item.id">
                    <td>{{ (currentPage - 1) * perPage + ++i }}</td>
                    <td v-if="item.order">{{ item.order.user ? item.order.user : item.order.user_id }}</td>
                    <td v-else></td>
                    <td>{{ item.module ? item.module.name : "" }}</td>
                    <td>{{ item.module ? item.module.publisher.name : "" }}</td>
                    <td>{{ item.order_id }}</td>
                    <td class="text-right">{{ _formatPrice(item.module.price) }}</td>
                    <td class="text-right" v-if="item.order.voucher">
                      {{ _formatPrice(item.order.voucher) }}
                    </td>
                    <td v-else></td>
                    <td class="text-right">{{ item.order.code_voucher }}</td>
                    <td v-if="item.order" class="text-right">{{ _formatPrice(item.order.total_payment) }}</td>
                    <td v-else></td>
                    <td>{{ _formatTime(item.order.updatedAt) }}</td>
                    <!-- <td>
                      <button class="btn btn-sm btn-default" @click="_actionGetDetail(item)">
                        <i class="fa fa-search"></i>
                      </button>
                    </td> -->
                  </tr>
                </template>
              </tbody>
            </table>
            <div class="row justify-content-end">
              <div class="col-sm-auto">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                ></b-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import xlsx from "xlsx";
import ChartModule from "./ChartModule";

export default {
  name: "ModuleSale",
  components: { ChartModule },
  data() {
    return {
      items: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 100,
      token: null,
      isLoading: true,
      start_date: new Date(),
      end_date: new Date(),
      month: moment().format("MMMM YYYY"),
      Saleseries: [{ data: [] }],
      chartOptionsSales: {},
      module: [],
      total_pendapatan: 0
    };
  },
  watch: {
    currentPage(val) {
      this._actionGet();
    }
  },
  methods: {
    _actionGetModuleSale() {
      this.$axios.get("monitoring-module").then(response => {
        const moduleCart = response.data.data;
        const ModuleName = moduleCart.map(r => r.name);
        const total = moduleCart.map(t => t.total);

        this.Saleseries[0].data = total;
        this.chartOptionsSales = {
          plotOptions: {
            bar: {
              horizontal: true
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: ModuleName
          }
        };
      });
    },
    _actionGet() {
      this.$axios
        .get(`report-module?page=${this.currentPage}&limit=${100}`, {
          headers: { "x-access-token": this.token }
        })
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data.rows;
            this.totalRows = response.data.data.count;
            this.total_pendapatan = response.data.total_pendapatan;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _actionSearch() {
      this.$axios
        .get(
          `report-module?from_date=${this.start_date}&to_date=${this.end_date}&page=${
            this.currentPage
          }&limit=${100}`,
          { headers: { "x-access-token": this.token } }
        )
        .then(response => {
          if (response.data.success === "true") {
            this.items = response.data.data.rows;
            this.totalRows = response.data.data.count;
            this.total_pendapatan = response.data.total_pendapatan;
          }
          this.isLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.isLoading = false;
        });
    },
    _formatTime(time) {
      let times;
      const now = moment();
      const data = moment(time);
      const hasil = data.isSame(now, "days");

      if (hasil) {
        times = moment(time).fromNow();
      } else {
        times = moment(time).format("DD-MM-YYYY hh:mm:ss a");
        // times = new Date(time).toLocaleString()
      }

      return times;
    },
    _formatDate(time) {
      return moment(time).format("DD-MM-YYYY hh:mm:ss a");
    },
    _actionGetDetail(item) {},
    _formatPrice(value) {
      const val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
      if (data.length < 1) {
        this.$swal({
          type: "error",
          text: "Item Untuk Di Rekap tidak ada",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000
        });
      } else {
        const Attributes = [
          "No",
          "User",
          "Module",
          "Publisher",
          "Order ID",
          "Price",
          "Voucher",
          "Voucher Value",
          "Pay Price",
          "Time"
        ];
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
          const DataUser = element.order;
          const Datamodule = element.module;
          const dataG = [
            ++n,
            DataUser.user ? DataUser.user.email : DataUser.user_id,
            Datamodule.name,
            Datamodule.publisher ? Datamodule.publisher.name : Datamodule.publisher_id,
            DataUser.id,
            element.price,
            DataUser.voucher,
            DataUser.code_voucher,
            DataUser.total_payment,
            this._formatDate(DataUser.updatedAt)
          ];

          ParseData.push(dataG);
        });

        const ws = xlsx.utils.aoa_to_sheet(ParseData);
        ws["!cols"] = wscols;
        const name = "Modulesale";
        xlsx.utils.book_append_sheet(wb, ws, "REKAP Module");
        /* generate file and send to client */
        xlsx.writeFile(wb, `rekap_${name}.xlsx`);
      }
    }
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this._actionGet();
    this._actionGetModuleSale();
  }
};
</script>
