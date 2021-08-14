/* Ref. Example https://www.slatejs.org/examples/links */
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

type LinkElement = { type: 'link'; url: string ; children: Descendant[] }

const wrapLink = (editor, url, text) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor)
    }

    const {selection} = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link: LinkElement = {
        type: 'link',
        url,
        children: isCollapsed ? [{text: text}] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, {split: true})
        Transforms.collapse(editor, {edge: 'end'})
    }
}

export default class LinkPlugin implements EditorPlugin {
    public id = "link";
    public type = "link";
    private readonly controller: LinkPluginController;
    private readonly editor: ReactEditor;

    constructor(editor) {
        this.editor = editor;
        this.controller = {};
    }

    init({editor}) {
        const {insertData, isInline} = editor;
        const controller = this.controller;

        editor.isInline = element => {
            return element.type === 'link' ? true : isInline(element)
        }

        function showDialog(text) {
            controller.showLinkDialog && controller.showLinkDialog(text);
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

    renderEdit({data, attributes, children}: WidgetRenderParams): React.ReactElement {
        if (data.type !== BLOCK_LINK) return;
        return <a {...attributes} href={data.url} target="_blank">{children}</a>
    }

    getModal() {
        return <LinkDialog controller={this.controller} wrapLink={wrapLink}/>;
    }
}

export const linkPluginRenderReadOnly: WidgetRenderer = ({attributes, children, data}) => {
    if (data.type !== BLOCK_LINK) return;
    return <a {...attributes} href={data.url} target="_blank">{children}</a>
}