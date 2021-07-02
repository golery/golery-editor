import React, {useCallback} from 'react'
import {Editable} from 'slate-react';
import {Element, Leaf} from "./core/Render";

const GoleryEditable = ({renderObject}) => {
    const renderElement = useCallback(props => <Element {...props} renderObject={renderObject}/>, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])

    return (
        <Editable renderElement={renderElement} renderLeaf={renderLeaf}/>
    );
};

export default GoleryEditable;
