import "./listsongs.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function listSong() {
  const [data, setData] = {};

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="productList">
      
    </div>
  );
}
