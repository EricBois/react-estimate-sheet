import { database } from '../firebase';

import { useSession } from './Session';

export default function useDb() {
  const { currentUser } = useSession();
  const db = database;

  const addEstimate = async (id, data) => {
    return await db
      .collection('estimates')
      .doc(id.toString())
      .set({
        id: id.toString(),
        userId: currentUser.uid.toString(),
        measures: [],
        hours: [],
        material: [],
        ...data,
      });
  };

  const editEstimate = async (id, data) => {
    return await db
      .collection('estimates')
      .doc(id.toString())
      .update({
        ...data,
      });
  };

  const deleteEstimate = async (id) => {
    return await db.collection('estimates').doc(id.toString()).delete();
  };

  return {
    addEstimate,
    editEstimate,
    deleteEstimate,
  };
}
