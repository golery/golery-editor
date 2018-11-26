/** Shift-Enter: keep the same paragraph */
import isHotkey from "is-hotkey";

function SoftBreak() {
    return {
        onKeyDown(event, editor, next) {
            if (isHotkey("shift+enter", event)) {
                event.preventDefault();
                editor.insertText("\n");
                return;
            } else return next();
        }
    };
}

export default SoftBreak;
