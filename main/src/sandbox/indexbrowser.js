import React from "react";
import ReactDOM from "react-dom";

import styles from "./indexbrowser.css";
import GoleryEditorLib from "../index";
let {GoleryEditor, EditorToolbar, SlateValue, htmlSerializer} = GoleryEditorLib;

//import "antd/dist/antd.css";


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
            value: initialValue
        };
        this.editor = React.createRef();
        this.controller = {
            toggleCode: () => {}
        };
    }

    render() {
        const { value } = this.state;
        const onChange = (change, v1, v2)=>this._onChange(change, v1, v2);
        let options = [
            {title: "Code", icon: "CodeBlock", onClick: () => {this.controller.toggleCode()}}
        ];
        return (
            <div style={{ margin: "20px" }}>
                <EditorToolbar value={value} onChange={onChange} options={options}/>

                <div style={{border: "1px solid red"}}>
                <GoleryEditor
                        controller={this.controller}
                        value={value} onChange={onChange} readOnly={false} debug={true}
                            ref={this.editor}/>
                </div>
                <button onClick={() => this._setHtml()}>SetHtml</button>
                <button onClick={() => this._getHtml()}>GetHtml</button>
                <button onClick={() => this._toogleCode()}>Toogle code</button>

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
