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
checkIfGameIsPresent();

console.log(gameRefPath);
console.log(playerName);

export function getPlayerName(): string {
  return playerName as string;
}

export async function checkIfGameIsPresent(): Promise<void> {
   
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
            localStorage.removeItem("BOULETTE_GameRef");
            localStorage.removeItem("BOULETTE_PlayerName");
        } else 
            console.log("OnGoingGameDetected");      
    })
    .catch(() => {
        gameRefPath = null;
        playerName = null;
        localStorage.removeItem("BOULETTE_GameRef");
        localStorage.removeItem("BOULETTE_PlayerName");
    }); 
    
  }

export async function createGameConfig(
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
          Theme: Theme,
          ZoomUrl: ZoomUrl,
          NbOfRound: NbOfRound,
          NbOFPaperPerPerson: NbOFPaperPerPerson,
          TimePerPersonSec: TimePerPersonSec
        },
        WaitingRoom: [],
        Team1: [],
        Team2: []
      })
      .then(() => {
        success = true;
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
          Theme: Theme,
          ZoomUrl: ZoomUrl,
          NbOfRound: NbOfRound,
          NbOFPaperPerPerson: NbOFPaperPerPerson,
          TimePerPersonSec: TimePerPersonSec
        }
      })
      .then((ref: DocumentReference) => {
        success = true;
        gameRefPath = ref.path;
        localStorage.setItem("BOULETTE_GameRef", ref.path);
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


