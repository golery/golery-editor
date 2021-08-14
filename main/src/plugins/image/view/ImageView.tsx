import React, {useEffect} from "react";
import styles from "./ImageView.module.scss";
import {showAsFullScreen} from "../../../component/modal/EditorModal";
import {ImageViewFullScreen} from "./ImageViewFullScreen";

export const ImageView = ({url}: { url: string }) => {
    if (!url) return <span>(missing url)</span>;
    const onFullScreen = () => {
        showAsFullScreen(<ImageViewFullScreen url={url}/>);
    }
    useEffect(() => {onFullScreen()}, [])
    return (<div>
        <div className={styles.imageHolder}>
            <img src={url}/>
            <div className={styles.zoomButton} onClick={onFullScreen}>[&nbsp; ]</div>
        </div>
    </div>);
}