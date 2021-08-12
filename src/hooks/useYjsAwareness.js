import { useMemo } from 'react';
import * as awarenessProtocol from 'y-protocols/awareness.js';
import getRandomColor from '../utils/getRandomColor';

function useYjsAwareness(user, doc) {
  return useMemo(() => {
    const awareness = new awarenessProtocol.Awareness(doc);
    awareness.setLocalStateField('user', {
      name: user.name,
      color: getRandomColor(user.name),
    });
    return awareness;
  }, [user.name, doc]);
}

export default useYjsAwareness;
