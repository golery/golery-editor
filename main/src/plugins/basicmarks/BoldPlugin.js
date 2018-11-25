import markPlugin from "./BasicMarkPlugin";
import {BOLD} from "@canner/slate-constant/lib/marks";

const BoldPlugin = opt => {
    const options = Object.assign(
        {
            type: BOLD,
            tagName: "strong"
        },
        opt
    );

    return markPlugin(options, "mod+b");
};

export default BoldPlugin;