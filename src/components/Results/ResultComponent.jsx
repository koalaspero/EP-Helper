import { useEffect } from "react";
import ObservationsComponent from "./ObservationsComponents";
import { useState } from "react";

export default function ResultComponent({ csvBlob,result,extension }) {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if(result.result == 0){
      setMessage("No se registro la presencia de Parkinson con una probabilidad de "+ result.probability+"%");
    }
    else if(result.result == 1) {
      setMessage("Se registro la presencia de Parkinson dominante en el lado izquierdo con una probabilidad de "+ result.probability+"%");
    }
    else{
      setMessage(
        "Se registro la presencia de Parkinson dominante en el lado derecho con una probabilidad de " +
          result.probability + "%"
      );
    }
  }
  , [result]);
  return (
    <>
      <div className="w-[742px] h-[58px] text-red-600 text-2xl font-medium mt-2">
        {message}
      </div>
      <ObservationsComponent result={message} csvBlob={csvBlob} probability={result} extension={extension}/>
    </>
  );
}