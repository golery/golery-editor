import * as React from "react";
import {Container, IconContainer, Separator} from "./Items";
import ToolbarIcon from "@canner/slate-icon-shared";

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
                if (options === "separator") return <Separator key={i}/>;
                return <ToolbarButton key={i} {...options}/>
            })}
        </Container>);
    }
}
