import classNames from 'classnames/bind';
import IntroMovie from '~/components/Layout/components/IntroMovie/IntroMovie';
import MoiveItem from '~/components/Layout/components/MoiveItem/MoiveItem';
import Footer from '~/components/Layout/Footer/Footer';
import Header from '~/components/Layout/Header';
import Sidebar from '~/components/Layout/Sidebar';
import { ContextFilm, setSlugMovie } from '~/context/contextSlug';
import { useContext, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useSearchMovie } from '~/hooks/useSearchMovie';
import Pagination from '~/components/Layout/components/Pagination/Pagination';
import { SkeletonUi } from '~/components/Layout/components/Skeleton';
import styles from '../pages.module.scss';

const cx = classNames.bind(styles);
function SearchMovie() {
    const { key } = useParams();
    const [page, setPage] = useState(1);

    const { data, totalMovie, isLoading } = useSearchMovie(key, page);
    const [, dispatch] = useContext(ContextFilm);
    function handlePageChange(page) {
        setPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const callbackFunction = (childData) => {
        dispatch(setSlugMovie(childData));
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <IntroMovie contents={{ name: `KẾT QUẢ TÌM KIẾM: "${key}"` }} />

            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('list-movie')}>
                        {isLoading && (
                            <>
                                <SkeletonUi />
                                <SkeletonUi />
                                <SkeletonUi />
                                <SkeletonUi />
                            </>
                        )}
                        {data?.map((movie) => (
                            <MoiveItem
                                parentCallback={callbackFunction}
                                slug={movie.slug}
                                key={movie._id}
                                data={movie}
                                hide
                            />
                        ))}
                    </div>
                    <Pagination data={totalMovie.totalItems} itemsPerPage={24} onChange={handlePageChange} />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

export default SearchMovie;
