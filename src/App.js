import { Routes, Route } from "react-router-dom";
import Tabs from "./Components/tabs_project/Tabs";
import Todo from "./Components/todo_app/Todo";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Tabs />} />
            <Route path="todo" element={<Todo />} />
        </Routes>
    )
}

export default App;
