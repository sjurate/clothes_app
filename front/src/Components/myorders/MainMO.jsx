import React, { useState, useEffect } from "react";
import axios from "axios";
import MyOrdersContext from "../../Contexts/MyOrdersContext";
import ListMO from "./ListMO";
import { authConfig } from "../../Functions/auth";

const MainMO = () => {
  const [myOrders, setMyOrders] = useState(null);

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
      setMyOrders(reList(res.data));
    });
  }, []);

  return (
    <MyOrdersContext.Provider
      value={{
        myOrders,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 col-md-12 col-sm-12">
            <ListMO />
          </div>
        </div>
      </div>
    </MyOrdersContext.Provider>
  );
};

export default MainMO;
