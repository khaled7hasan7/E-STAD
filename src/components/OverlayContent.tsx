interface OverlayContentProps {
    title: string;
    description: string; 
    buttonText: string;
    onClick?: () => any;
}

const OverlayContent = ({ title, description, buttonText, onClick } : OverlayContentProps) => (
    <>
        <h2 className="text-3xl font-bold w-full">{title}</h2>
        <p className="my-7">{description}</p>
        <button
            className="bg-transparent border border-white text-white font-bold py-2 px-6 mt-6 rounded-full"
            onClick={onClick}
        >
            {buttonText}
        </button>
    </>
);

export default OverlayContent;