import * as React from 'react';
import {useCallback} from 'react';
import {Editable} from 'slate-react';
import {BlockElement} from "./RenderEngine";
import {EditorContext, WidgetRenderer} from "./EditorTypes";
import {EditorPluginContext} from "./EditorContext";
import {LeafElement} from "../plugins/textformat/TextFormatPlugin";
import {EditorPlugin} from "./EditorPlugin";
import {RenderElementProps, RenderLeafProps} from "slate-react/dist/components/editable";

interface Props {
    plugins: EditorPlugin[]
}

const GoleryEditable = ({plugins}: Props) => {
    const renderElement = useCallback((props: RenderElementProps) =>
        <BlockElement {...props} plugins={plugins}>{props.children}</BlockElement>, [])
    const renderLeaf = useCallback((props: RenderLeafProps) =>
        <LeafElement {...props}>{props.children}</LeafElement>, [])

    return (
        <Editable className={'golery-editable'} renderElement={renderElement} renderLeaf={renderLeaf}/>
    );
};

export default GoleryEditable;
