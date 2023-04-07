import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from 'src/assets/images';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);
function TrailerMovieItem({ slug, parentCallback, data }) {
    const handleClickSlug = () => {
        parentCallback(slug);
    };
    return (
        <div className={cx('film-item')}>
            <Link to={`/detailMovie/${slug}`}>
                <img
                    alt=""
                    onClick={handleClickSlug}
                    className={cx('avatar')}
                    src={`http://img.ophim1.cc/uploads/movies/${data.thumb_url}`}
                />
            </Link>
            <Link onClick={handleClickSlug} to={`/detailMovie/${slug}`} className={cx('name')}>
                {data.name}
            </Link>
            <p className={cx('real-time')}>{data.year}</p>
            <p className={cx('start')}>
                <img alt="star" src={images.start} />
                <img alt="star" src={images.start} />
                <img alt="star" src={images.start} />
                <img alt="star" src={images.start} />
                <img alt="star" src={images.start} />
            </p>
        </div>
    );
}

export default TrailerMovieItem;
