import React, { useContext, useState, useEffect } from "react";
import HomeContext from "../../Contexts/HomeContext";
import DataContext from "../../Contexts/DataContext";
import sizes from "../../data/sizes";

const CreateH = () => {
  const [size, setSize] = useState("");
  const [comment, setComment] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [photoPrint, setPhotoPrint] = useState("");

  const { setOrder, setModalData, modalData } = useContext(HomeContext);
  const { currentUser } = useContext(DataContext);

  const handleOrder = () => {
    setOrder({
      size,
      comment,
      clothe_id: modalData.id,
      user_id: currentUser[0].id,
      status: 0,
    });
    setModalData(null);
  };

  useEffect(() => {
    if (modalData === null) {
      return;
    }
    setType(modalData.type);
    setColor(modalData.color);
    setPrice(modalData.price);
    setPhotoPrint(modalData.image);
  }, [modalData]);

  if (modalData === null) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Buy This Item</h5>
            <button
              onClick={() => setModalData(null)}
              type="button"
              className="btn-close"
            ></button>
          </div>
          <div className="card m-4">
            <div className="card-body">
              <div className="mb-3">
                <h3>Type</h3>
                <div>{type}</div>
              </div>
              <div className="mb-3">
                <h4>Color</h4>
                <div>{color}</div>
              </div>
              <div className="mb-3">
                <h4>Price</h4>
                <div>{price} Eur</div>
              </div>

              <div className="mb-3">
                {photoPrint ? (
                  <div className="img-bin">
                    <img src={photoPrint} alt="upload"></img>
                  </div>
                ) : null}
              </div>
              <div className="mb-3 size-select">
                <label className="form-label">Size</label>
                <select value={size} onChange={(e) => setSize(e.target.value)}>
                  {sizes.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <input
                  type="text"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                onClick={handleOrder}
                type="button"
                className="btn btn-outline-success"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateH;
