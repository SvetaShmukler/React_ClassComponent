import { Component } from "react";
import './StyleSheet.css';

export default class AddTodo extends Component {
    constructor() {
        super()
        this.state = {
            title: ''
        }
    }
    //Sending the new todo's data to the mainTodos component:
    addTodo = () => 
    {
        this.props.addTodo(this.state.title)
    }
    
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    render() {
        return (<div className="AddTodoDiv" style={{ display: this.props.showAddTodo ? 'block' : 'none' }}>
            <div className="AddTodoTitle" style={{ display: this.props.showAddTodo ? 'block' : 'none' }}>New Todo - User: {this.props.id}</div>
            <div className="AddTodoInnerDiv">
                Title:<input className="otherInputs" type='text' name="title" onChange={this.handleChange} /><br /><br/>
                <input className="addButton" type='button' onClick={this.props.hide} value='Cancel' />
                <input className="addButton" type='button' onClick={this.addTodo} value='Add' />
            </div>
        </div>)
    }
}