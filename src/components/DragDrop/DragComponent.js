import { CustomDragDrop } from "./CustomContainer";
import { useState } from "react";

export default function DragComponent({ onUploadStart }) {
  const [ownerLicense, setOwnerLicense] = useState([]);

  function uploadFiles(f) {
    // Simulate an asynchronous file upload process
    setTimeout(() => {
      // Set loading to false after the upload is complete
      setOwnerLicense([...ownerLicense, ...f]);
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
        formats={["csv"]}
        onUploadStart={onUploadStart}
      />
    </div>
  );
}
