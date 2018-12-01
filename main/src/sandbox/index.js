import React from "react";
import ReactDOM from "react-dom";

import GoleryEditorLib from "../index";
let {GoleryEditor, EditorToolbar, SlateValue, htmlSerializer, EditorController} = GoleryEditorLib;
import "@babel/polyfill";

import styles from "./main.css";

const initialValue = SlateValue.fromJSON({
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
});


class SandboxApp extends React.Component {
    constructor() {
        super();
        this.state = {
            value: initialValue,
            readOnly: false
        };
        this.editor = React.createRef();
        this.controller = new EditorController();
    }

    render() {
        const { value } = this.state;
        const onChange = (change, v1, v2)=>this._onChange(change, v1, v2);
        let editorToolbarOptions = this.controller.getToolbarOptions({
            async getImageUrl() {
                return "https://jaspergilhuis.files.wordpress.com/2018/07/logo.png"
            }
        });
        return (
            <div style={{ margin: "20px" }}>
                <EditorToolbar value={value} onChange={onChange} options={editorToolbarOptions}/>

                <div style={{border: "1px solid red"}}>
                    <GoleryEditor
                            controller={this.controller}
                            value={value} onChange={onChange}
                            readOnly={this.state.readOnly}
                            ref={this.editor}/>
                </div>

                <div>
                    <button onClick={() => this._resetHtml()}>Parse then set Html</button>
                    <button onClick={() => this._toogleReadOnly()}>Toogle readonly</button>
                    <button onClick={() => this._logValue()}>Value</button>
                </div>
            </div>
        );
    }

    _logValue() {
        console.log(JSON.stringify(this.editor.current.editor.value.toJSON(), null, 2));
    }

    _toogleReadOnly() {
        this.setState({readOnly: !this.state.readOnly});
    }

    _resetHtml() {
        let html = htmlSerializer.serialize(this.state.value);
        this.html = html;
        console.log("Out:", html);
        const v = htmlSerializer.deserialize(html);
        console.log(JSON.stringify(v, null ,2));
        this.setState({ value: v });
    }

    _setHtmlFromGet() {
        let value = htmlSerializer.deserialize(this.html);
        console.log(value.toJSON());
        this.setState({ value: value });
    }

    _onChange(change, v1, v2) {
        let value = change.value;
        // let innerHtml = htmlSerializer.serialize(value);
        this.setState({value: value});
    }
}

ReactDOM.render(<SandboxApp />, document.getElementById("root"));
