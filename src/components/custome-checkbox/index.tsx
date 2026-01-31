import { Checkbox, Box } from "@mui/material";
import { checkedIcon, uncheckedIcon } from "../../assets";

const CustomCheckbox = ({ onChange, name, ...props }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <Checkbox
      disableRipple
      name={name}
      onChange={handleChange}
      icon={<img src={uncheckedIcon} />}
      checkedIcon={<img src={checkedIcon} />}
      {...props}
    />
  );
};

export default CustomCheckbox;
