// @flow
import * as React from "react";
import type {Value, Change} from "slate";
import {Icon, Modal} from "antd";
import styled from "styled-components";
import {Container} from "./components/item";
import FullScreenIcon from "./components/fullScreen";

import {AlignCenter, AlignLeft, AlignRight} from "@canner/slate-icon-align";
import Blockquote from "@canner/slate-icon-blockquote";
import Table from "@canner/slate-icon-table";
import CodeBlock from "./components/codeblock/CodeBlockIcon";
import FontBgColor from "@canner/slate-icon-fontbgcolor";
import FontColor from "@canner/slate-icon-fontcolor";
import {Header1, Header2, Header3} from "@canner/slate-icon-header";
import Hr from "@canner/slate-icon-hr";
import Image from "@canner/slate-icon-image";
import {Indent, Outdent} from "@canner/slate-icon-indent";
import Link from "@canner/slate-icon-link";
import {OlList, UlList} from "@canner/slate-icon-list";
import Undo from "@canner/slate-icon-undo";
import Redo from "@canner/slate-icon-redo";
import Video from "@canner/slate-icon-video";
import HelpMenu from "@canner/slate-editor-help";
import ToolbarIcon from "@canner/slate-icon-shared";

type
Props = {
    value: Value,
    isFull? : boolean,
    onChange: (change: Change) => void,
    menuToolbarOption: {[string]: any}[],
    goFull: () => void,
    serviceConfig: any,
    galleryConfig? : any
};

type
State = {
    showMenu: boolean
};

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
        const {title, icon, onClick} = this.props;
        return <IconContainer title={title} onClick={onClick}>
            <div style={{display: "inline-block"}}>
                <ToolbarIcon icon={icon}
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
        return (<Container>
            <ToolbarButton title={"Bold"} icon={"Bold"}/>
            <ToolbarButton title={"Italic"} icon={"Italic"}/>
            <ToolbarButton title={"Underline"} icon={"Underline"}/>
            <Seperator/>
            <ToolbarButton title={"List"} icon={"ListOrdered"}/>
            <ToolbarButton title={"Bullet"} icon={"ListBullet"}/>
            <Seperator/>
            <ToolbarButton title={"Code"} icon={"CodeBlock"} />
        </Container>);
    }
}
