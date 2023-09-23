"use client";

const Card = ({label, details}) => {
    return (
        <div className="flex items-center justify-center p-10 text-white bg-green-500 rounded-md card">
            <div className="flex flex-col items-center details">
                <h4>{label}</h4>
                <h1 className="py-4 font-mono text-2xl font-medium">{details}</h1>
            </div>
        </div>
    );
}

export default Card;