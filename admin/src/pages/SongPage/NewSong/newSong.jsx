import "./newsong.css";

export default function newSong() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Moon and you" />
        </div>
        <div className="addProductItem">
          <label>Listens</label>
          <input type="text" placeholder="300" />
        </div>
        <div className="addProductItem">
          <label>Debut date</label>
          <input type="text" placeholder="2018" />
        </div>
        <div className="addProductItem">
          <label>Singers</label>
          <input type="text" placeholder="Jazzy Dạ Lam" />
        </div>
        <div className="addProductItem">
          <label>Musicans</label>
          <input type="text" placeholder="Classical music" />
        </div>
        <div className="addProductItem">
          <label>Album</label>
          <input type="text" placeholder="Jazzy Dạ Lam" />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Classical music" />
        </div>
        <div className="addProductItem">
          <label>Link</label>
          <input
            type="text"
            placeholder="https://zingmp3.vn/bai-hat/Moon-And-You-Jazzy-Da-Lam/ZW78ZEBZ.html"
          />
        </div>
        <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="addProductButton">Create</button>
      </form>
    </div>
  );
}
