import React from 'react';
import { TimeTrackerSummary } from './TimeTrackerSummary';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import moment from 'moment';

export class TimeTrackerFooter extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.handlePlayTimer = this.handlePlayTimer.bind(this);
        this.handleStopTimer = this.handleStopTimer.bind(this);
        this.handlePauseTimer = this.handlePauseTimer.bind(this);
        this.handleResetTime = this.handleResetTime.bind(this);
        this.handleAddTime = this.handleAddTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.state = {
            formTimer: false,
            timerPlay: false,
            timerPause: false,
            paused: false,
            editTime: false,
            currentCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            pausedCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            startTime: '00:00:00',
            startDate: moment().format('DD.MM.YYYY'),
            formats: {
                '5': '[0-5]',
                '9': '[0-9]'
            }
        };
    }
    handleChangeTime(e) {
        let val = e.target.value,
            timeArray = val.split(':'),
            hours = parseInt(timeArray[0]) > 0 ? parseInt(timeArray[0]) : 0,
            minutes = parseInt(timeArray[1]) > 0 ? parseInt(timeArray[1]) : 0,
            seconds = parseInt(timeArray[2]) > 0 ? parseInt(timeArray[2]) : 0;

        this.setState({
            startTime: val,
            paused: false,
            currentCounter: {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            },
            pausedCounter: {
                hours: hours,
                minutes: minutes,
                seconds: seconds,
            },
        })
    }
    handlePlayTimer(e) {
        e.preventDefault();

        this.setState({
            formTimer: true,
            timerPlay: true,
            timerPause: false,
            startTime: '00:00:00',
            currentCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            pausedCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            }
        });
        this.props.toggleSummaryShow(false);
        this.startTimer();
    }
    handleStopTimer(e) {
        e.preventDefault();

        this.setState({
            formTimer: false,
            timerPlay: false,
            timerPause: true,
            startTime: '00:00:00',
            currentCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            pausedCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
        });
        this.stopTimer();
    }
    handlePauseTimer(e) {
        e.preventDefault();

        this.setState({
            editTime: true,
            timerPause: !this.state.timerPause,
            timerPlay: !this.state.timerPlay
        });
        if(!this.state.timerPause) {
            this.setState({
                paused: true
            });
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }
    handleResetTime(e) {
        e.preventDefault();

        this.stopTimer();
        this.setState({
            startTime: '00:00:00',
            timerPause: true,
            editTime: true,
            timerPlay: false,
            currentCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            pausedCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            }
        });
    }
    handleAddTime(e) {
        e.preventDefault();

        setTimeout(function () {
            document.querySelectorAll('[name="timerTime"]')[0].focus();
        }, 400);
        this.stopTimer();
        this.props.toggleSummaryShow(false);
        this.setState({
            formTimer: true,
            timerPause: true,
            editTime: true,
            timerPlay: false,
            paused: false,
            startTime: '',
            currentCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
            pausedCounter: {
                hours: 0,
                minutes: 0,
                seconds: 0,
            }
        });
    }
    handleSubmit() {
        let timerName = document.querySelectorAll('[name="timerName"]')[0];
        let timerProject = document.querySelectorAll('[name="timerProject"]')[0];
        let timerTime = document.querySelectorAll('[name="timerTime"]')[0];
        let timerDate = document.querySelectorAll('[name="timerDate"]')[0];

        this.stopTimer();
        this.setState({
            timerPause: true,
            timerPlay: false
        });
        if(timerName.value.length
            && timerProject.value.length
            && timerTime.value.length
            && timerDate.value.length) {
            this.setState({
                formTimer: false,
                timerPause: true,
                editTime: false,
                timerPlay: false,
                startDate: moment().format('DD.MM.YYYY'),
                currentCounter: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                },
                pausedCounter: {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                }
            });
            this.props.toggleSubmited(false);
        }
    }
    handleChangeDate(e) {
        let dateEntered = e.format('DD.MM.YYYY').toString(16),
            dateEnteredArray = e.format('DD.MM.YYYY').split('.'),
            today = new Date();

        if(parseInt(today.getDate()) === parseInt(dateEnteredArray[0])) {
            dateEntered = 'сегодня';
        } else if (parseInt(today.getDate() + 1) === parseInt(dateEnteredArray[0])) {
            dateEntered = 'завтра';
        } else {
            dateEntered = e.format('DD.MM.YYYY').toString(16);
        }
        this.setState({
            startDate: dateEntered
        });
    }

    startTimer(){
        let _this = this,
            hours = parseInt(_this.state.pausedCounter.hours),
            minutes = parseInt(_this.state.pausedCounter.minutes),
            seconds = parseInt(_this.state.pausedCounter.seconds),
            currentHours = 0,
            currentMinutes = 0,
            currentSeconds = 0;

        if(_this.state.paused && seconds > 0) seconds++;
        this.timerId = setInterval(function () {
            if(seconds >= 59) {
                minutes++;
                seconds = -1;
            }
            if(minutes >= 59) {
                minutes = 0;
                hours++;
            }
            seconds++;
            currentHours = (hours < 10 ? '0' + hours : hours);
            currentMinutes = (minutes < 10 ? '0' + minutes : minutes);
            currentSeconds = (seconds < 10 ? '0' + seconds : seconds)
            _this.setState({
                currentCounter: {
                    hours: (hours < 10 ? '0' + hours : hours),
                    minutes: (minutes < 10 ? '0' + minutes : minutes),
                    seconds: (seconds < 10 ? '0' + seconds : seconds)
                },
                pausedCounter: {
                    hours: _this.state.currentCounter.hours,
                    minutes: _this.state.currentCounter.minutes,
                    seconds: _this.state.currentCounter.seconds
                },
                startTime: currentHours + ':' + currentMinutes + ':' + currentSeconds
            });
        }, 1000)
    }

    stopTimer(){
        clearInterval(this.timerId);
    }

    render() {
        let defaultBtn = {
                'backgroundColor': this.props.colors.defaultColor,
                'borderColor': this.props.colors.defaultColor
            },
            defaultInput = {
                'borderColor': this.props.colors.defaultColor,
                'color': this.props.colors.defaultColor
            },
            defaultBtnInherit = {
                'backgroundColor': 'none',
                'borderColor': 'none'
            };
        return (
            <footer className="timetracker__footer">
                <TimeTrackerSummary
                    summaryShow={this.props.summaryShow}
                    summaryTime={this.props.summaryTimeSate}
                    summaryTimeFunction={this.props.summaryTimeFunction}
                    toggleSummaryShow={this.props.toggleSummaryShow} />
                <form onSubmit={this.props.handleSubmitTimer} className="timetracker__footer">
                    <div onSubmit={this.props.submit} className="timetracker__footer-add">
                        <a style={defaultBtn} className="timetracker__add-btn btn-add" onClick={this.handleAddTime}>
                            <svg className="icon icon-add"><use xlinkHref="#icon-add"></use></svg>
                            Добавить время
                        </a>
                    </div>
                    <div className={"timetracker__footer-timer" + (this.state.formTimer ? ' active' : '') + (this.state.timerPlay ? ' played' : '') + (this.state.timerPause ? ' paused' : '')}>
                        <div className="timetracker__footer-form">
                            <label className="form-group">
                                <span className="form-label">
                                    Имя задачи <span className="red">*</span>
                                </span>
                                <input style={defaultInput} type="text" name="timerName" className="form-control" required />
                            </label>
                            <label className="form-group">
                                <span className="form-label">
                                    Проект <span className="red">*</span>
                                </span>
                                <input style={defaultInput} type="text" name="timerProject" className="form-control" required />
                            </label>
                            <label className="form-group">
                                <span className="form-label">
                                    Дата <span className="red">*</span>
                                </span>
                                <DatePicker
                                    style={defaultInput}
                                    autoFocus
                                    dateFormat="DD.MM.YYYY"
                                    value={this.state.startDate}
                                    locale="ru-ru"
                                    name="timerDate"
                                    className="form-control"
                                    onChange={this.handleChangeDate}
                                    shouldCloseOnSelect={false}
                                    isClearable={true}
                                    required
                                    disabledKeyboardNavigation />
                            </label>
                            <label className="form-group">
                                <span className="form-label">
                                    Описание
                                </span>
                                <textarea style={defaultInput} rows="5" className="form-control" name="timerDescription" ></textarea>
                            </label>
                        </div>
                        <InputMask
                            type="text"
                            name="timerTime"
                            value={this.state.startTime}
                            className="timetracker__add-input"
                            mask="99:59:59"
                            formatChars={this.state.formats}
                            readOnly={!this.state.editTime ? true : false}
                            onChange={this.handleChangeTime}
                            required />
                        <a className="event event-reset" onClick={this.handleResetTime}></a>
                        <a style={this.state.formTimer ? defaultBtnInherit : defaultBtn} className="timetracker__add-btn btn-timer" onClick={this.handlePlayTimer}>
                            <svg className="icon icon-timer"><use xlinkHref="#icon-timer"></use></svg>
                            Запустить таймер
                        </a>
                        <a className="timetracker__add-btn event event-cancel" onClick={this.handleStopTimer}>
                            <svg className="icon icon-cross"><use xlinkHref="#icon-cross"></use></svg>
                        </a>
                        <a className="timetracker__add-btn event event-pause" onClick={this.handlePauseTimer}>
                            <svg className="icon icon-pause"><use xlinkHref="#icon-pause"></use></svg>
                            <svg className="icon icon-play"><use xlinkHref="#icon-play"></use></svg>
                        </a>
                        <button className="timetracker__add-btn event event-add" onClick={this.handleSubmit}>
                            <svg className="icon icon-add"><use xlinkHref="#icon-add"></use></svg>
                        </button>
                    </div>
                </form>
            </footer>
        );
    }
}