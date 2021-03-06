import { firebaseStore } from "../config/firebase";
import {
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  FieldValue
} from "@firebase/firestore-types";
import * as firebase from "firebase/app";

var gameRefPath: string | null = localStorage.getItem("BOULETTE_GameRef");
var playerName: string | null = localStorage.getItem("BOULETTE_PlayerName");
var step: string | null = localStorage.getItem("BOULETTE_Step");
var isHost: string | null = localStorage.getItem("BOULETTE_IsHost");
checkIfGameIsPresent();

console.log(gameRefPath);
console.log(playerName);

export function getIsHost(): boolean {
  return isHost === "true";
}

export function getPlayerName(): string {
  return playerName as string;
}

export function setGameRef(gameRef: string): void {
  gameRefPath = "games/" + gameRef;
  localStorage.setItem("BOULETTE_GameRef", gameRefPath as string);
  console.log(gameRefPath);
}

export async function checkIfGameIsPresent(): Promise<void> {
   
  if (gameRefPath){
    await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .get()
    .then((document: DocumentSnapshot<DocumentData>) => {
    
        var game = document.data() as DocumentData;
        if (game["Status"] === "Game-Complete")
        {
            gameRefPath = null;
            playerName = null;
            localStorage.removeItem("BOULETTE_IsHost");
            localStorage.removeItem("BOULETTE_GameRef");
            localStorage.removeItem("BOULETTE_Step");
        } else 
            console.log("OnGoingGameDetected");      
    })
    .catch(() => {
        gameRefPath = null;
        playerName = null;
        localStorage.removeItem("BOULETTE_IsHost");
        localStorage.removeItem("BOULETTE_GameRef");
        localStorage.removeItem("BOULETTE_Step");
    });     
  } else {
    localStorage.removeItem("BOULETTE_IsHost");
    localStorage.removeItem("BOULETTE_GameRef");
    localStorage.removeItem("BOULETTE_Step");
  }
    
  }

export async function createGameConfig(
  GameName: string,
  Theme: string,
  ZoomUrl: string,
  NbOfRound: number,
  NbOFPaperPerPerson: number,
  TimePerPersonSec: number
): Promise<boolean> {
  console.log(gameRefPath);

  var success = false;

  if (gameRefPath != null) {
    await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({
        Status: "Waiting-Room",
        Config: {
          GameName: GameName,
          Theme: Theme,
          ZoomUrl: ZoomUrl,
          NbOfRound: NbOfRound,
          NbOFPaperPerPerson: NbOFPaperPerPerson,
          TimePerPersonSec: TimePerPersonSec
        },
        Game: {
          ScoreTeam1: 0,
          ScoreTeam2: 0,
          CurrentRound: 0,
          CurrentTurn: 0,
          StandingPlayer: {
            IsPlaying: false,
            Name: "",
            TimeRemaining: TimePerPersonSec
          },
          RemainingWords: []
        },
        Words: [],
        WaitingRoom: [],
        Team1: [],
        Team2: []
      })
      .then(() => {
        success = true;
        isHost = "true";
        localStorage.setItem("BOULETTE_IsHost", isHost);
      })
      .catch(() => {
        success = false;
      });
  } else {
    await firebaseStore
      .collection("games")
      .add({
        Status: "Waiting-Room",
        Config: {
          GameName: GameName,
          Theme: Theme,
          ZoomUrl: ZoomUrl,
          NbOfRound: NbOfRound,
          NbOFPaperPerPerson: NbOFPaperPerPerson,
          TimePerPersonSec: TimePerPersonSec
        },
        Game: {
          ScoreTeam1: 0,
          ScoreTeam2: 0,
          CurrentRound: 1,
          CurrentTurn: 0,
          StandingPlayer: {
            IsPlaying: false,
            Name: ""
          },
          RemainingWords: []
        },
        Words: [],
        WaitingRoom: [],
        Team1: [],
        Team2: []
      })
      .then((ref: DocumentReference) => {
        success = true;
        gameRefPath = ref.path;
        localStorage.setItem("BOULETTE_GameRef", ref.path);
        isHost = "true";
        localStorage.setItem("BOULETTE_IsHost", isHost);
      })
      .catch(() => {
        success = false;
      });
  }

  return success;
}

export async function closeGame(): Promise<boolean> {
  console.log(gameRefPath);
  var success = false;

  await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .update({ Status: "Game-Completed" })
    .then(() => {
      success = true;
    })
    .catch(() => {});

  gameRefPath = null;
  localStorage.removeItem("BOULETTE_GameRef");
  localStorage.removeItem("BOULETTE_Step");
  localStorage.removeItem("BOULETTE_IsHost");
  return success;
}

export async function setPlayerName(name: string): Promise<boolean> {
  console.log(playerName);
  var success = false;

  if (playerName == null) {
    await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({
        WaitingRoom: firebase.firestore.FieldValue.arrayUnion(name)
      })
      .then(() => {
        success = true;
        playerName = name;
        localStorage.setItem("BOULETTE_PlayerName", playerName);
      })
      .catch(() => {});
  } else {
    await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .update({
      Team1: firebase.firestore.FieldValue.arrayRemove(playerName)
    })
    .then(async () => {
      success = true;      
    })
    .catch(() => {});
    await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .update({
      Team2: firebase.firestore.FieldValue.arrayRemove(playerName)
    })
    .then(async () => {
      success = true;      
    })
    .catch(() => {});
    await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({
        WaitingRoom: firebase.firestore.FieldValue.arrayRemove(playerName)
      })
      .then(async () => {
        success = true;
        await firebaseStore
          .collection("games")
          .doc((gameRefPath as string).split("/")[1])
          .update({
            WaitingRoom: firebase.firestore.FieldValue.arrayUnion(name)
          })
          .then(() => {
            success = true;
            playerName = name;
            localStorage.setItem("BOULETTE_PlayerName", playerName);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }

  return success;
}

export async function getWaitingRoomNames(): Promise<string[]> {
  var data: string[] = [];

  await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .get()
    .then((document: DocumentSnapshot<DocumentData>) => {
      console.log(document.data());
      var test = document.data() as DocumentData;
      data = test["WaitingRoom"] as string[];
    })
    .catch(() => {});

  if (data === undefined) return [];
  return data;
}

export async function getTeamPlayerNames(team: number): Promise<string[]> {
  var data: string[] = [];

  await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .get()
    .then((document: DocumentSnapshot<DocumentData>) => {
      console.log(document.data());
      var test = document.data() as DocumentData;
      data = test["Team" + team] as string[];
    })
    .catch(() => {});

  if (data === undefined) return [];
  return data;
}

export async function setPlayerInTeam(team: number): Promise<boolean> {
  console.log(playerName);
  var success = false;

  await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .update({
      WaitingRoom: firebase.firestore.FieldValue.arrayRemove(playerName)
    })
    .then(async () => {
      success = true;

      if (team === 1) {
        await firebaseStore
        .collection("games")
        .doc((gameRefPath as string).split("/")[1])
        .update({
          Team2: firebase.firestore.FieldValue.arrayRemove(playerName)
        })
        .then(() => {
            success = true;
          })
        .catch(() => { success = false;});
        await firebaseStore
          .collection("games")
          .doc((gameRefPath as string).split("/")[1])
          .update({
            Team1: firebase.firestore.FieldValue.arrayUnion(playerName)
          })
          .then(() => {
            success = true;
          })
          .catch(() => {success = false;});
      } else if (team === 2) {
        await firebaseStore
        .collection("games")
        .doc((gameRefPath as string).split("/")[1])
        .update({
          Team1: firebase.firestore.FieldValue.arrayRemove(playerName)
        })
        .then(() => {
            success = true;
          })
        .catch(() => { success = false;});
        await firebaseStore
          .collection("games")
          .doc((gameRefPath as string).split("/")[1])
          .update({
            Team2: firebase.firestore.FieldValue.arrayUnion(playerName)
          })
          .then(() => {
            success = true;
          })
          .catch(() => {success = false;});
      }
    })
    .catch(() => {success = false;});

  return success;
}

export async function getGameUpdates(onGameUpdates: (data: DocumentData) => void): Promise<string[]> {
    var data: string[] = [];
  
    await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .onSnapshot((document: DocumentSnapshot<DocumentData>) => {
        onGameUpdates(document.data() as DocumentData);
      });
  
    if (data === undefined) return [];
    return data;
  }

export async function setPlayerWords(words: string[]): Promise<boolean> {
    var success = false;
    words.forEach( async (element) => {
        if (element) {
            if (element.trim()) {
                await firebaseStore
                .collection("games")
                .doc((gameRefPath as string).split("/")[1])
                .update({
                    Words: firebase.firestore.FieldValue.arrayUnion(element)
                })
                .then(() => {
                    success = true;
                })
                .catch(() => {success=false;});
            }
        }
    });   

    return success;
}

export async function getWordsCountPerPerson(): Promise<number> {
    var data: number = 0;
  
    await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .get()
      .then((document: DocumentSnapshot<DocumentData>) => {
        console.log(document.data());
        var test = document.data() as DocumentData;
        data = (test["Config"]["NbOFPaperPerPerson"] as number);
      })
      .catch(() => {});
  
    if (data === undefined) return 0;
    return data;
  }

export async function getAllWaitingRoomGame(): Promise<any[]> {
  var data: any[] = [];

  await firebaseStore
    .collection("games")
    .where("Status", "==", "Waiting-Room")
    .get()
    .then((querySnapshot: any) => {
      console.log(querySnapshot);
      querySnapshot.forEach(function(doc: any) {
        data.push({"id": doc.id, "data": doc.data()})
    });
    })
    .catch(() => {data = [];});
    
    console.log(data);
  if (data === undefined) return [];
  return data;
}

export async function setPlayerTurnStatus(status: boolean): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({       
          "Game.StandingPlayer.IsPlaying": status
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setPlayerTurnName(name: string): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({       
          "Game.StandingPlayer.Name": name
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setPlayerTurnTimeRemaining(time: number): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({       
          "Game.StandingPlayer.TimeRemaining": time
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setGameCurrentTurn(round: number): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({       
          "Game.CurrentTurn": round
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setTeam1Score(score: number): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({  
        "Game.ScoreTeam1": score
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setTeam2Score(score: number): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({       
          "Game.ScoreTeam2": score
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setGameCurrentRound(round: number): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({
          "Game.CurrentRound": round
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setGameRemainingWords(words: string[]): Promise<boolean> {
  var success: boolean = false;
  console.log("DSF")
  console.log(words)
  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({
          "Game.RemainingWords": words
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function setGameStatus(status: string): Promise<boolean> {
  var success: boolean = false;

  await firebaseStore
      .collection("games")
      .doc((gameRefPath as string).split("/")[1])
      .update({
          "Status": status
      })
      .then(() => {
        success = true;
      })
      .catch(() => {
        success = false;
      });

      return success;
}

export async function getGameConfig(): Promise<any> {
  var data: any;

  await firebaseStore
    .collection("games")
    .doc((gameRefPath as string).split("/")[1])
    .get()
    .then((document: DocumentSnapshot<DocumentData>) => {
      console.log(document.data());
      var test = document.data() as DocumentData;
      data = (test["Config"] as any);
    })
    .catch(() => {});

  return data;
}