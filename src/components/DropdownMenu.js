import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import styles from "../styles/DropDownMenu.module.css";

const DropdownMenu = ({ handleEdit, handleDelete }) => {
  return (
    <div className={styles.dropdownMenu}>
      <ul>
        <li>
          <FaPen onClick={handleEdit} />
        </li>
        <li>
          <FaTrashCan className="text-danger" onClick={handleDelete} />
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
