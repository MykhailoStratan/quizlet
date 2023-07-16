import { FC } from "react";
import './SplitText.scss';

const SplitText: FC<{ children: string }> = ({ children }) => {
    return (
        <span>
            { children.split("").map((char: string, index: number) => {
                let style: React.CSSProperties = { animationDelay: (0.5 + index / 10) + "s" };

                return <span
                    key={ index }
                    style={ style }>{ char }</span>;
            }) }
        </span>
    );
};

export default SplitText;
