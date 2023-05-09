import { useEffect, useState } from "react";
import Header from "../Header";
import { motion } from 'framer-motion';

const Todo = () => {
    const [task, setTask] = useState("");
    const [error, setError] = useState({
        msg: "",
        color: "",
    });
    const [editFlag, setEditFlag] = useState(false);
    const [editElem, setEditElem] = useState(null);
    const [editId, setEditId] = useState(null);
    const [todos, setTodos] = useState([]);


    useEffect(()=>{
        let tasking = getLocalStorage();
        setTodos(tasking);
    }, [])

    const displayAlert = (msg, color) => {
        setError({
            msg,
            color
        });
        setTimeout(() => {
            setError({
                msg : "", color : ""
            });
        }, 2000);
    }
    
    const setDefault = () => {
        setTask("");
        setError({msg: "", color: ""});
        setEditElem(null);
        setEditId(null);
        setEditFlag(false);
    }

    const getLocalStorage = () => {
        return (localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []);
    }

    const delMe = (id) => {
        setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
        let task = getLocalStorage().filter(item => item.id !== id);
        localStorage.setItem("tasks", JSON.stringify(task));   
    };

    const addedToLocaleStorage = (obj) => {
        let task = getLocalStorage();
        task.push(obj);
        localStorage.setItem("tasks", JSON.stringify(task));
    };

    const editedLocalStorage = (id, task) => {
        let tasking = getLocalStorage();
        tasking = tasking.map(item => item.id === id ? {...item, task} : item);
        localStorage.setItem("tasks", JSON.stringify(tasking));
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(task && !editFlag) {
            let id= new Date().getTime().toString(16);
            let TodoTask= {id, task}
            setTodos(prevTodos => [...prevTodos, TodoTask]);
            displayAlert("Added Item", "lightgreen");
            addedToLocaleStorage(TodoTask);
            setTimeout(() => {
                setDefault();
            }, 2500);
        }else if(task && editFlag) {
            editElem.childNodes[0].textContent = task;
            editedLocalStorage(editId, task);
            displayAlert("Item Edited", "lightgreen");
            setTimeout(() => {
                setDefault();
            }, 2500);
        }else {
            displayAlert("Invalid", "red");
        }
    }

    return(
        <>
            <Header />
            <div className="todo-project">
                <h1 className="todo-title">Todo Application</h1>
                <section className="display-head">
                    <header className="display-master">
                        <h2 className="author">Da-Hubb</h2>
                        <motion.p className="alert" style={{color: `${error.color}`}}
                            animate={{scale: error.msg ? 1 : 0}}
                            initial={{scale: 0}}
                            transition={{type: "spring", bounce: 1}}
                        >{error.msg}</motion.p>
                    </header>
                    <form className="task-form" onSubmit={handleSubmit}>
                        <label htmlFor="inputTask">
                            Todo Task :
                            <input
                                type="text"
                                placeholder="eg: Drink water"
                                id="inputTask"
                                value={task}
                                onChange={e => {setTask(e.currentTarget.value)}}
                            />
                        </label>
                        <button type="submit" className="submit-btn" style={{
                            backgroundColor: editFlag ? "lightgreen" : "orangered"
                        }}>
                            {editFlag ? "Edit Item" : "Add Item"}
                        </button>
                    </form>
                    <main className="display-task">
                        {
                            todos.map((item) => {
                                let {id, task} = item;
                                return (
                                    <motion.article className="task" key={id} id={id}
                                        animate={{scale: 1}}
                                        initial={{scale: 0}}
                                        transition={{type: "spring", bounce: 1}}
                                    >
                                        <p className="task-text">{task}</p>
                                        <button className="edit" onClick={
                                            event => {
                                                let {parentElement} = event.currentTarget;
                                                setEditElem(parentElement)
                                                setEditId(parentElement.id);
                                                setEditFlag(true);
                                                setTask(parentElement.childNodes[0].textContent)
                                            }
                                        }>Edit</button>
                                        <button className="del" onClick={
                                            ()=> {
                                                delMe(id)
                                                displayAlert("item deleted", "red");
                                                setTimeout(() => {
                                                    setDefault();
                                                }, 2000);
                                            }
                                        }>Delete</button>
                                    </motion.article>
                                )
                            })
                        }
                    </main>
                    {todos.length > 0 && 
                        <motion.button type="button" className="delete-all"
                            animate={{scale: [0, 1.24, 1]}}
                            onClick={()=> {
                                setTodos([]);
                                localStorage.clear();
                            }}
                        >
                            Delete all task
                        </motion.button>
                    }
                </section>
            </div>
        </>
    )
}

export default Todo;