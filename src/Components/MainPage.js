import { AddNewUser, AddPost, AddTodo, CompleteTodo, DeleteUser, GetAllUsers, Search, UpdateUser } from "./Utils";
import { Component } from "react";
import { getAllTodos } from "./DALtodos";
import { getAllPosts } from "./DALposts";
import UserComp from "./userComp";
import AddUser from "./AddUserComp";
import MainTodos from "./MainTodos";
import MainPosts from "./MainPosts";
import './StyleSheet.css';

export default class Users extends Component {
    constructor() {
        super()
        //states:
        this.state = {
            users: [],
            todos: [],
            posts: [],
            userSearch: [],
            usersAfterDelete: [],
            todosAndPostsVis: false,
            AddUserDisplay: false,
            todosAndPostsId: '',
            searchInput: '',
            pressed: ''
        }
    }

    //Saving all data from api in state when the main page loads.
    async componentDidMount() 
    {
        const users = await GetAllUsers()                                                           
        const todos = await getAllTodos()                                                           
        const posts = await getAllPosts()                                                          
        this.setState({ users: users, userSearch: users, todos: todos, posts: posts, search: '' })  
    } 

    //Handleing the input from the client in the search box and finding the corresponding users and presents them.
    handleChange = async (e) => 
    {                                  
        const { value } = e.target;                               
        const users = await Search(value, this.state.users)      
        this.setState({ userSearch: users, searchInput: value })
    }                                                          

    //Getting the userId of the user that the client want to delete,if the user's todos & posts where open then it will close it:
    handleDelete = (id) => 
    {
        const newArray = DeleteUser(id, this.state.userSearch)   
        this.setState({ userSearch: newArray, users: newArray }) 
        if (id === this.state.todosAndPostsId)               
            this.setState({ todosAndPostsVis: false })          
    }                                                          

    //Updating a user in the local Array:
    handleUpdate = (obj) => 
    {
        const UpdatedUsers = UpdateUser(this.state.userSearch, obj)      
        this.setState({ userSearch: UpdatedUsers, users: UpdatedUsers })
    }                                                                 

    //Adding a user to the local array and using the search  to prevent problems if you adding a user while searching.
    addUser = async (obj) => 
    {                                                
        let newusersArr = AddNewUser(obj, this.state.users)                  
        const userSearch = await Search(this.state.searchInput, newusersArr)
        this.setState({ users: newusersArr, userSearch: userSearch })       
    }                                                                    
    
    //Hiding AddUser componnent and show the TodosComponent & PostsComponent:
    showTDandPsts = (id) => 
    {
        this.hideAddUser()                     
        this.setState({ todosAndPostsId: id }) 
    }                                        
    
    //Changing the value of a individual todo from false to true:
    completeTodo = (id) => 
    {
        const todos = CompleteTodo(id, this.state.todos) 
        this.setState({ todos: todos })                 
    }                                                  
    
    // Saving id of the pressed user to color orangea user component:
    pressHendler = (id) => 
    {           
        this.setState({ pressed: id })
    }                                

    //Adding todo to the local array:
    addTodo = (title, userId) => {                              
        const newArr = AddTodo(title, userId, this.state.todos)
        this.setState({ todos: newArr })                      
    }
    
    //Adding post to the local array:
    addPost = (title, body, userId) => {                              
        const newArr = AddPost(title, body, userId, this.state.posts)
        this.setState({ posts: newArr })                            
    }

    //Function for AddUserComponent show/hide ---> toggling betwing true & false for the button add:
    changeDisplay = () => this.setState((prevState) => 
    ({ AddUserDisplay: !prevState.AddUserDisplay, todosAndPostsVis: false, pressed: '' }))

    //Changing the state of the todos & posts component to visible and it's trigered by pressing on the id label in the user component:
    showTodosAndPosts = () => this.setState({ todosAndPostsVis: true })

    //Hiding the AddUserComponent:
    hideAddUser = () => this.setState({ AddUserDisplay: false })

    render() {
        const usersComps = this.state.userSearch.map((user, index) => {
            return (<UserComp show={this.showTodosAndPosts} pressed={this.state.pressed} todosArr={this.state.todos} deleteFunc={this.handleDelete} callBack={this.handleUpdate} callback2={this.showTDandPsts} key={index} user={user} usersArray={this.state.userSearch} />)
        })
        return (<div className="mainDiv"><br />
            Search: <input className="search" type='text' onChange={this.handleChange} />
            <button className="addButton" onClick={this.changeDisplay}>Add</button><br /><br />
            {usersComps}
            <AddUser show={this.state.AddUserDisplay ? 'showAddUser' : 'hideAddUser'} callback1={this.addUser} callback2={this.hideAddUser} />
            <MainTodos addTodo={this.addTodo} visibility={this.state.todosAndPostsVis} pressedFunc={this.pressHendler} callback={this.completeTodo} id={this.state.todosAndPostsId} todos={this.state.todos} />
            <MainPosts addPost={this.addPost} visibility={this.state.todosAndPostsVis} pressedFunc={this.pressHendler} id={this.state.todosAndPostsId} posts={this.state.posts} />
        </div>)
    }
}