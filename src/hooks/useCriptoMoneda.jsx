import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.4rem;
    margin: 1.5rem 0;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 10px;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`;

const useCriptoMoneda = (label, stateInicial, opciones) => {
    const [state, actualizarState] = useState(stateInicial);

    const SelectCriptoMoneda = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">--- Selecciona una opción ---</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    )
    return [state, SelectCriptoMoneda, actualizarState];   
}
 
export default useCriptoMoneda;