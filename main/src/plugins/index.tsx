import * as React from "react";
import {ImagePlugin} from "./image/ImagePlugin";
import {EditorPlugin} from "../core/EditorPlugin";
import {CodePlugin} from "./codeblock/CodePlugin";
import {LinkPlugin} from "./link/LinkPlugin";

const plugins = [ImagePlugin, CodePlugin, LinkPlugin];

export const getStandardPlugins = (): EditorPlugin[] => plugins;