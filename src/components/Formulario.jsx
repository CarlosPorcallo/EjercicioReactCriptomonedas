import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptoMoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.button`
    margin: 30px 0;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;    
    }
`;

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) => {

    const listaMonedas = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ];

    // state
    const [listaCriptoMonedas, guardarCripto] = useState([]);
    const [error, guardarError] = useState(false);
    // hooks
    const [moneda, SelectMonedas] = useMoneda('Elige tu Moneda', '', listaMonedas);
    const [cripto, SelectCriptoMonedas] = useCriptoMoneda('Elige tu Criptomoneda', '', listaCriptoMonedas);

    useEffect(() => {
        const consultarAPI = async (url) => {   
            const resultado = await axios.get(url);
            guardarCripto(resultado.data.Data);
            // const api = await fetch(url);
            // const resultado = await api.json();
            // guardarCripto(resultado.Data);
        }
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
        consultarAPI(url);
    }, []);

    const CalcularCotizacion = e => {
        e.preventDefault();
        guardarError(false);

        if (moneda === '' || cripto === '') {
            guardarError(true);
            return;
        }

        guardarMoneda(moneda);
        guardarCriptoMoneda(cripto);
    }

    return (
        <form
            onSubmit={CalcularCotizacion}
        >
            {error? <Error mensaje="Todos los campos son obligatorios" /> : null}

            <SelectMonedas />
            <SelectCriptoMonedas />

            <Boton
                type="submit"
            >Calcular</Boton>
        </form>
    );
}
 
export default Formulario;