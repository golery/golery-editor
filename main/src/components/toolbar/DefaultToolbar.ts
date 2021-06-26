import {isBlockActive, isMarkActive, toggleBlock, toggleMark} from "../../core/TextFormat";
import {Slate, Editable, withReact, useSlate} from 'slate-react';

import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
    BaseEditor,
} from 'slate'
import {
    BLOCK_BULLETED_LIST,
    BLOCK_HEADING_PREFIX,
    BLOCK_NUMBERED_LIST,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE
} from "../../core/Schema";

export const getDefaultToolbar = (editor: BaseEditor) => {
    const operations = {
        toggleHeader: (level: number) => toggleBlock(editor, BLOCK_HEADING_PREFIX + level),
        //
        //         toggleCode: () => this.editor.toggleCode("tsx"),
        insertImage: (url: string) => Transforms.insertNodes(editor, {
            type: 'image',
            url,
            children: [{text: ''}]
        } as any),
        toggleBold: () => toggleMark(editor, MARK_BOLD),
        toggleUnderline: () => toggleMark(editor, MARK_UNDERLINE),
        toggleItalic: () => toggleMark(editor, MARK_ITALIC),

        toggleList: (level: number) => toggleBlock(editor, BLOCK_NUMBERED_LIST),
        toggleBullet: (level: number) => toggleBlock(editor, BLOCK_BULLETED_LIST),
        //
        isHeader: (level: number) => isBlockActive(editor, BLOCK_HEADING_PREFIX + level),
        // isInCodeBlock: () => codeBlockPlugin.isInCodeBlock(this.editor),
        isInBold: () => isMarkActive(editor, MARK_BOLD),
        isInItalic: () => isMarkActive(editor, MARK_ITALIC),
        isInUnderline: () => isMarkActive(editor, MARK_UNDERLINE),
    };
    return [
        {
            title: "Header 1 (ctrl+alt+1)",
            icon: "Header",
            onClick: () => operations.toggleHeader(1),
            isActive: () => operations.isHeader(1)
        },
        {
            title: "Header 2 (ctrl+alt+2)",
            icon: "Header2",
            onClick: () => operations.toggleHeader(2),
            isActive: () => operations.isHeader(2)
        },
        {
            title: "Header 3 (ctrl+alt+3)",
            icon: "Header3",
            onClick: () => operations.toggleHeader(3),
            isActive: () => operations.isHeader(3)
        },
        "separator",
        {
            title: "Bold (ctrl+b)",
            icon: "Bold",
            onClick: () => operations.toggleBold(),
            isActive: () => operations.isInBold()
        },
        {
            title: "Italic (ctrl+i)",
            icon: "Italic",
            onClick: () => operations.toggleItalic(),
            isActive: () => operations.isInItalic()
        },
        {
            title: "Underline (ctrl+u)",
            icon: "Underline",
            onClick: () => operations.toggleUnderline(),
            isActive: () => operations.isInUnderline()
        },
        "separator",
        {
            title: "List",
            icon: "ListOrdered",
            onClick: () => operations.toggleList(1),
            isActive: () => false,//
        },
        {
            title: "Bullet",
            icon: "ListBullet",
            onClick: () => operations.toggleBullet(1),
            isActive: () => false,//
        },
        "separator",
        // {
        //     title: "Code (ctrl+/)",
        //     icon: "CodeBlock",
        //     onClick: () => operations.toggleCode(),
        //     isActive: () => this.isInCodeBlock()
        // },
        // {
        //     title: "Image",
        //     icon: "Image",
        //     onClick: () => this.openInsertImageDialog().then(url => this.insertImage(url)),
        //     isActive: () => this.isInCodeBlock()
        // }
    ];
}