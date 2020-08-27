import axios from "axios";

export async function getDailyWeatherReport(city) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=f4ef851a6555a81863dba178a852fc80";
    return await axios.get(url);
}

export async function getWeeklyWeatherReport(city) {
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat=18.5196&lon=73.8553&appid=f4ef851a6555a81863dba178a852fc80";
    let promise = await axios.get(url);
    return promise.data;
}

export default {
    getDailyWeatherReport,
    getWeeklyWeatherReport
}