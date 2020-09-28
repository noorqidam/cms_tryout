<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      chartOptionsSales: {},
      Saleseries: [{ data: [] }],
      attrs: [
        {
          key: "today",
          highlight: true,
          placement: "Hello",
          popover: {
            label: "You just hovered over today's date!"
          },
          dates: new Date()
        }
      ]
    };
  },
  methods: {
    actionGetCartBanksoal() {
      this.Saleseries[0].data = [1100, 500, 1020, 300];
      this.chartOptionsSales = {
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ["MATEMATIKA", "BAHASA INDONESIA", "BAHASA INGGRIS", "STATISTIKA"]
        }
      };
    },
    actionGetMatple() {
      this.$axios
        .get("group/matapelajaran", { headers: { "x-access-token": this.token } })
        .then(response => {
          if (response.data.success === "true") {
            const Data = response.data.data;
            const total = Data.map(t => t.count);
            total.sort((a, b) => b - a);

            this.Saleseries[0].data = total;
            // eslint-disable-next-line no-underscore-dangle
            const matple = Data.map(m => m._id);
            this.chartOptionsSales = {
              plotOptions: {
                bar: {
                  barHeight: "100%",
                  distributed: true,
                  horizontal: true,
                  dataLabels: {
                    position: "bottom"
                  }
                }
              },
              dataLabels: { enabled: true },
              xaxis: { categories: matple },
              yaxis: {
                labels: {
                  show: true,
                  align: "left"
                }
              },
              title: {
                text: "Data Bank Soal Edutore",
                align: "center",
                floating: true
              }
            };
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.actionGetMatple();
  }
};
</script>
