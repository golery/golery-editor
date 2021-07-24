import * as React from "react"
import styles from './ImageEditor.module.scss';
import {useEffect, useRef, useState} from "react";
import ClipboardUtils from "./ClipboardUtils";

const MAX_IMAGE_WIDTH = 1000;
const MAX_IMAGE_HEIGHT = 800;

export const ImageEditor = () => {
    const imageRef = useRef(new Image());
    const [hasImage, setHasImage] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [resizePercent, setResizePercent] = useState(100);
    const [imageSize, setImageSize] = useState({width:0,height:0});
    const onPaste = () => {};
    const onResize = (e) => {};
    let spinnerClassName = `fa fa-spinner fa-pulse ${styles.spinner}`;
    let elmInner;
    const onClickUploadImgur = () => {};
    const image = imageRef.current;
    const canvasRef =  React.createRef<HTMLCanvasElement>();
    const canvas = canvasRef.current;

    useEffect(() => {
        document.addEventListener('paste', _pasteListener);
        return () => {
            document.removeEventListener('paste', _pasteListener);
        };
    } ,[_pasteListener]);

    function _pasteListener(e) {
        e.stopPropagation();
        e.preventDefault();

        let blobUrl = ClipboardUtils.getFirstImageBlobUrl(e);
        if (!blobUrl) {
            return;
        }
        _copyToCanvas(blobUrl);
    }

    // http://stackoverflow.com/questions/18377891/how-can-i-let-user-paste-image-data-from-the-clipboard-into-a-canvas-element-in
    function  _copyToCanvas(objectUrl) {
        image.onload = () => {
            let size = _adjustImageSize(image.width, image.height);
            setHasImage(true);
            setImageSize(size);
            console.log('Resize to', size);
            if (!!canvas) {
                canvas.width = size.width;
                canvas.height = size.height;
            }
        };
        image.src = objectUrl;
    };

    useEffect(() => {
        if (!hasImage) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        // let ratio = resizePercent / 100.0;
        // let {width, height} = imageSize;
        // console.log('canvas', canvas);
        // canvas.width = width * ratio;
        // canvas.height = height * ratio;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.log(image.width, image.height, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

    }, [hasImage, canvasRef.current,  image?.src]);

    function  _adjustImageSize(width, height) {
        let ratio = width / height;
        let w = width;
        let h = height;
        if (w >= MAX_IMAGE_WIDTH) {
            w = 1000;
            h = w / ratio;
        }
        if (h >= MAX_IMAGE_HEIGHT) {
            h = 800;
            w = h * ratio;
        }

        return {width: w, height: h};
    }


    if (hasImage) {
        let canvassHolderStyle = imageSize;
        elmInner = <div>
            <div>
                <div className={styles.button} onClick={onClickUploadImgur}><i
                    className="fa fa-cloud-upload"/>
                    &nbsp; Upload to Imugr.com**
                </div>
                <div className={styles.button} onClick={onClickUploadImgur}><i
                    className="fa fa-cloud-upload"/>
                    &nbsp; Upload to Golery.com
                </div>
                <div className={styles.igmurWarning}>**Imgur.com is free public image hosting. Even if your note content
                    is set to private access, image are still accessible from public.
                </div>
                <div>
                    <input className={styles.resizeSlider} type="range" value={resizePercent}
                           onChange={(e) => onResize(e)}/>
                </div>
            </div>
            <div style={canvassHolderStyle}>
                <canvas ref={canvasRef}/>
            </div>
        </div>;
    } else {
        elmInner = <div>
            <div className={styles.textControlV}>Ctrl + V</div>
            <div className={styles.textPasteFromClipboard}>
                <span className={styles.textPaste}>Paste</span> from your clipboard.
            </div>
        </div>
    }
    let elmSpinner = showSpinner &&
        <div className={styles.spinnerHolder}><i className={spinnerClassName}/>
        </div>;
    return <div className={styles.component} onPaste={onPaste}>
        {elmInner}
        {elmSpinner}
    </div>;
}