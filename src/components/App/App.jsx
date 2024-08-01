import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
//
import "./App.css";
import "../Header/Header.css";
//
import { coordinates, APIkey } from "../../utils/constants";
import { getItems, deleteItem, addItem } from "../../utils/Api";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
//
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
//
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (values, onDone) => {
    return addItem(values)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeActiveModal();
        onDone();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    return deleteItem(id)
      .then(() => {
        const updatedClothingItems = clothingItems.filter(
          (item) => item._id !== id
        );
        setClothingItems(updatedClothingItems);
      })
      .catch((error) => {
        console.error("Error deleting this item", error);
      });
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  console.log(currentTemperatureUnit);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
      {activeModal === "add-garment" && (
        <AddItemModal
          handleCloseModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={onAddItem}
        />
      )}
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            placeholder="Name"
            id="name"
            type="text"
            className="modal__input"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            placeholder="Image URL"
            id="imageUrl"
            type="url"
            className="modal__input"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label_type_radio">
            {" "}
            <input
              name="radio"
              id="hot"
              type="radio"
              className="modal__radio-input"
            />
            Hot
          </label>
          <label htmlFor="warm" className="modal__label_type_radio">
            <input
              name="radio"
              id="warm"
              type="radio"
              className="modal__radio-input"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label_type_radio">
            <input
              name="radio"
              id="cold"
              type="radio"
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>{" "}
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
        handleDeleteItem={handleDeleteItem}
      />
    </div>
  );
}

export default App;
