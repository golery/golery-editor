import React from "react";
import ReactDOM from "react-dom";

import GoleryEditorLib from "../index";
import "@babel/polyfill";
import ErrorBoundary from "./ErrorBoundary";
import {EditorContextProvider} from "../EditorContext";

let {GoleryEditor, EditorToolbar, SlateValue, EditorController} = GoleryEditorLib;
import {Editable, ReactEditor, useSlate, useSlateStatic} from 'slate-react';



const CodeBlock = ({data, setData}) => {
    const e = useSlateStatic();
    const onClick = () => {
        setData({text: data.text + '.'});

    }
    return <div style={{color: 'white', backgroundColor: 'black'}}>{data.text}
        <button onClick={onClick}>Click</button>
    </div>;
}

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
    // constructor() {
    //     super();
    //
    //     // let value = htmlSerializer.deserialize("<p>This is text</p>");
    //     let value = initialValue;
    //     this.state = {
    //         value,
    //         readOnly: false,
    //         showEditor: true
    //     };
    //     this.editor = React.createRef();
    //     this.controller = new MyController();
    //     this.textAreaRef = React.createRef();
    //
    // }
    //
    // render() {
    //     const {value, showEditor} = this.state;
    //     const onChange = (change, v1, v2) => {};
    const renderObject = (setData, type, data) => {
        if (type === 'code') {
            return <CodeBlock data={data} setData={setData}/>
        }
    }
    // let editorToolbarOptions = getDefaultToolbar();
    // console.log('Value', value);
    // let $editor = showEditor ?
    //     (<GoleryEditor renderObject={renderObject}/>) : null;
    let $editor =
        (<GoleryEditor renderObject={renderObject}/>);
    return (
        <ErrorBoundary>
            <div style={{margin: "20px"}}>
                <EditorContextProvider>
                        <EditorToolbar/>
                        <div style={{border: "1px solid red"}}>

                        {$editor}
                    </div>
                </EditorContextProvider>

                <div>
                    {/*<button onClick={() => this._resetHtml()}>Parse then set Html</button>*/}
                    {/*<button onClick={() => this._toogleReadOnly()}>Toogle readonly</button>*/}
                    {/*<button onClick={() => this._logValue()}>Value</button>*/}
                    {/*<button onClick={() => this._setEmpty()}>Set empty</button>*/}
                    {/*<button onClick={() => this._focus()}>Focus</button>*/}
                </div>
            </div>
        </ErrorBoundary>
    );
}

ReactDOM.render(<SandboxApp/>, document.getElementById("root"));
