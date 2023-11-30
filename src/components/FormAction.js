export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="group relative w-[10vw] rounded-[20px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-400 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 mt-10"
                onSubmit={handleSubmit}
            >
                <div class="text-center text-sky-950 ">{text}</div>
            </button>
            :
            <></>
        }
        </>
    )
}