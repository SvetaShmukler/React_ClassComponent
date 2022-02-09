import { getAddress } from "./Utils";
import { Component } from "react";
import './StyleSheet.css';
export default class OtherData extends Component {
    constructor() {
        super()
        this.state = {
            id: 0,
            address: {},
            street: '',
            city: '',
            zip: '',
            change: false
        }
    }
    // The address is loading when component is mounted:
    async componentDidMount() 
    {                                                            
        this.setState({ address: await getAddress(this.props.id, this.props.userArray) }) 
    } 
    
    //If the useId was changed,when user deleted ---> getting the correct user address:
    async componentDidUpdate() 
    {
        if (this.state.id !== this.props.id) { 
            this.setState({ address: await getAddress(this.props.id, this.props.userArray) }) 
            this.setState({ street: this.state.address.street, city: this.state.address.city, zip: this.state.address.zipcode, id: this.props.id })
        }
        if (this.state.change) { 
        //If there was a change in either of the inputs then update the address by using a callback function.
            this.props.callBack({ street: this.state.street, city: this.state.city, zipcode: this.state.zip })
            this.setState({ change: false })
        }
    }
    // Handling the inputs from the client. and trigering the update in the function above:
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value, change: true })

    render() {
        return (<div className={this.props.show ? 'otherDataShow' : 'otherDataHide'}>
            Street: <input className="userDataInput" type='text' name='street' value={this.state.street} onChange={(e) => this.handleChange(e)} /><br />
            City: <input className="userDataInput" type='text' name='city' value={this.state.city} onChange={(e) => this.handleChange(e)} /><br />
            Zip Code: <input className="userDataInput" type='text' name='zip' value={this.state.zip} onChange={(e) => this.handleChange(e)} /><br />
        </div>)
    }
}