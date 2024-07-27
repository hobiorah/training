import { useState, useEffect } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });


//we're using a native hook
    useEffect(() => {
        console.log("initial windowsize to rezise")


        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });

            console.log("supposed to rezise")
        }

        handleResize();

        //this will allow you to always update the window when you want. use an event listener
        window.addEventListener("resize", handleResize);

        //use effect lets you execute code when a dependency chantes or when the application closes
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return windowSize;
}

export default useWindowSize;