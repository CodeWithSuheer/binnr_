
import AnimatedCursor from 'react-animated-cursor';

function AnimCursor() {
    const isMobile = window.innerWidth < 600;

    return !isMobile ? (
        <AnimatedCursor
            innerSize={8}
            outerSize={30}
            color='32, 32, 32'
            outerAlpha={0.2}
            innerScale={0.9}
            outerScale={3}
            clickables={[
                'a',
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                'label[for]',
                'select',
                'textarea',
                'button',
                '.link',
            ]}
        />
    ) : null;
}

export default AnimCursor;
