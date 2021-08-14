import React, {useCallback} from "react";
import styles from "./ImageViewFullScreen.module.scss";
import CloseIcon from "../../../component/icons/CloseIcon";

export const ImageViewFullScreen = ({url, closeDialog}: {url: string, closeDialog: Function}) => {
    const onClose = () => {}
    return (<div className={styles.component}>
        <div>
            <img src={url}/>
            <div className={styles.closeButton} onClick={() => closeDialog()}><CloseIcon/></div>
        </div>
    </div>);
}