import '../App.css';
import TodoList from './ListTask';
import { useEffect, useState } from 'react';
import { Button, Textarea } from "@material-tailwind/react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';
import Filter from '../Components/Filter';

function Home() {
    let todos = useSelector((state) => state.todos);
    const original_todos = todos;
    const [tasks, setTasks] = useState(todos);
    const [showModal, setShowModal] = useState(false);
    const [searchCriteria, setSearchCriteria] = useState(undefined);

    const dispatch = useDispatch();
    const [newTask, setNewTask] = useState({
        description: '',
        isDone: false
    });
    const handleFormChange = (evt) => {
        const key = evt.target.id;
        setNewTask({ ...newTask, [key]: evt.target.value })
    }
    const changeListener = (event) => {
        console.log('Setting criteria', event.target.value)
        setSearchCriteria(event.target.value);
    }

    useEffect(() => {
        switch(searchCriteria){
            case 'Done':
                setTasks([...todos].filter((todo) => todo.isDone === true))
                console.log('applied effect', tasks)

                break;
            case 'Undone':
                setTasks([...todos].filter((todo) => todo.isDone === false));
                break;
            default:
                setTasks(original_todos);
                break;
        }
    }, [searchCriteria]);

    useEffect(() => {
        setTasks(todos);
    }, [todos]);



    const handleSubmit = () => {
        setShowModal(false);
        dispatch(addTodo(newTask));
        setNewTask({});
    }



    return (
        <div className='flex flex-col h-screen items-center w-auto'>
            <div>
                <div className='flex items-center justify-between w-96'>
                    <Filter className='mb-2 flex-start' changeListener={changeListener}/>
                    <Button
                        variant='outlined'
                        className='mt-2 flex-end'
                        onClick={() => setShowModal(true)}
                    >
                        New Task
                    </Button>
                </div>
            
                {showModal ? (
                    <div>
                        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                        <h3 className="text-3xl font=semibold">Add New Task</h3>
                                        <button
                                            className="bg-transparent border-0 text-black float-right"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                                                x
                                            </span>
                                        </button>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full space-y-3">
                                            <div className="w-full">
                                                <Textarea placeholder="Task description..." id={'description'} value={newTask['description']} onChange={handleFormChange} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <Button
                                            variant='outlined'
                                            className="text-[#2196f3]"
                                            type="button"
                                            onClick={handleSubmit}
                                        >
                                            Create
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div className='flex p-8'>
                <TodoList todos={tasks} />
            </div>
        </div>

    );
}

export default Home;
