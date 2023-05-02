import React from 'react'
import '../styles/App.css';
import { useState, useEffect } from 'react';



// Sample response from api below, dont use this data
// {
//   results: [
//     {
//       gender: "female",
//       name: {
//         title: "Miss",
//         first: "Zara",
//         last: "White"
//       },
//       location: {
//         street: {
//           number: 9548,
//           name: "Wairau Road"
//         },
//         city: "Hamilton",
//         state: "Tasman",
//         country: "New Zealand",
//         postcode: 52652,
//         coordinates: {
//           latitude: "68.0268",
//           longitude: "114.0576"
//         },
//         timezone: {
//           offset: "-1:00",
//           description: "Azores, Cape Verde Islands"
//         }
//       },
//       email: "zara.white@example.com",
//       login: {
//         uuid: "fd26ff4c-794a-41d9-bc82-c79997d6309b",
//         username: "bigrabbit521",
//         password: "liang",
//         salt: "JsOd1LTX",
//         md5: "c60353ef1d02626f8afcb50bc80baac2",
//         sha1: "2a0aea755e22c24f52a75b6b972af4e32a892997",
//         sha256: "f01f1d678bebaec80d452621a9a81f78296079a0c3fdb9bea24d1a74561863d2"
//       },
//       dob: {
//         date: "1978-03-29T10:36:08.698Z",
//         age: 44
//       },
//       registered: {
//         date: "2012-09-08T19:40:27.630Z",
//         age: 10
//       },
//       phone: "(483)-206-7882",
//       cell: "(986)-684-2134",
//       id: {
//         name: "",
//         value: null
//       },
//       picture: {
//         large: "https://randomuser.me/api/portraits/women/60.jpg",
//         medium: "https://randomuser.me/api/portraits/med/women/60.jpg",
//         thumbnail: "https://randomuser.me/api/portraits/thumb/women/60.jpg"
//       },
//       nat: "NZ"
//     }
//   ],
//     info: {
//     seed: "00bf0e8b7e323357",
//       results: 1,
//         page: 1,
//           version: "1.3"
//   }
// }
const App = () => {
  const [user, setUser] = useState(null);
  const [showAge, setShowAge] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      setUser(data.results[0]);
    }
    fetchUser();
  }, []);

  const handleClick = (e) => {
    const attr = e.target.getAttribute('data-attr');
    switch (attr) {
      case 'age':
        setShowAge(true);
        setShowEmail(false);
        setShowPhone(false);
        break;
      case 'email':
        setShowAge(false);
        setShowEmail(true);
        setShowPhone(false);
        break;
      case 'phone':
        setShowAge(false);
        setShowEmail(false);
        setShowPhone(true);
        break;
      default:
        setShowAge(false);
        setShowEmail(false);
        setShowPhone(false);
        break;
    }
  };

  const handleGetUser = async () => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    setUser(data.results[0]);
    setShowAge(false);
    setShowEmail(false);
    setShowPhone(false);
  };
  return (
    <div id="main" className='container'>
      {user && (
        <div className="img-container">
          <img src={user.picture.large} alt="User" />
          <h2 id='name'>{`${user.name.first} ${user.name.last}`}</h2>
          <div className="buttons">
            <button data-attr="age" onClick={handleClick}>
              Age
            </button>
            <button data-attr="email" onClick={handleClick}>
              Email
            </button>
            <button data-attr="phone" onClick={handleClick}>
              Phone
            </button>
          </div>
          <div className="info-container" id='additional-info'>
            {showAge && <p>{`Age: ${user.dob.age}`}</p>}
            {showEmail && <p>{`Email: ${user.email}`}</p>}
            {showPhone && <p>{`Phone: ${user.phone}`}</p>}
          </div>
          <button id="getUser" onClick={handleGetUser}>
            Get Another User
          </button>
        </div>
      )}
    </div>
  )
}


export default App;
