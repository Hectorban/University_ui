import React, { ReactElement, useState, useEffect, FC } from 'react';

interface Props {
    champName: string
    spell1Name: string
    spell2Name: string
    team: number
    summonerId: number
}

const PlayerPick:FC<Props> = ({champName, spell1Name, spell2Name, team, summonerId}:Props): ReactElement => {
    const champImage = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_0.jpg`;
    const spell1Image = `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/spell/Summoner${spell1Name}.png`;
    const spell2Image = `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/spell/Summoner${spell2Name}.png`;
    const teamColor = team===1 ? 'rgb(155, 209, 5)' : 'rgb(221, 0, 121)'
    const [summonerName, setsummonerName] = useState(null)
    useEffect(() => {
        const fetchSummonerName = async () => {
            const response = await nodecg.sendMessage('summonerName', summonerId)
            setsummonerName(response)
        };
        fetchSummonerName()
    }, [])
    console.log(team)
    const summTrigger = false
    return (
        <div className='player-pick'>
            {summonerName ? (
                <div className='player-pick-container'>
                    <div className='player-pick-name' style={{color: teamColor}} >{summonerName}</div>
                    {champName ? 
                    <img className='player-pick-champImage' src={champImage} alt={champName}/> 
                    : null}

                    {summTrigger ? 
                    <div className='player-pick-summonercontainer'>
                        <img className='player-pick-summoner1' src={spell1Image} alt='Summoner'/>
                        <img className='player-pick-summoner2' src={spell2Image} alt='Summoner'/>
                    </div>
                    : null}
                    
                </div> ) 
                : null
            }            
        </div>
    );
};

export default PlayerPick;