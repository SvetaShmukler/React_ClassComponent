import { getPostsByUserID } from "./DALposts";
import { getTodosByUserID } from "./DALtodos";
import { getAllUsers, getUserByID } from "./DALusers";

const GetAllUsers = () => getAllUsers()//getting all users.
const GetUserByID = (id, UserArr) => getUserByID(id, UserArr)//get user by id.
const GetUsersTodos = (id, todosArr) => getTodosByUserID(id, todosArr)//get user's todos by it's ID.
const GetUsersPosts = (id, postsArr) => getPostsByUserID(id, postsArr)//get user's posts by it's ID.

//Checking if all of the todos of the user are completed:
const CheckIfCompleted = async (user, todosArr) => 
{ 
    const todos = await GetUsersTodos(user.id, todosArr)
    let check = true
    if (todos.length === 0)
        return false
    todos.forEach(todo => {
        if (!todo.completed)
            check = false
    });
    return check
}

//Searching for the  input in all the names and email in the users data:
const Search = async (str, users) => 
{
    const string = str.toUpperCase()
    return users.filter((user) => 
    ((user.name.toUpperCase().includes(string)) || (user.email.toUpperCase().includes(string))));
}

//Geting the user's address:
const getAddress = async (id, usersArray) => 
{ 
    const user = await GetUserByID(id, usersArray);
    return user.address;
}

//Updating the user in the local array:
const UpdateUser = (usersArr, NewUser) => 
{ 
    const index = usersArr.findIndex((user) => user.id === NewUser.id)
    usersArr.splice(index, 1, NewUser)
    return usersArr
}

//Adding the new user to the local array with new id:
const AddNewUser = (newUser, usersArr) => 
{
    const lastId = usersArr[usersArr.length - 1].id
    const user = { id: lastId + 1, ...newUser, address: { street: '', city: '', zipcode: '' } }
    const newArray = [...usersArr, user]
    return newArray
}

//Deleting a user from the local array:
const DeleteUser = (id, usersArr) => 
{
    const userIndex = usersArr.findIndex((user) => user.id === id);
    usersArr.splice(userIndex, 1);
    return usersArr;
}

//Geting todos of a specific user:
const GetTodosById = async (id, todosArr) => { 
    const todos = await GetUsersTodos(id, todosArr)
    return todos
}

//Geting the posts of a specific user:
const GetPostsById = async (id, postsArr) => 
{ 
    const posts = await GetUsersPosts(id, postsArr)
    return posts
}

//Completes a todo and updates it in the local array:
const CompleteTodo = (id, todosArr) => 
{ 
    const todo = todosArr.filter((todo) => todo.id === id)
    const index = todosArr.findIndex((todo) => todo.id === id)
    let Finaltodo = todo[0]
    Finaltodo.completed = true
    todosArr.splice(index, 1, Finaltodo)
    return todosArr;
}

//Adding a post to the local array and generates for it an ID:
const AddPost = (title, body, userId, postsArr) => 
{ 
    let arr = postsArr.filter((post) => post.userId === userId)
    let finalIndex = arr[arr.length - 1].id + 1;
    const newPost = { title: title, body: body, userId: userId }
    postsArr.splice(finalIndex, 0, newPost)
    return postsArr;
}

//Adding a todo to the local array and generates for it an ID:
const AddTodo = (title, userId, todosArr) => 
{ 
    let arr = todosArr.filter((todo) => todo.userId === userId)
    let finalIndex = arr[arr.length - 1].id;
    console.log(finalIndex);
    const newTodo = { userId: userId, id: finalIndex+1, title: title, completed: false }
    todosArr.splice(finalIndex, 0, newTodo)
    console.log(todosArr);
    return todosArr;
}

export {GetAllUsers,GetUserByID,CheckIfCompleted,Search,getAddress,UpdateUser,AddNewUser,DeleteUser,GetTodosById,GetPostsById,CompleteTodo,AddPost,AddTodo} 