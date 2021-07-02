import * as React from "react";

function ImageIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} style={{
        width: 24,
        height: 24
    }} viewBox="0 0 24 24"><path fill="currentColor" d="M19 19H5V5h14m0-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2m-5.04 9.29l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z" /></svg>;
}
export default ImageIcon;