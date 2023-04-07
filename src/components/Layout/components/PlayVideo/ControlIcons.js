import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { PlayArrowSharp, VolumeUp, Fullscreen, PauseSharp, VolumeOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import classNames from 'classnames/bind';
import { blueGrey } from '@mui/material/colors';
import styles from './PlayVideo.module.scss';

const primary = blueGrey[50];

const cx = classNames.bind(styles);

function ControlIcons({
    playandpause,
    playing,
    rewind,
    fastForward,
    played,
    onSeek,
    onSeekMouseUp,
    onSeekMouseDown,
    playedTime,
    fullMovieTime,
    muting,
    muted,
    volume,
    volumeChange,
    volumeSeek,
    playRate,
    playerbackRate,
    fullScreenMode,
    forward,
}) {
    const [controlVolume, setControlVolume] = useState(false);
    const hideVolume = () => {
        setTimeout(() => setControlVolume(false), 3000);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handlePopOver = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'playbackrate-popover' : undefined;

    function ValueLabelComponent(props) {
        const { children, value } = props;

        return (
            <Tooltip enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }

    const PrettoSlider = styled(Slider)({
        height: 5,

        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            height: 8,
            width: 8,
            backgroundColor: '#fff',
            border: '2px solid #fff',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&:before': {
                display: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1,
            fontSize: 8,
            background: '#fff',
            padding: 0,
            width: 20,
            height: 20,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: '#fff',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    });

    return (
        <div className={cx('controls__div')}>
            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="start"
                style={{ paddingLeft: 16, paddingRight: 16 }}
            />

            <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                style={{ paddingLeft: 16, paddingRight: 16 }}
            >
                <Grid item xs={12}>
                    <PrettoSlider
                        min={0}
                        max={100}
                        value={played * 100}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                        valueLabelDisplay="auto"
                        components={{
                            ValueLabel: ValueLabelComponent,
                        }}
                        sx={{
                            color: primary,
                            padding: '8px 0',
                        }}
                    />
                </Grid>

                <Grid item>
                    <Grid container alignItems="center" direction="row">
                        <IconButton className={cx('controls__icons')} aria-label="reqind" onClick={playandpause}>
                            {playing ? <PauseSharp fontSize="inherit" /> : <PlayArrowSharp fontSize="inherit" />}
                        </IconButton>

                        <IconButton
                            onMouseEnter={() => setControlVolume(true)}
                            onMouseLeave={hideVolume}
                            onClick={muting}
                            className={cx('controls__icons')}
                            aria-label="reqind"
                        >
                            {muted ? (
                                <VolumeOff className={cx('icon-relative')} fontSize="inherit" />
                            ) : (
                                <VolumeUp className={cx('icon-relative')} fontSize="inherit" />
                            )}
                        </IconButton>
                        {controlVolume && (
                            <Slider
                                sx={{
                                    color: primary,

                                    '& .MuiSlider-thumb': {
                                        width: 8,
                                        height: 8,
                                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                    },
                                }}
                                onChange={volumeChange}
                                onChangeCommitted={volumeSeek}
                                min={0}
                                max={100}
                                value={volume * 100}
                                aria-label="Volume"
                                aria-labelledby="vertical-slider"
                                orientation="vertical"
                                className={cx('volume__slider')}
                            />
                        )}

                        <Typography
                            style={{ color: 'white', fontSize: '12px' }}
                        >{`${playedTime} / ${fullMovieTime}`}</Typography>
                    </Grid>
                </Grid>

                <Grid item>
                    <IconButton className={cx('controls__icons')} aria-label="reqind">
                        <ArrowCircleLeftOutlinedIcon onClick={rewind} fontSize="inherit" />
                    </IconButton>
                    <IconButton className={cx('controls__icons')} aria-label="reqind">
                        <ArrowCircleRightOutlinedIcon onClick={forward} fontSize="inherit" />
                    </IconButton>
                    <IconButton className={cx('controls__icons')} aria-label="reqind">
                        <SkipNextIcon onClick={fastForward} fontSize="inherit" />
                    </IconButton>
                    <IconButton className={cx('controls__icons')} aria-label="reqind">
                        <SettingsIcon onClick={handlePopOver} fontSize="inherit" />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <Grid container direction="column-reverse">
                            {[0.5, 1, 1.5, 2].map((rate) => (
                                <Button variant="text" onClick={() => playRate(rate)}>
                                    <Typography color={rate === playerbackRate ? 'secondary' : 'default'}>
                                        {rate}
                                    </Typography>
                                </Button>
                            ))}
                        </Grid>
                    </Popover>

                    <IconButton onClick={fullScreenMode} className={cx('controls__icons')}>
                        <Fullscreen fontSize="inherit" />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default ControlIcons;
