import React from 'react';
import {Images} from './components/Images';
import './App.css';

function App() {

  const [images, setImages] = React.useState([]);

  const handleDelete = (index) =>{
    images.splice(index, 1); 
    setImages([
      ...images
    ]);
  };

  const handleSelect = async (evt) => {
    const files = [...evt.target.files];
    const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
    
    setImages([
      ...images,
      ...urls,
    ]);
    // У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img
  }

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
    
      fileReader.addEventListener('load', evt => {
        resolve(evt.currentTarget.result);
      });
      
      fileReader.addEventListener('error', evt => {
        reject(new Error(evt.currentTarget.error));
      });
      
      fileReader.readAsDataURL(file);
    });
  };

  return (
    <div>
      
      <label >
        <div>Click to select</div>
        <input type="file" name="filesToUpload" id="filesToUpload" onChange={handleSelect} />
      </label>
        
      
      <Images images={images} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
