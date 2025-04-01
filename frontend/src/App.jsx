import EntryList from './assets/components/EntryList';
import { Routes, Route } from 'react-router-dom'; 
import NewEntryPage from './assets/components/NewEntryPage';
import ViewEntryPage from './assets/components/ViewEntryPage';
import UpdateEntryPage from './assets/components/UpdateEntryPage';

/**
 * The main application component that defines the routes.
 */
function App() {
  return (
    <div>
        <Routes>
          /**
           * Home Page: Displays a list of all journal entries.
           * Component: EntryList
           */
          <Route path="/" element={<EntryList />} />

          /**
           * New Entry Page: Allows users to create a new journal entry.
           * Component: NewEntryPage
           */
          <Route path="/new" element={<NewEntryPage />} />

          /**
           * View Entry Page: Displays the details of a specific journal entry.
           * Component: ViewEntryPage
           */
          <Route path="/entry/:id" element={<ViewEntryPage />} />

          /**
           * Edit Entry Page: Allows users to update an existing journal entry.
           * Component: UpdateEntryPage
           */
          <Route path="/entry/:id/edit" element={<UpdateEntryPage />} />
        </Routes>
    </div>
  );
}

export default App;
