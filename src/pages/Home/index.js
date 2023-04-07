import classNames from 'classnames/bind';
import Content from '~/components/Layout/Content';
import Footer from '~/components/Layout/Footer/Footer';
import Header from '~/components/Layout/Header';
import Sidebar from '~/components/Layout/Sidebar';
import SliderMovie from '~/components/Layout/components/SliderMovie';
import styles from '../pages.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <SliderMovie />
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <Content />
                </div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

export default Home;
