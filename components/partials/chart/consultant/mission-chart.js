import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import useDarkMode from "@/hooks/useDarkMode";
import { getMonth } from "date-fns";

const MissionChart = ({ data, height = 350 }) => {
  const [isDark] = useDarkMode();

  let datesArray = Array.from({ length: 12 }, (_) => 0);
  data.map((item, _) => {
    const monthIndex = getMonth(new Date(item.createdAt));
    datesArray[monthIndex] = new Date(item?.createdAt).getDate();
  });
  const series = [
    {
      name: "créé le jour",
      data: datesArray,
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

  return (
    <div>
      {/* {
options &&
    } */}
      <Chart
        options={options}
        series={series}
        type="area"
        width={"100%"}
        height={height}
      />
    </div>
  );
};

export default MissionChart;
