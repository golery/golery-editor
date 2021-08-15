import * as React from "react";
import {ImagePlugin} from "./image/ImagePlugin";
import {EditorPlugin} from "../core/EditorPlugin";
import {CodePlugin} from "./codeblock/CodePlugin";
import {LinkPlugin} from "./link/LinkPlugin";
import {TextFormatPlugin} from "./textformat/TextFormatPlugin";

const plugins = [ImagePlugin, CodePlugin, LinkPlugin, TextFormatPlugin];

export const getStandardPlugins = (): EditorPlugin[] => plugins;