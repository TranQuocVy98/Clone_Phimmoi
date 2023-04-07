import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './TagMovie.module.scss';

const cx = classNames.bind(styles);

function TagMovie() {
    return (
        <>
            <ul className={cx('tags')}>
                <li className={cx('caption')}>
                    Tags
                    <FontAwesomeIcon icon={faCaretRight} />
                </li>
                <li className={cx('tag-item')}>she and her perfect husband</li>
                <li className={cx('tag-item')}>định luật 80 20 của tình yêu</li>
            </ul>
            <p className={cx('keywords')}>
                xem phim Định Luật 80/20 Của Tình Yêu vietsub, phim She and Her Perfect Husband vietsub, xem Định Luật
                80/20 Của Tình Yêu vietsub online tap 1, tap 2, tap 3, tap 4, phim She and Her Perfect Husband ep 5, ep
                6, ep 7, ep 8, ep 9, ep 10, xem Định Luật 80/20 Của Tình Yêu tập 11, tập 12, tập 13, tập 14, tập 15,
                phim Định Luật 80/20 Của Tình Yêu tap 16, tap 17, tap 18, tap 19, tap 20, xem phim Định Luật 80/20 Của
                Tình Yêu tập 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
                45, 46, 47, 48, 49, 50, Định Luật 80/20 Của Tình Yêu tap cuoi, She and Her Perfect Husband vietsub tron
                bo, review Định Luật 80/20 Của Tình Yêu netflix, Định Luật 80/20 Của Tình Yêu wetv, Định Luật 80/20 Của
                Tình Yêu phimmoi, Định Luật 80/20 Của Tình Yêu youtube, Định Luật 80/20 Của Tình Yêu dongphym, Định Luật
                80/20 Của Tình Yêu vieon, phim keeng, bilutv, biphim, hdvip, hayghe, motphim, tvhay, zingtv, fptplay,
                phim1080, luotphim, fimfast, dongphim, fullphim, phephim, vtvgiaitri Định Luật 80/20 Của Tình Yêu full,
                She and Her Perfect Husband online, Định Luật 80/20 Của Tình Yêu Thuyết Minh, Định Luật 80/20 Của Tình
                Yêu Vietsub, Định Luật 80/20 Của Tình Yêu Lồng Tiếng
            </p>
        </>
    );
}

export default TagMovie;
