import { useState, useEffect } from 'react'

import Menu from './Menu'
import List from './List'
import Content from './Content'

const Home = (props) => {
  return (
    <div className='text-white flex h-[100vh] items-center relative overflow-y-hidden'>
      <Menu 
      recentNotes={props.recentNotes}
      folders={props.folders}
      setFolders={props.setFolders}
      setCurrentFolder={props.setCurrentFolder}
      currentFolder={props.currentFolder}
      currentNote={props.currentNote}
      setCurrentNote={props.setCurrentNote}
      isLoggedIn={props.isLoggedIn}
      setIsLoggedIn={props.setIsLoggedIn}
      currentNoteId={props.currentNoteId}
      setCurrentNoteId={props.setCurrentNoteId}
      
      />
      <List 
      currentFolder={props.currentFolder}
      folderNotes={props.folderNotes}
      currentNoteId={props.currentNoteId}
      setCurrentNoteId={props.setCurrentNoteId}
      currentNote={props.currentNote}
      />
      <Content />
    </div>
  )
}

export default Home
