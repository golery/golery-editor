import React from "react";
import commonMark from "@canner/slate-editor-renderer/lib/commonMark";
import isHotkey from "is-hotkey";

export default function (options, hotkey) {
    return {
        renderMark: (props, editor, next) => {
            if (props.mark.type === options.type) {
                return commonMark(options.tagName)(props);
            }
            return next();
        },
        onKeyDown(event, editor, next)  {
            if (isHotkey(hotkey, event)) {
                event.preventDefault();
                editor.toggleMark(options.type);
                return;
            }
            return next();
        }
    };
}
