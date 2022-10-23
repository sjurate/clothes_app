import React, { useContext } from "react";
import ClothesContext from "../../Contexts/ClothesContext";
import LineC from "./LineC";

const ListC = () => {
  const { clothes } = useContext(ClothesContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Clothes List</h5>
      <div className="card-body">
        <ul className="list-group">
          {clothes?.map((c) => (
            <LineC key={c.id} clothe={c} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListC;
