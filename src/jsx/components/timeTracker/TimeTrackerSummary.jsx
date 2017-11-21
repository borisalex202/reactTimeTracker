import React from 'react';

export class TimeTrackerSummary extends React.Component {
    constructor(props) {
        super(props);
        this.toggleSummaryShow = this.toggleSummaryShow.bind(this);
        this.state = {
            summaryArray: (this.props.summaryTime).split(':')
        };
    }
    toggleSummaryShow() {
        this.setState({
            summaryArray: (this.props.summaryTime).split(':')
        });
        this.props.summaryTimeFunction();
        this.props.toggleSummaryShow(!this.props.summaryShow);
    }

    render() {
        return (
            <div className={this.props.summaryShow ? "timetracker__summary active" : "timetracker__summary"}>
                <span className="timetracker__summary-text"><span onClick={this.toggleSummaryShow}>Итог</span></span>

                <div className="timetracker__summary-items">
                    <div className="timetracker__summary-item">Часов: <span>{this.state.summaryArray[0]}</span></div>
                    <div className="timetracker__summary-item">Минут: <span>{this.state.summaryArray[1]}</span></div>
                    <div className="timetracker__summary-item">Секунд: <span>{this.state.summaryArray[2]}</span></div>
                </div>
            </div>
        );
    }
}