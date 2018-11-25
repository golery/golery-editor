// @flow
import styled from "styled-components";

export const Container = styled.div`
  line-height: 0px !important;
  background-color: #fff;

  .__canner-editor_topToolbarItem,
  .__canner-editor_topToolbarItemActive {
    display: block;
    width: 25px;
    margin: 10px;
    text-align: center;
    float: none;
  }

  .__canner-editor_topToolbarItemDisabled > * {
    stroke: #ccc !important;
    cursor: not-allowed;
  }

  .qlStroke {
    stroke: #444;
    fill: transparent;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  .qlStrokeActive {
    stroke: #4f748e;
    fill: transparent;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2;
  }

  .qlStrokeMitter {
    stroke: #444;
    fill: transparent;
  }

  .qlStrokeMitterActive {
    stroke: #4f748e;
    fill: transparent;
  }

  .qlFill {
    fill: #444;
  }

  .qlFillActive {
    fill: #4f748e;
  }

  .qlEven {
    stroke: #444;
    fill: #fff;
  }

  .qlEvenActive {
    stroke: #4f748e;
    fill: #fff;
  }

  .qlColorLabel {
    fill: red;
  }

  .qlTransparent {
    opacity: 0.2;
  }

  .qlThin {
    stroke: #444;
    fill: transparent;
    stroke-width: 1;
  }

  .qlThinActive {
    stroke: #4f748e;
    fill: transparent;
    stroke-width: 1;
  }
`;

/** Wrapper of icon and add mouse hover, title, animation */
export const IconContainer = styled.div`
  display: inline-block;
  background: transparent;
  color: #222;
  cursor: pointer;
  -webkit-transition: background 0.2s ease 0s;

  ${props =>
    !props.noHover &&
    `
    &:hover {
      background: #ebebeb;
    }
  `};
`;

/** Vertical separator lines between icons */
export const Separator = styled.div`
  height: 35px;
  width: 1px;
  margin: 2px 0;
  background: #ebebeb;
  display: inline-block;
  vertical-align: top;
`;
