import React from "react";
import commonMark from "@canner/slate-editor-renderer/lib/commonMark";
import isHotkey from "is-hotkey";
import {BOLD, ITALIC, UNDERLINE} from "@canner/slate-constant/lib/marks";

const tagNames = {BOLD: "strong", ITALIC: "i", UNDERLINE: "u"};

function haveMarks(editor, type) {
    let {value} = editor;
    if (value.marks.size > 0) {
        return value.marks.some(mark => mark.type === type);
    }

    return false;
};

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
                editor.toggleBold(editor);
                return;
            } else if (isHotkey("mod+i", event)) {
                event.preventDefault();
                editor.toggleItalic(editor);
                return;
            } else if (isHotkey("mod+u", event)) {
                event.preventDefault();
                editor.toggleUnderline(editor);
                return;
            } else {
                return next();
            }
        },
        isInBold(editor) {
            return haveMarks(editor, BOLD);
        },
        isInItalic(editor) {
            return haveMarks(editor, ITALIC);
        },
        isInUnderline(editor) {
            return haveMarks(editor, UNDERLINE);
        },
        commands: {
            toggleBold(editor) {
                editor.toggleMark(BOLD);
            },

            toggleUnderline(editor) {
                editor.toggleMark(UNDERLINE);
            },

            toggleItalic(editor) {
                editor.toggleMark(ITALIC);
            }
        }
    };
}
