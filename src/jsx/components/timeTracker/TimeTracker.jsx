import React from 'react';
import ReactDOM from 'react-dom';
import { TimeTrackerHeader } from './TimeTrackerHeader';
import { TimeTrackerContent } from './TimeTrackerContent';
import { TimeTrackerFooter } from './TimeTrackerFooter';

export class TimeTracker extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitTimer = this.handleSubmitTimer.bind(this);
        this.clearEmptyForm = this.clearEmptyForm.bind(this);
        this.changeColor = this.changeColor.bind(this);
        this.toggleSettings = this.toggleSettings.bind(this);
        this.toggleSubmited = this.toggleSubmited.bind(this);
        this.toggleSummaryShow = this.toggleSummaryShow.bind(this);
        this.summaryTime = this.summaryTime.bind(this);
        this.state = {
            heading: 'Учет времени',
            items: [],
            colors: {
                defaultColor: '',
                primaryColor: '',
                textColor: ''
            },
            emptyForm: true,
            settingsForm: false,
            showCompletes: true,
            submitted: false,
            summaryShow: false,
            summaryTime: '00:00:00'
        };
    }

    handleSubmitTimer(e) {
        e.preventDefault();
        let timerName = e.target.timerName,
            timerProject = e.target.timerProject,
            timerDescription = e.target.timerDescription,
            timerTime = e.target.timerTime,
            timerDate = e.target.timerDate;

        // Reset the display of the edit form to false
        let currentItems = this.state.items;
        if(currentItems.length) {
            currentItems.map((item) =>
                item.editForm = false
            );
            this.setState({
                items: currentItems
            });
        }

        if(timerName.value.length
            && timerProject.value.length
            && timerTime.value.length
            && timerDate.value.length) {
            // Adding new item
            let newItem = {
                id: 'timer_' + getRandomInt(0, 100000),
                timerName: timerName.value,
                timerProject: timerProject.value,
                timerDescription: timerDescription.value,
                timerTime: timerTime.value,
                timerDate: timerDate.value
            };

            this.setState({
                items: this.state.items.concat(newItem),
                emptyForm: false,
                settingsForm: false
            });

            timerName.value = '';
            timerProject.value = '';
            timerDescription.value = '';
            timerTime.value = new Date();
            timerDate.value = '';
            this.summaryTime();
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
    }

    clearEmptyForm(e) {
        if(e) {
            this.setState({
                emptyForm: true
            });
        }
    }

    changeColor(name, val) {
        var colorsArray = this.state.colors;

        if(name && val) {
            Object.keys(colorsArray).map(() => (
                colorsArray[name] = val
            ));

            this.setState({
                colors: colorsArray
            });
        }
    }
    summaryTime() {
        let _this = this;

        setTimeout(function () {
            let currentItems = _this.state.items,
                hours = 0,
                minutes = 0,
                seconds = 0;

            if(currentItems.length > 0) {
                let result = '',
                    itemsTimeArray = [];

                currentItems.forEach(function(item) {
                    itemsTimeArray = item.timerTime.split(':');
                    hours += parseInt(itemsTimeArray[0]);
                    minutes += parseInt(itemsTimeArray[1]);
                    seconds += parseInt(itemsTimeArray[2]);
                });

                if(seconds > 59) {
                    minutes += parseInt(seconds/60);
                    seconds -= parseInt(seconds/60) * 60;
                }
                if(minutes > 59) {
                    hours += parseInt(minutes/60);
                    minutes -= parseInt(minutes/60) * 60;
                }
                result = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
                _this.setState({
                    summaryTime: result
                })
            } else {
                _this.setState({
                    summaryTime: '00:00:00'
                })
            }
        }, 1);
    }

    toggleSubmited(e) {
        this.setState({
            submitted: e
        });
    }

    toggleSettings(e) {
        this.setState({
            settingsForm: e
        });
    }
    toggleSummaryShow(e) {
        this.setState({
            summaryShow: e
        });
    }

    render() {
        let color,
            dateInput,
            datepickerStyles,
            summaryBtn;

        color = this.state.colors.defaultColor.length > 0 ? this.state.colors.defaultColor : '#5BAAF1';
        if(this.state.colors.defaultColor.length > 0 || this.state.colors.primaryColor.length > 0) {
            summaryBtn = '.timetracker__summary-text span, .timetracker__summary-text span:hover { background: ' + color + '; } .timetracker__summary-items { border-top: 1px solid ' + this.state.colors.primaryColor + '; }';
        }
        dateInput = '.react-datepicker__input-container input { border-color: ' + color + '; color: ' + color + ';} .react-datepicker__input-container input::-webkit-input-placeholder, .react-datepicker__input-container input:-moz-placeholder, .react-datepicker__input-container input::-moz-placeholder, .react-datepicker__input-container input:-ms-input-placeholder { color: ' + color + '; }';
        datepickerStyles = '.react-datepicker__header { background-color: ' + color + '; color: ' + color + '; } .react-datepicker__day--keyboard-selected { background-color: ' + color + '; }';

        return (
            <div className='timetracker'>
                <style>
                    {dateInput}
                    {datepickerStyles}
                    {summaryBtn}
                </style>
                <TimeTrackerHeader
                    heading={this.state.heading}
                    colors={this.state.colors}
                    settingsForm={this.state.settingsForm}
                    showCompletes={this.state.showCompletes}
                    changeColor={this.changeColor}
                    toggleSettings={this.toggleSettings}
                    summaryTime={this.summaryTime} />
                <TimeTrackerContent
                    items={this.state.items}
                    emptyForm={this.state.emptyForm}
                    colors={this.state.colors}
                    clearContent={this.clearEmptyForm}
                    summaryTime={this.summaryTime}
                    toggleSummaryShow={this.toggleSummaryShow} />
                <TimeTrackerFooter
                    colors={this.state.colors}
                    submitted={this.state.submitted}
                    summaryShow={this.state.summaryShow}
                    summaryTimeSate={this.state.summaryTime}
                    handleSubmitTimer={this.handleSubmitTimer}
                    toggleSummaryShow={this.toggleSummaryShow}
                    toggleSubmited={this.toggleSubmited}
                    summaryTimeFunction={this.summaryTime} />
            </div>
        );
    }
}