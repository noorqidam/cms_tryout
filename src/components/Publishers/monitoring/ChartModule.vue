<script>
import { Bar, Pie } from "vue-chartjs";

export default {
  extends: Pie,
  data() {
    return {
      module: []
    };
  },
  methods: {
    _actionGetModuleSale() {
      this.$axios.get("monitoring-module").then(response => {
        this.module = response.data.data;
        // console.log(this.module)
      });
    }
  },
  mounted() {
    // Overwriting base render method with actual data.

    // console.log('Ini  name' +Name)
    setTimeout(() => {
      const Name = this.module.map(r => {
        console.log(`ini name in maps ${r.name}`);
        const { name } = r;
        return name; // .substring(0,30);
      });
      const total = this.module.map(t => t.total);
      this.renderChart(
        {
          labels: Name,
          datasets: [
            {
              label: Name,
              data: total,
              backgroundColor: [
                "rgba(52, 134, 235)",
                "rgba(91, 207, 137)",
                "rgba(237, 56, 28)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(52, 134, 235)",
                "rgba(91, 207, 137)",
                "rgba(237, 56, 28)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
            // {
            //   label: '# Module Sale',
            //   type: 'line',
            //   data: [12, 19, 3],
            //   backgroundColor: [
            //       'rgba(255, 99, 132, 0.2)',
            //       'rgba(54, 162, 235, 0.2)',
            //       'rgba(255, 206, 86, 0.2)',
            //       'rgba(75, 192, 192, 0.2)',
            //       'rgba(153, 102, 255, 0.2)',
            //       'rgba(255, 159, 64, 0.2)'
            //   ],
            //   borderColor: [
            //       'rgba(255, 99, 132, 1)',
            //       'rgba(54, 162, 235, 1)',
            //       'rgba(255, 206, 86, 1)',
            //       'rgba(75, 192, 192, 1)',
            //       'rgba(153, 102, 255, 1)',
            //       'rgba(255, 159, 64, 1)'
            //   ],
            //   borderWidth: 1
            // }
          ],
          options: {
            scales: {
              yAxes: [
                {
                  stacked: false
                }
              ],
              xAxes: [
                {
                  stacked: true
                }
              ]
            }
          }
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }, 2000);
  },
  created() {
    this._actionGetModuleSale();
  }
};
</script>
