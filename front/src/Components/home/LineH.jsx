import React, { useContext } from "react";
import HomeContext from "../../Contexts/HomeContext";

const LineH = ({ clothe }) => {
  const { setModalData, filterWhat, filterOn, setClothes, clothes } =
    useContext(HomeContext);

  const filterByType = () => {
    filterOn.current = !filterOn.current;
    if (!filterOn.current) {
      setClothes((prevClothes) =>
        prevClothes.map((c) => ({ ...c, show: true }))
      );
      filterWhat.current = null;
    } else {
      setClothes((prevClothes) => [
        ...prevClothes.map((c) =>
          c.type === clothe.type ? { ...c, show: true } : { ...c, show: false }
        ),
      ]);
      console.log(clothes);
      filterWhat.current = clothe.type;
    }
  };

  const filterByColor = () => {
    if (!filterOn.current) {
      setClothes((prevClothes) =>
        prevClothes.map((c) => ({ ...c, show: true }))
      );
      filterWhat.current = null;
    } else {
      setClothes((prevMovies) =>
        prevMovies.map((c) =>
          c.color === clothe.color
            ? { ...c, show: true }
            : { ...c, show: false }
        )
      );
      filterWhat.current = clothe.color;
    }
    filterOn.current = !filterOn.current;
  };

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
              <span className="no-image">No image</span>
            )}
          </div>
          <div className="line__content__info">
            <h3
              className="line__content__title click-link"
              onClick={filterByType}
            >
              {clothe.type}
            </h3>
            <div
              className="line__content__color click-link"
              onClick={filterByColor}
            >
              Color: {clothe.color}
            </div>
            <div className="line__content__price">
              Price: {clothe.price} Eur
            </div>
            <div className="home__buttons">
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => setModalData(clothe)}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LineH;
