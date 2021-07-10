import isUrl from 'is-url';
import * as React from 'react';
import {Descendant, Editor, Element as SlateElement, Range, Transforms,} from 'slate'
import {ReactEditor} from 'slate-react';
import {WidgetRenderer, WidgetRenderParams} from "../../core/EditorTypes";
import {BLOCK_LINK} from "../../core/Schema";
import {EditorPlugin} from "../../core/EditorPlugin";
import {LinkDialog} from "./LinkDialog";


const unwrapLink = editor => {
    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === 'link',
    })
}

const isLinkActive = editor => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === 'link',
    })
    return !!link
}


type LinkElement = { type: 'link'; data: { url: string }; children: Descendant[] }

const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const {selection} = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link: LinkElement = {
        type: 'link',
        data: {url},
        children: isCollapsed ? [{text: url}] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, {split: true})
        Transforms.collapse(editor, {edge: 'end'})
    }
}

const renderLink: WidgetRenderer = ({type, data, attributes, children}: WidgetRenderParams): React.ReactElement => {
    if (type === BLOCK_LINK) {
        return <a {...attributes} href={data.url}>{data.text | data.url}{children}</a>
    }
}

export default class LinkPlugin implements EditorPlugin {
    public render: WidgetRenderer
    private readonly controller: LinkPluginController;
    private readonly editor: ReactEditor;

    constructor(editor) {
        this.editor = editor;
        this.render = renderLink;
        this.controller = {};
    }

    init(editor) {
        const {insertData, insertText, isInline} = editor;
        const controller = this.controller;

        editor.isInline = element => {
            return element.type === 'link' ? true : isInline(element)
        }

        function showDialog(text) {
            controller.showLinkDialog && controller.showLinkDialog(text);
        }

        editor.insertText = text => {
            if (text && isUrl(text)) {
                showDialog(text);
            } else {
                insertText(text)
            }
        }

        editor.insertData = data => {
            const text = data.getData('text/plain')

            if (text && isUrl(text)) {
                showDialog(text);
            } else {
                insertData(data)
            }
        }
    }

    getModal() {
        return <LinkDialog controller={this.controller} wrapLink={wrapLink}/>;
    }
}
