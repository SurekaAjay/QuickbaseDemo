import styled from "styled-components";

export const FormInputWrapper = styled.div`
  padding: 30px;
  margin: 30px;
  border: 1px solid blue;

  .title {
    font-weight: bold;
    font-size: 30px;
  }

  .formField {
    padding: 25px;
  }

  .labelInput{

    color: ${(props) => (props.isInputValueExceeded ? "red" : "black")};

  }

  input,
  select {
    padding: 5px;
    width: 50%;
    margin-left:0px;
  }

  .checkStyle {
    width: 5%;
    padding: 10px;
  }

  .messageStyle {
    color: red;
  }
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  padding: 25px;
`;
