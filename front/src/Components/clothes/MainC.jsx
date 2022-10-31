import React, { useState, useEffect } from "react";
import axios from "axios";
import ClothesContext from "../../Contexts/ClothesContext";
import CreateC from "./CreateC";
import ListC from "./ListC";
import EditC from "./EditC";
import { authConfig } from "../../Functions/auth";
import { useContext } from "react";
import DataContext from "../../Contexts/DataContext";

const MainC = () => {
  const [clothes, setClothes] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const { setShowLinks } = useContext(DataContext);

  // CREATE ITEM

  useEffect(() => {
    if (createData === null) {
      return;
    }
    axios
      .post("http://localhost:3003/server/clothes", createData, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // READ ITEMS

  useEffect(() => {
    axios
      .get("http://localhost:3003/server/clothes", authConfig())
      .then((res) => {
        setClothes(res.data);
      });
  }, [lastUpdate]);

  // UPDATE ITEM

  useEffect(() => {
    if (editData === null) {
      return;
    }
    axios
      .put(
        "http://localhost:3003/server/clothes/" + editData.id,
        editData,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [editData]);

  // DELETE ITEM

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    axios
      .delete(
        "http://localhost:3003/server/clothes/" + deleteData.id,
        authConfig()
      )
      .then((res) => {
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  return (
    <ClothesContext.Provider
      value={{
        setCreateData,
        clothes,
        setDeleteData,
        setEditData,
        editData,
        setModalData,
        modalData,
      }}
    >
      <div className="container" onClick={() => setShowLinks(false)}>
        <div className="row">
          <div className="col col-lg-4 col-md-12">
            <CreateC />
          </div>
          <div className="col col-lg-8 col-md-12 col-sm-12">
            <ListC />
          </div>
        </div>
      </div>
      <EditC />
    </ClothesContext.Provider>
  );
};

export default MainC;
