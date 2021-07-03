import * as React from 'react';
import {useCallback} from 'react'
import {Editable} from 'slate-react';
import {Element, Leaf} from "./core/Render";
import {EditorElement} from "./core/EditorTypes";

interface Props {
    /** Render custom element */
    customRender: (EditorElement) => React.ReactNode
}

const GoleryEditable = ({customRender}) => {
    const renderElement = useCallback(props => <Element {...props} customRender={customRender}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    return (
        <Editable className={'golery-editable'} renderElement={renderElement} renderLeaf={renderLeaf}/>
    );
};

export default GoleryEditable;
