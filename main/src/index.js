/**
 * A wrapper
 * - Disable the editor during server side rendering
 * - Expose utilities (ex: SlateHtmlSerializer)
 * */

import React from "react";

let isBrowser = (typeof window !== 'undefined');
let GoleryEditor, EditorToolbar, htmlSerializer, SlateValue;
const Mock = () => <div>(mock react component in nodejs)</div>;

if (isBrowser) {
    GoleryEditor = require('./GoleryEditor').default;
    htmlSerializer = require('./components/html/html').default;
    EditorToolbar = require("./EditorToolbar").default;
    SlateValue = require("slate").Value;
} else {
    GoleryEditor = Mock;
    EditorToolbar = Mock;
    htmlSerializer = {serialize: () => null, deserialize: () => null};
    SlateValue = {fromJSON: () => null}
}


const GoleryEditorLib = {GoleryEditor, EditorToolbar, htmlSerializer, SlateValue};
export default GoleryEditorLib;