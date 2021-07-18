import * as React from "react";
import {ImagePlugin} from "./image/ImagePlugin";
import {EditorPlugin} from "../core/EditorPlugin";
import {CodePlugin} from "./codeblock/CodePlugin";

const plugins = [ImagePlugin, CodePlugin];

export const getStandardPlugins = (): EditorPlugin[] => plugins;