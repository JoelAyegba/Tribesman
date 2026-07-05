import { useEffect, useRef, useState } from 'react';

/**
 * A custom React Hook that tracks when an element enters the viewport.
 * Returns a ref for targeting the element and a boolean indicating visibility.
 * 
 * @param {Object} options Options configuration for IntersectionObserver
 * @param {boolean} [options.triggerOnce=true] Whether the animation should trigger only once
 * @param {number} [options.threshold=0.1] Ratio of element intersection that must be visible
 * @param {string} [options.rootMargin='0px 0px -50px 0px'] Viewport boundary offsets
 */
export const useScrollReveal = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const triggerOnce = options.triggerOnce !== false;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (triggerOnce && elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            } else if (!triggerOnce) {
                setIsVisible(false);
            }
        }, {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -50px 0px',
            ...options
        });

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement && !triggerOnce) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return [elementRef, isVisible];
};
