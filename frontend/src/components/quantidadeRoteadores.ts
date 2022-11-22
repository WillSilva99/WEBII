import { defineComponent, ref, h, onMounted, PropType } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  Plugin,
  ChartData,
  LinearScale
} from "chart.js";
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

var roteadores = [];
var tplink = 0;
var intelbras = 0;
var multilaser = 0;
var datacom = 0;
var huawei = 0;
var outros = 0;

export default defineComponent({
  name: "QuantidadeRoteadores",
  components: {
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: "Bar-chart",
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {},
    },
    plugins: {
      type: Array as PropType<Plugin<"bar">[]>,
      default: () => [],
    },
  },
  setup(props) {
    const chartData = ref<ChartData<"bar">>({
      datasets: [],
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    function fillData() {
      const updatedChartData = {
        labels: ["TPLINK", "HUAWEI", "DATACOM", "MULTILASER", "INTELBRAS", "OUTROS"],
        datasets: [
          {
            label: "Roteadores",
            backgroundColor: ["#2b4c7e", "#567ebb", "#469ebb", "#395ebb", "#606d80", "#dce0e6"],
            data: [tplink, huawei, datacom, multilaser, intelbras, outros],
          },
        ],
      };

      chartData.value = { ...updatedChartData };
    }

    async function pegaRoteadores() {
      await axios
        .get("https://api.gerrot.star.psi.br/api/")
        .then((res) => {
          roteadores = res.data;
          for (var x = 0; x < roteadores.length; x++) {
            var modelo = roteadores[x].modelo;
            switch (modelo) {
              case "tplink": {
                tplink += 1;
                break;
              }
              case "huawei": {
                huawei += 1;
                break;
              }
              case "datacom": {
                datacom += 1;
                break;
              }
              case "multilaser": {
                multilaser += 1;
                break;
              }
              case "intelbras": {
                intelbras += 1;
                break;
              }
              default: {
                outros += 1;
              }
            }
          }
        })
        .catch((error) => {
          console.log(error, "puts");
        });
    }

    onMounted(() => {
      tplink = 0;
      datacom = 0;
      huawei = 0;
      multilaser = 0;
      intelbras = 0;
      outros = 0;
      pegaRoteadores();
      setTimeout(() => {
        fillData();
      }, 1000);
    });

    return () =>
      h(Bar, {
        chartData: chartData.value,
        chartOptions,
        chartId: props.chartId,
        width: props.width,
        height: props.height,
        cssClasses: props.cssClasses,
        styles: props.styles,
        plugins: props.plugins,
      });
  },
});
