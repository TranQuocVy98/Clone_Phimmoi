import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import { ContextFilm, setSlugMovie } from '~/context/contextSlug';
import { useApiGetCategory } from '~/hooks/useApiGetCategory';
import { API_ENDPOINTS } from '~/utils/apiClient';
import Stylest from './Content.module.scss';
import MoiveItem from '../components/MoiveItem/MoiveItem';
import { SkeletonUi } from '../components/Skeleton';

const cx = classNames.bind(Stylest);

function Content() {
    const [endPoint, setEndPoint] = useState(API_ENDPOINTS.SERIES);

    // tách làm 3 cái useGetSeries, useGetCartoon, useGetTVShows
    // đưa cái endPoint state vào trong hook luôn
    const movieSeries = useApiGetCategory(endPoint);
    const movieCartoon = useApiGetCategory(API_ENDPOINTS.CARTOON);
    const movieTvShows = useApiGetCategory(API_ENDPOINTS.TVSHOWS);
    const [active, setActive] = useState('Phim Bộ Mới Cập Nhật');

    // ko hiểu lắm muốn làm gì ở đây
    const [, dispatch] = useContext(ContextFilm);
    const callbackFunction = (childData) => {
        dispatch(setSlugMovie(childData));
    };
    const CategoryFilm = ['Phim Bộ Mới Cập Nhật', 'Phim Lẻ Mới Cập Nhật', 'Phim Đã Hoàn Thành'];
    const handleClick = (film) => {
        setActive(film);
        if (film === 'Phim Bộ Mới Cập Nhật') setEndPoint(API_ENDPOINTS.SERIES);
        if (film === 'Phim Lẻ Mới Cập Nhật') setEndPoint(API_ENDPOINTS.TRENDING);
        if (film === 'Phim Đã Hoàn Thành') setEndPoint(API_ENDPOINTS.COMPELETE);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                {CategoryFilm.map((film) => (
                    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/db64898fa591f17827053ad3c2ddeafdf7297dd6/docs/rules/click-events-have-key-events.md
                    <p
                        key={film}
                        className={cx('tab', active === film ? 'active' : '')}
                        onClick={() => handleClick(film)}
                    >
                        {film}
                    </p>
                ))}
            </div>

            <div className={cx('list')}>
                {(movieSeries.isLoading && (
                    <>
                        <SkeletonUi /> <SkeletonUi />
                        <SkeletonUi />
                    </>
                )) ||
                    movieSeries.data
                        ?.slice(0, 16)
                        .map((movie) => (
                            <MoiveItem
                                parentCallback={callbackFunction}
                                slug={movie.slug}
                                key={movie._id}
                                data={movie}
                                hide
                            />
                        ))}
            </div>

            <div className={cx('title')}>
                <p className={cx('tab', `active`)}>Phim Hoạt Hình</p>
            </div>

            <div className={cx('list')}>
                {(movieCartoon.isLoading && (
                    <>
                        <SkeletonUi /> <SkeletonUi />
                    </>
                )) ||
                    movieCartoon.data
                        ?.slice(0, 16)
                        .map((movie) => (
                            <MoiveItem
                                parentCallback={callbackFunction}
                                key={movie._id}
                                data={movie}
                                slug={movie.slug}
                                hide
                            />
                        ))}
            </div>

            <div className={cx('title')}>
                <p className={cx('tab', `active`)}>Được Yêu Thích</p>
            </div>
            <div className={cx('list')}>
                {(movieTvShows.isLoading && (
                    <>
                        <SkeletonUi /> <SkeletonUi />
                    </>
                )) ||
                    movieTvShows.data
                        ?.slice(0, 16)
                        .map((movie) => (
                            <MoiveItem
                                key={movie._id}
                                parentCallback={callbackFunction}
                                data={movie}
                                slug={movie.slug}
                                hide
                            />
                        ))}
            </div>
        </div>
    );
}

export default Content;
