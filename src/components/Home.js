import { useState } from "react";
import DragComponent from "./DragDrop/DragComponent";
import LoadingComponent from "./Loading/LoadingComponent";
import ResultComponent from "./Results/ResultComponent";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);


  const handleFileUpload = () => {
    // Set loading to true before starting the file upload process
    setIsLoading(true);

    // Simulate an asynchronous file upload process
    setTimeout(() => {
      // Set loading to false after the upload is complete
      setIsLoading(false);
      setIsFinished(true);
    }, 2000);
  };

  return (
    <div className="flex justify-center">
      <DragComponent onUploadStart={handleFileUpload} />
      <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5 ml-2 mr-2">
        <div className="pb-[8px] border-b border-[#e0e0e0]">
          <h2 className="text-black text-[17px] font-[600]">Resultados</h2>
        </div>
        <div className="flex justify-center">
          {isLoading && <LoadingComponent />}
        </div>
        {isFinished && <ResultComponent />}
      </div>
    </div>
  );
}

