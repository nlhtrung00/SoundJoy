import { Link } from "react-router-dom";
import "./genre.css";
import Chart from "../../../components/chart/Chart";
import { Publish } from "@material-ui/icons";

export default function GenreDetail() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Genre</h1>
        <Link to="/newgenre">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={''}
            dataKey="Genres"
            title="Genres Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src="https://th.bing.com/th/id/R.cae08dd75af3169afec8452da8a43b89?rik=4A%2bS7q3nzYCWsA&pid=ImgRaw&r=0"
              alt=""
              className="productInfoImg"
            />
            <span className="productName">Rock music</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">1</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Genre Name</label>
            <input type="text" placeholder="Rock music" />
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://th.bing.com/th/id/R.cae08dd75af3169afec8452da8a43b89?rik=4A%2bS7q3nzYCWsA&pid=ImgRaw&r=0"
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
