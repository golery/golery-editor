// Fork from main/node_modules/@canner/slate-editor-html/src/index.js
// To override rules

import {markRules, blockRules, inlineRules, imageRules} from "@canner/slate-editor-html";
import codeBlockRules from "./codeBlockRules";
import videoRules from "./videoRules";
import {BLOCKS, INLINES, MARKS} from "@canner/slate-constant";
import {DEFAULT as DEFAULT_VIDEO} from "@canner/slate-icon-video";
import voidNode from "@canner/slate-editor-html/lib/voidNodeRules";
import voidBlock from "@canner/slate-editor-html/lib/voidBlockRules";

export const DEFAULT_RULES = [
    blockRules("p", BLOCKS.PARAGRAPH),
    blockRules("blockquote", BLOCKS.BLOCKQUOTE),
    blockRules("h1", BLOCKS.HEADING_1),
    blockRules("h2", BLOCKS.HEADING_2),
    blockRules("h3", BLOCKS.HEADING_3),
    blockRules("h4", BLOCKS.HEADING_4),
    blockRules("h5", BLOCKS.HEADING_5),
    blockRules("h6", BLOCKS.HEADING_6),
    blockRules("ul", BLOCKS.UL_LIST),
    blockRules("ol", BLOCKS.OL_LIST),
    blockRules("li", BLOCKS.LIST_ITEM),
    blockRules("table", BLOCKS.TABLE),
    blockRules("tr", BLOCKS.TABLE_ROW),
    blockRules("td", BLOCKS.TABLE_CELL),
    voidBlock("hr", BLOCKS.HR),
    inlineRules("a", INLINES.LINK),
    markRules("strong", MARKS.BOLD),
    markRules("code", MARKS.CODE),
    markRules("i", MARKS.ITALIC),
    markRules("s", MARKS.STRIKETHROUGH),
    markRules("u", MARKS.UNDERLINE),
    markRules("span", MARKS.FONTBGCOLOR),
    markRules("span", MARKS.FONTCOLOR),
    markRules("span", MARKS.FONTSIZE),
    markRules("span", MARKS.LETTERSPACING),
    videoRules(DEFAULT_VIDEO.youtube),
    // videoRules(DEFAULT_VIDEO.vimeo),
    // videoRules(DEFAULT_VIDEO.dailymotion),
    // videoRules(DEFAULT_VIDEO.youku),
    imageRules(INLINES.IMAGE),
    codeBlockRules(),
    // emojiRules(),

    // some void node types that generate from 'markup-it'
    voidNode("unstyled"),
    voidNode("html")
];
