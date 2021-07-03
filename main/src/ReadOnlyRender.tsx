import * as React from "react";
import {renderBlockElement, renderLeafElement} from "./core/Render";
import {EditorElement} from "./core/EditorTypes";

interface Props {
    value: EditorElement[]
}

const render = (elms: EditorElement[]) => {
    if (!elms) return [];
    return elms.map((elm, index) => {
        if (elm.type || Array.isArray(elm.children)) {
            const children = render(elm.children);
            return renderBlockElement(elm, {key: index}, children);
        } else {
            return renderLeafElement(elm, (elm as any)?.text, {key: index});
        }
    });
}

/** Render text editor value as read only content.
 * Here, we don't use the Slate for render, just manually iterate throug the tree values and render them */
const ReadOnlyRender = ({value}: Props) => {

    return (
        <div className={"readonlyRender"}>
            {render(value as EditorElement[])}
        </div>
    );
}
export default ReadOnlyRender;