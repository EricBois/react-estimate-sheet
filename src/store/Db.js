import { database } from "../firebase";

import { useSession } from './Session';

export default function useDb() {
  const { currentUser } = useSession();
  const db = database;

  const addEstimate = async (id, name,address, note) => {
    return await db.collection('estimates').doc(id.toString()).set({
      id: id.toString(),
      userId: currentUser.uid.toString(),
      name,
      address,
      note
    });
  };

  const editEstimate = async (id, name, address, note) => {
    return await db.collection('estimates').doc(id.toString()).update({
      name,
      address,
      note,
    });
  };

  const deleteEstimate = async (id) => {
    return await db.collection('estimates').doc(id.toString()).delete()
  }

  return {
    addEstimate,
    editEstimate,
    deleteEstimate
  };
}
