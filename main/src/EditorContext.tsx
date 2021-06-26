import {useMemo, useState} from 'react';
import {Slate, Editable, withReact, useSlate} from 'slate-react'

import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
} from 'slate'

import * as React from 'react';

const EditorContextProvider = ({children}:{children:any}) => {
    // @ts-ignore
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{text: 'A line of text in a paragraph.'}],
        },
    ])
    return (
        <Slate editor={editor} value={value} onChange={newValue => setValue(newValue as any)}>
            {children}
        </Slate>
    );
}

export {EditorContextProvider};