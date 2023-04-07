import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './FilmItem.module.scss';

const cx = classNames.bind(styles);

function FilmItem({ data, slug, parentCallback }) {
    const handleClickSlug = () => {
        parentCallback(slug);
    };
    return (
        <Link to={`/detailMovie/${slug}`}>
            <div onClick={handleClickSlug} className={cx('movie')}>
                {data.name}
                <br />
                <span className={cx('title')}>{data.origin_name}</span>
            </div>
        </Link>
    );
}

export default FilmItem;
