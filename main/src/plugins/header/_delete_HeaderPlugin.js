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
    return headers.find(header => header.type === type);
}

function fromLevel(level) {
    return headers.find(header => header.level === level);
}

function doToggleHeader(editor, type) {
    const isActive = hasBlock(editor, type);
    editor
        .setBlocks(isActive ? PARAGRAPH : type)
        .unwrapBlock(UL_LIST)
        .unwrapBlock(OL_LIST);
}

const _delete_HeaderPlugin = () => {
    return {
        renderNode: (props, editor, next) => {
            let type = props.node.type;
            let header = fromType(type);
            if (header) {
                return commonNode(header.tag, nodeAttrs)(props);
            }
            return next();
        },
        onKeyDown: (e, editor, next) => {
            if (e.key === "Enter") {
                // press enter will start a new normal paragraph
                // Special case: press enter at the end of header, start a new normal paragraph
                const currentBlock = editor.value.blocks.get(0);
                let header = fromType(currentBlock.type);
                if (header) {
                    let {anchor, focus} = editor.value.selection;
                    if (anchor.key === focus.key && anchor.offset === 0 && focus.offset ===0) {
                        // when enter at begining of header line
                        editor.setBlocks(PARAGRAPH);
                        editor.splitBlock().setBlocks(header);
                        return;
                    } else {
                        editor.splitBlock().setBlocks(PARAGRAPH);
                        return;
                    }
                }
            } else {
                let header = headers.find(header => isHotkey(header.hotkey, e));
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
                doToggleHeader(editor, header.type);
            },
        },
        isHeader(editor, level) {
            let header = fromLevel(level);
            return hasBlock(editor, header.type);
        }
    };
};

export default _delete_HeaderPlugin;