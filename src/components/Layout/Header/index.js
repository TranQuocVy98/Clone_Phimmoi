import classNames from 'classnames/bind';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faRightToBracket, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Category from './ Category';
import Search from './Search';
import Stylest from './Header.module.scss';

const cx = classNames.bind(Stylest);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Link to="/">
                    <img alt="MotPhimTV" title="Mọt phim TV" src={images.logo} />
                </Link>

                <div className={cx('header')}>
                    <div className={cx('search')}>
                        <Search />
                        <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                        <p className={cx('suggest')}>Công cụ tìm kiếm phim.</p>
                    </div>

                    <div className={cx('user')}>
                        <li className={cx('user-menu')}>
                            <FontAwesomeIcon className={cx('user-menu-icon')} icon={faRightToBracket} />
                            <p onClick={() => alert('Chức năng này đang cập nhật')}> Đăng nhập</p>
                        </li>
                        <li className={cx('user-menu')}>
                            <FontAwesomeIcon className={cx('user-menu-icon')} icon={faUsers} />
                            <p onClick={() => alert('Chức năng này đang cập nhật')}> Đăng ký </p>
                        </li>
                        <li className={cx('user-menu')}>
                            <FontAwesomeIcon className={cx('user-menu-icon')} icon={faBookmark} />
                            <p onClick={() => alert('Chức năng này đang cập nhật')}> Bookmark </p>
                        </li>
                    </div>
                </div>
            </div>
            <Category />
        </div>
    );
}

export default Header;
