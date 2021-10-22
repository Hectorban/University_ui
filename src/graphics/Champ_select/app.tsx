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
  
  if(!champSelectUpdate) return null

  const champSelect:ChampSelectType = champSelectUpdate
  const { myTeam, theirTeam, bans } = champSelect 
  const { myTeamBans, theirTeamBans} = bans

  return (
    <div id="app">
      <div className="app-background">
        <img className="background" src="https://i.imgur.com/nCv4uYe.png" alt="El fondo deberia estar aqui >:c"/>
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
