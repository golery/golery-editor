import * as React from "react";
import {ImagePlugin} from "./image/ImagePlugin";
import {EditorPlugin} from "../core/EditorPlugin";

const plugins = [
    ImagePlugin];

export const getStandardPlugins = ():EditorPlugin[] => plugins;