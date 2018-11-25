import markPlugin from "./BasicMarkPlugin";
import {UNDERLINE} from "@canner/slate-constant/lib/marks";

const UnderlinePlugin = opt => {
    const options = Object.assign(
        {
            type: UNDERLINE,
            tagName: "u"
        },
        opt
    );

    return markPlugin(options, "mod+u");
};

export default UnderlinePlugin;