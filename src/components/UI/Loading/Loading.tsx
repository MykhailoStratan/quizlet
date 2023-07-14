import { FC } from "react";
import './Loading.scss';

const Loading: FC = () => {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
}

export default Loading;