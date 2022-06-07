import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { css } from '@emotion/react';

const override = css`
  display: block;
  margin: 100px auto;
  border-color: #4a90e2;
`;

export default function Loader() {
  return <PacmanLoader color="#3f51b5" css={override} size={50} />;
}
