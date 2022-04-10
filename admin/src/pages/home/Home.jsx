import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function Home() {
  
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        // data={userData}
        title="Music analytics"
        grid
        dataKey="Active Music"
      />
      <Chart
        // data={userData1}
        title="Genre analytics"
        grid
        dataKey="Active Genre"
      />
      <Chart
        // data={userData2}
        title="Album analytics"
        grid
        dataKey="Active Album"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
