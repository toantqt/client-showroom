import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function SelectCategory(props) {
  const classes = useStyles();

  const [defaultValue, setDefaultVaule] = useState({
    _id: "all",
    companyName: "Tất cả",
  });

  const handeChange = (event, value) => {
    if (value) {
      props.handleChange(value);
    } else {
      props.handleChange("");
    }
  };

  console.log(props);
  return (
    <Autocomplete
      id="country-select-demo"
      autoComplete={false}
      style={{ width: "100%", backgroundColor: "white" }}
      options={props?.data}
      defaultValue={defaultValue}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option?.companyName}
      renderOption={(option) => (
        <React.Fragment>{option?.companyName}</React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          defaultValue={defaultValue?.companyName}
          label="Chọn công ty"
        />
      )}
      onChange={handeChange}
    />
  );
}
