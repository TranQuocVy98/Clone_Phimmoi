import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import classNames from 'classnames/bind';
import styles from './StarRating.module.scss';

const cx = classNames.bind(styles);

export default function StarRating() {
    const [rating, setRating] = useState(0);
    const [star, setStar] = useState('');
    const [numberStar, setNumberStar] = useState(0);

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate);
        setNumberStar(numberStar + 1);
    };
    const onPointerEnter = () => {};
    const onPointerLeave = () => {
        setStar('');
    };
    const onPointerMove = (value, index) => {
        setStar(`${value}/10`);
    };

    return (
        <div className="wrapper">
            <Rating
                onClick={handleRating}
                onPointerEnter={onPointerEnter}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                iconsCount={10}
                transition
                allowFraction
                size={17}
            />
            <div className={cx('average')}>
                <span className={cx('hint')}>{star}</span>
                <span className={cx('rate_count')}> {`( ${rating} điểm / ${numberStar} lượt )`} </span>
            </div>
        </div>
    );
}
