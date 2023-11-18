import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import jeepRoutes from './jeepRoutes'; 

export default function JeepCodes() {
  const [jeepCodes, setJeepCodes] = useState('');
  const [output, setOutput] = useState('');

  const getRoute = (jeepCode) => {
    if (jeepRoutes[jeepCode]) {
      return jeepRoutes[jeepCode];
    } else {
      return ["Does not exist"];
    }
  };

  const highlightCommonPlaces = (routes) => {
    const placeColors = {};
    const colors = ['red', 'blue', 'green', 'navy', 'darkorange', 'violet', 'deeppink', 'yellow', 'teal', 'maroon'];


    routes.forEach((route) => {
      route.forEach((place) => {
        if (placeColors[place] === undefined) {
          placeColors[place] = colors[Object.keys(placeColors).length % colors.length];
        }
      });
    });

    const placeCounts = {};
    routes.forEach((route) => {
      route.forEach((place) => {
        placeCounts[place] = (placeCounts[place] || 0) + 1;
      });
    });

    routes.forEach((route, index) => {
      route.forEach((place, idx) => {
        if (placeCounts[place] > 1) {
          route[idx] = `<span style="color: ${placeColors[place]}">${place}</span>`;
        } else {
          route[idx] = `<span style="color: black">${place}</span>`;
        }
      });
      routes[index] = route.join(" <-> ");
    });

    return routes;
  };

  const handleInputChange = (e) => {
    setJeepCodes(e.target.value);
  };

  const handleButtonClick = () => {
    const jeepCodeList = jeepCodes.split(',');
    let result = '';

    const routes = jeepCodeList.map((code) => getRoute(code.trim()));
    const highlightedRoutes = highlightCommonPlaces(routes);

    highlightedRoutes.forEach((route, index) => {
      result += `${jeepCodeList[index].trim()} => ${route}`;
      result += '<br>';
    });

    setOutput(result);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'white',
    }}>
      <h1>Jeepney Route Finder</h1>
      <TextField
        variant="outlined"
        label="Enter Jeep Codes"
        value={jeepCodes}
        onChange={handleInputChange}
        style={{
          marginBottom: '20px',
        }}
      />
      <Button
        variant="contained"
        onClick={handleButtonClick}
        style={{
          padding: '10px 20px',
          fontSize: '15px',
          cursor: 'pointer',
        }}
      >
        Generate Route
      </Button>
      {output && (
        <div style={{ marginTop: '20px', fontSize: '18px', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: output }} />
      )}
      
 

    </div>
  );
}