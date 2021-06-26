import * as React from 'react';
import {useMemo, useState} from 'react';
import {Slate, withReact} from 'slate-react'
import { withHistory } from 'slate-history';
import {createEditor,Editor} from 'slate'

const EditorContextProvider = ({children}:{children:any}) => {
    // @ts-ignore
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ])
    console.log('Value1', value);
    // @ts-ignore
    const v2 = Editor.nodes(editor, {
        // match: n => {
        //     console.log('tye=', n.type);
        //     return !Editor.isEditor(n) && SlateElement.isElement(n);
        // },
    })
    console.log('vvv',v2);
    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue as any)}>
            {children}
        </Slate>
    );
}

export {EditorContextProvider};