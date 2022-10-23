import React, { useContext, useEffect, useState } from "react";
import HomeContext from "../../Contexts/HomeContext";
import LineH from "./LineH";

const sortData = [
  { v: "default", t: "Default" },
  { v: "price_asc", t: "Price 1-9" },
  { v: "price_desc", t: "Price 9-1" },
];

const ListH = () => {
  const [sortBy, setSortBy] = useState("default");

  const { clothes, setClothes, filterOn, filterWhat } = useContext(HomeContext);

  const resetFilter = () => {
    setClothes((prevClothes) => prevClothes.map((c) => ({ ...c, show: true })));
    filterOn.current = false;
    filterWhat.current = null;
  };

  useEffect(() => {
    switch (sortBy) {
      case "price_asc":
        setClothes((c) => [...c].sort((a, b) => a.price - b.price));
        break;
      case "price_desc":
        setClothes((c) => [...c].sort((b, a) => a.price - b.price));
        break;
      default:
        setClothes((c) => [...(c ?? [])].sort((a, b) => a.row - b.row));
    }
  }, [sortBy, setClothes]);

  return (
    <>
      <div className="card m-4">
        <h5 className="card-header">Sort</h5>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortData.map((c) => (
                <option key={c.v} value={c.v}>
                  {c.t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="card m-4">
        <h5 className="card-header">Clothes List</h5>
        <div className="card-small-info">
          <small> Click on item title or color to filter </small>
          <small onClick={resetFilter} className="click-link">
            (show all clothes)
          </small>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {clothes?.map((c) =>
              c.show ? <LineH key={c.id} clothe={c} /> : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ListH;
