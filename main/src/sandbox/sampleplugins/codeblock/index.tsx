// import * as React from "react";
// import {RenderMode, WidgetPlugin, WidgetRenderParams} from "../../../core/EditorTypes";
// import {SampleCodeBlockWidget, SampleEditCodeBlock} from "./SampleCodeBlockWidget";
//
// const SampleCodeBlockPlugin: WidgetPlugin = {
//     init() {},
//     // id: 'code',
//     // elmType: 'code',
//     // name: 'Code',
//     // icon: 'code',
//     // async getDataWhenInsert() {
//     //     return Promise.resolve({code: 'main() {}'});
//     // },
//     render({data, setData, mode}: WidgetRenderParams) {
//         if (mode == RenderMode.EDIT) {
//             return <SampleEditCodeBlock data={data} setData={setData}/>;
//         }
//         return (<SampleCodeBlockWidget data={data} setData={setData}/>);
//     }
// };
//
// export default SampleCodeBlockPlugin;