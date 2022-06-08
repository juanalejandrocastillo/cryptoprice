import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Crypto = () => {
    //1- setear hooks
    const [search, setSearch] = useState('')
    const [cryptos, setCryptos] = useState([])
    //2- funcion para traer datos
    const endpoint = 'https://api.coingecko.com/api/v3/coins'

    const showData = () => {
        axios.get(endpoint).then( (res) => {
            // console.log(res.data)
            setCryptos(res.data)
        })
    }

    useEffect(() => {
        showData()
    }, [])
    //3- funcion busqueda
    const searcher = (e) => {
        setSearch(e.target.value)
    }
    //4- filtrar datos
    const results = !search ? cryptos : cryptos.filter( (val)=> val.name.toLowerCase().includes(search.toLocaleLowerCase()) )
    //rederizar vista
  return (
    <>
      <input value={search} onChange={searcher} type='text' placeholder='Search...' className='form-control' />
          
      <table className='table table-dark table-hover mt-3'>
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Price 24hs</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.market_data.market_cap_rank}</td>
              <td><small><img src={result.image.small} />{result.name}</small></td>
              <td>{result.symbol.toUpperCase()}</td>
              <td>
                {result.market_data.current_price.bmd.toFixed() <= 0 ? (
                  <span>{result.market_data.current_price.bmd.toFixed(8)}</span>
                ) : (
                 <span>{result.market_data.current_price.bmd.toFixed(2)}</span>
                )}
              </td>

              <td>
                {result.market_data.price_change_percentage_24h < 0 ? (
                  <span className='badge bg-danger'>{result.market_data.price_change_percentage_24h}</span>
                ) : (
                  <span className='badge bg-success'>{result.market_data.price_change_percentage_24h}</span>
                )
                  
              }
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>  
      <footer className='text-center'>Juan Alejandro Castillo 2022</footer>
    </>
  )
}

export default Crypto