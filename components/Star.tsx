

interface Props {
    starValue?: number;
    rating?: number;
    handleClick? : (value : number) => void ;
    height: number;
    weight : number; 
}



export default function Star({starValue,handleClick,rating,height,weight} : Props) {
    return (
        <svg
            onClick={() => handleClick(starValue)}
            xmlns="http://www.w3.org/2000/svg"
            className={`h-${height} w-${weight} cursor-pointer `}   
            viewBox="0 0 24 24"
            fill="none"

        >
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill={`${rating >= starValue ? '#FFD700' : "#A0AEC0"}`}
                fillOpacity={2}
            />
        </svg>


    );
}