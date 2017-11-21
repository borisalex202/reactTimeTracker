import React from 'react';

export class ToDoListFooter extends React.Component {
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.add_input).focus();
    };
    render() {
        var defaultBtn = {},
            defaultInput = {};
        if(this.props.validForm) {
            defaultBtn = {
                'backgroundColor': this.props.colors.defaultColor,
                'borderColor': this.props.colors.defaultColor
            };
            defaultInput = {
                'borderColor': this.props.colors.defaultColor,
                'color': this.props.colors.defaultColor
            }
        }
        return (
            <footer>
                <form onSubmit={this.props.submit} className="todolist__footer">
                    <input style={defaultInput} onChange={this.props.change} ref="add_input" value={this.props.text} type="text" className={this.props.validForm ? 'todolist__add-input' : 'todolist__add-input no-text'} placeholder="Введите текст заметки" />
                    <button style={defaultBtn} className="todolist__add-btn" disabled={this.props.validForm ? false : true}>Добавить</button>
                </form>
            </footer>
        );
    }
}