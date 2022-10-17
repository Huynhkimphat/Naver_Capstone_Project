import { useInView } from 'framer-motion';
import React, { useRef } from 'react';

const Scroll = (props) => {
    const ref = useRef(null);
    const isInView = useInView(ref, props.loop == "all" ? { all: true }:{once: true});
    // "translateY(800px)"
    return (
        <section ref={ref} className={props.style}>
            <div
                style={{
                    transform: isInView ? "none" : `${props.scroll}`,
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
                }}
            >
                {props.children}
            </div>
        </section>
    );
};

export default Scroll;