import React from "react";
import { Switch } from "antd";

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const SwitchComponent: React.FC = () => (
  <Switch defaultChecked onChange={onChange} />
);

export default SwitchComponent;
