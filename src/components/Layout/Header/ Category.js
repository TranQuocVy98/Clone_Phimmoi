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
    const years = ['2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];
    return (
        <div className={cx('menu-list')}>
            <Link className={cx('list', 'active')} to="/">
                TRANG CHỦ
            </Link>

            <div>
                <Tippy
                    interactive
                    placement="bottom-start"
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
                    interactive
                    placement="bottom-start"
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
                    interactive
                    placement="bottom-start"
                    offset={[0, -2]}
                    render={(attrs) => (
                        <div className={cx('year')} tabIndex="-1" {...attrs}>
                            <Popper>
                                {years?.map((year) => (
                                    <Link to={`/yearMovie/${year}`} key={year} className={cx('item', 'item-year')}>
                                        <p>{`Phim ${year}`}</p>
                                    </Link>
                                ))}
                            </Popper>
                        </div>
                    )}
                >
                    <div className={cx('list')}>PHIM MỚI </div>
                </Tippy>
            </div>
            <Link className={cx('list')} to="/categoryMovie/PHIM BỘ">
                PHIM BỘ
            </Link>
            <Link className={cx('list')} to="/categoryMovie/PHIM LẺ">
                PHIM LẺ
            </Link>
            <Link className={cx('list')} to="/categoryMovie/PHIM THUYẾT MINH">
                PHIM THUYẾT MINH
            </Link>

            <Link className={cx('list')} to="/categoryMovie/PHIM VIETSUB">
                PHIM VIETSUB
            </Link>

            <Link className={cx('list')} to="/categoryMovie/TV SHOW">
                TV SHOW
            </Link>
        </div>
    );
}

export default Category;
