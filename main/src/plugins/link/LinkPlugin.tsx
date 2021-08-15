/* Ref. Example https://www.slatejs.org/examples/links */
import isUrl from 'is-url';
import React from 'react';
import {Descendant, Editor, Element as SlateElement, Range, Transforms,} from 'slate'
import {WidgetRenderParams} from "../../core/EditorTypes";
import {BLOCK_LINK} from "../../core/Schema";
import {EditorPlugin} from "../../core/EditorPlugin";
import {ModalTemplate, showModal} from "../../component/modal/Modal";
import {LinkDialog} from "./LinkDialog";
import {ReactEditor} from "slate-react";

type LinkElement = { type: 'link'; url: string; children: Descendant[] }

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

export const LinkPlugin: EditorPlugin = {
    id: "link",
    // FIXME: do we need type?
    type: "link",

    init({editor}) {
        const {insertData, isInline} = editor;

        editor.isInline = element => {
            return element.type === 'link' ? true : isInline(element)
        }

        async function showDialog(initialUrl: string) {
            const editorSelection = editor.selection;

            const {link, text} = await showModal({
                getBody: ({closeModal}) => {
                    return <LinkDialog closeModal={closeModal} url={initialUrl}/>;
                }, template: ModalTemplate.dialog
            });

            editor.selection = editorSelection;
            ReactEditor.focus(editor as ReactEditor);
            setTimeout(() => {
                wrapLink(editor, link, text || link);
            });
        }

        editor.insertData = data => {
            const text = data.getData('text/plain')

            if (text && text.length >= 7 && isUrl(text)) {
                showDialog(text);
            } else {
                insertData(data)
            }
        }
    },

    renderEdit({data, attributes, children}: WidgetRenderParams): React.ReactElement {
        if (data.type !== BLOCK_LINK) return;
        return <a {...attributes} href={data.url} target="_blank">{children}</a>
    },

    renderView({data, attributes, children}: WidgetRenderParams) {
        const {type} = data as LinkElement;
        if (type !== BLOCK_LINK) return;

        return <a {...attributes} href={data.url} target="_blank">{children}</a>
    }
}