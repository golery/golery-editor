import React from "react";
import commonMark from "@canner/slate-editor-renderer/lib/commonMark";
import isHotkey from "is-hotkey";
import {BOLD, ITALIC, UNDERLINE} from "@canner/slate-constant/lib/marks";

const tagNames = {BOLD: "strong", ITALIC: "i", UNDERLINE: "u"};

export function toggleBold(editor) {
    editor.toggleMark(BOLD);
}

export function toggleUnderline(editor) {
    editor.toggleMark(UNDERLINE);
}

export function toggleItalic(editor) {
    editor.toggleMark(ITALIC);
}

export default function () {
    return {
        renderMark: (props, editor, next) => {
            let tagName = tagNames[props.mark.type];
            if (tagName) {
                return commonMark(tagName)(props);
            } else {
                return next();
            }
        },
        onKeyDown(event, editor, next) {
            if (isHotkey("mod+b", event)) {
                event.preventDefault();
                toggleBold(editor);
                return;
            } else if (isHotkey("mod+i", event)) {
                event.preventDefault();
                toggleItalic(editor);
                return;
            } else if (isHotkey("mod+u", event)) {
                event.preventDefault();
                toggleUnderline(editor);
                return;
            } else {
                return next();
            }
        }
    };
}
