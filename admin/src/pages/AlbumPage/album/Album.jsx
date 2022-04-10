import { Link } from "react-router-dom";
import "./album.css";
import Chart from "../../../components/chart/Chart";
import { Publish } from "@material-ui/icons";

export default function AlbumDetail() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Album</h1>
        <Link to="/newalbum">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={''}
            dataKey="Albums"
            title="Albums Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src="https://th.bing.com/th/id/R.6672968bef6fa180e3cad0b545a978a3?rik=41UYwN8b6ZM%2faA&pid=ImgRaw&r=0"
              alt=""
              className="productInfoImg"
            />
            <span className="productName">Red (Tailor's version)</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">1</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Amount songa:</span>
              <span className="productInfoValue">3</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Like:</span>
              <span className="productInfoValue">20</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Official date:</span>
              <span className="productInfoValue">12/11/2021</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">Pop, rock</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">active:</span>
              <span className="productInfoValue">yes</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Album name</label>
            <input type="text" placeholder="Red (Tailor's version)" />
            <label>Amount songs</label>
            <input type="text" placeholder="3" />
            <label>Like</label>
            <input type="text" placeholder="20" />
            <label>Official date</label>
            <input type="text" placeholder="12/11/2011" />
            <label>Genre</label>
            <input type="text" placeholder="pop, rock" />
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://th.bing.com/th/id/R.6672968bef6fa180e3cad0b545a978a3?rik=41UYwN8b6ZM%2faA&pid=ImgRaw&r=0"
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
