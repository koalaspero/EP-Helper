import ObservationsComponent from "./ObservationsComponents";

export default function ResultComponent() {
  return (
    <>
      <div className="w-[742px] h-[58px] text-red-600 text-2xl font-medium mt-2">
        Existe una probabilidad del 70% de que el paciente padezca la Enfermedad de Parkinson.
      </div>
      <ObservationsComponent />
    </>
  );
}