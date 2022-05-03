import styled from '@emotion/styled'
import Formulario from './Components/Formulario';
import ImgCripto from './../src/img/imagen-criptos.png'
import { useEffect, useState } from 'react';
import Resultado from './Components/Resultado';
import Spinner from './Components/Spinner';


const Contenedor = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto;
  @media (min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;

`;

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color:#fff;
  text-align: center;
  font-weight: 700;
  font-size: 34px;
  margin-top: 80px;
  margin-bottom: 50px;
  
  &::after{
    content: '';
    width: 150px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`;

const App = () => {
    const [monedas, setMonedas] = useState({});
    const [resultado, setResultado] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {

        const { criptomoneda, moneda } = monedas;

        if (Object.keys(monedas).length > 0) {
            const consultarPrecio = async () => {
                setCargando(true);
                const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
                const respuesta = await fetch(URL);
                const resultado = await respuesta.json();

                setResultado(resultado.DISPLAY[criptomoneda][moneda]);
                setCargando(false);
            }

            consultarPrecio();
        }




    }, [monedas])


    return (
        <Contenedor>
            <Imagen
                src={ImgCripto}
                alt='Criptomonedas'
            />
            <div>
                <Heading>
                    Cotiza criptomonedas desde el instante
                </Heading>
                <Formulario
                    setMonedas={setMonedas}
                />

                {cargando && <Spinner />}
                {resultado.PRICE && !cargando  && <Resultado resultado={resultado}/>}
            </div>



        </Contenedor>

    )
}

export default App