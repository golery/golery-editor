import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
} from 'slate'
import {BLOCK_BULLETED_LIST, BLOCK_LIST_ITEM, BLOCK_NUMBERED_LIST, BLOCK_PARAGRAPH} from "./Schema";

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format) => {
    const iter = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });
    const match = iter.next().value;
    return !!match
}

const LIST_TYPES = [BLOCK_NUMBERED_LIST, BLOCK_BULLETED_LIST]

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    })
    // FIXME
    //const newProperties: Partial<SlateElement> = {
    const newProperties = {
        type: isActive ? BLOCK_PARAGRAPH : isList ? BLOCK_LIST_ITEM : format,
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

export {isMarkActive, toggleMark, isBlockActive, toggleBlock};
