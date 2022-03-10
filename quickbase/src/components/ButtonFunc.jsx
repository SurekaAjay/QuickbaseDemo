import { ButtonWrapper } from "./BtnStyle";

export const ButtonFunc = (props) => {
  return (
    <ButtonWrapper>
      <button onClick={(e) => props.onClick(e)}>{props.buttonName}</button>
    </ButtonWrapper>
  );
};
