/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { FaUpload, FaRegFileImage, FaRegFile } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import Swal from "sweetalert2";

export function CustomDragDrop({
  ownerLicense,
  onUpload,
  onDelete,
  count,
  formats,
  onUploadStart 
}) {
  const [buttonPressed, setButtonPressed] = useState(true);
  const dropContainer = useRef(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  function handleDrop(e, type) {
    let files;
    if (type === "inputFile") {
      files = [...e.target.files];
    } else {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      files = [...e.dataTransfer.files];
    }

    const allFilesValid = files.every((file) => {
      const fileType = file.type.toLowerCase();
      const fileExtension = fileType.split('/').pop(); // Extract file extension
    
      return (
        formats.includes(fileType) ||
        formats.includes(fileExtension) ||
        (fileType === "application/vnd.ms-excel" && formats.includes("csv"))
      );
    });

    if (ownerLicense.length >= count) {
      showAlert(
        "warning",
        "Límite de archivos",
        `Solo ${count} archivo puede ser subido`
      );
      return;
    }
    if (!allFilesValid) {
      showAlert(
        "warning",
        "Archivo no válido",
        `Formato de archivo no válido. Por favor, solo subir ${formats
          .join(", ")
          .toUpperCase()}`
      );
      return;
    }
    if (count && count < files.length) {
      showAlert(
        "error",
        "Error",
        `Solo ${count} archivo${count !== 1 ? "s" : ""} puede ser subido a la vez`
      );
      return;
    }

    if (files && files.length) {
      const nFiles = files.map(async (file) => {
        const base64String = await convertFileBase64(file);
        return {
          name: file.name,
          photo: base64String,
          type: file.type,
          size: file.size
        };
      });

      Promise.all(nFiles).then((newFiles) => {
        onUpload(newFiles);
        TopNotification.fire({
          icon: "success",
          title: "Archivo agregado"
        });
      });
    }
  }

  async function convertFileBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  useEffect(() => {
    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    }
    function handleDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }
    dropContainer.current.addEventListener("dragover", handleDragOver);
    dropContainer.current.addEventListener("drop", handleDrop);
    dropContainer.current.addEventListener("dragleave", handleDragLeave);

    return () => {
      if (dropContainer.current) {
        dropContainer.current.removeEventListener("dragover", handleDragOver);
        dropContainer.current.removeEventListener("drop", handleDrop);
        dropContainer.current.removeEventListener("dragleave", handleDragLeave);
      }
    };
  }, [ownerLicense]);

  const TopNotification = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
  });

  function showAlert(icon, title, text) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: false,
      width: 500,
      timer: 1500
    });
  }

  function showImage(image) {
    Swal.fire({
      imageUrl: image,
      showCloseButton: true,
      showConfirmButton: false,
      width: 450
    });
  }

  return (
    <>
      <div
        className={`${
          dragging
            ? "border border-[#2B92EC] bg-[#EDF2FF]"
            : "border-dashed border-[#e0e0e0]"
        } flex items-center justify-center mx-auto text-center border-2 rounded-md mt-4 py-5`}
        ref={dropContainer}
      >
        <div className="flex-1 flex flex-col">
          <div className="mx-auto text-gray-400 mb-2">
            <FaUpload size={18} />
          </div>
          <div className="text-[12px] font-normal text-gray-500">
            <input
              className="opacity-0 hidden"
              type="file"
              multiple
              accept=" .csv, text/csv"
              ref={fileRef}
              onChange={(e) => handleDrop(e, "inputFile")}
            />
            <span
              className="text-[#4070f4] cursor-pointer"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Click para subir
            </span>{" "}
            o arrastra y suelta
          </div>
          <div className="text-[10px] font-normal text-gray-500">
            Solo un archivo en formato CSV
          </div>
        </div>
      </div>

      {ownerLicense.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-4">
          {ownerLicense.map((img, index) => (
            <div className="w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3">
              <div className="flex justify-between">
                <div className="w-[70%] flex justify-start items-center space-x-2">
                  <div
                    className="text-[#5E62FF] text-[37px] cursor-pointer"  
                    onClick={() => showImage(img.photo)}
                  >
                    {img.type.match(/image.*/i) ? (
                      <FaRegFileImage />
                    ) : (
                      <FaRegFile />
                    )}
                  </div>
                  <div className=" space-y-1">
                    <div className="text-xs font-medium text-gray-500">
                      {img.name}
                    </div>
                    <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                      img.size / 1024
                    )} KB`}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div className="space-y-1">
                    <div
                      className="text-gray-500 text-[17px] cursor-pointer"
                      onClick={() => {
                        onDelete(index)
                      }}
                    >
                      <BsX className="ml-auto" />
                    </div>
                    {/* <div className="text-[10px] font-medium text-gray-400">
                      Done
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className='flex justify-center mt-10'>
        <button
          id='subir'
          type='button'
          className='bg-blue-500 text-white px-4 py-2 rounded-md bg-slate-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400'
          onClick={onUploadStart} // Call onUploadStart when the button is clicked
          disabled={ownerLicense.length !== 1} // Disable the button if the count is not 1
        >
          <div className='text-center text-sky-950 '>Generar resultados</div>
        </button>
      </div>
    </>
    
  );
}
