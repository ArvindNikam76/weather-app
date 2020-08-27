import React from 'react';
import './App.css';
import http from "./services/httpService";
import DailyWeatherReport from "./components/dailyWeatherReport";

const API_KEY = "f4ef851a6555a81863dba178a852fc80";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      wind: undefined,
      temp: undefined,
      temp_max: undefined,
      temp_min: undefined,
      humidity: undefined,
      pressure: undefined,
      sunrise: undefined,
      sunset: undefined,
      city: undefined,
      weeklyReport: undefined
    }

    this.getWeatherReport();
    this.getWeeklyReport();

  }
  async getWeatherReport() {
    const weatherReport = await http.getDailyWeatherReport('Pune');
    const { wind, name: city } = weatherReport.data;
    const { temp, temp_max, temp_min, humidity, pressure } = weatherReport.data.main
    const { sunrise, sunset, country } = weatherReport.data.sys;
    const { description, id } = weatherReport.data.weather[0];
    this.setState({ description, id, city, country, wind, temp, temp_max, temp_min, humidity, pressure, sunrise, sunset })
  }

  async getWeeklyReport() {
    const weeklyReport = await http.getWeeklyWeatherReport('Pune');
    const weeklyMaxTempData = weeklyReport.daily.reduce((acc, item) => {
      var d = new Date(0);
      d.setUTCSeconds(item.dt);
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      let temp_max = item.temp.max;
      acc[date] = temp_max;
      return acc;
    }, {})
    const weeklyMinTempData = weeklyReport.daily.reduce((acc, item) => {
      var d = new Date(0);
      d.setUTCSeconds(item.dt);
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      let temp_min = item.temp.min;
      acc[date] = temp_min;
      return acc;
    }, {})

    const weeklyMinMaxTempData = weeklyReport.daily.reduce((acc, item) => {
      var d = new Date(0);
      d.setUTCSeconds(item.dt);
      let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
      let temp_min = item.temp.min;
      let temp_max = item.temp.max;
      acc.push({
        date: date,
        max: temp_max,
        min: temp_min
      })
      return acc;
    }, [])
    this.setState({ weeklyMinTempData, weeklyMaxTempData, weeklyMinMaxTempData })

  }
  render() {
    return (
      <div className="App">
        <h1> Weather App </h1>
        <DailyWeatherReport {...this.state} />
      </div>
    );
  }
}

export default App;
