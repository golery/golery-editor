import * as React from 'react';
import {Ref, useMemo} from 'react';
import {TextNode} from "./core/EditorTypes";
import {getStandardPlugins} from "./plugins";
import EditorToolbar from "./component/toolbar/EditorToolbar";
import GoleryEditable from "./core/GoleryEditable";
import EditorContext from "./core/EditorContext";
import {EditorController} from "./core/EditorController";

interface Props {
    value: TextNode[]
    setValue: (value: TextNode[]) => void
    controllerRef: Ref<EditorController>
}

const GoleryEditor = ({value, setValue, controllerRef}: Props) => {
    const plugins = useMemo(() => getStandardPlugins(), []);
    return (
        <EditorContext controllerRef={controllerRef} value={value} setValue={setValue} plugins={plugins}>
            <EditorToolbar widgets={plugins}/>
            <GoleryEditable/>
        </EditorContext>
    );
}

export default GoleryEditor;

