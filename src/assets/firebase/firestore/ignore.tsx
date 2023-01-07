/*   useEffect(() => {
    const getOutLocation = async () => {
      const q = query(
        collection(db, "devices"),
        where("location", "!=", "CPH")
      );
      const getLocationSnapshot = await getDocs(q);
      const newLocationArray: Device[] = getLocationSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Device;
      });
      setDevicesOut(newLocationArray);
    };
    getOutLocation();
  }, []);*/

/*  useEffect(() => {
    const realtimeUpdate = async () => {
      const q = query(
        collection(db, "devices"),
        where("location", "!=", "CPH")
      );
      const getLocationSnapshot = await getDocs(q);
      const newLocationArray: Device[] = getLocationSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Device;
      });
      setDevicesOut(newLocationArray);

      const unsub = onSnapshot(doc(db, "devices", doc.data().id), (doc) => {
        //setDevicesOut(doc.data());
        console.log("Current data: ", doc.data());
      });
      return () => unsub();
    };
    realtimeUpdate();
  }, []); */
/*
useEffect(() => {
  const q = query(collection(db, "devices"), where("location", "!=", "CPH"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const devices = [];
    snapshot.forEach((doc) => {
      return devices.push(doc.data());
    });
    setDevicesOut(devices);
    updateLocation(devicesOut, "newLocation");
    console.log("Current location: ", devices.join(", "));
  });
  return () => unsubscribe();
}, []);*/

/*    const realtimeUpdate = async () => {
      const q = query(
        collection(db, "devices"),
        where("location", "!=", "CPH")
      );
      const getLocationSnapshot = await getDocs(q);
      const newLocationArray: Device[] = getLocationSnapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Device;
      });
      setDevicesOut(newLocationArray);
    };
    realtimeUpdate(); */

//console.log("=>", devicesOut);

/*onSnapshot(
      query(collection(db, "devices"), where("location", "!=", "CPH")),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setDevicesOut(data);
      }
    ); */

/*
    export interface Device {
      id: string;
      location: string;
      model: string;
      software: string;
    }*/
