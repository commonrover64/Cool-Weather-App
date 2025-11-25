import WeatherComponents from "../WeatherComponents";
import Clouds from "./Clouds";
import OceanLayers from "./OceanLayers";
import SkyLayers from "./SkyLayers";
import Stars from "./Stars";
import SunMoon from "./SunAndMoon";


const Scene = () => {
  return (
    <div className="scene">
      <SkyLayers />
      <OceanLayers />
      <SunMoon />
      <Clouds />
      <WeatherComponents />
      <Stars />
    </div>
  );
};

export default Scene;
