import { firebaseStore } from '../config/firebase';

export async function createGameConfig(Theme: string, ZoomUrl: string, NbOfRound: number, NbOFPaperPerPerson: string, TimePerPersonSec: number): Promise<boolean> {
    var success = false;
    await firebaseStore.collection("games").add({
        Status: "Waiting-Room",
        Config: {
            Theme: Theme,
            ZoomUrl: ZoomUrl,
            NbOfRound: NbOfRound,
            NbOFPaperPerPerson: NbOFPaperPerPerson,
            TimePerPersonSec: TimePerPersonSec
        }
    })
    .then(() => {
        success = true;
    })
    .catch(() => {
        success = false;
    });
    return success;
}

export async function requestNewSignUp(email: string, firstName: string, lastName: string): Promise<boolean> {
    var success = false;
    await firebaseStore.collection("usersPortal").add({
        email: email,
        firstName: firstName,
        lastName: lastName,
        status: "applied",
        role: "scientist"
    })
    .then(() => {
        success = true;
    })
    .catch(() => {
        success = false;
    });
    return success;
}

export async function getUserDetails(email: string) {
    var data;
    await firebaseStore.collection("usersPortal").where("email", "==", email).get()
    .then((querySnapshot: any) => {
        data = querySnapshot.docs.map((doc: { data: () => void; }) => doc.data());
    })
    .catch(() => {

    });
    return data;
}

export async function getAllApplyingUsers(): Promise<any> {
    var data: any[] = [];
    await firebaseStore.collection("usersPortal").where("status", "==", "applied").get()
    .then((querySnapshot: any) => {
        querySnapshot.forEach(function(doc: any) {
            data.push({"id": doc.id, "data": doc.data()})
        });
    })
    .catch(() => {

    });
    return data;
}

export async function setUserStatus(idDoc: string, status: string) {
    var data;
    await firebaseStore.collection("usersPortal").doc(idDoc).update({
        status: status
    })
    .then((querySnapshot: any) => {
        data = querySnapshot.docs.map((doc: { data: () => void; }) => doc.data());
    })
    .catch(() => {

    });
    return data;
}