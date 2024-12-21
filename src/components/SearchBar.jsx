import { useState } from "react";
import "./SearchBar.css";
import PropTypes from "prop-types";

const SearchBar = ({ fetchWeather }) => {
	const [city, setCity] = useState("");
	const [data, setData] = useState([]);

	const handleSearch = () => {
		if (city.trim() !== "") {
			fetchWeather(city);
			setData([]);
			console.log(city);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const fetchSuggestions = async (location) => {
		const apiKey = import.meta.env.VITE_API_KEY;
		const response = await fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`
		);
		const data = await response.json();
		console.log(data);
		setData(data);
	};

	return (
		<>
			<div className="wrapper">
				<div className="search">
					<input
						type="text"
						placeholder="Enter the location for weather"
						value={city}
						onChange={(e) => {
							setCity(e.target.value);
							city.length > 1 && fetchSuggestions(e.target.value);
							e.target.value.length < 1 && setData([]);
						}}
						onKeyDown={handleKeyDown}
					/>
					<i
						onClick={handleSearch}
						className="fa-solid fa-magnifying-glass"
					></i>
				</div>
				{data.length > 0 && (
					<div className="suggestions">
						{data.map((element, index) => (
							<div
								className="suggestion"
								key={index}
								onClick={() => {
									setCity(element.name);
									handleSearch();
									setData([]);
								}}
							>
								{element.name}, {element.country}
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

SearchBar.propTypes = {
	fetchWeather: PropTypes.func.isRequired,
};

export default SearchBar;
