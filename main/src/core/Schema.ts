/** This file contains description of data of widgets inside editor */

/** Text format */
export const TYPE_H1 = 'h1';
export const TYPE_H2 = 'h2';
export const TYPE_H3 = 'h3';
export const TYPE_NUMBERED_LIST = 'ol';
export const TYPE_BULLETED_LIST = 'ul';
export const TYPE_LIST_ITEM = 'li';

/** Leaf format */
export const MARK_ITALIC = 'italic';
export const MARK_UNDERLINE = 'underline';
export const MARK_BOLD = 'bold';

/** Each element in slate js has a type and render engine renders element based on that type */
export const TYPE_PARAGRAPH = 'p';
export const TYPE_CODE = 'code'
export const TYPE_IMAGE = 'image'
export const TYPE_LINK = 'link'

export type LinkElement = {
    type: 'link'
    url: string
};

export type ImageElement = {
    type: 'image'
    src: [{ url?: string, key?: string }]
};

export type CodeElement = {
    type: 'code'
    code: string
}