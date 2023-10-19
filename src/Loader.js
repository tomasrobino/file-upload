import { useState } from "react"

export default function Loader(props) {
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    let reader = new FileReader();
    reader.readAsDataURL(props.element);
    reader.addEventListener("loadstart", e => {

    })
    reader.addEventListener("progress", e => {
        if (!loaded) {
            let math = Math.round( (e.loaded/e.total)*100 );
            if (math > progress) {
                setProgress(math);
            }
        }
    });
    reader.addEventListener("load", e => {
        setLoaded(true);
    })

    return(
        <div className="loaderDiv">
            <div className="name">
                <span>{props.element.name}</span>
            </div>
            <progress value={progress} max="100" className="progress"></progress>
        </div>
    )
}