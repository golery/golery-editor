import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {ReactEditor, Slate, withReact} from 'slate-react'
import {withHistory} from 'slate-history';
import {createEditor, Descendant} from 'slate'
import {BLOCK_IMAGE} from "./core/Schema";

const withImages = (editor: any) => {
    const {isVoid} = editor

    editor.isVoid = (element: any) => {
        return element.type === BLOCK_IMAGE || element.type === 'code' ? true : isVoid(element)
    }
    return editor;
}

class Controller {
    editor: any;

    constructor(editor: any) {
        this.editor = editor;
    }

    focus() {
        ReactEditor.focus(this.editor);
    }
}

export interface TextNode {
    type: string
    children: object[]
}

interface Props {
    children: any
    editorRef: any
    value: object[]
    setValue: (value: TextNode[]) => void
}

const GoleryEditor = ({children, editorRef, value, setValue}: Props) => {
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor() as ReactEditor))), []);
    useEffect(() => {
        editorRef.current = new Controller(editor);
    }, [editor]);
    return (
        <Slate editor={editor} value={value as Descendant[]} onChange={newValue => setValue(newValue as TextNode[])}>
            {children}
        </Slate>
    );
}

export default GoleryEditor;
export const emptyTextValue: TextNode[] = [{
    type: 'paragraph',
    children: [{text: ""}],
}];