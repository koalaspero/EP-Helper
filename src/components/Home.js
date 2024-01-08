import { useState } from "react";
import DragComponent from "./DragDrop/DragComponent";
import LoadingComponent from "./Loading/LoadingComponent";
import ResultComponent from "./Results/ResultComponent";
import { apiBasUrl } from "../constants/formFields";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [csvBlob, setCsvBlob] = useState(null);
  const [result, setResult] = useState(null);
  const [extension, setExtension] = useState(null);

  const handleCsvBlob = (blob,extension) => {
    // Handle the CSV Blob as needed
    setCsvBlob(blob);
    setExtension(extension);
  };

  const obtainResults = async(data) => {
    const response = await fetch(apiBasUrl + "getResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    setResult(json);
  }

  const handleFileUpload = () => {
    setIsLoading(true);
    setIsFinished(false);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const binaryContent = new Uint8Array(reader.result);
      //get the extension of the file name
      const resultData = {
        source_file: binaryContent,
        extension: extension,
      };
      await obtainResults(resultData);
      setIsLoading(false);
      setIsFinished(true);
    };
    console.log("File uploaded");
    reader.readAsArrayBuffer(csvBlob);
  };

  return (
    <div className="flex justify-center">
      <DragComponent onUploadStart={handleFileUpload} handleCsvBlob={handleCsvBlob} />
      <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5 ml-2 mr-2">
        <div className="pb-[8px] border-b border-[#e0e0e0]">
          <h2 className="text-black text-[17px] font-[600]">Resultados</h2>
        </div>
        <div className="flex justify-center">
          {isLoading && <LoadingComponent />}
        </div>
        {isFinished && <ResultComponent csvBlob={csvBlob} result={result} extension={extension}/>}
      </div>
    </div>
  );
}

