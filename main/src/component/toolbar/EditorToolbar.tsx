import * as React from "react";
import {useCallback} from "react";
import styles from "./EditorToolbar.module.scss";
import {useSlate} from 'slate-react';
import {getDefaultToolbar} from "./DefaultToolbar";
import {WidgetConfig} from "../widget/Widget";
import {EditorIcons} from "./icons";
import QuoteIcon from "./icons/QuoteIcon";

interface IconProps {
    icon: string
    active: boolean
}

const ToolbarIcon = ({icon, active}: IconProps) => {
    const Icon = EditorIcons[icon] || QuoteIcon;
    const clx = [styles.toolbarIcon];
    active && clx.push(styles.active);
    return (<div className={clx.join(' ')}><Icon/></div>);
}

interface ToolbarButtonProps {
    tooltip: string
    icon: string
    isActive: () => boolean
    onClick: Function
}

const ToolbarButton = ({tooltip, icon, onClick, isActive}: ToolbarButtonProps) => {

    const onMouseDownWrapper = useCallback(
        (e: any) => {
            e.stopPropagation();
            e.preventDefault();
            onClick && onClick();
        },
        [onClick],
    );

    isActive = isActive || (() => false);
    return (<div title={tooltip} onMouseDown={onMouseDownWrapper}>
        <ToolbarIcon icon={icon} active={isActive()}/>
    </div>);
}

const Separator = () => {
    return (<div className={styles.separator}/>);
}

interface EditorToolbar {
    widgets: WidgetConfig[]
}

const EditorToolbar = ({widgets}: EditorToolbar) => {
    const editor = useSlate();
    const options = getDefaultToolbar(editor, widgets);
    return (<div className={styles.component}>
        {options.map((options, i) => {
            if (options === "separator") return <Separator key={i}/>;
            return <ToolbarButton {...(options as ToolbarButtonProps)}/>
        })}
    </div>);
}

export default EditorToolbar;