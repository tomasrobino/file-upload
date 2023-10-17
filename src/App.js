import './App.css';
import upload from "./upload-solid.svg"
import { useRef, useState } from 'react';

function App() {
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
                if (files.includes(element)) {
                    console.log("already selected")
                } else {
                    setFiles([...files, element]);
                    selectedFiles.push(element)
                    console.log("added");
                }
            });
        }
    }

    return (
        <div className="App">
            <div className='div'>
                <img alt='Upload' src={upload} onClick={handleClick} className='uploadIcon'/>
                <input ref={ref} type="file" hidden onChange={handleSelection} multiple/>
            </div>
        </div>
    );
}

export default App;
