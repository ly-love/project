import React, { memo } from "react";
import styles from "./SelectMajor.module.scss";
import { Select } from "antd";
import { majorOptions } from "../../utils/chatData";
import { changeMarjor } from "../../redux/settingsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface SelectMajorProps {
  id: string;
}

const SelectMajor: React.FC<SelectMajorProps> = ({ id = "all_major" }) => {
  // console.log("SelectMajor");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMajor = (value: string) => {
    dispatch(changeMarjor(value));
    navigate(`/chat/${value}`);
  };

  return (
    <div className={styles.selectMajor}>
      <div className="chatContent center">
        <Select
          className={styles.select}
          defaultValue={id}
          options={majorOptions}
          onChange={handleMajor}
        />
      </div>
    </div>
  );
};

export default memo(SelectMajor);
