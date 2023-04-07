import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import IntroMovie from '~/components/Layout/components/IntroMovie/IntroMovie';
import MoiveItem from '~/components/Layout/components/MoiveItem/MoiveItem';
import Footer from '~/components/Layout/Footer/Footer';
import Header from '~/components/Layout/Header';
import Sidebar from '~/components/Layout/Sidebar';
import { ContextFilm, setSlugMovie } from '~/context/contextSlug';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Pagination from '~/components/Layout/components/Pagination/Pagination';
import { useApiGetCategory } from '~/hooks/useApiGetCategory';
import { API_ENDPOINTS } from '~/utils/apiClient';
import styles from '../pages.module.scss';
import { SkeletonUi } from '~/components/Layout/components/Skeleton';

const cx = classNames.bind(styles);
function CountryMovie() {
    const { country } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pages = searchParams.get('page');
    const [page, setPage] = useState(1);
    useEffect(() => setPage(pages), [pages]);
    const navigate = useNavigate();
    const { data, totalMovie, isLoading } = useApiGetCategory(`${API_ENDPOINTS.COUNTRY}/${country}`, page);
    const [, dispatch] = useContext(ContextFilm);
    function handlePageChange(newPage) {
        setPage(newPage);
        searchParams.set('page', newPage);
        navigate({
            search: searchParams.toString(),
        });
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    const callbackFunction = (childData) => {
        dispatch(setSlugMovie(childData));
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <Header />
                <IntroMovie contents={{ name: ` / ${country}` }} />

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
                                    hide={true}
                                />
                            ))}
                        </div>
                        <Pagination data={totalMovie.totalItems} itemsPerPage={24} onChange={handlePageChange} />
                    </div>
                    <Sidebar />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default CountryMovie;
