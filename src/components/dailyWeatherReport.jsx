import React, { Component } from 'react';
import TableView from "./tableView"
import { LineChart } from 'react-chartkick';
import 'chart.js'
import MoreInfo from './moreInfo';
class DailyWeatherReport extends Component {

    constructor() {
        super()
        this.state = {
            isMoreInfo: false,
            weeklyData: {}
        }
    }
    async componentDidMount() {

    }
    getCelcius = (temp) => {
        return Math.floor(temp - 273.15)
    }
    getDate = (time) => {
        let dt = new Date(time)
    }
    render() {
        if (this.state.isMoreInfo) {
            return <MoreInfo {...this.props} />
        }
        return (
            <React.Fragment>
                <div className="container">
                    <div className="cards">
                        <h3> City : {this.props.city}, {this.props.country} </h3>
                        {getIcon(this.props.id)}
                        <h1 className="py-2">{this.getCelcius(this.props.temp)}&deg; </h1>
                        {minmaxTemp(this.getCelcius(this.props.temp_min), this.getCelcius(this.props.temp_max))}
                        <h4 className="py-3"> {this.props.description}</h4>
                    </div>
                    <button className="btn btn-primary" onClick={() => {
                        this.setState({ isMoreInfo: true })
                    }}>More</button>
                    <button className="btn btn-primary ml-2" onClick={() => {
                        this.setState({ isMoreInfo: true })
                    }}>Graph view</button>
                </div>
                <div style={{ maxWidth: "400px", margin: "auto", marginTop: "42px" }}>
                    <LineChart data={[{ "name": "Minimum Temp", "data": { ...this.props.weeklyMinTempData } },
                    { "name": "Minimum Temp", "data": { ...this.props.weeklyMaxTempData } }]} />
                </div>
                <div style={{ maxWidth: "400px", margin: "auto", marginTop: "42px" }}>
                    {this.props.weeklyMinMaxTempData && <TableView data={this.props.weeklyMinMaxTempData} />}
                </div>
            </React.Fragment >
        );
    }
}

export default DailyWeatherReport;

function minmaxTemp(min, max) {
    return (
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>
    )
}

function getIcon(id) {
    switch (true) {
        case id >= 200 && id <= 232:
            return <img src="http://openweathermap.org/img/wn/11d@4x.png" />
            break;
        case id >= 500 && id <= 531:
            return <img src="http://openweathermap.org/img/wn/09d@4x.png" />
            break;
        case id >= 600 && id <= 622:
            return <img src="http://openweathermap.org/img/wn/10d@4x.png" />
            break;
        case id >= 801 && id <= 804:
            return <img src="http://openweathermap.org/img/wn/02d@4x.png" />
            break;
        default:
            return <img src="http://openweathermap.org/img/wn/01d@4x.png" />
    }
}