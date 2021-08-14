import React from "react";
import styles from "./ImageViewFullScreen.module.scss";

export const ImageViewFullScreen = ({url}: {url: string}) => {
    return (<div className={styles.component}>
        <div>
            <img src={url}/>
        </div>
    </div>);
}