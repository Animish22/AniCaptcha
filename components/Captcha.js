import {useEffect, useState} from "react";

export default function Captcha({onChange,captchaKey}) {
  const [selectedIndexes,setSelectedIndexes] = useState([]);
  useEffect(() => {
    onChange(selectedIndexes); 
  }, [selectedIndexes]);
  
  useEffect(() => {
    setSelectedIndexes([]);
  }, [captchaKey]);

  const imageLocations = (new Array(9))
    //Changes all elements in an array to a static value so that we can map over the items
    .fill(null)
    .map((value, index) => {
      return `/api/captcha-image?index=${index}&key=${captchaKey}`;
    });
  function toggleIndex(index) {
    setSelectedIndexes(previndexesArray => {
      if (previndexesArray.includes(index)) {
        return previndexesArray.filter(v => v !== index);
      } else {
        return [...previndexesArray, index];
      }
    })
  }
  return (
    <div className="captcha">
      <h2>Select all dogs:</h2>
      <div className="captcha-images">
        {imageLocations.map((imageUrl,index) => (
          <div
            key={index}
            onClick={() => toggleIndex(index)}
            className={selectedIndexes.includes(index) ? 'selected' : ''}>
            <img src={imageUrl} alt=""/>
          </div>
        ))}
      </div>
    </div>
  );
}