import { useState } from "react";

function App() {
  const [route, setRoute] = useState({
    route: "",
    station: "",
  });

  const handleChange = (e) => {
    setRoute((route) => ({
      ...route,
      route: e.target.value,
    }));
    console.log(route);
  };
  const handleSubmit = (e) => {
    setRoute((route) => ({
      ...route,
      station: [
        ...route.station,
        {
          name: "",
          lat: "",
          lon: "",
          errors: "",
        },
      ],
    }));
  };

  const handleChanges = (value, name, key) => {
    setRoute((route) => ({
      ...route,
      station: route.station.map((station, i) => {
        if (key === i) {
          station[name] = value;
          let current = route.station.find(
            (el, i) => el[name] === value && i !== key
          );
          if (current) {
            station.errors = `${name} değeri daha önce ${value} değeriyle oluşturulmuş`;
          }
        }
        return station;
      }),
    }));
    console.log(route.station.map((item) => item));
  };
  const isEnable =
    route.route &&
    route.station &&
    route.station.every((station) =>
      Object.entries(station).every(([key, value]) =>
        key === "errors" ? Object.values(value).length === 0 : value
      )
    );

  return (
    <div className='App'>
      <div>
        <input
          type='text'
          value={route.route}
          placeholder='Güzergah'
          onChange={handleChange}
        />
        <input
          type='submit'
          value='Yeni Durak Ekle'
          onClick={handleSubmit}
        ></input>
      </div>
      <hr />

      {route.station &&
        route.station.map((item, key) => (
          <div key={key}>
            <input
              type='text'
              placeholder='Durak Adı'
              onChange={(e) => handleChanges(e.target.value, "name", key)}
            />
            <input
              type='text'
              placeholder='Enlem'
              onChange={(e) => handleChanges(e.target.value, "lat", key)}
            />
            <input
              type='text'
              name=''
              id=''
              placeholder='Boylam'
              onChange={(e) => handleChanges(e.target.value, "lon", key)}
            />
            <hr />
          </div>
        ))}

      <div>
        <input type='submit' value='Kaydet' disabled={!isEnable}></input>
      </div>
    </div>
  );
}

export default App;
