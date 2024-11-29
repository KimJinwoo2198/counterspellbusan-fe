import React, { useRef, useEffect } from 'react';


export default function CardTest({ src }) {
    /**
     * @type {React.MutableRefObject<HTMLImageElement>}
     */
    const cardRef = useRef(null);
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            let x = (cardRef.current.offsetWidth / 2 - e.offsetX) / 10;
            let y = (cardRef.current.offsetHeight / 2 - e.offsetY) / 10;
            cardRef.current.style.transition = null;
            cardRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        };

        const handleMouseLeave = () => {
            setTimeout(() => {
                cardRef.current.style.transition = 'all .5s';
                cardRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
            }, 2000);
        };

        cardRef.current.addEventListener("mousemove", handleMouseMove);
        cardRef.current.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cardRef.current.removeEventListener("mousemove", handleMouseMove);
            cardRef.current.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <img src={src} ref={cardRef} />
    );
}
