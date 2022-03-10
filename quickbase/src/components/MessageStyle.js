import styled from "styled-components";
//library but we can use as js
export const MessageWrapper = styled.span` 
  padding-left: 30px;
  span {
    color: ${(props) => (props.isError ? "red" : "blue")};
  }
`;
