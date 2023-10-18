import './App.css';
import Loader from './Loader';
import upload from "./upload-solid.svg"
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

function App() {
    const ALLOWED_FILES = ["image/png", "image/jpeg", "image/gif"];

    const [loaderArr, setLoaderArr] = useState([]);
    const [files, setFiles] = useState([]);
    const ref = useRef()

    function handleClick() {
        ref.current.click()
    }

    function handleSelection(e) {
        if (e.target.files.length + files.length < 6) {
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
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Sólo se pueden seleccionar archivos con tipo JPG, JPEG, GIF o PNG",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                })
            }
        } else {
            Swal.fire({
                title: "Error!",
                text: "No puedes cargar más de cinco archivos",
                icon: "error",
                confirmButtonText: "Aceptar"
            })
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
