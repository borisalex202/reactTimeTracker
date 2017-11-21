import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import InputMask from 'react-input-mask';

export class ToDoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleCompleteItem = this.handleCompleteItem.bind(this);
        this.handleEditItemTitle = this.handleEditItemTitle.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeTime = this.handleChangeTime.bind(this);
        this.state = {
            valueText: this.props.title,
            startDate: '',
            startTime: '',
            formats: {
                '2': '[0-2]',
                '4': '[0-4]',
                '5': '[0-5]',
                '9': '[0-9]'
            }
        };
    }
    handleEditItem(e) {
        this.props.toggleEditForm(this.props.index);
    }
    handleEditItemTitle(e) {
        this.setState({
            valueText: e.target.value
        });

        this.props.editTitle(this.props.index, e.target.value);
    }
    handleRemoveItem(e) {
        this.props.removeItem(this.props.index);
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
        var val = e.target.value,
            arrVal = val.split(':');

        if(parseInt(arrVal[0].charAt(0)) === 1) {
            this.setState({
                formats: {
                    '2': '[0-2]',
                    '4': '[0-9]',
                    '5': '[0-5]',
                    '9': '[0-9]'
                }
            });
        } else {
            this.setState({
                formats: {
                    '2': '[0-2]',
                    '4': '[0-4]',
                    '5': '[0-5]',
                    '9': '[0-9]'
                }
            });
        }
        this.setState({
            startTime: val
        });
    }

    render() {
        var completeItemStyles = {},
            completeItemText = {},
            defaultInput = {
                borderColor: this.props.colors.defaultColor,
                color: this.props.colors.defaultColor
            },
            defaultColor = {
                color: this.props.colors.defaultColor
            },
            backgroundColor = {
                backgroundColor: this.props.colors.defaultColor
            };
        if(this.props.complete) {
            completeItemStyles = {
                backgroundColor: this.props.colors.completeBgColor
            };
            completeItemText = {
                color: this.props.colors.textColor
            }
        }
        return (
            <div className={'todolist__item' + (this.props.complete ? ' complete' : '') + (this.props.editForm ? ' active' : '') + (!this.props.showCompletes && this.props.complete ? ' hidden' : '')} style={completeItemStyles}>
                <label className="checkbox">
                    <input type="checkbox" onChange={this.handleCompleteItem} />
                    <span className="checkbox__icon">
                        <span style={backgroundColor} className="checkbox__icon-checked"></span>
                    </span>
                    <span style={completeItemText} className="checkbox__text" title={this.props.title}>
                        {this.props.title}
                        <span style={defaultColor} className="date">{this.state.startDate} { this.state.startDate && this.state.startTime ? ' / ' : '' } {this.state.startTime}</span>
                    </span>
                </label>
                <div className={this.props.editForm ? "todolist__tools active" : "todolist__tools"}>
                    {this.props.editForm ? <button className="todolist__tools-item save" onClick={this.handleEditItem}></button> : <button className="todolist__tools-item info" onClick={this.handleEditItem}></button>}
                    <button className="todolist__tools-item remove" onClick={this.handleRemoveItem}></button>
                </div>
                <div className={this.props.editForm ? "todolist__edit active" : "todolist__edit"}>
                    <div className="todolist__edit-row">
                        <div style={completeItemText} className="todolist__edit-label">
                            Текст заметки:
                        </div>
                        <div className="todolist__edit-input">
                            <input style={defaultInput} type="text" className="todolist__edit-text" name="text" value={this.state.valueText} onChange={this.handleEditItemTitle} />
                        </div>
                    </div>
                    <div className="todolist__edit-row">
                        <div style={completeItemText} className="todolist__edit-label">
                            Дата заметки:
                        </div>
                        <div className="todolist__edit-input">
                            <div className="todolist__edit-time">
                                <DatePicker
                                    //minDate={moment()}
                                    dateFormat="DD.MM.YYYY"
                                    value={this.state.startDate}
                                    locale="ru-ru"
                                    onChange={this.handleChangeDate}
                                    isClearable={true}
                                    disabledKeyboardNavigation />
                            </div>
                        </div>
                    </div>
                    <div className="todolist__edit-row">
                        <div style={completeItemText} className="todolist__edit-label">
                            Время заметки:
                        </div>
                        <div className="todolist__edit-input">
                            <div className="todolist__edit-time">
                                <InputMask
                                    style={defaultInput}
                                    type="text"
                                    value={this.state.startTime}
                                    className="todolist__edit-text"
                                    mask="24:59"
                                    onChange={this.handleChangeTime}
                                    formatChars={this.state.formats} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}