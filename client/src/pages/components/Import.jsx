import React, { useState } from 'react';
import axios from 'axios';

function Import() {

  const [file, setFile] = useState(null)

  const token = localStorage.getItem("token");
  // Include the token in the request headers
  const headers = { Authorization: `Bearer ${token}`,};

  const handleFileSelect = async (event) => {
    const myfile = event.target.files[0];
    if (myfile && myfile.name.endsWith('.csv')) {
      const confirmed = window.confirm('Are you sure you want to upload a .csv file? This will replace the content of your current pantry!');
      if (confirmed) {
        // Proceed with file upload
        setFile(myfile)

      } else {
        // User canceled file upload
        console.log('File upload canceled.');
      }
    }
  };

  const handleFileSubmit = async (inputFile) => {
    
    try {
      const formData = new FormData();
      formData.append('file', inputFile);
      console.log(formData)

      await axios.post('http://localhost:5000/import', formData, { headers });

      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }

  }

  return (
    <div className='import-window'>
      <h3>Import Pantry as CSV(Columns in order of Iten, Quantity and Unit):</h3>
      <br />
      <div className='import-inner-window'>
      <form>
        <input type="file" id="myfile" name="myfile" accept=".csv" onChange={handleFileSelect} />
        <br />
        <br />
        <button type="button" onClick={() => handleFileSubmit(file)}>submit</button>
      </form>
      </div>
    </div>
  );
}

export default Import;
