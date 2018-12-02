import {DEFAULT_RULES} from "./rules";
import SlateHtmlSerializer from "slate-html-serializer";
let slateHtmlSerializer = new SlateHtmlSerializer({rules: DEFAULT_RULES});
export default slateHtmlSerializer;
