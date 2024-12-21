import { motion } from "framer-motion";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { useState } from "react";
import "./App.css";

const App = () => {
	const [weatherData, setWeatherData] = useState(null);
	const apiKey = import.meta.env.VITE_API_KEY;
	const fetchWeather = async (location) => {
		try {
			const response = await axios.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
			);
			console.log(response.data);
			const data = response.data;
			setWeatherData({
				temp: Math.round(data.main.temp),
				feels: Math.round(data.main.feels_like),
				pressure: data.main.pressure,
				humidity: data.main.humidity,
				cloudiness: data.clouds.all,
				windSpeed: data.wind.speed,
				name: data.weather[0].description,
			});
			console.log(weatherData);
		} catch (error) {
			console.error(error);
		}
	};

	const cardVariants = {
		hidden: { opacity: 0, y: 25 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
		exit: { opacity: 0, y: -25, transition: { duration: 0.5 } },
	};

	return (
		<>
			<SearchBar fetchWeather={fetchWeather} />
			{weatherData && (
				<motion.div
					variants={cardVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<WeatherCard weatherData={weatherData} />
				</motion.div>
			)}
			{weatherData == null && (
				<motion.div
					variants={cardVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
				>
					<span id="meteor">
						{" "}
						&ldquo; the weather forecast for today is cloudy with a chance of
						meatballs &rdquo;
					</span>
				</motion.div>
			)}
		</>
	);
};

export default App;
