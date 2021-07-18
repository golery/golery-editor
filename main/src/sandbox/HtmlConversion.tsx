import * as React from "react";
import GoleryEditor from "../GoleryEditor";
import EditorToolbar from "../component/toolbar/EditorToolbar";
import GoleryEditable from "../GoleryEditable";
import {useRef, useState} from "react";
import {EditorElement} from "../core/EditorTypes";
import {jsx} from "slate-hyperscript";

const html1 = `<p>Image:</p><img class="sc-htpNat yIWw" src="https://i.imgur.com/rELqqPp.png"/>`;
const html3 = `<p>Image:</p><p></p>`;
const html2 = "Float and height<div>A {B}</div><div>If B is float and A does not have height EXCEPT: A is inline-block</div>";
// Access via http://localhost:9000/?html
export const HtmlConversion = () => {
    const [value, setValue] = useState<EditorElement[]>();
    const editor = useRef(null);

    const deserialize = el => {
        if (el.nodeType === 3) {
            return el.textContent
        } else if (el.nodeType !== 1) {
            return null
        }

        let children = Array.from(el.childNodes).map(deserialize)

        if (children.length === 0) {
            children = [{ text: '' }]
        }

        console.log(el.nodeName);
        switch (el.nodeName) {
            case 'BODY':
                return jsx('fragment', {}, children)
            case 'BR':
                return '\n'
            case 'BLOCKQUOTE':
                return jsx('element', { type: 'quote' }, children)
            case 'DIV':
            case 'P':
                return jsx('element', { type: 'p' }, children)
            case 'IMG':
                return jsx('element', { type: 'img' }, children)
            case 'A':
                return jsx(
                    'element',
                    { type: 'link', url: el.getAttribute('href') },
                    children
                )
            default:
                return el.textContent
        }
    }

    const convert = () => {
        // const html = "<div>Tab</div>";
        const html = html1;
        const document = new DOMParser().parseFromString(html, 'text/html')
        const dom = deserialize(document.body)
        console.log(JSON.stringify(dom));
        setValue(dom);
    }
    return (
        <div>
            <button onClick={convert}>Convert</button>
            <GoleryEditor editorRef={editor} value={value} setValue={setValue}>
                <EditorToolbar widgets={[]}/>
                <GoleryEditable/>
            </GoleryEditor>
        </div>
    );
}