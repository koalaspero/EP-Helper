// import FileUpload from "./FileUpload";
import DragComponent from "./DragDrop/DragComponent"


export default function Home(){
    return(
        <div className="flex justify-center">
            <DragComponent />
            <div className="bg-white shadow rounded-lg w-full px-5 pt-3 pb-5 ml-2 mr-2">
                <div className="pb-[8px] border-b border-[#e0e0e0]">
                    <h2 className="text-black text-[17px] font-[600]"> Resultados</h2>
                </div>
            </div>
        </div>
    )
}