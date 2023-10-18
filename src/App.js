import './App.css';
import Loader from './Loader';
import upload from "./upload-solid.svg"
import { useRef, useState } from 'react';

function App() {
    const [loaderArr, setLoaderArr] = useState([]);
    const [files, setFiles] = useState([]);
    const ref = useRef()

    function handleClick() {
        ref.current.click()
    }

    function handleSelection(e) {
        if (e.target.files) {
            //console.log(e.target.files)
            let selectedFiles = Object.values(e.target.files);
            selectedFiles.forEach(element => {
                let aux = true;
                files.forEach(e => {
                    if (e.name === element.name) {
                        aux = false;
                    }
                });
                if (aux) {
                    setFiles([...files, element]);
                    /*
                    let reader = new FileReader();
                    reader.readAsDataURL(element);
                    reader.addEventListener("progress", e => {
                        console.log("aaa")
                        //setProgress( Math.round( (e.loaded/e.total)*100 ) );
                    });
                    */
                    //loaderArr.push(<Loader element={element}/>);
                    //console.log(loaderArr);
                    setLoaderArr([...loaderArr, <Loader element={element} key={element.name}/>]);
                    console.log(files);
                }
            });
        }
    }


    /*
    const [progress, setProgress] = useState(0);
    let reader = new FileReader();
    reader.readAsDataURL(props.element);
    reader.addEventListener("progress", e => {
        console.log(e)
        setProgress( Math.round( (e.loaded/e.total)*100 ) );
    });
    */

    return (
        <div className="App">
            <div className='div'>
                <img alt='Upload' src={upload} onClick={handleClick} className='uploadIcon'/>
                <input ref={ref} type="file" hidden onChange={handleSelection} multiple/>
                {loaderArr}
            </div>
        </div>
    );
}

export default App;
