import { CustomDragDrop } from "./CustomContainer";
import { useState } from "react";
import LineChart from "./LineChart";
import { apiBasUrl } from "../../constants/formFields";

export default function DragComponent({ onUploadStart, handleCsvBlob }) {
  const [ownerLicense, setOwnerLicense] = useState([]);
  const [data, setData] = useState([]);
  const removeData = () => {
    setData([]);
  };
  const getData = async (info) => {
    const response = await fetch(apiBasUrl + "image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
    const data = await response.json();
    setData(data.data);
  };
  function uploadFiles(f) {
    // Simulate an asynchronous file upload process
    setTimeout(() => {
      // Set loading to false after the upload is complete
      setOwnerLicense([...ownerLicense, ...f]);

      // Assuming there is only one file uploaded (count={1})
      // eslint-disable-next-line
      if (f.length == 1) {
        const file = f[0];

        // Read the content of the file asynchronously
        const reader = new FileReader();

        reader.onload = function (e) {
          //extract the extension of the file
          let extension = file.name.split(".").pop();
          const csvBlob = new Blob([e.target.result], { type: file.type });
          const binaryContent = new Uint8Array(e.target.result);
          getData({ source_file: binaryContent, extension: extension });
          handleCsvBlob(csvBlob, extension);
        };

        reader.readAsArrayBuffer(file);
      }
    }, 2000);
  }

  function deleteFile(indexImg) {
    const updatedList = ownerLicense.filter((ele, index) => index !== indexImg);
    setOwnerLicense(updatedList);
    removeData();
  }
  //<svg ref={svgRef}></svg>
  return (
    <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5 ml-2 subida">
      <div className="pb-[8px] border-b border-[#e0e0e0]">
        <h2 className="text-black text-[17px] font-[600]">Subida de Archivo</h2>
      </div>
      <CustomDragDrop
        ownerLicense={ownerLicense}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        count={1}
        formats={["mat"]}
        onUploadStart={onUploadStart}
      />
      {data.length > 0 && (
        <h1 className="text-black text-[17px] font-[600]">Imagen:</h1>
      )}
      <LineChart data={data} />
    </div>
  );
}
