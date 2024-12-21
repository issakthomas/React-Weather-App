import PropTypes from "prop-types";
import "./WeatherCard.css";

const WeatherCard = ({ weatherData }) => (
	<>
		<div className="grid">
			<div className="card">
				<div className="main">
					{weatherData.temp}
					<span className="unit">c</span>
				</div>
				<div className="sub">{weatherData.name}</div>
			</div>
			<div className="card">
				<div className="main">
					{weatherData.humidity}
					<span className="unit">%</span>
				</div>
				<div className="sub">Humidity</div>
			</div>
			<div className="card">
				<div className="main">
					{weatherData.windSpeed}
					<span className="unit">m/s</span>
				</div>
				<div className="sub">Wind Speed</div>
			</div>
			<div className="card">
				<div className="main">
					{weatherData.feels}
					<span className="unit">c</span>
				</div>
				<div className="sub">Feels Like</div>
			</div>
			<div className="card">
				<div className="main">
					{weatherData.cloudiness}
					<span className="unit">%</span>
				</div>
				<div className="sub">Cloudiness</div>
			</div>
			<div className="card">
				<div className="main">
					{weatherData.pressure}
					<span className="unit">hpa</span>
				</div>
				<div className="sub">Pressure</div>
			</div>
		</div>
	</>
);

WeatherCard.propTypes = {
	weatherData: PropTypes.object.isRequired,
};

export default WeatherCard;
