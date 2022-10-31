import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyOrdersContext from "../../Contexts/MyOrdersContext";
import ListMO from "./ListMO";
import { authConfig } from "../../Functions/auth";
import DataContext from "../../Contexts/DataContext";

const MainMO = () => {
  const [myOrders, setMyOrders] = useState(null);

  const { currentUser, setShowLinks } = useContext(DataContext);
  const currentUserId = currentUser[0].id;

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
    axios
      .get("http://localhost:3003/home/orders/" + currentUserId, authConfig())
      .then((res) => {
        setMyOrders(reList(res.data));
      });
  }, [currentUserId]);

  return (
    <MyOrdersContext.Provider
      value={{
        myOrders,
      }}
    >
      <div className="container" onClick={() => setShowLinks(false)}>
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
