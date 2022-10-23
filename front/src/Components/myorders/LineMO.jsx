import React from "react";

const LineMO = ({ order }) => {
  console.log(order);

  return (
    order.length > 0 && (
      <li className="list-group-item">
        <div className="orders">
          <ul className="list-group">
            {order[1]?.map((o) =>
              o.id !== null ? (
                <li key={o.id} className="list-group-item">
                  <h3>{o.type}</h3>
                  <div>Order # {o.id}</div>
                  <div className="order-details">
                    <div>Color: {o.color}</div>
                    <div>Size: {o.size}</div>
                    <div>Comment: {o.comment}</div>
                  </div>

                  <div className="order-status">
                    {o.status === 0 ? (
                      <div>Unaproved</div>
                    ) : (
                      <div style={{ color: "green" }}>Approved</div>
                    )}
                  </div>
                  <div>Price: {o.price} Eur</div>
                </li>
              ) : null
            )}
          </ul>
        </div>
      </li>
    )
  );
};

export default LineMO;
