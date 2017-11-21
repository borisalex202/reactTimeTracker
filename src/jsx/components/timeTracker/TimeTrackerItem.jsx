import React from 'react';
import DatePicker from 'react-datepicker';
import InputMask from 'react-input-mask';

export class TimeTrackerItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleCompleteItem = this.handleCompleteItem.bind(this);
        this.handleEditItemTitle = this.handleEditItemTitle.bind(this);
        this.handleEditItemProject = this.handleEditItemProject.bind(this);
        this.handleEditItemDescription = this.handleEditItemDescription.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.state = {
            formats: {
                '2': '[0-2]',
                '4': '[0-4]',
                '5': '[0-5]',
                '9': '[0-9]'
            }
        };
    }
    handleEditItem(e) {
        let _this = this;
        this.props.toggleEditForm(this.props.index);
        this.props.toggleSummaryShow(false);
        setTimeout(function () {
            _this.props.summaryTime();
        }, 300);
    }
    handleEditItemTitle(e) {
        this.props.editTitle(this.props.index, e.target.value);
    }
    handleEditItemProject(e) {
        this.props.editProject(this.props.index, e.target.value);
    }
    handleEditItemDescription(e) {
        this.props.editDescription(this.props.index, e.target.value);
    }
    handleRemoveItem(e) {
        let _this = this;

        this.props.toggleSummaryShow(false);
        this.props.removeItem(this.props.index);
        setTimeout(function () {
            _this.props.summaryTime();
        }, 300);
    }
    handleCompleteItem(e) {
        if(this.props.complete) {
            e.target.checked = false;
        } else {
            e.target.checked = true;
        }
        this.props.completeItem(this.props.index);
    }
    handleChangeDate(e) {
        var dateEntered = e.format('DD.MM.YYYY').toString(16),
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
    handleChangeTime(e) {
        this.setState({
            startTime: e.target.value
        });
        this.props.editTime(this.props.index, e.target.value);
    }

    render() {
        var defaultInput = {
                borderColor: this.props.colors.defaultColor,
                color: this.props.colors.defaultColor
            },
            defaultColor = {
                color: this.props.colors.defaultColor
            },
            backgroundColor = {
                backgroundColor: this.props.colors.defaultColor
            };
        return (
            <div className={'timetracker__item' + (this.props.complete ? ' complete' : '') + (this.props.editForm ? ' active' : '') + (!this.props.showCompletes && this.props.complete ? ' hidden' : '')}>
                <div className="timetracker__item-line">
                    <span className="timetracker__item-info" title={this.props.item.timerName}>
                        <span className="timetracker__item-info">{this.props.item.timerName}</span>
                        <span className="timetracker__item-project">{this.props.item.timerProject}</span>
                        <span className="timetracker__item-description">{this.props.item.timerDescription}</span>
                        <span style={defaultColor} className="date">{this.props.item.timerDate} { this.props.item.timerDate && this.props.item.timerTime ? ' / ' : '' } {this.props.item.timerTime}</span>
                    </span>
                </div>
                <div className={this.props.editForm ? "timetracker__tools active" : "timetracker__tools"}>
                    {this.props.editForm ? <button className="timetracker__tools-item save" onClick={this.handleEditItem}></button> : <button className="timetracker__tools-item info" onClick={this.handleEditItem}></button>}
                    <button className="timetracker__tools-item remove" onClick={this.handleRemoveItem}></button>
                </div>
                <div className={this.props.editForm ? "timetracker__edit active" : "timetracker__edit"}>
                    <div className="timetracker__edit-row">
                        <div className="timetracker__edit-label">
                            Имя задачи:
                        </div>
                        <div className="timetracker__edit-input">
                            <input style={defaultInput} type="text" className="timetracker__edit-text" value={this.props.item.timerName} onChange={this.handleEditItemTitle} />
                        </div>
                    </div>
                    <div className="timetracker__edit-row">
                        <div className="timetracker__edit-label">
                            Проект:
                        </div>
                        <div className="timetracker__edit-input">
                            <input style={defaultInput} type="text" className="timetracker__edit-text" value={this.props.item.timerProject} onChange={this.handleEditItemProject} />
                        </div>
                    </div>
                    <div className="timetracker__edit-row">
                        <div className="timetracker__edit-label">
                            Дата/время:
                        </div>
                        <div className="timetracker__edit-input date">
                            <div className="timetracker__edit-time">
                                <DatePicker
                                    dateFormat="DD.MM.YYYY"
                                    value={this.props.item.timerDate}
                                    locale="ru-ru"
                                    onChange={this.handleChangeDate}
                                    isClearable={true}
                                    disabledKeyboardNavigation />
                            </div>
                        </div>
                        <div className="timetracker__edit-input time">
                            <div className="timetracker__edit-time">
                                <InputMask
                                    style={defaultInput}
                                    type="text"
                                    value={this.props.item.timerTime}
                                    className="timetracker__edit-text"
                                    mask="99:59:59"
                                    onChange={this.handleChangeTime}
                                    formatChars={this.state.formats} />
                            </div>
                        </div>
                    </div>
                    <div className="timetracker__edit-row">
                        <div className="timetracker__edit-label">
                            Описание:
                        </div>
                        <div className="timetracker__edit-input">
                            <textarea rows="4" style={defaultInput} className="timetracker__edit-text description" value={this.props.item.timerDescription} onChange={this.handleEditItemDescription} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}