import { useEffect, useState, useRef, forwardRef } from "react";

const Ghost = forwardRef(({ id, eyeX, eyeY, color, size }, ref) => {
    if (!eyeX) eyeX = 0;
    if (!eyeY) eyeY = 0;
    if (!size) size = 40;
    if (!color) color = "#FD0002";

    if (eyeX < -1) eyeX = -1;
    if (eyeY < -1) eyeY = -1;
    if (eyeX > 1) eyeX = 1;
    if (eyeY > 1) eyeY = 1;

    const ghostBodys = [
        "M9 0H5V1H3V2H2V3H1V6H0V13H1V14H3V13H4V12H5V13H6V14H8V13H9V12H10V13H11V14H13V13H14V6H13V3H12V2H11V1H9V0Z",
        "M5 0H9V1H11V2H12V3H13V6H14V14H13V13H12V12H11V13H10V14H8V12H6V14H4V13H3V12H2V13H1V14H0V6H1V3H2V2H3V1H5V0Z"
    ];
    let i = Math.floor(Math.random() * 2);
    const [bodyAnimation, setBodyAnimation] = useState(i);
    useEffect(() => {
        const interval = setInterval(() => {
            setBodyAnimation((++i) % 2);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div id={id} style={{ width: size }} ref={ref}>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 14 14" fill="none">
                <path d={ghostBodys[bodyAnimation]} fill={color} />
                <path
                    d="M3 0.5H1V1.5H0V4.5H1V5.5H3V4.5H4V1.5H3V0.5Z"
                    style={{
                        transform: `translateX(calc(${2 + eyeX}/14 * 100%)) translateY(calc(${3 + eyeY}/14 * 100%))`
                    }}
                    fill="#F2FFFF"
                />
                <path
                    d="M9 0.5H7V1.5H6V4.5H7V5.5H9V4.5H10V1.5H9V0.5Z"
                    style={{
                        transform: `translateX(calc(${2 + eyeX}/14 * 100%)) translateY(calc(${3 + eyeY}/14 * 100%))`
                    }}
                    fill="#F2FFFF"
                />
                <path
                    d="M2 2H0V0H2V2Z"
                    style={{
                        transform: `translateX(calc(${3 + eyeX * 2}/14 * 100%)) translateY(calc(${5 + eyeY * 1.5}/14 * 100%))`
                    }}
                    fill="#2D31FF"
                />
                <path
                    d="M8 2H6V0H8V2Z"
                    style={{
                        transform: `translateX(calc(${3 + eyeX * 2}/14 * 100%)) translateY(calc(${5 + eyeY * 1.5}/14 * 100%))`
                    }}
                    fill="#2D31FF"
                />
            </svg>
        </div>
    );
});

export default Ghost;

export function EyesMovemetGhost({ id, color, size }) {
    const [ghostEye, setGhostEye] = useState({ x: 0, y: 0 });
    const ghostRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!ghostRef.current) return;
        const ghostPos = ghostRef.current?.getBoundingClientRect();
        setGhostEye({
            x: (event.clientX - ghostPos.left - ghostPos.width / 2) / (ghostPos.width / 2),
            y: (event.clientY - ghostPos.top - ghostPos.height / 2) / (ghostPos.height / 2)
        });
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <Ghost id={id} color={color} size={size} eyeX={ghostEye.x} eyeY={ghostEye.y} ref={ghostRef} />;
}