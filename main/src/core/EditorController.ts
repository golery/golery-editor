import {ReactEditor} from "slate-react";

export class EditorController {
    editor: any;

    constructor(editor: any) {
        this.editor = editor;
    }

    focus() {
        ReactEditor.focus(this.editor);
    }
}