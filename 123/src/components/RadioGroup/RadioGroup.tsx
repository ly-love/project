import React, { memo } from "react";
import classNames from "classnames";
import { Radio } from "antd";
import styles from "./RadioGroup.module.scss";

interface RadioGroupProps {
  value: string;
  onChange: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ value = "pdf", onChange }) => {
  // console.log('RadioGroup')
  return (
    <div className={styles.radioGroup}>
      <Radio.Group
        onChange={onChange}
        buttonStyle="solid"
        className={classNames(styles.radio, "radio-group")}
        value={value}
      >
        <Radio.Button value="pdf" className={styles.pdfBtn}>
          PDF
        </Radio.Button>
        <Radio.Button value="graph" className={styles.graphBtn}>
          图谱显示
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};


export default memo(RadioGroup);
