import { LinearProgress } from "@mui/material";
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
            setProgress( Math.round( (e.loaded/e.total)*100 ) );
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
            <LinearProgress value={progress} variant="determinate" sx={{width: "50vw"}}/>
        </div>
    )
}