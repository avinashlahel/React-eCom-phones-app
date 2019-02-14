import styled from "styled-components";

export const ButtonContainer = styled.button`
  text-transform: Capitalize;
  background: transparent;
  border-radius: 5px;
  border: 0.05rem solid var(--lightBlue);
  border-color: ${props =>
    props.yellow ? "var(--mainYellow)" : "var(--lightBlue)"};
  cursor: pointer;
  margin: 0.2rem 0.5rem;
  color: ${props => (props.yellow ? "var(--mainYellow)" : "var(--lightBlue)")};
  transition: all 0.3s ease-in-out;
&:hover {
  background: ${props =>
    props.yellow ? "var(--mainYellow)" : "var(--lightBlue)"};
  color: var(--mainBlue);
  }
&:focus{
  outline : none;
  }
}
`;
