import { Component } from "react";
import './StyleSheet.css';

export default class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            show: ''
        }
    }
    //Adding new obj and sending to main page:
    Add = () => 
    {                                                        
        const newUser = { name: this.state.name, email: this.state.email }
        this.props.callback2()                                           
        this.props.callback1(newUser)                                   
    }                                                                  

    // Changing the fisibility of the component:
    componentDidUpdate() 
    {
        if (this.state.show !== this.props.show)
            this.setState({ show: this.props.show })         
    }

    //Handling the inputs from the client:
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    //Canceling---> to close component:
    Cancel = () => this.props.callback2()

    render() {
        return (<div className={this.state.show}><br />
            Name: <input className="userDataInput" name='name' onChange={this.handleChange} type='text' /><br /><br />
            Email: <input className="userDataInput" name='email' onChange={this.handleChange} type='text' /><br /><br />
            <button className="userButton" onClick={this.Cancel}>Cancel</button>
            <button className="userButton" onClick={this.Add}>Add</button>
        </div>)
    }
}