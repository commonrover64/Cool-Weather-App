import React from "react";
import "../App.css";
import Scene from "../components/Scenes/Scene";
import WeatherForm from "../components/WeatherUI/WeatherForm";


function Home() {
  return (
    <>
      <Scene />
      <WeatherForm />
    </>
  );
}

export default Home;
