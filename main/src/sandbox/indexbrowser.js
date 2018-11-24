import React from "react";
import ReactDOM from "react-dom";

import GoleryEditorLib from "../index";
let {GoleryEditor, EditorToolbar, SlateValue, htmlSerializer, EditorController} = GoleryEditorLib;

import styles from "./indexbrowser.css";

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


class DemoEditor extends React.Component {
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
        let editorToolbarOptions = this.controller.getToolbarOptions();
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
                    <button onClick={() => this._setHtml()}>SetHtml</button>
                    <button onClick={() => this._getHtml()}>GetHtml</button>
                    <button onClick={() => this._toogleReadOnly()}>Toogle readonly</button>
                </div>

                <div id={"sample"}>
                    This is test<ol>
                    <li>
                        first<br />firt of firts
                    </li>
                    <li>second</li>
                </ol>
                </div>
            </div>
        );
    }

    _toogleReadOnly() {
        this.setState({readOnly: !this.state.readOnly});
    }
    _setHtml() {
        let html = document.getElementById("sample").innerHTML;
        const v = htmlSerializer.deserialize(html);
        this.setState({ value: v });
        console.log(v);
    }

    _getHtml() {
        let html = htmlSerializer.serialize(this.state.value);
        this.html = html;
        console.log("Out:", html);
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

ReactDOM.render(<DemoEditor />, document.getElementById("root"));
