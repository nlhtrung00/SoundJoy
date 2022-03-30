import "./newAlbum.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Album</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Jazzy Dạ Lam" />
        </div>
        <div className="addProductItem">
          <label>Amount songs</label>
          <input type="text" placeholder="3" />
        </div>
        <div className="addProductItem">
          <label>Like</label>
          <input type="text" placeholder="30" />
        </div>
        <div className="addProductItem">
          <label>Official date</label>
          <input type="text" placeholder="2018" />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Classical music" />
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
