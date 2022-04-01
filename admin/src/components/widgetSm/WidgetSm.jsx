import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Add</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://th.bing.com/th/id/R.146c57bc85e9bece71e005318f86fcc4?rik=38bJArAx3B%2fvLg&pid=ImgRaw&r=0"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anime</span>
            <span className="widgetSmUserTitle">Genre</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://ncstore.net/wp-content/uploads/2020/06/pop-la-the-loai-nhac-duong-dai-co-mat-tu-rat-lau-doi.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Pop</span>
            <span className="widgetSmUserTitle">Genre</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.scdn.co/image/ab67616d0000b273e9beab61827fb8dca6384159"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Moon and you</span>
            <span className="widgetSmUserTitle">Song</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://vietnamjazz.files.wordpress.com/2013/08/cover.jpg?w=300&h=300"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Jazzy Dạ Lam</span>
            <span className="widgetSmUserTitle">Album</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://th.bing.com/th/id/R.d1690e749ad745330cccc4d5cc0fc8cc?rik=Qwh5lfFqxdKOSA&pid=ImgRaw&r=0 "
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">U</span>
            <span className="widgetSmUserTitle">Song</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
