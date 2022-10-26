import React, { useState, useContext, useEffect, useRef } from "react";
import getBase64 from "../../Functions/getBase64";
import ClothesContext from "../../Contexts/ClothesContext";
import DataContext from "../../Contexts/DataContext";

const EditC = () => {
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [photoPrint, setPhotoPrint] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(false);
  const fileInput = useRef();

  const { setEditData, setModalData, modalData } = useContext(ClothesContext);
  const { setMsg } = useContext(DataContext);

  const handlePhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        //tylim
      });
  };

  const editClothesItem = () => {
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
    }
    setEditData({
      id: modalData.id,
      type,
      color,
      price: parseFloat(price),
      deletePhoto: deletePhoto ? 1 : 0,
      image: photoPrint,
    });
    setModalData(null);
    setDeletePhoto(false);
  };

  useEffect(() => {
    if (modalData === null) {
      return;
    }
    setType(modalData.type);
    setColor(modalData.color);
    setPrice(modalData.price);
    setPhotoPrint(modalData.image);
    setDeletePhoto(false);
  }, [modalData]);

  if (modalData === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Clothes Item</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body"></div>
          <div className="card m-4">
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
                  <label htmlFor="image-delete">Delete image</label>
                  <input
                    id="image-delete"
                    type="checkbox"
                    checked={deletePhoto}
                    onChange={() => setDeletePhoto((d) => !d)}
                  ></input>
                  <img src={photoPrint} alt="upload"></img>
                </div>
              ) : null}
              <button
                onClick={editClothesItem}
                type="button"
                className="btn btn-outline-success"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditC;
