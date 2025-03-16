import './App.css'
import EntryList from './assets/components/EntryList'
import { Routes, Route } from 'react-router-dom'; 
import NewEntryPage from './assets/components/NewEntryPage';
import ViewEntryPage from './assets/components/ViewEntryPage';
import UpdateEntryPage from './assets/components/UpdateEntryPage';
function App() {

  return (
    <div>
        <Routes>
          <Route path="/" element={<EntryList />} />
          <Route path="/new" element={<NewEntryPage/>} />
          <Route path="/entry/:id" element={<ViewEntryPage/>} />
          <Route path="/entry/:id/edit" element={<UpdateEntryPage/>} />
        </Routes>
    </div>
  )
}

export default App;
