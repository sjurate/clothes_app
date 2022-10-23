import React, { useContext } from "react";
import ClothesContext from "../../Contexts/ClothesContext";

const LineC = ({ clothe }) => {
  const { setDeleteData, setModalData } = useContext(ClothesContext);

  return (
    <li className="list-group-item">
      <div className="line">
        <div className="line__content">
          <div className="line__content__image">
            {clothe.image ? (
              <div className="img-bin">
                <img src={clothe.image} alt={clothe.type}></img>
              </div>
            ) : (
              <span className="red-image">No image</span>
            )}
          </div>
          <div className="line__content__info">
            <h3 className="line__content__title">{clothe.type}</h3>
            <div className="line__content__color">Color: {clothe.color}</div>
            <div className="line__content__price">
              Price: {clothe.price} Eur
            </div>
            {/* <div className="line__content__rating">
              <div>Rating: {movie.rating ?? "No rating"}</div>

              <select
                value={rate}
                onChange={(event) => setRate(event.target.value)}
              >
                {[...Array(10)].map((_, i) => (
                  <option value={i + 1} key={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div> */}
            <div className="home__buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setModalData(clothe)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setDeleteData(clothe)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineC;
