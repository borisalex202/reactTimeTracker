import React from 'react';

export class TimeTrackerSettings extends React.Component {
    constructor(props) {
        super(props);
        this.changeDefaultColor = this.changeDefaultColor.bind(this);
        this.changePrimaryColor = this.changePrimaryColor.bind(this);
        this.state = {
            defaultColorText: '#5BAAF1',
            primaryColorText: '#5BA9F0'
        };
    }

    changeDefaultColor(e) {
        let value = e.target.value.charAt(0) === '#' ? e.target.value : '#' + e.target.value;

        this.setState({
            defaultColorText: value
        });

        this.props.changeColor(e.target.name, value);
    }
     changePrimaryColor(e) {
        let value = e.target.value.charAt(0) === '#' ? e.target.value : '#' + e.target.value;

        this.setState({
            primaryColorText: value
        });

        this.props.changeColor(e.target.name, value);
    }

    render() {
        return (
            <div className={this.props.settingsForm ? "timetracker__header-settings active" : "timetracker__header-settings "}>
                <div className="timetracker__header-settings_row">
                    <div className="timetracker__header-settings_label">
                        Основной цвет
                    </div>
                    <div className="timetracker__header-settings_input">
                        <input type="text" value={this.state.defaultColorText} onChange={this.changeDefaultColor} maxLength="7" name="defaultColor" />
                    </div>
                </div>
                <div className="timetracker__header-settings_row">
                    <div className="timetracker__header-settings_label">
                        Второстепенный цвет
                    </div>
                    <div className="timetracker__header-settings_input">
                        <input type="text" value={this.state.primaryColorText} onChange={this.changePrimaryColor} maxLength="7" name="primaryColor" />
                    </div>
                </div>
            </div>
        );
    }
}