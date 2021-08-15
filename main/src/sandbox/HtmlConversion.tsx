import * as React from "react";
import {useRef, useState, useEffect} from "react";
import GoleryEditor from "../GoleryEditor";
import {TextNode} from "../core/EditorTypes";
import {jsx} from "slate-hyperscript";
import {EditorReadOnly} from "../index";
import {pencilJson} from "./out.js";

const html4 = `<p>Image:</p><img class="sc-htpNat yIWw" src="https://images.unsplash.com/photo-1610275860969-eb05e05f8ab9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHNtYWxsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
<pre><code>Pre-code</code></pre><div>A <div>inner</div></div>`;
const html5 = `<p>Code</p><pre><code class=\\"lang-tsx\\">@RunWith(SpringRunner.class) \\npublic class MyTest {   @Autowired\\n   private ObjectMapper objectMapper;\\n   mockMvc = MockMvcBuilders.standaloneSetup(new CustomerController(customerService)).build();\\n   \\n     String response = mockMvc.perform(get(CONTROLLER_BASE))\\n                .andDo(print())\\n                .andExpect(status().isOk())\\n                .andReturn().getResponse().getContentAsString();\\n}</code></pre>`;
// Access via http://localhost:9000/?html
export const HtmlConversion = () => {
    const [sampleIndex, setSampleIndex] = useState("1951");
    const [html, setHtml] = useState(html4);
    const [value, setValue] = useState<TextNode[]>();
    const editor = useRef(null);

    const deserialize = el => {
        if (el.nodeType === 3) {
            return el.textContent
        } else if (el.nodeType !== 1) {
            return null
        }

        let children = Array.from(el.childNodes).map(deserialize)

        if (children.length === 0) {
            children = [{text: ''}]
        }

        const text = el.textContent;
        switch (el.nodeName) {
            case 'BODY':
            case 'PRE':
                return jsx('fragment', {}, children)
            case 'BR':
                return '\n'
            case 'DIV':
            case 'P':
                return jsx('element', {type: 'p'}, children)
            case 'IMG':
                const src = el.getAttribute('src');
                return jsx('element', {type: 'image', src: [{url: src}]}, children)
            case 'BLOCKQUOTE':
            case 'CODE':
                const code = el.textContent;
                return jsx('element', {type: 'code', code}, [{text: ''}])
            case 'A':
                return jsx(
                    'element',
                    {type: 'link', url: el.getAttribute('href')},
                    children
                )
            case 'H1':
                return jsx('element', {type: 'h1'}, children)
            case 'H2':
                return jsx('element', {type: 'h2'}, children)
            case 'H3':
                return jsx('element', {type: 'h3'}, children)
            case 'OL':
                return jsx('element', {type: 'ol'}, children)
            case 'UL':
                return jsx('element', {type: 'ul'}, children)
            case 'LI':
                return jsx('element', {type: 'li'}, children)
            default:
                return text;
        }
    }

    const convert = (e: any) => {
        let input;
        try {
            const index = parseInt(sampleIndex);
            const node = pencilJson.find(o => o.id===index);
            console.log(node);
            input = node.html;
        } catch (e) {
            input = sampleIndex;
        }

        setHtml(input);
    }

    useEffect(() => {
        console.log('Html=', html);
        const document = new DOMParser().parseFromString(html, 'text/html')
        const dom = deserialize(document.body)
        console.log(JSON.stringify(dom));
        setValue(dom);
    }, [html]);

    return (
        <div>
            Sample <textarea value={sampleIndex} onChange={e => setSampleIndex(e.target.value)}
                             placeholder={`${pencilJson.length}`}/>
            <button onClick={convert}>Convert</button>
            <div dangerouslySetInnerHTML={{__html: html}}/>

            <hr/>
            <EditorReadOnly value={value}/>

            <hr/>
            <GoleryEditor controllerRef={editor} value={value} setValue={setValue}/>

            <hr/>
            <pre>{value && JSON.stringify(value, null, 2)}</pre>
        </div>
    );
}