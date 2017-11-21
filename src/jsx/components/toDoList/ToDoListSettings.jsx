import React from 'react';

export class ToDoListSettings extends React.Component {
    constructor(props) {
        super(props);
        this.changeDefaultColor = this.changeDefaultColor.bind(this);
        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.changeTextColor = this.changeTextColor.bind(this);
        this.changeCompleteBgColor = this.changeCompleteBgColor.bind(this);
        this.state = {
            defaultColorText: this.props.colors.defaultColor,
            primaryColorText: this.props.colors.primaryColor,
            textColorText: this.props.colors.textColor,
            completeBgColorText: this.props.colors.completeBgColor
        };
    }

    changeDefaultColor(e) {
        if(e.target.value.length > 0) {
            this.setState({
                defaultColorText: e.target.value
            });

            this.props.changeColor(e.target.name, e.target.value);
        }
    }
     changePrimaryColor(e) {
        if(e.target.value.length > 0) {
            this.setState({
                primaryColorText: e.target.value
            });

            this.props.changeColor(e.target.name, e.target.value);
        }
    }
    changeTextColor(e) {
        if(e.target.value.length > 0) {
            this.setState({
                textColorText: e.target.value
            });

            this.props.changeColor(e.target.name, e.target.value);
        }
    }
    changeCompleteBgColor(e) {
        if(e.target.value.length > 0) {
            this.setState({
                completeBgColorText: e.target.value
            });

            this.props.changeColor(e.target.name, e.target.value);
        }
    }

    render() {
        return (
            <div className={this.props.settingsForm ? "todolist__header-settings active" : "todolist__header-settings "}>
                <div className="todolist__header-settings_row">
                    <div className="todolist__header-settings_label">
                        Основной цвет
                    </div>
                    <div className="todolist__header-settings_input">
                        <input type="text" value={this.state.defaultColorText} onChange={this.changeDefaultColor} maxLength="7" name="defaultColor" />
                    </div>
                </div>
                <div className="todolist__header-settings_row">
                    <div className="todolist__header-settings_label">
                        Второстепенный цвет
                    </div>
                    <div className="todolist__header-settings_input">
                        <input type="text" value={this.state.primaryColorText} onChange={this.changePrimaryColor} maxLength="7" name="primaryColor" />
                    </div>
                </div>
                <div className="todolist__header-settings_row">
                    <div className="todolist__header-settings_label">
                        Цвет текста выполненных заметок
                    </div>
                    <div className="todolist__header-settings_input">
                        <input type="text" value={this.state.textColorText} onChange={this.changeTextColor} maxLength="7" name="textColor" />
                    </div>
                </div>
                <div className="todolist__header-settings_row">
                    <div className="todolist__header-settings_label">
                        Фон выполненной заметки
                    </div>
                    <div className="todolist__header-settings_input">
                        <input type="text" value={this.state.completeBgColorText} onChange={this.changeCompleteBgColor} maxLength="7" name="completeBgColor" />
                    </div>
                </div>
            </div>
        );
    }
}