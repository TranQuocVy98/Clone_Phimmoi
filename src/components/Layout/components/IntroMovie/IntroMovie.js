import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './IntroMovie.module.scss';

const cx = classNames.bind(styles);
function IntroMovie({ contents }) {
    const { name, content } = contents;
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('movie')}>
                <Link to="/">
                    <li>Mọt phim </li>
                </Link>

                <li>{content}</li>
                <li className={cx('active')}>{name}</li>
            </ul>
        </div>
    );
}

export default IntroMovie;
