import React, { useContext } from "react";
import OrdersContext from "../../Contexts/OrdersContext";
import LineO from "./LineO";

const ListO = () => {
  const { orders } = useContext(OrdersContext);

  return (
    <div className="card m-4">
      <h5 className="card-header">Orders List</h5>

      <ul className="list-group">
        {orders?.map((o) => (
          <LineO key={o[1][0].id} order={o} />
        ))}
      </ul>
    </div>
  );
};

export default ListO;
