import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import axios from 'axios';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 75%;
  margin-top: 5rem;
  @media (min-width: 992px){
    max-width: 75%;
    margin-top: 5rem;
  }
  @media (max-width: 991px){
    max-width: 70%;
    margin: 1rem 2.6rem;
  }
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 50px;
  @media (min-width: 992px){
    margin-top: 80px;
  }
  @media (max-width: 991px){
    margin-top: 10px;
  }
  

  &:after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarCriptoMoneda] = useState('');
  const [resultado, guardarResultado] = useState([]);
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    if (moneda === '' || criptoMoneda === '') return;

    const consultarAPI = async () => {
      const resultado = await axios.get(url);
      guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      
    }
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
    
    guardarCargando(true);
    setTimeout(() => {
      consultarAPI(url);   
      guardarCargando(false);
    }, 2000);
    
  }, [moneda, criptoMoneda])

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Logo Aplicación"
        />
      </div>
      <div>
        <Heading>Cotizador Criptomonedas</Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptoMoneda={guardarCriptoMoneda}
        />

        {cargando? <Spinner /> : <Cotizacion resultado={resultado} />}
      </div>
    </Contenedor>
  );
}

export default App;
