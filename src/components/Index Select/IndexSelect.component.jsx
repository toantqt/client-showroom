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

export default function SelectIndex(props) {
  console.log(props);
  const classes = useStyles();
  const [defaultValue, setDefaultValue] = useState({
    index: props?.index?.toString(),
  });
  const [select, setSelect] = useState([]);

  console.log(defaultValue);

  const handeChange = (event, value) => {
    if (value) {
      props.handleChange(value);
    } else {
      props.handleChange("");
    }
  };
  useEffect(() => {
    let data = [{ index: "1" }, { index: "2" }, { index: "3" }, { index: "4" }];
    setSelect(data);
  }, []);

  console.log(defaultValue);

  return (
    <Autocomplete
      id="country-select-demo"
      autoComplete={false}
      style={{ width: "100%", backgroundColor: "white" }}
      options={select}
      defaultValue={defaultValue}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.index}
      renderOption={(option) => <React.Fragment>{option.index}</React.Fragment>}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          defaultValue={defaultValue.index}
        />
      )}
      onChange={handeChange}
    />
  );
}
