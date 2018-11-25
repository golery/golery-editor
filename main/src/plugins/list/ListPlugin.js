import React from "react";
import EditList from "golery-slate-edit-list";

const UL_LIST = "ul_list";
const OL_LIST = "ol_list";
const LIST_ITEM = "list_item";

const {utils, changes} = EditList();

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
export {EditList};
