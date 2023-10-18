import './App.css';
import Loader from './Loader';
import upload from "./upload-solid.svg"
import { useRef, useState } from 'react';

function App() {
    const ALLOWED_FILES = ["image/png", "image/jpeg", "image/gif"];

    const [loaderArr, setLoaderArr] = useState([]);
    const [files, setFiles] = useState([]);
    const ref = useRef()

    function handleClick() {
        ref.current.click()
    }

    function handleSelection(e) {
        let ext = true;
        let selectedFiles = Object.values(e.target.files);
        selectedFiles.forEach(element => {
            if (!ALLOWED_FILES.includes(element.type)) {
                ext = false;
            }
        });

        if (ext) {
            let toAdd = [];
            selectedFiles.forEach(element => {
                let aux = true;
                files.forEach(e => {
                    if (e.name === element.name) {
                        aux = false;
                    }
                });
                if (aux) {
                    toAdd.push(element)
                }
            });
            setFiles([...files, ...toAdd]);
            let la = [];
            toAdd.forEach(ele => {
                la.push(<Loader element={ele} key={ele.name}/>)
            });
            setLoaderArr([...loaderArr, ...la]);
        }
    }

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
