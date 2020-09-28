<template>
  <div class="row">
    <div class="col-md-12">
      <h3 class="text-center">Dashboard</h3>
    </div>
    <div class="col-md-12">
      <div class="card">
        <strong class="text-left p-2">Total Ujian {{ totalUjian }}</strong>
        <apexchart type="bar" height="400" :options="chartOption" :series="seriesUjian" />
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <strong class="text-left p-2">Total Bank Soal {{ totalBankSoal }}</strong>
        <apexchart type="donut" height="350" :options="options" :series="series" />
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <strong class="text-left p-2"> Ratting Peserta di Semua Ujian {{ ratting.length }}</strong>
        <div class="card-body">
          <table class="table table-bordered table-hover">
            <thead class="table-primary">
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Ujian</th>
                <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(peserta, no) in ratting" :key="peserta._id">
                <td style="width:5%">{{ ++no }}</td>
                <td>{{ peserta.email }}</td>
                <td>{{ peserta.ujian ? peserta.ujian.judul_ujian : null }}</td>
                <td>{{ peserta.nilai }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboarPublisher",
  data() {
    return {
      seriesUjian: [{ name: "", data: [] }],
      chartOption: {},
      options: {},
      series: [],
      totalBankSoal: 0,
      totalUjian: 0,
      totalQuiz: 0,
      token: null,
      ratting: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("session_token");
    this.actionGetBankSoal();
    this.actionGetCountUjian();
    this.actionGetRattingPeserta();
  },
  methods: {
    actionGetBankSoal() {
      this.$axios
        .get("/dashboard/banksoals-group-kelas-matpel", { headers: { "x-access-token": this.token } })
        .then(response => {
          let data = response.data.data;
          let dataMatpel = data.sort((a, b) => {
            if (a._id.sub_category_id) {
              a._id.sub_category_id > b._id.sub_category_id
                ? 1
                : b._id.sub_category_id > a._id.sub_category_id
                ? -1
                : 0;
            } else {
              a._id > b._id ? 1 : b._id > a._id ? -1 : 0;
            }
          });
          let matpel = dataMatpel.map(t => {
            console.log("ini t " + t._id.sub_category_id);
            if (t._id.sub_category_id == "undefined") {
              return t._id.matpel_id;
            } else {
              return t._id.matpel_id + " kelas " + t._id.sub_category_id;
            }
          });

          let total = data.map(t => {
            return t.count;
          });
          let sum = total.reduce(function(a, b) {
            return a + b;
          }, 0);
          this.totalBankSoal = sum;
          this.series = total;
          this.options = {
            labels: matpel,
            pie: {
              donut: {
                background: "transparent",
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: "22px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    color: "#000000",
                    offsetY: -10,
                    formatter: function(val) {
                      return val;
                    }
                  },
                  value: {
                    show: true,
                    fontSize: "16px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 400,
                    color: undefined,
                    offsetY: 16,
                    formatter: function(val) {
                      return val;
                    }
                  },
                  total: {
                    show: false,
                    showAlways: false,
                    label: "Total",
                    fontSize: "22px",
                    fontFamily: "Helvetica, Arial, sans-serif",
                    fontWeight: 600,
                    color: "#000000",
                    formatter: function(w) {
                      console.log(w.globals);
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0);
                    }
                  }
                }
              }
            },
            plotOptions: {
              pie: {
                expandOnClick: false
              }
            }
          };
          this.chartOption = {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            dataLabels: {
              enabled: true
            },
            xaxis: {
              categories: matpel
            }
          };
        });
    },
    actionGetCountUjian() {
      this.$axios.get("/dashboard/ujian", { headers: { "x-access-token": this.token } }).then(response => {
        let data = response.data.data;

        let total = data.map(t => {
          return t.count;
        });
        let categories = data.map(c => {
          if (c._id != "undefined") {
            return c._id;
          } else {
            return "Tidak di ketahui";
          }
        });
        let sum = total.reduce(function(a, b) {
          return a + b;
        }, 0);
        this.totalUjian = sum;
        this.seriesUjian[0].data = total;
        this.chartOption = {
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          dataLabels: {
            enabled: true
          },
          xaxis: {
            categories: categories
          }
        };
      });
    },
    actionGetRattingPeserta() {
      this.$axios
        .get("/dashboard/ratting-peserta", { headers: { "x-access-token": this.token } })
        .then(response => {
          this.ratting = response.data.data;
        });
    }
  }
};
</script>
