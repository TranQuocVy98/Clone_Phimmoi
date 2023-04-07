import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Stylest from './MoiveItem.module.scss';

const cx = classNames.bind(Stylest);

function MoiveItem({ hide = false, slug, parentCallback, data }) {
    const handleClickSlug = () => {
        parentCallback(slug);
    };
    return (
        <Link to={`/detailMovie/${slug}`}>
            <div onClick={handleClickSlug} className={cx('item', `${hide && 'item-list'}`)}>
                <span className={cx('lable')}>{data.episode_current || 'Full'}</span>
                <img
                    className={cx('img', `${hide && 'img-list'}`)}
                    src={`https://img.hiephanhthienha.com/uploads/movies/${data.thumb_url}`}
                    alt="images"
                />
                <i className={cx('icon-play')} />
                <p className={cx('title', `${hide && 'title-list'}`)}>{data.name}</p>
            </div>
        </Link>
    );
}

export default MoiveItem;
