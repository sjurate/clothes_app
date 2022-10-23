import React, { useContext, useState } from "react";
import { useEffect } from "react";
import MyOrdersContext from "../../Contexts/MyOrdersContext";
import LineMO from "./LineMO";

const ListMO = () => {
  const [total, setTotal] = useState(0);

  const { myOrders } = useContext(MyOrdersContext);

  useEffect(() => {
    myOrders?.forEach((item) => {
      setTotal((prevTotal) => prevTotal + item[1][0].price);
    });
  }, [myOrders]);

  return (
    <div className="card m-4">
      <h5 className="card-header">Orders List</h5>

      <ul className="list-group">
        {myOrders?.map((o) => (
          <LineMO key={o[1][0].id} order={o} />
        ))}
      </ul>
      <div className="card-footer">Total: {total} Eur</div>
    </div>
  );
};

export default ListMO;
