import React from 'react';
import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

const Add = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    //add new item
    // mutation.mutate();
    props.setOpen(false);
  };
  
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} />
              </div>
            ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
