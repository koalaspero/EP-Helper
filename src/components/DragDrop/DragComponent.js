import { CustomDragDrop } from "./CustomContainer";
import { useState } from "react";

export default function DragComponent({ onUploadStart, handleCsvBlob }) {
  const [ownerLicense, setOwnerLicense] = useState([]);

  // function downloadCsvBlob(csvBlob, fileName) {
  //   // Create a temporary anchor element
  //   const a = document.createElement("a");
  
  //   // Create a URL for the Blob and set it as the anchor's href
  //   a.href = URL.createObjectURL(csvBlob);
  
  //   // Set the download attribute with the desired file name
  //   a.download = fileName;
  
  //   // Append the anchor element to the document
  //   document.body.appendChild(a);
  
  //   // Trigger a click on the anchor to start the download
  //   a.click();
  
  //   // Remove the anchor from the document
  //   document.body.removeChild(a);
  // }
  

  function uploadFiles(f) {
    // Simulate an asynchronous file upload process
    setTimeout(() => {
      // Set loading to false after the upload is complete
      setOwnerLicense([...ownerLicense, ...f]);

      // Assuming there is only one file uploaded (count={1})
      if (f.length === 1) {

        const file = f[0];

        // Read the content of the file asynchronously
        const reader = new FileReader();

        reader.onload = function (e) {
          // e.target.result contains the content of the file as a data URL
          console.log(e.target.result);
          //extract the extension of the file
          let extension=file.name.split(".").pop();
          const csvBlob = new Blob([e.target.result], { type: file.type});

          // Uncomment these lines to trigger the download
          // downloadCsvBlob(csvBlob, "result.csv");
          // Pass the CSV Blob to the parent component
          handleCsvBlob(csvBlob, extension);
        };

        reader.readAsArrayBuffer(file);

        
      }
      
    }, 2000);
  }

  function deleteFile(indexImg) {
    const updatedList = ownerLicense.filter((ele, index) => index !== indexImg);
    setOwnerLicense(updatedList);
  }

  return (
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5 ml-2">
      <div className="pb-[8px] border-b border-[#e0e0e0]">
        <h2 className="text-black text-[17px] font-[600]">
          Subida de Archivo
        </h2>
      </div>
      <CustomDragDrop
        ownerLicense={ownerLicense}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        count={1}
        formats={["mat"]}
        onUploadStart={onUploadStart}
      />
    </div>
  );
}
