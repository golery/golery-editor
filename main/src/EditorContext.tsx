import * as React from 'react';
import {useMemo, useState, useEffect} from 'react';
import {Slate, withReact, ReactEditor} from 'slate-react'
import {withHistory} from 'slate-history';
import {createEditor, Editor} from 'slate'
import {BLOCK_IMAGE} from "./core/Schema";

const withImages = (editor: any) => {
    const {insertData, isVoid} = editor

    editor.isVoid = (element: any) => {
        return element.type === BLOCK_IMAGE || element.type === 'code' ? true : isVoid(element)
    }
    return editor;
}

class Controller {
    editor: any;
    private value: any;
    private _setValue: any;

    constructor(editor: any, value: any, setValue: any) {
        this.editor = editor;
        this.value = value;
        this._setValue = setValue;
    }

    focus() {
        ReactEditor.focus(this.editor);
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this._setValue && this._setValue(value);
    }
}
const EditorContextProvider = ({children, editorRef}: { children: any, editorRef: any }) => {
    // @ts-ignore
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor()))), []);
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ])
    console.log('Value', JSON.stringify(value));
    useEffect(() => {
        editorRef.current = new Controller(editor, value, setValue);
    }, [editor, value, setValue]);

    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue as any)}>
            {children}
        </Slate>
    );
}

export {EditorContextProvider};