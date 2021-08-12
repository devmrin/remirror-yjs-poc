import { useMemo } from 'react';
import { Doc } from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import useYjsAwareness from './useYjsAwareness';

function useWebRtcProvider(user, documentId) {
  const ydoc = useMemo(() => new Doc({ guid: documentId }), [documentId]);
  const awareness = useYjsAwareness(user, ydoc);

  return useMemo(() => {
    const roomName = `remirror-yjs-webrtc-demo-room-${documentId}`;
    // @ts-ignore opts param seems to expect ALL options
    return new WebrtcProvider(roomName, ydoc, {
      awareness,
    });
  }, [awareness, ydoc, documentId]);
}

export default useWebRtcProvider;
