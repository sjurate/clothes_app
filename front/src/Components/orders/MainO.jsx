import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import OrdersContext from "../../Contexts/OrdersContext";
import ListO from "./ListO";
import { authConfig } from "../../Functions/auth";
import DataContext from "../../Contexts/DataContext";

const MainO = () => {
  const [orders, setOrders] = useState(null);
  const [order, setOrder] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const { setShowLinks } = useContext(DataContext);

  const reList = (data) => {
    const d = new Map();
    data.forEach((line) => {
      if (d.has(line.id)) {
        d.set(line.id, [...d.get(line.id), line]);
      } else {
        d.set(line.id, [line]);
      }
    });
    return [...d];
  };

  // READ for list with orders

  useEffect(() => {
    axios.get("http://localhost:3003/home/orders", authConfig()).then((res) => {
      setOrders(reList(res.data));
    });
  }, [lastUpdate]);

  // UPDATE AN ORDER - APPROVE

  useEffect(() => {
    if (order === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/server/orders/" + order.id,
        order,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [order]);

  // DELETE AN ORDER (for admin)

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/server/orders/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <OrdersContext.Provider
      value={{
        setOrder,
        orders,
        setDeleteData,
      }}
    >
      <div className="container" onClick={() => setShowLinks(false)}>
        <div className="row">
          <div className="col col-lg-10 col-md-12 col-sm-12">
            <ListO />
          </div>
        </div>
      </div>
    </OrdersContext.Provider>
  );
};

export default MainO;
