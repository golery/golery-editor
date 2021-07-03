import * as React from "react";
import {renderBlockElement, renderLeafElement} from "./core/Render";
import {CustomRenderer, EditorElement} from "./core/EditorTypes";

interface Props {
    value: EditorElement[]
    customRender: CustomRenderer
}

const render = (elms: EditorElement[], customRender: CustomRenderer) => {
    if (!elms) return [];
    return elms.map((elm, index) => {
        if (elm.type || Array.isArray(elm.children)) {
            const children = render(elm.children, customRender);
            return renderBlockElement(elm, {key: index}, children,
                (type, data, readOnly) => customRender(type, data, readOnly, ()=> {}));
        } else {
            return renderLeafElement(elm, (elm as any)?.text, {key: index});
        }
    });
}

/** Render text editor value as read only content.
 * Here, we don't use the Slate for render, just manually iterate throug the tree values and render them */
const ReadOnlyRender = ({value, customRender}: Props) => {

    return (
        <div className={"readonlyRender"}>
            {render(value as EditorElement[], customRender)}
        </div>
    );
}
export default ReadOnlyRender;