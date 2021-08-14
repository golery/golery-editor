import * as React from "react";
import {renderReadOnly} from "./core/RenderEngine";
import {WidgetRenderer, TextNode} from "./core/EditorTypes";
import {useMemo} from "react";
import {getStandardPlugins} from "./plugins";

interface Props {
    value: TextNode[]
    customRender?: WidgetRenderer
}

/** Render text editor value as read only content.
 * Here, we don't use the Slate for render, just manually iterate through the value tree and render each of them
 * recursively */
const EditorReadOnly = ({value, customRender}: Props) => {
    const plugins = useMemo(() => getStandardPlugins(), []);
    return (
        <div className={"readonlyRender"}>
            {renderReadOnly(value as TextNode[], plugins)}
        </div>
    );
}
export default EditorReadOnly;