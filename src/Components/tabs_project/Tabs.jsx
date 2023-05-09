import { useEffect, useState } from "react";
import Header from "../Header";
import Databs from "./Databs";
import Btn from "./Btn";

const Tabs = () => {
    const [display, setDisplay] = useState(false);
    const [content, setContent] = useState([]);
    const [index, setIndex] = useState(0);

    const handleClick = (id) => {
        setDisplay(true);
        setIndex(id - 1);
    }

    const fetch = () => {
        setTimeout(() => {
            setContent(Databs);
        }, 2000);
    }
    
    useEffect(()=>{
        fetch();
    },[])

    const contentElem = content.map((item, index) => <Btn key={item.id} title={item.title} handleClick={()=> {handleClick(item.id)}} />)
    
    return (
        <>
            <Header />
            <section className="tabs">
                <div className={`screen ${display ? "showScreen" : null}`}>
                    <button className="close"
                        onClick={()=>{
                            setDisplay(false);
                            setIndex(0);
                        }}
                    >
                        Close
                    </button>
                    <p>{Databs[index].content}</p>
                </div>

                <h1 className="tabs-t">Tabs Project</h1>
                <div className="tab-btn">
                    {contentElem}
                </div>
            </section>
        </>
    )
}

export default Tabs;