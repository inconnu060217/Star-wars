import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
import '../style/Personnage.css';

function Personnage() {
    const [personnage, setPersonnage] = useState([]);
    const [count, setCount] = useState(1);
    const [search, setSearch] = useState("");
    let history = useHistory();


    useEffect(()=>{
        fetch("https://swapi.dev/api/people/?page=" + count)
        .then(response => response.json())
        .then(result => {
            setPersonnage(result.results)
        })
    }, [count]);
    const handleSearch = (e)=>{
        let value = e.target.value;
        setSearch(value);
    }
    const handleClick = (url) => {
        let id = url.split("/")[5];
        history.push(`/profil/${id}`);
    }    
    return (
        <div className="personnage">
            <div>
                <input 
                    type="text" 
                    name="search"
                    placeholder="Rechercher"
                    onChange={handleSearch}/>
            </div>
            {
                personnage
                .filter((val)=>{
                    return val.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((val, index) => {
                    return <div key={index}>
                        <div>
                            <p>
                                <button onClick={() => handleClick(val.url)}>{val.name}</button>
                            </p>
                        </div>
                    </div>
                })
            }
            <div>
                {count === 1 ? (
                    <button onClick={()=>{setCount(count+1)}}>Suivant</button>  
                ):(
                    <>
                        <button onClick={()=>{setCount(count-1)}}>Précédent</button>
                        <button onClick={()=>{setCount(count+1)}}>Suivant</button> 
                    </>
                )}  
            </div>
        </div>
    )
}

export default Personnage
