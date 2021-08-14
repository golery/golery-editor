import {isBlockActive, isMarkActive, toggleBlock, toggleMark} from "../../core/TextFormat";

import {BaseEditor, Transforms,} from 'slate'
import {
    BLOCK_BULLETED_LIST,
    BLOCK_H1,
    BLOCK_H2,
    BLOCK_H3,
    BLOCK_NUMBERED_LIST,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE
} from "../../core/Schema";
import {EditorPlugin} from "../../core/EditorPlugin";

export const getDefaultToolbar = (editor: BaseEditor, widgets: EditorPlugin[]) => {
    const insertWidget = async (type: string) => {
        const plugin = widgets.find(o => o.id === type);
        if (!plugin) {
            console.log('Plugin ', type, ' not found');
            return;
        }

        const selection = editor.selection;
        const data = await plugin.onInsert();
        if (!data) return;

        editor.selection = selection;
        return Transforms.insertNodes(editor, {
            type: plugin.type,
            ...data,
            children: [{text: ''}]
        } as any);
    }
    const operations = {
        toggleH1: () => toggleBlock(editor, BLOCK_H1),
        toggleH2: () => toggleBlock(editor, BLOCK_H2),
        toggleH3: () => toggleBlock(editor, BLOCK_H3),
        toggleBold: () => toggleMark(editor, MARK_BOLD),
        toggleUnderline: () => toggleMark(editor, MARK_UNDERLINE),
        toggleItalic: () => toggleMark(editor, MARK_ITALIC),

        // FIXME: multilevel list/bullet
        toggleList: (level: number) => toggleBlock(editor, BLOCK_NUMBERED_LIST),
        toggleBullet: (level: number) => toggleBlock(editor, BLOCK_BULLETED_LIST),

        isH1: () => isBlockActive(editor, BLOCK_H1),
        isH2: () => isBlockActive(editor, BLOCK_H2),
        isH3: () => isBlockActive(editor, BLOCK_H3),
        isInBold: () => isMarkActive(editor, MARK_BOLD),
        isInItalic: () => isMarkActive(editor, MARK_ITALIC),
        isInUnderline: () => isMarkActive(editor, MARK_UNDERLINE),
    };
    return [
        {
            tooltip: "Header 1 (ctrl+alt+1)",
            icon: "h1",
            onClick: () => operations.toggleH1(),
            isActive: () => operations.isH1()
        },
        {
            tooltip: "Header 2 (ctrl+alt+2)",
            icon: "h2",
            onClick: () => operations.toggleH2(),
            isActive: () => operations.isH2()
        },
        {
            tooltip: "Header 3 (ctrl+alt+3)",
            icon: "h3",
            onClick: () => operations.toggleH3(),
            isActive: () => operations.isH3()
        },
        "separator",
        {
            tooltip: "Bold (ctrl+b)",
            icon: "bold",
            onClick: () => operations.toggleBold(),
            isActive: () => operations.isInBold()
        },
        {
            tooltip: "Italic (ctrl+i)",
            icon: "italic",
            onClick: () => operations.toggleItalic(),
            isActive: () => operations.isInItalic()
        },
        {
            tooltip: "Underline (ctrl+u)",
            icon: "underline",
            onClick: () => operations.toggleUnderline(),
            isActive: () => operations.isInUnderline()
        },
        "separator",
        {
            tooltip: "List",
            icon: "number",
            onClick: () => operations.toggleList(1),
            isActive: () => false,//
        },
        {
            tooltip: "Bullet",
            icon: "bullet",
            onClick: () => operations.toggleBullet(1),
            isActive: () => false,//
        },
        "separator",
        {
            tooltip: "Code (ctrl+/)",
            icon: "code",
            onClick: () => insertWidget('code'),
            isActive: () => false
        },
        {
            tooltip: "Image",
            icon: "image",
            onClick: () => insertWidget('image'),
            isActive: () => false
        }
    ];
}