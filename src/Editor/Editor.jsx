import React, { useState, useCallback } from 'react';
import {
  BoldExtension,
  ItalicExtension,
  UnderlineExtension,
  YjsExtension,
} from 'remirror/extensions';
import { Remirror, useRemirror, EditorComponent } from '@remirror/react';
import * as Y from 'yjs';
import { Doc } from 'yjs';

import useWebRtcProvider from '../hooks/useWebRtcProvider.js';
import useCurrentUser from '../hooks/useCurrentUser.js';
import useObservableListener from '../hooks/useObservableListener';

const ydoc = new Doc();

const simpleExtensions = [
  new BoldExtension(),
  new ItalicExtension(),
  new UnderlineExtension(),
];

function Editor({ documentId }) {
  const [isSynced, setIsSynced] = useState(false);
  const currentUser = useCurrentUser();
  const provider = useWebRtcProvider(currentUser, documentId);

  const [clientCount, setClientCount] = useState(0);

  /** event listeners */
  const handlePeersChange = useCallback(
    ({ webrtcPeers }) => {
      setClientCount(webrtcPeers.length);
    },
    [setClientCount]
  );

  useObservableListener('peers', handlePeersChange, provider);

  const handleSynced = useCallback(
    ({ synced }) => {
      setIsSynced(synced);
    },
    [setIsSynced]
  );

  useObservableListener('synced', handleSynced, provider);

  const handleYDocUpdate = (update) => {
    Y.applyUpdate(ydoc, update);
  };

  useObservableListener('update', handleYDocUpdate, provider.doc);

  const createExtensions = useCallback(() => {
    return [
      new YjsExtension({
        getProvider: () => provider,
      }),
    ];
  }, [provider]);

  const { state, manager } = useRemirror({
    extensions: [...simpleExtensions, ...createExtensions()],
    content: `<p>Initial Content</p>`,
    stringHandler: 'html',
  });
  return (
    <>
      <Remirror manager={manager} initialContent={state}>
        <EditorComponent />
        <pre>isSynced: {JSON.stringify(isSynced)}</pre>
        <pre>Client Count: {JSON.stringify(clientCount)}</pre>
      </Remirror>
    </>
  );
}

export default Editor;
