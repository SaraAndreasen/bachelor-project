import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

//NOTE READ

// Return (read) some data
export const getAllData = async () => {
  const querySnapshot = await getDocs(collection(db, "devices"));
  //console.log("db query ", querySnapshot);
  const dataArray = querySnapshot.docs.map((doc) => doc.data());
  console.log("vores nye array", dataArray);
  return dataArray;
};
  /*
  useEffect(() => {
    //const data =  await getAllData();
    //console.log("data fra useeffect ", data);
    const querySnapshot = async () => {
      const docs = await getDocs(collection(db, "devices"));
      //console.log("db query ", querySnapshot);
      const newArray = docs.docs.map((doc) => doc.data());
      //console.log("vores nye array", newArray);
      setDevices(newArray);
    };
    querySnapshot();
  }, []);
  */

//return only devices that are at someone
export const getOutLocation = async () => {
  const q = query(collection(db, "devices"), where("location", "!=", "CPH"));
  const getLocationSnapshot = await getDocs(q);
  const newLocationArray = getLocationSnapshot.docs.map((doc) => doc.data());
  return newLocationArray;
};

   /*const realtimeUpdate = async () => {
      const docs = await getDocs(collection(db, "devices"));
      const dataArray: Device[] = docs.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Device;
      });
      setDevices(dataArray);
    }; */




 