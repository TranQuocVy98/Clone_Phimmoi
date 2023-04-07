import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContextFilm, setSlugMovie } from '~/context/contextSlug';
import { useApiGetCategory } from '~/hooks/useApiGetCategory';
import { API_ENDPOINTS } from '~/utils/apiClient';
import { SkeletonSidebar } from '../components/Skeleton';
import styles from './Sidebar.module.scss';
import TrailerMovieItem from './TrailerMovieItem';

const cx = classNames.bind(styles);

function Sidebar() {
    const [page, setPage] = useState(1);
    const movieNew = useApiGetCategory(API_ENDPOINTS.NEW);
    const movieTrending = useApiGetCategory(`${API_ENDPOINTS.TRENDING}?page=${page}`);

    const [, dispatch] = useContext(ContextFilm);
    const Date = ['Ngày', 'Tuần', 'Tháng'];
    const [active, setActive] = useState('Ngày');
    let count = 1;
    const callbackFunction = (childData) => {
        dispatch(setSlugMovie(childData));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    const handleClick = (date) => {
        setActive(date);
        setPage(page + 1);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h4 className={cx('capital')}>Phim sắp chiếu</h4>

                <div className={cx('list-film')}>
                    {movieNew.isLoading && <SkeletonSidebar />}
                    {movieNew.data?.slice(0, 5).map((movie) => (
                        <TrailerMovieItem
                            data={movie}
                            key={movie._id}
                            slug={movie.slug}
                            parentCallback={callbackFunction}
                        />
                    ))}
                </div>
                <h4 className={cx('capital')}>Trending</h4>

                <div className={cx('tabs')}>
                    {Date.map((date) => (
                        <div
                            key={date}
                            className={cx('tab', active === date ? 'active' : '')}
                            onClick={() => handleClick(date)}
                        >
                            {date}
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('list-film')}>
                {movieTrending.isLoading && (
                    <>
                        <SkeletonSidebar height={40} width={280} />
                        <SkeletonSidebar height={40} width={280} />
                    </>
                )}
                {movieTrending.data?.slice(0, 10).map((movie) => (
                    <div onClick={() => callbackFunction(movie.slug)} key={movie._id} className={cx('list')}>
                        <span className={cx('number-rank')}>{count++}</span>
                        <Link className={cx('text')} to={`/detailMovie/${movie.slug}`}>
                            {movie.name}
                        </Link>
                        <div className={cx('count-view')}>{`${Math.floor(Math.random() * 1000)} lượt quan tâm`}</div>
                    </div>
                ))}
            </div>
            <h4 className={cx('capital')}>Từ khoá nổi bật</h4>
        </div>
    );
}

export default Sidebar;
