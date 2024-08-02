import "./Profile.css";
import Sidebar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";

const Profile = ({
  handleCardClick,
  weatherData,
  handleAddClick,
  clothingItems,
}) => {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>

      <section className="profile__clothing-items">
        <ClothesSection
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
};

export default Profile;
