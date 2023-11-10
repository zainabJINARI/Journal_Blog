
   document.getElementById('imageBlog').addEventListener('click',()=>{
    var fileInput = document.getElementById('imageBlog');
    var fileNameDisplay = document.getElementById('file-name');
    var fileUploadText = document.getElementById('file-upload-text');

    fileNameDisplay.textContent = 'Selected File: ' + fileInput.files[0].name;
    fileUploadText.textContent = 'Change Image'; // Change the text if the user wants to select a different image
   })
    

    

