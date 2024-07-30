import "./ClothesSection.css";
import ItemCard from "../components/ItemCard/ItemCard";
import React from "react";
//import { defaultClothingItems } from "../utils/constants";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__text-container">
        <p className="clothes-section__your-items">Your items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-button"
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__cards-list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
