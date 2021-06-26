import React from "react";
import ReactDOM from "react-dom";

import GoleryEditorLib from "../index";

let {GoleryEditor, EditorToolbar, SlateValue, EditorController} = GoleryEditorLib;
import "@babel/polyfill";

import styles from "./main.css";
import ErrorBoundary from "./ErrorBoundary";
import {EditorContextProvider} from "../EditorContext";
import {getDefaultToolbar} from "../components/toolbar/DefaultToolbar";
import RichTextExample from "./RichText";

const initialValue = [];

class MyController extends EditorController {
    /**
     * When clicking on image button in toolbar, this method is called to open image dialge
     * Injected by library user
     * */
    async openInsertImageDialog() {
        console.log("In real application, we allow user to select the image");
        return "https://jaspergilhuis.files.wordpress.com/2018/07/logo.png";
    }

    /**
     * When paste an image, this method is called and allow user to modify image
     * Injected by library user
     * */
    async editImageOnPaste(pasteBlobUrl) {
        console.log("Image image ", pasteBlobUrl);
        console.log("In real application, we allow user to modify the image in blobUrl");
        return pasteBlobUrl;
    }
}

const SandboxApp = () => {
    return <div><RichTextExample/></div>;
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
