import React, { useContext } from "react";
import OrdersContext from "../../Contexts/OrdersContext";

const LineO = ({ order }) => {
  const { setOrder, setDeleteData } = useContext(OrdersContext);

  const approve = (id) => {
    setOrder({
      id,
      status: 1,
    });
  };

  const remove = (id) => {
    setDeleteData({ id });
  };

  return (
    <li className="list-group-item">
      <ul className="orders">
        {order[1]?.map((o) =>
          o.oid !== null ? (
            <li key={o.id} className="list-group-item">
              <h3>Order # {o.id}</h3>
              <div>{o.type}</div>
              <div className="order-details">
                <div>{o.color}</div>
                <p>{o.size}</p>
                <p>{o.comment}</p>
              </div>
              <div className="order-status">
                {o.status === 0 ? (
                  <div>Unaproved</div>
                ) : (
                  <div style={{ color: "green" }}>Approved</div>
                )}
              </div>
              <div className="manage-order-btns">
                <button
                  onClick={() => approve(o.id)}
                  type="button"
                  className="btn btn-outline-success"
                >
                  Approve
                </button>
                <button
                  onClick={() => remove(o.id)}
                  type="button"
                  className="btn btn-outline-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ) : null
        )}
      </ul>
    </li>
  );
};

export default LineO;
