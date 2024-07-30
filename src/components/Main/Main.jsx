import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
// import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherData?.temp?.[CurrentTemperatureUnit] || 999;

  const handleDeleteCard = (id) => {
    console.log(`Delete card with id: ${id}`);
  };

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems &&
            clothingItems
              .filter((item) => item.weather === weatherData.type)
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                    onDelete={handleDeleteCard}
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
