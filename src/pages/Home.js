import FileUpload from "../components/FileUpload"
import Header from "../components/Header"
import Home from "../components/Home"


export default function HomePage(){
    return(
        <>
             <Header heading="Centro de Análisis de Escritura"/>
             <Home />
             {/* <FileUpload /> */}
        </>
    )
}