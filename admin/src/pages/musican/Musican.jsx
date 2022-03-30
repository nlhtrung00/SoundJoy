import { InfoOutlined, PersonAdd, Publish } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./musican.css";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Musician</h1>
        <Link to="/newMusican">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://th.bing.com/th/id/R.b57b987700f339771b30d533ada205d7?rik=XPf5Qbzq2JI3eQ&pid=ImgRaw&r=0  "
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Tailor Swift</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Musician Details</span>
            <div className="userShowInfo">
              <InfoOutlined className="userShowIcon" />
              <href className="userShowInfoTitle">
                https://en.wikipedia.org/wiki/Taylor_Swift
              </href>
            </div>
            <div className="userShowInfo">
              <PersonAdd className="userShowIcon" />
              <span className="userShowInfoTitle">560</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Tailor Swift"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Information</label>
                <input
                  type="link"
                  placeholder="https://en.wikipedia.org/wiki/Taylor_Swift"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Followers</label>
                <input
                  type="text"
                  placeholder="560"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
