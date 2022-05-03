import styled from '@emotion/styled'
import { useEffect, useState } from 'react';
import { monedas } from '../data/monedas';
import useSelectMonedas from '../hooks/useSelectMonedas';
import Error from './Error';

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`;

const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
    const [criptomoneda, SelectCripto] = useSelectMonedas('Elige la Criptomoneda', criptos);

    useEffect(() => {
        const consultarAPI = async () => {
            const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=5&tsym=mxn';
            const respuesta = await fetch(URL);
            const resultado = await respuesta.json();

            const arrayCriptos = resultado.Data.map(cripto => {

                const objectCripto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return objectCripto;
            });

            setCriptos(arrayCriptos);
        }
        consultarAPI();
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        if ([moneda, criptomoneda].includes('')) {
            setError(true);
            return;
        }
        setError(false);
        setMonedas({moneda, criptomoneda});
    }


    return (
        <>
            {error && <Error> Todos los campos son obligatorios </Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCripto />
                <InputSubmit
                    type='submit'
                    value='Cotizar'
                />
            </form>

        </>
    )
}

export default Formulario
