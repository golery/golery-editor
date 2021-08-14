import * as React from "react";
import {renderReadOnly} from "./core/RenderEngine";
import {WidgetRenderer, EditorElement} from "./core/EditorTypes";

interface Props {
    value: EditorElement[]
    customRender?: WidgetRenderer
}

/** Render text editor value as read only content.
 * Here, we don't use the Slate for render, just manually iterate through the value tree and render each of them
 * recursively */
const EditorReadOnly = ({value, customRender}: Props) => {
    return (
        <div className={"readonlyRender"}>
            {renderReadOnly(value as EditorElement[], customRender)}
        </div>
    );
}
export default EditorReadOnly;