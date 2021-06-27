import * as React from 'react';
import {useMemo, useState} from 'react';
import {Slate, withReact} from 'slate-react'
import { withHistory } from 'slate-history';
import {createEditor,Editor} from 'slate'
import {BLOCK_IMAGE} from "./core/Schema";

const withImages = (editor: any) => {
    const {insertData, isVoid} = editor

    editor.isVoid = (element: any) => {
        return element.type === BLOCK_IMAGE || element.type === 'code' ? true : isVoid(element)
    }
    return editor;
}

const EditorContextProvider = ({children}:{children:any}) => {
    // @ts-ignore
    const editor = useMemo(() => withImages(withHistory(withReact(createEditor())), []));
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ])
    console.log('Value', JSON.stringify(value));
    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue as any)}>
            {children}
        </Slate>
    );
}

export {EditorContextProvider};