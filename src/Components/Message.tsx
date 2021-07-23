import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Text = styled.span`
  color: ${(props) => props.color};
`;

interface MsgProps {
  text?: string;
  color?: string;
}

const Message: React.FC<MsgProps> = ({ text = 'error', color = 'red' }) => (
  <Container>
    <Text color={color}>{text}</Text>
  </Container>
);

export default Message;
