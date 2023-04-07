import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import { Link, useParams } from 'react-router-dom';
import IntroMovie from '~/components/Layout/components/IntroMovie/IntroMovie';
import { SkeletonDetail } from '~/components/Layout/components/Skeleton';
import SliderMovie from '~/components/Layout/components/SliderMovie';
import StarRating from '~/components/Layout/components/StarRating/StarRating';
import TagMovie from '~/components/Layout/components/TagMovie/TagMovie';
import Footer from '~/components/Layout/Footer/Footer';
import Header from '~/components/Layout/Header';
import { useGetDetailMovie } from '~/hooks/useGetDetailMovie';
import styles from './WatchingMovie.module.scss';

const cx = classNames.bind(styles);

function WatchingMovie() {
    const { film } = useParams();
    const { data, episode, watchMovie, name, intro, isLoading } = useGetDetailMovie(film);
    const [watchingMovie, setWatchingMovie] = useState('');
    useEffect(() => {
        setWatchingMovie(watchMovie);
    }, [watchMovie]);
    const handleEpisodeFilm = (movie) => {
        setWatchingMovie(movie.link_embed);
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <IntroMovie contents={{ name, intro }} />
            {(isLoading && <SkeletonDetail width={980} height={540} />) || (
                <Iframe
                    width="980px"
                    height="540px"
                    src={watchingMovie || data.trailer_url}
                    loading="eager"
                    styles={{ border: 'none' }}
                />
            )}

            <div className={cx('episode')}>
                {episode?.map((movie) => (
                    <Link
                        onClick={() => handleEpisodeFilm(movie)}
                        key={movie.name}
                        className={cx('item', watchingMovie === movie.link_embed ? 'active' : '')}
                    >
                        Tập {movie.name}
                    </Link>
                ))}
            </div>

            <div className={cx('movie')}>
                <h1 className={cx('name')}>{data?.name}</h1>
                <h2 className={cx('real-name')}>{data?.origin_name}</h2>
                <p className={cx('short-description')}>
                    {data.content?.replace('<p>', '').replace('</p>', '')}[{' '}
                    <Link to={`/detailMovie/${data.slug}`}>Xem thêm</Link>]
                </p>
                <StarRating />
            </div>

            <div className={cx('list')}>
                <div className={cx('list-film')}>
                    <h2 className={cx('title-box')}>
                        <FontAwesomeIcon icon={faStar} className={cx('star-item')} />
                        <p>Có thể bạn muốn xem</p>
                    </h2>
                    <SliderMovie toggle="none" autoplaySpeed={false} />
                    <TagMovie />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default WatchingMovie;
