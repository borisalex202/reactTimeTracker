import React from 'react';
import ReactDOM from 'react-dom';
import { TimeTracker } from './components/timeTracker/TimeTracker';

const appId = document.getElementById('app');

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <TimeTracker />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    appId
);