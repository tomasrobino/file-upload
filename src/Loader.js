import { Box, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { useState } from "react"
import check from "./check-solid.svg"

export default function Loader(props) {
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);
    let reader = new FileReader();
    reader.readAsDataURL(props.element);
    reader.addEventListener("loadstart", e => {

    })
    reader.addEventListener("progress", e => {
        if (!loaded) {
            console.log(e.loaded)
            setProgress( Math.round( (e.loaded/e.total)*100 ) );
        }
    });
    reader.addEventListener("load", e => {
        setLoaded(true);
    })

    function LinearProgressWithLabel(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ minWidth: 35, marginRight: "10px" }}>
                    <Typography variant="body2" color="text.secondary">{`${Math.round(
                        props.value,
                    )}%`}</Typography>
                </Box>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} sx={{width: "70vw"}}/>
                </Box>
            </Box>
        );
    }

    return(
        <div className="loaderDiv">
            {progress===100? <img alt="" src={check} className="check"/> :<CircularProgress/>}
            <div className="barDiv">
                <LinearProgressWithLabel value={progress}/>
            </div>
            {//<img src={URL.createObjectURL(props.element)} alt="thumbnail" className="thumbnail"/>
            }
        </div>
    )
}