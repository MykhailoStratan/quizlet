import React, { FC } from 'react';
import './Button.scss';

type ButtonProps = {
    className?: string;
    onClick?: () => void;
    children?: any;
    ref?: any;
}

const Button: FC<ButtonProps> = React.forwardRef(({ children, className='', onClick }, ref) => {
    return <button className={ `default-btn ${className}` } onClick={ onClick }>{children}</button>;
})

export default Button;
