import React, { useState } from 'react';

function Import() {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      const confirmed = window.confirm('Are you sure you want to upload a .csv file? This will replace the content of your current pantry!');
      if (confirmed) {
        // Proceed with file upload
        console.log('Uploading .csv file:', file);
      } else {
        // User canceled file upload
        console.log('File upload canceled.');
      }
    }
  };

  return (
    <div className='import-window'>
      <h3>Import Pantry as CSV(Columns in order of Iten, Quantity and Unit):</h3>
      <br />
      <div className='import-inner-window'>
      <form>
        <input type="file" id="myfile" name="myfile" accept=".csv" onChange={handleFileSelect} />
        <br />
        <br />
        <input type="submit" />
      </form>
      </div>
    </div>
  );
}

export default Import;
