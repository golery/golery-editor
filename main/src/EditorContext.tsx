import * as React from 'react';
import {useMemo, useState} from 'react';
import {Slate, withReact} from 'slate-react'

import {createEditor,} from 'slate'

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