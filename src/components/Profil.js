import React, { useEffect, useState } from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import '../style/profil.css'

function Profil() {
    let location = useLocation();
    let history = useHistory();
    const [profil, setProfil] = useState(null);
    const [vaisseaux, setVaisseaux] = useState(null);
    let id = location.pathname.split("/")[2];
    useEffect(()=>{
        (async () => {
            if(!profil) {
                let response = await fetch("https://swapi.dev/api/people/" + id)
                    let profil = await response.json();
                    setProfil(profil);
            } else if(!vaisseaux) {
                setVaisseaux(await Promise.all(profil.starships.map(async (url) => {
                    let response = await fetch(url);
                    let vaisseau = await response.json();
                    return vaisseau
                })))
            }
        })();
    }, [profil, vaisseaux]);
    const handleClickReturn = () =>{
        history.push("/");
    }

    const handleClickInfos = (url) => {
        let id = url.split("/")[5];
        history.push(`/InfosVaisseaux/${id}`);
    }


    if(!profil) return <div>Chargement ...</div>

    return (
        <>
            <div className="btn-return">
                <button onClick={handleClickReturn}>
                    retour
                </button>
            </div>
            <div className='profil'>
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">PROFIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='rigth'>Nom :</td>
                            <td className='left'>{profil.name}</td>
                        </tr>
                        <tr>
                            <td className='rigth'>Couleur des yeux :</td>
                            <td className='left'>{profil.hair_color}</td>
                        </tr>
                        <tr>
                            <td className='rigth'>Année de naissance :</td>
                            <td className='left'>{profil.birth_year}</td>
                        </tr>
                        <tr>
                            <td className='rigth'>Genre :</td>
                            <td className='left'>{profil.gender}</td>
                        </tr>
                        <tr>
                            <td className='rigth'>Vaisseaux spatiaux piloté :</td>
                            <td className='left starhips'>{
                                vaisseaux ?
                                vaisseaux.map((item, index) => {
                                    return <button key={index} onClick={() => handleClickInfos(item.url)}>{item.name}<br/></button>
                                }) : ""
                            }</td>
                        </tr>
                        <tr>
                            <td className='rigth'>Date de création :</td>
                            <td className='left'>{profil.created}</td>
                        </tr>
                        <tr>
                            <td className='rigth'>Edition de la ressource :</td>
                            <td className='left'>{profil.edited}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Profil
