import React from 'react';
import styled from '@emotion/styled';

const Resultado = styled.div`
    color: white;
    font-family: Arial, Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
  font-size: 18px;
`;

const Precio = styled.p`
  font-size: 30px;
`;

const Cotizacion = ({resultado}) => {
    if (Object.keys(resultado).length === 0) return null;
    return (  
        <Resultado>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El precio más alto del día es: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio más bajo del día es: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación últimas 24 horas: <span>{parseFloat(resultado.CHANGEPCT24HOUR)}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </Resultado>
    );
}
 
export default Cotizacion;