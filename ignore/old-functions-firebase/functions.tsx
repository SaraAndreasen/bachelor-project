//Fetch user display name

/*const fetchUserNameA = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("uid", "==", auth.currentUser?.uid)
      );

      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setNameLocal(data.name);
    } catch (err) {
      console.log(err);
    }
  };*/

//realtime updates
/*useEffect(() => {
    const unsub = onSnapshot(query(devicesCollecction), (snapshot) => {
      const data: Device[] = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Device;
      });
      setDevice(data);
    });
    if (!user) return navigation.navigate("Welcome");
    fetchUserName();
    return () => unsub();
  }, [user]); */

//NOTE Two use effects???
/*
  useEffect(() => {
    if (!user) return navigation.navigate("Welcome");

    fetchUserName();
  }, [user]); */

/*const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Home",
          },
        ],
      });
    } catch (err) {
      console.log(err);
      if (err.code == "auth/invalid-email") {
        console.log("invalid email");
        //return validationerrors???
      } else if (err.code == "auth/wrong-password") {
        console.log("wrong password");
      } else if (err.code == "auth/user-not-found") {
        console.log("user not found");
      } else if (err.code == "auth/network-request-failed") {
        console.log("To use the app you need a network connection");
      }
    }
  };*/

/*
  useEffect(() => {
    const realtimeUpdate = async () => {
      const q = query(devicesCollecction, where("location", "!=", "CPH"));
      const getLocationSnapshot = await getDocs(q);
      const newLocationArray: Device[] = getLocationSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Device;
      });
      setDevicesOut(newLocationArray);
    };
    realtimeUpdate();
  }, []); */

//NOTE UPDATE to CPH
/*export const updateLocation = async (id: string, newLocation: string) => {
  // idRef = doc(db, "devices", id)
  const docRef = doc(db, "devices", id);

  await updateDoc(docRef, {
    location: "CPH",
  });
};*/

//NOTE Update to Name/CPH
/*
export const updateCheckOutOffice = async (id: string, name: string) => {
  const docRef = doc(db, "devices", id);
  const q = query(
    collection(db, "users"),
    where("uid", "==", auth.currentUser?.uid)
  );
  const userDoc = await getDocs(q);
  const data = userDoc.docs[0].data();

  await updateDoc(docRef, {
    location: data.name + " / CPH",
  });
};*/

//NOTE update to name/away
/*
export const updateCheckOutHome = async (id: string, name: string) => {
  const docRef = doc(db, "devices", id);
  const q = query(
    collection(db, "users"),
    where("uid", "==", auth.currentUser?.uid)
  );
  const userDoc = await getDocs(q);
  const data = userDoc.docs[0].data();

  await updateDoc(docRef, {
    location: data.name + " / Home",
  });
};
*/

//NOTE log user out
/*
export const logout = () => {
  signOut(auth);
};
*/

//NOTE create user
/*
create user
export const createAccount = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    /*const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
       const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

     if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: auth.currentUser?.uid,
        name,
        authProvider: "local",
        email,
        password,
      });
    }
     catch (err) {
    console.log(err);

    if (err.code == "auth/invalid-email") {
      console.log("invalid email");
    } else if (err.code == "auth/wrong-password") {
      console.log("Wrong password");
    } else if (err.code == "auth/user-not-found") {
      console.log("user not found");
    }
  }
}; */
