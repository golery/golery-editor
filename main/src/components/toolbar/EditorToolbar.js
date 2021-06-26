import * as React from "react";
import {Container, IconContainer, Separator} from "./Items";
import ToolbarIcon from "@canner/slate-icon-shared";
import {useSlate} from 'slate-react';
import {getDefaultToolbar} from "./DefaultToolbar";

class ToolbarButton extends React.Component {
    render() {
        let {title, icon, onClick, isActive} = this.props;
        isActive = isActive || (() => false);
        let decoractedOnClick = this._decorateOnClick(onClick);
        return <IconContainer title={title} onClick={decoractedOnClick}>
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

    _decorateOnClick(onClick) {
        if (onClick) {
            return (e) => {
                onClick(e);
                e.preventDefault()
            }
        } else {
            return (e) => {
                console.log("No event handler for toolbar icon");
                e.preventDefault()
            };
        }
    }
}

const Toolbar = () => {
    const editor = useSlate();
    const options = getDefaultToolbar(editor);
    return (<Container>
        {options.map((options, i) => {
            if (options === "separator") return <Separator key={i}/>;
            return <ToolbarButton key={i} {...options}/>
        })}
    </Container>);
}

export default Toolbar;