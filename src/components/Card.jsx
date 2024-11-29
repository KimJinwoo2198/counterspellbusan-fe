import React, { useRef, useEffect, useState } from 'react';

export default function CardTest({ src }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    
    useEffect(() => {
        let animationFrame;
        
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 10;
            const y = (e.clientY - rect.top - rect.height / 2) / 10;

            animationFrame = requestAnimationFrame(() => {
                cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y * -1}deg) scale(1.1)`;
            });
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            if (cardRef.current) {
                cardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
            }
        };

        if (isHovered) {
            cardRef.current.addEventListener("mousemove", handleMouseMove);
            cardRef.current.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            cardRef.current?.removeEventListener("mousemove", handleMouseMove);
            cardRef.current?.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrame);
        };
    }, [isHovered]);

    return (
        <img
            className="card"
            src={src}
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            alt="Guild Card"
            style={{
                transition: 'transform 0.3s ease-out',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
            }}
        />
    );
}
