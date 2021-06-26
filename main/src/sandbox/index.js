import React from "react";
import ReactDOM from "react-dom";

import GoleryEditorLib from "../index";
let {GoleryEditor, EditorToolbar, SlateValue, EditorController} = GoleryEditorLib;
import "@babel/polyfill";

import styles from "./main.css";
import ErrorBoundary from "./ErrorBoundary";
import {EditorContextProvider} from "../EditorContext";

const initialValue = [];
/*SlateValue.fromJSON({
    document: {
        nodes: [
            {
                object: "block",
                type: "paragraph",
                nodes: [
                    {
                        object: "text",
                        leaves: [
                            {
                                text: "This is code: for (var i = 0; i < 10; i++) {}"
                            }
                        ]
                    }
                ]
            }
        ]
    }
});*/


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

class SandboxApp extends React.Component {
    constructor() {
        super();

        // let value = htmlSerializer.deserialize("<p>This is text</p>");
        let value = initialValue;
        this.state = {
            value,
            readOnly: false,
            showEditor: true
        };
        this.editor = React.createRef();
        this.controller = new MyController();
        this.textAreaRef = React.createRef();

    }

    render() {
        const { value, showEditor } = this.state;
        const onChange = (change, v1, v2)=>this._onChange(change, v1, v2);
        let editorToolbarOptions = this.controller.getToolbarOptions({

        });
        console.log('Value', value);
        let $editor = showEditor ?
            (<GoleryEditor
                controller={this.controller}
                value={value} onChange={onChange}
                readOnly={this.state.readOnly}
                ref={this.editor}/>) : null;
        return (

            <div style={{ margin: "20px" }}>
                <EditorContextProvider>
                <EditorToolbar value={value} onChange={onChange} options={editorToolbarOptions}/>

                <div style={{border: "1px solid red"}}>
                    <ErrorBoundary>
                    {$editor}
                    </ErrorBoundary>
                </div>
                </EditorContextProvider>

                <div>
                    {/*<button onClick={() => this._resetHtml()}>Parse then set Html</button>*/}
                    {/*<button onClick={() => this._toogleReadOnly()}>Toogle readonly</button>*/}
                    {/*<button onClick={() => this._logValue()}>Value</button>*/}
                    {/*<button onClick={() => this._setEmpty()}>Set empty</button>*/}
                    {/*<button onClick={() => this._focus()}>Focus</button>*/}
                </div>

                <div>
                    <textarea ref={this.textAreaRef}/>
                </div>
            </div>
        );
    }

    _setEmpty() {
        // const v = htmlSerializer.deserialize("");
        // console.log(JSON.stringify(v, null ,2));
        // this.setState({ value: v, showEditor: true });
        //
        // this.textAreaRef.current.focus();
    }

    _focus() {
        this._getEditor().editor.focus();
    }

    _getEditor() {
        return this.editor.current;
    }

    _logValue() {
        console.log(JSON.stringify(this.editor.current.editor.value.toJSON(), null, 2));
    }

    _toogleReadOnly() {
        this.setState({readOnly: !this.state.readOnly});
    }

    _resetHtml() {
        // let html = htmlSerializer.serialize(this.state.value);
        // this.html = html;
        // console.log("Out:", html);
        // const v = htmlSerializer.deserialize(html);
        // console.log(JSON.stringify(v, null ,2));
        // this.setState({ value: v });
    }

    _onChange(change) {
        // let value = change.value;
        // // let innerHtml = htmlSerializer.serialize(value);
        // this.setState({value: value});
    }
}

ReactDOM.render(<SandboxApp />, document.getElementById("root"));
