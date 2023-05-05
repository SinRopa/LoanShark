import { Observable } from "rxjs";
import { GamedataService, ISaveData } from "./gamedata.service";


export function initializeAppFactory(
    gameData: GamedataService
  ) {gameData.LoadGame();
  }