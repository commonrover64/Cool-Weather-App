const WeatherForm = () => {
  return (
    <form
      className="glass-container layer6"
      onSubmit={(e) => e.preventDefault()}
    >
      <span className="title">
        <b>Weather App</b>
      </span>

      <input
        type="text"
        className="searchBar"
        placeholder="Search City or Place"
      />

      <button className="searchBtn">Search</button>

      <h3 className="cityField"></h3>
      <h4 className="countryField"></h4>
      <p className="temperature"></p>
      <p className="weatherCondition"></p>
    </form>
  );
};

export default WeatherForm;
