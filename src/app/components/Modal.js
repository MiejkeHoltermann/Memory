export default function Modal({ toggleModal, restartGame }) {
  return (
    <div className="w-[100%] min-[450px]:w-[450px] min-[450px]:left-[50%] min-[450px]:-translate-x-1/2 h-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0 z-30">
      <div className="bg-white w-[90%] py-[1rem] px-[0.6rem] rounded-[0.4rem] text-center absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 z-40">
        <p>Are you sure you want to quit? Your progress will be lost.</p>
        <div className="flex justify-center gap-[0.8rem] mt-[1.2rem]">
          <button
            onClick={() => toggleModal()}
            className="relative  text-white bg-gradient-to-b from-red-900 from-30% to-red-500 w-[36%] aspect-[3/1] rounded-3xl flex flex-col justify-center items-center shadow-[1px_1px_2px_1px_rgba(0,0,0,0.6)] active:shadow-[1px_1px_4px_1px_rgba(0,0,0,0.3)]"
          >
            <p className="z-20 tracking-wider">No</p>
            <div className="absolute top-[0.1rem] bg-gradient-to-b from-red-200 to-70% w-[84%] aspect-[4/1] rounded-3xl z-10" />
          </button>
          <button
            onClick={() => {
              restartGame(0);
            }}
            className="relative  text-white bg-gradient-to-b from-green-900 from-30% to-green-500 w-[36%] aspect-[3/1] rounded-3xl flex flex-col justify-center items-center shadow-[1px_1px_2px_1px_rgba(0,0,0,0.6)] active:shadow-[1px_1px_4px_1px_rgba(0,0,0,0.3)]"
          >
            <p className="z-20 tracking-wider">Yes</p>
            <div className="absolute top-[0.1rem] bg-gradient-to-b from-green-200 to-70% w-[84%] aspect-[4/1] rounded-3xl z-10" />
          </button>
        </div>
      </div>
    </div>
  );
}
