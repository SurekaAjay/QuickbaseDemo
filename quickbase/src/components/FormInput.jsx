import { useState } from "react";
import { SELECT_TYPE } from "../constants/constants";
import { COUNTRY_CHOICE } from "../constants/constants";
import Choices from "./Choices";
import { ButtonFunc } from "./ButtonFunc";
import { Message } from "./Message";

import { FormInputWrapper, FormButtonWrapper } from "./FormInputStyle.js";
import {Alert} from 'reactstrap'

const FormInput = () => {
  const [country, setCountry] = useState(COUNTRY_CHOICE);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [labelVal, setLabelVal] = useState("");
  const [defaultVal, setDefaultVal] = useState();
  const [success, setSuccess] = useState();
  const [labelRequired, setLabelRequired] = useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [choiceMaxExceed, setChoiceMaxExceed] = useState(false);
  const [checked, setChecked] = useState(false);
  const [savedObject, setSavedObject] = useState({ required: checked });
  const [isSingleSelect, setSingleSelect] = useState(true);
  const [isDefaultDisabled, setIsDefaultDisabled] = useState(true);
  const [isInputValueExceeded, setInputValueExceeded] = useState(false);

//
  const onSortClick = (e) => {
    const selectedVal = e.target.value;
    let sortedVal;
    if (selectedVal === "Display choices in Alphbetical") {
      sortedVal = [...country].sort((a, b) =>
        a.value > b.value ? 1 : b.value > a.value ? -1 : 0
      );
    } else if (selectedVal === "Display choices in Descending") {
      sortedVal = [...country]
        .sort((a, b) => (a.value > b.value ? 1 : b.value > a.value ? -1 : 0))
        .reverse();
    }
    return setCountry(sortedVal);
  };

  const onInputChange = (e, type) => {
    let inputVal;
    if (type === "label") {
      inputVal = e.target.value;
      const inputvValueArray = inputVal.split('');
      console.log(inputvValueArray);
      if(inputvValueArray.length > 40){

        setInputValueExceeded(true);

      }
      setLabelVal(inputVal);
      setLabelRequired(true);
      setSavedObject({ ...savedObject, [type]: inputVal });
    } else if (type === "choices") {
      inputVal = e;
      if (e.length > 50) {
        return setChoiceMaxExceed(true);
      }
      if (typeof inputVal === "object") {
        setSelectedChoices(inputVal);
        setSavedObject({ ...savedObject, [type]: inputVal });
      } else {
        const arrayValSelectChoice = inputVal.map((val) =>
          typeof val === "object" ? val : { label: val.value, value: val.value }
        );
        const newValSelectChoice = new Set([
          // ...selectedChoices,
          ...arrayValSelectChoice,
        ]);
        setSelectedChoices([...newValSelectChoice]);
        const newValSavedObj = [...newValSelectChoice].map((val) => val.value);
        setSavedObject({ ...savedObject, [type]: [...newValSavedObj] });
      }
    } else if (type === "defaultVal" && e.target.value) {
      inputVal = e.target.value;
      
      if (inputVal !== defaultVal && inputVal !== "") {
        setDefaultVal(inputVal);
        setSavedObject({ ...savedObject, [type]: inputVal });
      }
    } else if ((type = "required")) {
      inputVal = e.target.checked;
      setChecked(inputVal);
      setSavedObject({ ...savedObject, [type]: inputVal });
    }
  };

  const handleMultiSelect = (e) => {
    if (e.target.value === "Single-select") {
      setIsDefaultDisabled(true);
      setSingleSelect(true);
    } else {
      setIsDefaultDisabled(false);
      setSingleSelect(false);
    }
  };

  const onSaveButtonClick = (e) => {
    if (!labelVal) {
      const messageVal = "*Label Field is required";
      setErrMessage(messageVal);
      setIsError(true);
      return setLabelRequired(false);
    }

    setIsError(false);
    setErrMessage("");
    setLabelRequired(true);
    let saveObj;
//if its array then it updates array of selected choices
    if (selectedChoices.length || selectedChoices.length === 0) {
      const newChoiceWithDefault = new Set([
        ...selectedChoices,
        { label: defaultVal, value: defaultVal },
      ]);
      setSelectedChoices([...newChoiceWithDefault]);
      const newValSavedObj = [...newChoiceWithDefault].map((val) => val.value);
      setSavedObject({ ...savedObject, choices: [...newValSavedObj] });
      saveObj = { ...savedObject, choices: [...newValSavedObj] };
    } else {
      setSavedObject({ ...savedObject, choices: selectedChoices.value });
      saveObj = { ...savedObject, choices: selectedChoices.value };
    }
    alert("Details saved successfully");

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        "cache-control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, Content-Type, Accept, Authorization, X-Request-With",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
        "Accept-Patch": "application/json",
      },
      body: JSON.stringify(saveObj),
    };
    fetch("http://www.mocky.io/v2/566061f21200008e3aabd919", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data, saveObj))
      .catch((err) => setSuccess(false));
      

  };

  const onRefreshButtonClick = (e) => {
    setCountry(COUNTRY_CHOICE);
    setSavedObject({});
    setSelectedChoices("");
    setLabelVal("");
    setChecked(false);
    setDefaultVal("");
  };

  return (
    <FormInputWrapper isInputValueExceeded={isInputValueExceeded}>
     {console.log(isInputValueExceeded)}
      <div className="title">Form Input</div>
       <form autoComplete="on">
        <div className="formField">
          <label htmlFor="type">Label*: </label>
          <input
            type="text"
            name="fname"
            className="labelInput"
            value={labelVal}
            placeholder="SALES REGION"
            onChange={(e) => onInputChange(e, "label")}
          />

          {!labelRequired ? (
            <Message messageVal={errMessage} isError={isError}></Message> //to use it for different components
          ) : (
            ""
          )}
        </div>
        <div className="formField">
          <label htmlFor="type">Type: </label>
          <select name="type" id="type" onChange={(e) => handleMultiSelect(e)}>
            {SELECT_TYPE.map((choice) => {  //map used to return. 
              return (
                <option value={choice} key={choice}>
                  {choice}
                </option>
              );
            })}
          </select>
          <input
            // key={Math.random()}
            className="checkStyle"
            type="checkbox"
            id="checkRequired"
            defaultChecked={checked}
            onChange={(e) => onInputChange(e, "required")}
          />
          A value is required
        </div>
        <div className="formField">
          <label htmlFor="defaultVal">Default Value: </label>
          <input
            type="text"
            name="county"
            value={defaultVal}
            disabled={isDefaultDisabled}
            onChange={(e) => onInputChange(e, "defaultVal")}
          />
        </div>
      </form>
      <Choices
        country={country}
        onClickSort={(event) => onSortClick(event)}
        onChange={(e) => onInputChange(e, "choices")}
        selectedChoices={selectedChoices}
        isSingleSelect={isSingleSelect}
      />
      {choiceMaxExceed ? <Message messageVal={errMessage}></Message> : ""}
      <FormButtonWrapper>
        <ButtonFunc
          onClick={(e) => onRefreshButtonClick(e)}
          buttonName="Refresh"
        />
        <ButtonFunc
          onClick={(e) => onSaveButtonClick(e)}
          buttonName="Save Changes"
        />
      </FormButtonWrapper>
    </FormInputWrapper>
  );
};

export default FormInput;
