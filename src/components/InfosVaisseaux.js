import React, { useState, useEffect } from 'react';
import {useLocation, useHistory} from 'react-router-dom';

function InfosVaisseaux() {
    let history = useHistory();
    const [infos, setInfos] = useState(null);
    const [pilote, setPilote] = useState(null);
    let location = useLocation();
    let id = location.pathname.split("/")[2];
    useEffect(()=>{
        (async () => {
            if(!infos){
            let response = await fetch("https://swapi.dev/api/starships/" + id)
                let infos = await response.json();
                setInfos(infos);
            }else if(!pilote) {
                setPilote(await Promise.all(infos.pilots.map(async (url) => {
                    let response = await fetch(url);
                    let pilote = await response.json();
                    return pilote;
                })))
            }
    })();
    }, [infos, pilote]);
    const handleClickPilote = (url) => {
        let id = url.split("/")[5];
        history.push(`/profil/${id}`);
    }
    if(!infos) return <div>Chargement ...</div>
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th colspan="2">Informations sur du Vaisseau</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Non du vaisseau : </td>
                        <td>{infos.name}</td>
                    </tr>
                    <tr>
                        <td>Modèl : </td>
                        <td>{infos.model}</td>
                    </tr>
                    <tr>
                        <td>Frabriquant : </td>
                        <td>{infos.manufacturer}</td>
                    </tr>
                    <tr>
                        <td>Presonnes ayant piloté le vaisseau : </td>
                        <td>{pilote ? pilote.map((item, index) => {
                                    return <button key={index} onClick={() => handleClickPilote(item.url)}>{item.name}<br/></button>
                                }) : ""}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InfosVaisseaux;
