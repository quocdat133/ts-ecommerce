import React from "react";
import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";

const onChange: CheckboxProps["onChange"] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

interface CheckboxComponentProps extends CheckboxProps {
  text: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  text,
  ...rest
}) => (
  <Checkbox onChange={onChange} {...rest}>
    {text}
  </Checkbox>
);

export default CheckboxComponent;
