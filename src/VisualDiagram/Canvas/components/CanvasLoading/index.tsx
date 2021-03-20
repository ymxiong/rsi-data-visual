import React from 'react';
import styled from 'styled-components';

const CanvasLoadingWrap = styled.div`
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    text-align: center;
  }

  .spinner > div {
    width: 18px;
    height: 18px;
    background-color: #fff;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;

    & + div {
      margin-left: 8px;
    }
  }

  .spinner .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;

export type CanvasLoadingProps = {
  loading?: boolean;
  loadingComponent?: React.ReactNode;
};

const CanvasLoading: React.FC<CanvasLoadingProps> = ({
  loading,
  loadingComponent,
}) => {
  return loading ? (
    <CanvasLoadingWrap>
      {loadingComponent || (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      )}
    </CanvasLoadingWrap>
  ) : null;
};

export default CanvasLoading;
