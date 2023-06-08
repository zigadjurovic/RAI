import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./userContext";
import Header from "./components/Header";
import ParcelLockers from './components/ParcelLockers';
import ParcelLocker from './components/ParcelLocker';
import EditParcelLocker from './components/EditParcelLocker';
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import AddParcelLocker from "./components/AddParcelLocker";
import MyParcels from './components/MyParcels';
import ParcelHistory from './components/ParcelHistory';
import './components/styles/App.css';

function App() {
  /**
   * Podatek o tem, ali je uporabnik prijavljen ali ne, bomo potrebovali v vseh komponentah.
   * State je dosegljiv samo znotraj trenutne komponente. Če želimo deliti spremenljivke z
   * ostalimi komponentami, moramo uporabiti Context.
   * Vsebino Contexta smo definirali v datoteki userContext.js. Poleg objekta 'user', potrebujemo
   * še funkcijo, ki bo omogočala posodabljanje te vrednosti. To funkcijo definiramo v komponenti App
   * (updateUserData). V render metodi pripravimo UserContext.Provider, naš Context je potem dosegljiv
   * v vseh komponentah, ki se nahajajo znotraj tega providerja.
   * V komponenti Login ob uspešni prijavi nastavimo userContext na objekt s trenutno prijavljenim uporabnikom.
   * Ostale komponente (npr. Header) lahko uporabijo UserContext.Consumer, da dostopajo do prijavljenega
   * uporabnika.
   * Context se osveži, vsakič ko osvežimo aplikacijo v brskalniku. Da preprečimo neželeno odjavo uporabnika,
   * lahko context trajno hranimo v localStorage v brskalniku.
   */
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    return null;
  });
  
  const updateUserData = (userInfo) => {
    try {
      localStorage.setItem("user", JSON.stringify(userInfo));
      setUser(userInfo);
    } catch (error) {
      console.error("Error saving user data to localStorage:", error);
    }
  };
  

  /**
   * Na vrhu vključimo komponento Header, z naslovom in menijem.
   * Nato vključimo Router, ki prikaže ustrezno komponento v odvisnosti od URL naslova.
   * Pomembno je, da za navigacijo in preusmeritve uporabljamo komponenti Link in Navigate, ki sta
   * definirani v react-router-dom modulu. Na ta način izvedemo navigacijo brez osveževanja
   * strani. Klasične metode (<a href=""> in window.location) bi pomenile osvežitev aplikacije
   * in s tem dodatno obremenitev (ponovni izris komponente Header, ponastavitev Contextov,...)
   */
  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user: user,
        setUserContext: updateUserData
      }}>
        <div className="app-container">
          <Header title="Direct4me Packet Lockers" />
          <div className="content-container">
            <Routes>
              <Route path="/" exact element={<ParcelLockers />} />
              <Route path="/admin" exact element={<ParcelLockers />}></Route>
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/addParcelLocker" exact element={<AddParcelLocker />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route exact path="/parcel-lockers" element={<ParcelLockers />} />
              <Route exact path="/parcel-lockers/:id" element={<ParcelLocker />} />
              <Route path="/parcel-lockers/:id/edit" element={<EditParcelLocker />} />
              <Route path="/parcel-lockers/:numberParcelLocker/history" element={<ParcelHistory />} />
              <Route path="/my-parcels" element={<MyParcels />} />
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;