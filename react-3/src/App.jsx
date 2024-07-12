import './App.css'
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JornalList from "./components/JornalList/JornalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import JournalForm from "./components/JournalForm/JournalForm.jsx";
import {useEffect, useState} from "react";
import {useLocalStorage} from "./hooks/use-localstorage.hook.js";
import {UserContext, UserContextProvider} from "./context/user.context.jsx";


function mapItems(items) {
    if (!items) {
        return [];
    }
    return items.map(i => ({
        ...i,
        date: new Date(i.date)
    }));
}

function App() {
    const [items, setItems] = useLocalStorage('data');
    const [selectedItem, setSelectedItem] = useState({});


    const addItem = item => {
        if (!item.id){
            setItems([...mapItems(items), {
                ...item,
                date: new Date(item.date),
                id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
            }]);
        } else {
            setItems([...mapItems(items).map(i => {
                if (i.id === item.id){
                    return{
                        ...item,
                    }
                }
                return i;
            })]);
        }
    };
    const deleteItem = (id) => {
        console.log(id);
        console.log(items);
        setItems(items.filter(i => i.id !== id));
    }


  return (
      <UserContextProvider>
          <div className='app'>
              <LeftPanel>
                  <Header/>
                  <JournalAddButton/>
                  <JornalList items={items} setItem={setSelectedItem}/>
              </LeftPanel>
              <Body>
                  <JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}/>
              </Body>

          </div>
      </UserContextProvider>
  )
}

export default App
