import { GetTodosById } from "./Utils";
import { Component } from "react";
import AddTodo from "./addTodo";
import Todo from "./Todo";
import './StyleSheet.css';

export default class MainTodos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            title: '',
            id: '',
            add: false,
            showAddTodo: false,
        }
    }
    //If the userId was changed --->  update the component with the correct todos:
    async componentDidUpdate() 
    {
        if ((this.props.id !== this.state.id) || this.state.add) {                         
            const todos = await GetTodosById(this.props.id, this.props.todos)             
            this.setState({ id: this.props.id, todos: todos, add: false })               
            this.props.pressedFunc(this.props.id)                                       
        }
    }

    //Sending a new todo to the main page and hiding the add todo div:
    addTodo = (title) => 
    {
        this.props.addTodo(title, this.props.id)            
        this.showAddTodo()                                 
        this.setState({ add: true })               
    }
    
    //handling the input from the client:
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    //toggling the visibility of the todos divs:
    showAddTodo = () => this.setState((prevState) => ({ showAddTodo: !prevState.showAddTodo }))
    render() {
        const todosMapper = this.state.todos.map((todo, index) => <Todo key={index} todo={todo} completeTodo={this.props.callback} />)
        return (<div style={{ display: this.props.visibility ? 'block' : 'none' }} className='MainTodosDiv' >
            <div style={{ display: this.state.showAddTodo ? 'none' : 'block' }} className="todosTitle">Todos: User {this.props.id}<input value='Add' className='addButton2' onClick={this.showAddTodo} type='button' /></div>
            <div style={{ display: this.state.showAddTodo ? 'none' : 'block' }} className='todosDiv' >{todosMapper}</div>
            <AddTodo id={this.props.id} showAddTodo={this.state.showAddTodo} hide={this.showAddTodo} addTodo={this.addTodo}/>
        </div>)
    }
}