import React, { useState, useRef, useContext } from "react";
import ClothesContext from "../../Contexts/ClothesContext";
import DataContext from "../../Contexts/DataContext";
import getBase64 from "../../Functions/getBase64";

const CreateC = () => {
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const fileInput = useRef();

  const { setCreateData } = useContext(ClothesContext);
  const { setMsg } = useContext(DataContext);

  const handlePhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        //tylim
      });
  };

  const addClothesItem = () => {
    if (type.length === 0 || type.length > 50) {
      setMsg("Invalid title");
      return;
    }
    if (price.replace(/[^\d.]/, "") !== price || price.length === 0) {
      setMsg("Invalid price");
      return;
    }
    if (color.length === 0) {
      setMsg("Must enter a color");
      return;
    }
    if (parseFloat(price) > 99.99) {
      setMsg("Max price is 99.99 Eur");
      return;
    } else {
      setCreateData({
        type,
        color,
        price: parseFloat(price),
        image: photoPrint,
      });
      setType("");
      setColor("");
      setPrice("");
      setPhotoPrint(null);
      fileInput.current.value = null;
    }
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Clothes Item</h5>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Type</label>
          <input
            type="text"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Color</label>
          <input
            type="text"
            className="form-control"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            ref={fileInput}
            type="file"
            className="form-control"
            onChange={handlePhoto}
          />
        </div>
        {photoPrint ? (
          <div className="img-bin">
            <img src={photoPrint} alt="upload"></img>
          </div>
        ) : null}
        <button
          onClick={addClothesItem}
          type="button"
          className="btn btn-outline-success"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CreateC;
