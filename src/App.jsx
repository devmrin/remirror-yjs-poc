import React, { useMemo } from 'react';
import Editor from './Editor/Editor';
import { nanoid } from 'nanoid';

import '../node_modules/remirror/styles/all.css';
import UserProvider from './UserProvider';
import getRandomUserName from './utils/getRandomUserName';

function App() {
  const currentUser = useMemo(() => {
    const id = nanoid();
    return {
      id,
      name: getRandomUserName(id),
    };
  }, []);

  return (
    <>
      <nav></nav>
      <UserProvider.Provider value={currentUser}>
        <div className="wrapper">
          <div className="left"></div>
          <div className="editor-container">
            <div className="remirror-theme">
              <Editor documentId="e575831a-e213-49e2-9092-a604d3e0f654" />
            </div>
          </div>
          <div className="right"></div>
        </div>
      </UserProvider.Provider>
    </>
  );
}

export default App;
