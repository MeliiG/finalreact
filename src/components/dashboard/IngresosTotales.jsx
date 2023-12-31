import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Dashboard.css"

const IngresosTotales = (props) => {
  const [TotalIngresos, setTotalIngresos] = useState(0);
  const data = props;
  
  useEffect(() => {
    const obtenerPrecioProducto = async (productId) => {
      try {
        const response = await axios.get(
          `${data.data.API}/products/${productId}`
        );
        const producto = response.data;
        return producto.price ;
      } catch (error) {
        alert(
          `Error al obtener el precio del producto ${productId}: ${error.message}`
        );
        return 0;
      }
    };

    const calcularTotalIngresos = async () => {
      try {
        const response = await axios.get(`${data.data.API}/carts`);
        const carritos = response.data;
        let totalIngresos = 0;
        for (const carrito of carritos) {
          let subtotal = 0;
          for (const producto of carrito.products) {
            const precio = await obtenerPrecioProducto(producto.productId);
            subtotal += (Math.round(precio * producto.quantity) * 100) / 100;
          }
          totalIngresos += subtotal;
        }
        setTotalIngresos(totalIngresos);
      } catch (error) {
        alert(`Error al calcular el total de ingresos: ${error.message}`);
      }
    };

    calcularTotalIngresos();
  }, []);

  return (
    <div className="IngresosTotales">Total de ingresos: {TotalIngresos}</div>
  );
};

export default IngresosTotales;
