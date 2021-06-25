/**
 * A wrapper
 * - Disable the editor during server side rendering
 * - Expose utilities (ex: SlateHtmlSerializer)
 * */

import React from "react";
import EditorController from "./EditorController";

let isBrowser = (typeof window !== 'undefined');
let GoleryEditor, EditorToolbar, htmlSerializer, SlateValue;
const Mock = () => <div>(mock react component in nodejs)</div>;

if (isBrowser) {
    GoleryEditor = require('./GoleryEditor').default;
    htmlSerializer = null; //require('./canner/slate-editor-html/serializer').default;
    EditorToolbar = require("./components/toolbar/EditorToolbar").default;
    SlateValue = null; //require("slate").Value;
} else {
    GoleryEditor = Mock;
    EditorToolbar = Mock;
    htmlSerializer = {serialize: () => null, deserialize: () => null};
    SlateValue = {fromJSON: () => null};
}


const GoleryEditorLib = {GoleryEditor, EditorToolbar, htmlSerializer, SlateValue, EditorController};
export default GoleryEditorLib;