import * as React from "react";
import {useCallback} from "react";
import styles from "./EditorToolbar.module.scss";
import {useSlate} from 'slate-react';
import {getDefaultToolbar} from "./DefaultToolbar";
import {EditorIcons} from "./icons";
import QuoteIcon from "./icons/QuoteIcon";
import {EditorPlugin} from "../../core/EditorPlugin";

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
    plugins: EditorPlugin[]
}

const EditorToolbar = ({plugins}: EditorToolbar) => {
    const editor = useSlate();
    const options = getDefaultToolbar(editor, plugins);
    return (<div className={styles.component}>
        {options.map((options, i) => {
            if (options === "separator") return <Separator key={i}/>;
            const params = {...(options as any as ToolbarButtonProps)};
            return <ToolbarButton key={i} {...params}/>
        })}
    </div>);
}

export default EditorToolbar;