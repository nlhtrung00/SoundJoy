import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Add</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://th.bing.com/th/id/R.05fa2d81b9cd840a409b0afec850cd44?rik=2go8%2fq4y4Vdk6g&riu=http%3a%2f%2fcdn.artwallpaperhi.com%2f3840x2160%2f20180610%2f5b1d91638f992.jpg&ehk=xr5pG%2f7Nt1pu5Gl25QP8CdcrjDBKrxE%2fMQerlbm%2fTfc%3d&risl=&pid=ImgRaw&r=0"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Rock</span>
            <span className="widgetSmUserTitle">Genre</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://yt3.ggpht.com/a-/AAuE7mALviOpQYyVwBtJVwZwlVZ_iZd7zgCCXfptCA=s900-mo-c-c0xffffffff-rj-k-no"
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
            src="https://th.bing.com/th/id/R.b3fd9dc7024233a0c670faa4702190d2?rik=OJf8Noo%2fFKzrvw&riu=http%3a%2f%2fwww.lovethispic.com%2fuploaded_images%2f350938-Ed-Sheeran-Holding-Guitar.jpg&ehk=qkB%2fOIuNFboCPmXFWBKg0ju1rAWLVVBAT2HIEBVAp1k%3d&risl=&pid=ImgRaw&r=0"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Ed Sheeran</span>
            <span className="widgetSmUserTitle">Deluxe</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://th.bing.com/th/id/R.33677309a7ebadab4824edc6b27a1744?rik=hJ7%2bxYtt%2fzqWeA&riu=http%3a%2f%2fwww.baltana.com%2ffiles%2fwallpapers-23%2fTaylor-Swift-Wallpaper-1920x1080-60539.jpg&ehk=dNNjfuruGsQ%2fgW2wSDGgEdPmDVr0absJ9jUifFSA6rw%3d&risl=&pid=ImgRaw&r=0"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Tailor Swift</span>
            <span className="widgetSmUserTitle">Tailor's Version</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.etsystatic.com/19762436/r/il/442704/3270587393/il_1140xN.3270587393_msfq.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Bad Habit</span>
            <span className="widgetSmUserTitle">Ed Sheeran</span>
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
