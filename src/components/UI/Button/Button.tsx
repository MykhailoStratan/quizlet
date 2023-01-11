import React, { FC } from 'react';

type ButtonProps = {
    className: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = React.forwardRef(({ children, className, onClick }, ref) => {
    return <button className={className} onClick={onClick}>{children}</button>;
})

export default Button;
