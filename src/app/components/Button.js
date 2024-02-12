export default function Button({
  buttonFunction,
  functionValue,
  darkColor,
  lightColor,
  flareColor,
  label,
}) {
  return (
    <button
      onClick={() => buttonFunction(functionValue)}
      style={{
        background: `linear-gradient(${darkColor} 30%, ${lightColor})`,
      }}
      className={`mt-[1rem] relative text-[#fff4e6] w-[10rem] h-[3rem] rounded-3xl flex flex-col justify-center items-center shadow-[1px_1px_4px_1px_rgba(0,0,0,0.8)] active:shadow-[1px_1px_4px_1px_rgba(0,0,0,0.5)]`}
    >
      <p className="z-20 tracking-wider">{label}</p>
      <div
        style={{
          background: `linear-gradient(${flareColor}, transparent 70%)`,
        }}
        className={`absolute top-[0.2rem] w-[8.4rem] h-[1.8rem] rounded-3xl z-10`}
      />
    </button>
  );
}
