import React, {FC, useEffect, useState} from 'react'
import ReactLoading from 'react-loading'
import { ChampSelectType } from 'src/types/champSelect'
import NCGStore, { replicate } from "../../stores/NodecgStore"

// import * as example from './util/CSExample.json'
import './app.scss'
import Team from './components/Team'
import Ban from './components/Ban'
// import Scoreboard from './components/Scoreboard'

const app: FC = () => {
  const [repState, setRepState] = useState({
    replicants: NCGStore.getReplicants(),
  });

  useEffect(() => {
    replicate("champSelectUpdate");
    replicate('TeamInfoRep') // You can subscribe to replicants with this method
  }, []);

  useEffect(() => {
    NCGStore.on("change", () => {
      setRepState({
        replicants: NCGStore.getReplicants(),
      });
    });
  }, []);
  
  const {
    replicants: { champSelectUpdate, TeamInfoRep }, // Used to take out a replicant from the replicants object
  } = repState || {}
  
  if(!champSelectUpdate || !TeamInfoRep) {
    return (
      <div className='loading-container'>
        <ReactLoading
          className='loading'
          type="spinningBubbles" 
          color="black" 
          height={200} 
          width={200} 
        />
      </div>
    )
  }

  if(!TeamInfoRep){return null}
  const champSelect:ChampSelectType = champSelectUpdate
  const { myTeam, theirTeam, bans } = champSelect
  const { myTeamBans, theirTeamBans} = bans

  return (
    <div id="app">
      <div className="app-background">
        <img className="background" src="https://www.dropbox.com/s/nzy3gdvb7gq17gj/SELECCION%20CAMPEONES%20LOL%20%281%29.png?raw=1" alt="El fondo deberia estar aqui >:c"/>
      </div> 
      <div className="app-container">
        <Team
          key={1}
          side="Blue"
          data={myTeam}
        />
        <Team
          key={2}
          side="Red"
          data={theirTeam}
        />
        <Ban
          key={3}
          side='Blue'
          data={myTeamBans}
        />
        <Ban
          key={4}
          side='Red'
          data={theirTeamBans}
        />
      </div>
    </div>
  );
};

export default app;