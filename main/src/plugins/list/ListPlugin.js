import React from "react";
import EditList from "golery-slate-edit-list";
import {
    OL_LIST,
    UL_LIST,
    LIST_ITEM,
    PARAGRAPH
} from "@canner/slate-constant/lib/blocks";

const editListPlugin = EditList({
    types: [OL_LIST, UL_LIST],
    typeItem: LIST_ITEM
});

const {utils, changes} = editListPlugin;

function toggle(editor, currentType) {
    if (utils.isSelectionInList(editor.value)) {
        if (utils.getCurrentList(editor.value).type !== currentType) {
            editor.command(changes.wrapInList(editor, currentType));
        } else {
            editor.command(changes.unwrapList(editor));
        }
    } else {
        editor.command(changes.wrapInList(editor, currentType));
    }
}

export const ListPlugin = () => {
    return {
        commands: {
            toggleList(editor) {
                toggle(editor, OL_LIST);
            },

            toggleBullet(editor) {
                toggle(editor, UL_LIST);
            }
        },

        renderNode: (props, editor, next) => {
            const {node, attributes, children} = props;
            if (node.type === UL_LIST)
                return <ul {...attributes}>{children}</ul>;
            else if (node.type === OL_LIST)
                return <ol {...attributes}>{children}</ol>;
            else if (node.type === LIST_ITEM)
                return <li {...attributes}>{children}</li>;
            else
                return next();
        }
    };
};

export default ListPlugin;
export {editListPlugin};
