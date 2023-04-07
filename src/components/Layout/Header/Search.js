import classNames from 'classnames/bind';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Wrapper as Popper } from '~/components/Layout/components/Popper';
import HeadlessTippy from '@tippyjs/react/headless';
import { ContextFilm, setSlugMovie } from '~/context/contextSlug';
import useDebounce from '~/hooks/useDebounce';
import { axiosInstance } from '~/utils/axiosInStance';
import { API_ENDPOINTS } from '~/utils/apiClient';
import { useNavigate } from 'react-router-dom';
import FilmItem from '../components/FilmItem';
import Stylest from './Header.module.scss';

const cx = classNames.bind(Stylest);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const inputRef = useRef();
    const debouncedValue = useDebounce(searchValue, 500);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        // tạo custom hook riêng, ko có để như vầy trong component
        const fetchApi = async () => {
            try {
                const response = await axiosInstance.get(`${API_ENDPOINTS.SEARCH}keyword=${debouncedValue}`);
                const result = response.data.data.items.slice(0, 6);
                console.log('response', response);
                setSearchResult(result);
            } catch (error) {
                console.log('error', error);
            }
        };

        fetchApi();
    }, [debouncedValue]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        // ko có re-declare variable / state. Xài eslint cho quen đi
        const searchValue = e.target.value;
        setSearchValue(searchValue);

        if (searchValue.length === 0) {
            setShowResult(false);
        }
        if (searchValue.length > 0) {
            setShowResult(true);
        }
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const [, dispatch] = useContext(ContextFilm);

    const callbackFunction = (childData) => {
        dispatch(setSlugMovie(childData));
    };
    const navigate = useNavigate();
    const handleDataSearch = () => {
        navigate(`/searchMovie/${searchValue}`);
    };

    return (
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                placement="bottom-start"
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Popper>
                            <ul className={cx('list-movie')}>
                                <li className={cx('movie-title')}>
                                    Kết quả tìm kiếm cho cho từ khoá: <span>"{searchValue}"</span>
                                </li>
                                <li className={cx('movie-title')}>
                                    <strong>Phim</strong>
                                </li>
                                {searchResult?.map((item) => (
                                    <FilmItem
                                        key={item._id}
                                        parentCallback={callbackFunction}
                                        slug={item.slug}
                                        data={item}
                                    />
                                ))}

                                <li className={cx('movie-title', 'movie-list-end')} onClick={handleDataSearch}>
                                    <p>Tìm tất cả kết quả từ khoá </p>
                                </li>
                            </ul>
                        </Popper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <input
                    className={cx('search-input')}
                    type="text"
                    placeholder="V.d: tên phim, tên diễn viên..."
                    spellCheck={false}
                    value={searchValue}
                    onChange={handleChange}
                    ref={inputRef}
                    onFocus={() => setShowResult(true)}
                />
            </HeadlessTippy>
        </div>
    );
}

export default Search;
