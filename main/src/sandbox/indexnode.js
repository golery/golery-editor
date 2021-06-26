import Editor from "../index";
/** Sample index file when load with node.
 * It's for testing the compatible with serverside rendering */

let {GoleryEditor, EditorToolbar, htmlSerializer, SlateValue, EditorController} = Editor;

// Load libary in node env.
// GoleryEditor is just a placehoder, other variables are empty
console.log("GoleryEditor:", GoleryEditor);
console.log("EditorToolbar:", EditorToolbar);
console.log("htmlSerializer:", htmlSerializer);
console.log("SlateValue:", htmlSerializer);