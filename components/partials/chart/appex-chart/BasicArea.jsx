import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import useDarkMode from "@/hooks/useDarkMode";

const BasicArea = ({ height = 350 }) => {
  const [isDark] = useDarkMode();
  const series = [
    {
      data: [90, 70, 85, 60, 80, 70, 90, 75, 60, 80],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    colors: ["#EAE3D5"],
    tooltip: {
      theme: "dark",
    },
    grid: {
      show: true,
      borderColor: isDark ? "#334155" : "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    fill: {
      type: "gradient",
      colors: "#EAE3D5",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.5,
        stops: [50, 100, 0],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? "#C2C2C2" : "#C2C2C2",
          fontFamily: "Inter",
        },
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: isDark ? "#C2C2C2" : "#C2C2C2",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  };
  console.log("Options:", options);
console.log("Series:", series);
  return (
    <div>
    {/* {
options &&
    } */}
      <Chart options={options} series={series} type="area"  width={"100%"} height={height} />
    </div>
  );
};

export default BasicArea;
