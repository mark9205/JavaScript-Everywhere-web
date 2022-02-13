import styled from 'styled-components';

const Button = styled.button`

  display: block;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
  background-color: blue;
  
  :hover {
    opacity: 0.7;
  }
  :active {
    border-color: #005fa3;
  }
`;

export default Button;
