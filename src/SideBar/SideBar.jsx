import "./SideBar.css";
import avatar from "../assets/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="avatar" />
      <p className="sidebar__username">UserName</p>
    </div>
  );
}

export default Sidebar;