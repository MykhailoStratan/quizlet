import { FC } from 'react';
import './Footer.scss';

const Footer: FC = () => {
    return (
            <footer>
                <span>
                    Created by&nbsp;
                    <a href='https://www.linkedin.com/in/mstratan/' target="_blank">Michael Stratan</a> with&nbsp;
                    <a href='https://react.dev/' target="_blank">React</a>,&nbsp;
                    <a href='https://www.typescriptlang.org/' target="_blank">Typescript</a>,&nbsp;
                    <a href='https://firebase.google.com/' target="_blank">Firebase</a> and&nbsp;
                    <a href='https://www.wordsapi.com/' target="_blank">WordsAPI</a>.
                    </span>
            </footer>
    );
};

export default Footer;