import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Wrapper as Popper } from '~/components/Layout/components/Popper';
import { useApiGetCategory } from '~/hooks/useApiGetCategory';
import { API_ENDPOINTS } from '~/utils/apiClient';
import Stylest from './Header.module.scss';

const cx = classNames.bind(Stylest);

function Category() {
    const countries = useApiGetCategory(API_ENDPOINTS.COUNTRY).data;
    const categories = useApiGetCategory(API_ENDPOINTS.CATEGORIES).data;
    const years = [
        'Phim 2022',
        'Phim 2021',
        'Phim 2020',
        'Phim 2019',
        'Phim 2018',
        'Phim 2017',
        'Phim 2016',
        'Phim 2015',
        'Phim 2014',
    ];
    const page = 1;
    return (
        <div className={cx('menu-list')}>
            <Link className={cx('list', 'active')} to={'/'}>
                TRANG CHỦ
            </Link>

            <div>
                <Tippy
                    interactive={true}
                    placement={'bottom-start'}
                    offset={[0, -2]}
                    render={(attrs) => (
                        <div className={cx('category')} tabIndex="-1" {...attrs}>
                            <Popper>
                                {categories?.map((category) => (
                                    <Link to={`/listMovie/${category.slug}`} key={category._id} className={cx('item')}>
                                        <p>{category.name}</p>
                                    </Link>
                                ))}
                            </Popper>
                        </div>
                    )}
                >
                    <div className={cx('list')}>THỂ LOẠI </div>
                </Tippy>
            </div>
            <div>
                <Tippy
                    interactive={true}
                    placement={'bottom-start'}
                    offset={[0, -2]}
                    render={(attrs) => (
                        <div className={cx('country')} tabIndex="-1" {...attrs}>
                            <Popper>
                                {countries?.map((country) => (
                                    <Link to={`/countries/${country.slug}`} key={country._id} className={cx('item')}>
                                        <p>{country.name}</p>
                                    </Link>
                                ))}
                            </Popper>
                        </div>
                    )}
                >
                    <div className={cx('list')}>QUỐC GIA </div>
                </Tippy>
            </div>
            <div>
                <Tippy
                    interactive={true}
                    placement={'bottom-start'}
                    offset={[0, -2]}
                    render={(attrs) => (
                        <div className={cx('year')} tabIndex="-1" {...attrs}>
                            <Popper>
                                {years?.map((year) => (
                                    <Link to={`/`} key={year} className={cx('item', 'item-year')}>
                                        <p>{year}</p>
                                    </Link>
                                ))}
                            </Popper>
                        </div>
                    )}
                >
                    <div className={cx('list')}>PHIM MỚI </div>
                </Tippy>
            </div>
            <Link className={cx('list')} to={`/categoryMovie/PHIM BỘ/?page=${page}`}>
                PHIM BỘ
            </Link>
            <Link className={cx('list')} to={`/categoryMovie/PHIM LẺ/?page=${page}`}>
                PHIM LẺ
            </Link>
            <Link className={cx('list')} to={`/categoryMovie/PHIM THUYẾT MINH/?page=${page}`}>
                PHIM THUYẾT MINH
            </Link>

            <Link className={cx('list')} to={`/categoryMovie/PHIM VIETSUB/?page=${page}`}>
                PHIM VIETSUB
            </Link>

            <Link className={cx('list')} to={`/categoryMovie/TV SHOW/?page=${page}`}>
                TV SHOW
            </Link>
        </div>
    );
}

export default Category;
