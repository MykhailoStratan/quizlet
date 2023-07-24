import { FC } from "react";
import './TextHighlight.scss';

const TextHighlight: FC<{   children?: string }> = ({ children }) => {
    return (
        <mark>
            <span className='text-to-highlight'>{ children }</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 60" preserveAspectRatio="none" stroke="#FF88BC"><path d="m 3.518915,27.827324 c 55.429038,4.081 111.581115,5.822 167.117815,2.867 22.70911,-1.208 45.39827,-0.601 68.126,-0.778 28.38172,-0.223 56.76078,-1.024 85.13721,-1.33 24.17378,-0.261 48.4273,0.571 72.58114,0.571"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 60" preserveAspectRatio="none" stroke="#FF88BC"><path d="m 3.518915,27.827324 c 55.429038,4.081 111.581115,5.822 167.117815,2.867 22.70911,-1.208 45.39827,-0.601 68.126,-0.778 28.38172,-0.223 56.76078,-1.024 85.13721,-1.33 24.17378,-0.261 48.4273,0.571 72.58114,0.571"/></svg>
        </mark>
    );
};

export default TextHighlight;