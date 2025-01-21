const GenModal = () => {
    return (
        <>
            <div className="bg-[#000000] h-[80%] w-full absolute top-[10%]">
                <div className="">
                    <video
                        src={
                            "https://res.cloudinary.com/dzlhavqtd/video/upload/v1737145164/f1o84wdqwurhvjdthrb3.mp4"
                        }
                        loop
                        autoPlay
                        className="w-full mt-[30%]"
                        controls={false}
                    />
                </div>
            </div>
        </>
    );
};

export default GenModal;
