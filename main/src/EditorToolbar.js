import * as React from "react";
import styled from "styled-components";
import {Container} from "./components/item";
import ToolbarIcon from "@canner/slate-icon-shared";

/** Wrapper of icon and add mouse hover, title, animation */
const IconContainer = styled.div`
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
const Seperator = styled.div`
  height: 35px;
  width: 1px;
  margin: 2px 0;
  background: #ebebeb;
  display: inline-block;
  vertical-align: top;
`;

class ToolbarButton extends React.Component {
    render() {
        let {title, icon, onClick, isActive} = this.props;
        isActive = isActive || (() => false);
        onClick = onClick || (() => {
        });
        return <IconContainer title={title} onClick={onClick}>
            <div style={{display: "inline-block"}}>
                <ToolbarIcon icon={icon}
                             isActive={isActive()}
                             className="__canner-editor_topToolbarItem"
                             disableClassName="__canner-editor_topToolbarItemDisabled"
                             strokeClassName="qlStroke"
                             strokeMitterClassName="qlStrokeMitter"
                             fillClassName="qlFill"
                             evenClassName="qlEven"
                             colorLabelClassName="qlColorLabel"
                             thinClassName="qlThin"
                             activeStrokeMitterClassName="qlStrokeMitterActive"
                             activeClassName="__canner-editor_topToolbarItem __canner-editor_topToolbarItemActive"
                             activeStrokeClassName="qlStrokeActive"
                             activeFillClassName="qlFillActive"
                             activeThinClassName="qlThinActive"
                             activeEvenClassName="qlEvenActive"
                />
            </div>
        </IconContainer>;
    }
}

export default class Toolbar extends React.Component {
    render() {
        let {options} = this.props;
        return (<Container>
            {options.map((options, i) => {
                if (options === "separator") return <Seperator/>;
                return <ToolbarButton key={i} {...options}/>
            })}
        </Container>);
    }
}
