import {
    HEADING_1, HEADING_2, HEADING_3, UL_LIST, OL_LIST, PARAGRAPH
} from "@canner/slate-constant/lib/blocks";
import isHotkey from "is-hotkey";

import commonNode from "@canner/slate-editor-renderer/lib/commonNode";
import {nodeAttrs} from "@canner/slate-icon-shared";

function hasBlock(editor, type) {
    let blocks = editor.value.blocks;
    return blocks.size > 0 && blocks.some(node => node.type == type)
}

const headers = [
    { level: 1, type: HEADING_1, tag: "h1", hotkey: "ctrl+opt+1"},
    { level: 2, type: HEADING_2, tag: "h2", hotkey: "ctrl+opt+2"},
    { level: 3, type: HEADING_3, tag: "h3", hotkey: "ctrl+opt+3"},
];

function fromType(type) {
    return headers.filter(header => header.type === type);
}

function fromLevel(level) {
    return headers.filter(header => header.level === level);
}

function doToggleHeader(editor, type) {
    const isActive = hasBlock(editor, type);
    editor
        .setBlocks(isActive ? PARAGRAPH : type)
        .unwrapBlock(UL_LIST)
        .unwrapBlock(OL_LIST);
}

const plugin = () => {
    return {
        renderNode: (props, editor, next) => {
            let type = props.node.type;
            let header = fromType(type);
            if (header) {
                return commonNode(tagName.tag, nodeAttrs)(props);
            }
            return next();
        },
        onKeyDown: (e, editor, next) => {
            if (e.key === "Enter") {
                // press enter will start a new normal paragraph
                // Special case: press enter at the end of header, start a new normal paragraph
                const getCurrentblock = editor.value.blocks.get(0);

                if (getCurrentblock.type === type) {
                    return editor.splitBlock().setBlocks(PARAGRAPH);
                }
            } else {
                let header = headers.filter(header => isHotkey(header.hotkey, e));
                if (header) {
                    e.preventDefault();
                    doToggleHeader(editor, header.type);
                    return;
                }
            }
            return next();
        },
        commands: {
            toggleHeader(editor, level) {
                let header = fromLevel(level);
                if (header) {
                    doToggleHeader(editor, header.type);
                }
            }
        }
    };
};

export const HeaderOnePlugin = (type = HEADING_1) =>
    plugin(1, type, "h1", "ctrl+opt+1");
export const HeaderTwoPlugin = (type = HEADING_2) =>
    plugin(2, type, "h2", "ctrl+opt+2");
export const HeaderThreePlugin = (type = HEADING_3) =>
    plugin(3, type, "h3", "ctrl+opt+3");
