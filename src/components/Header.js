export default function Header({
    heading
  }) {
    return (
      <div className="w-full bg-slate-400 shadow mb-10">
        <div className="text-center text-sky-950 text-2xl font-bold font-['Roboto'] py-4 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-20">
          {heading}
        </div>
      </div>
    );
}