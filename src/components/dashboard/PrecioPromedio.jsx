

const PrecioPromedio = (props) => {
    const data = props;
  
    const sum = data.dataProducts.reduce((accumulator, item) => accumulator + item.price, 0);
    const average = Math.round((sum / data.dataProducts.length)*100)/100;

  

  return (
    <div className='PrecioPromedio'>
      <h1>PROMEDIO:{average} </h1>
    </div>
  )
}

export default PrecioPromedio