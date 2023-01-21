import styled from '@emotion/styled';
import { Box } from '@mui/system';
import React from 'react';

function Content(props) {

  const BoxStyled = styled(Box)({
    width:'80%',
    height:'100vh',
    backgroundColor: 'white',
    padding:'1rem'
  })
  
  return (
    <BoxStyled>
      {props.content}
    </BoxStyled>
  );
}

export default Content;