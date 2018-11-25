import markPlugin from "./BasicMarkPlugin";
import {ITALIC} from "@canner/slate-constant/lib/marks";

const ItalicPlugin = opt => {
    const options = Object.assign(
        {
            type: ITALIC,
            tagName: "i"
        },
        opt
    );

    return markPlugin(options, "mod+i");
};

export default ItalicPlugin;