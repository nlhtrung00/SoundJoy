import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";

export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Song</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart
            data={productData}
            dataKey="Songs"
            title="Musics Performance"
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              src="https://th.bing.com/th/id/OIP.mHtdBgEje9N2ucTmdaIx0gHaHa?pid=ImgDet&w=400&h=400&rs=1"
              alt=""
              className="productInfoImg"
            />
            <span className="productName">All too well</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">1</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">listens:</span>
              <span className="productInfoValue">500</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">debut date: </span>
              <span className="productInfoValue">12/11/2011</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Singer</span>
              <span className="productInfoValue">Tailor Swift</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Musician</span>
              <span className="productInfoValue">Tailor Swift</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Genre: </span>
              <span className="productInfoValue">Rock, Pop</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Album</span>
              <span className="productInfoValue">Red</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder="All too well" />

            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src="https://th.bing.com/th/id/OIP.mHtdBgEje9N2ucTmdaIx0gHaHa?pid=ImgDet&w=400&h=400&rs=1"
                alt=""
                href="https://zingmp3.vn/bai-hat/Red-Taylor-s-Version-Taylor-Swift/ZUB8D7FI.html"
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
