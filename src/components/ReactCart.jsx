import { useState, useEffect } from 'react';
import './ReactCart.css';

export default function ReactCart({ menuItems,bebidas }) {
  const [cart, setCart] = useState([]);
  const [detail, setDetail] = useState('');

  // Solo en el cliente: carga el carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Guarda el carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, detail }]);
    setDetail(''); // Limpia el detalle después de añadir
  };

  const sendOrder = () => {
    const message = `Pedido: ${cart
      .map(
        item =>
          `${item.name} (${item.detail ? item.detail : 'sin detalle'})`
      )
      .join(', ')}`;
    console.log('Enviando pedido:', message);
    //window.open(`https://wa.me/+1234567890?text=${encodeURIComponent(message)}`);
  };

  return (
    <div className='container'>
      <section className='menu'>
        {/* Menu */}
        <h2>Platos</h2>
      <ul>
        
        {menuItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => addToCart(item)}>Añadir</button>
          </li>
        ))}
      </ul>
      {/* Bebidas */}
        <h2>Bebidas</h2>
       
        <ul>
          
            {bebidas.map(item => (
                <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => addToCart(item)}>Añadir</button>
                </li>
            ))}
        </ul>

      </section>



    
      <h4>Contenido del carrito:</h4>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
           {cart.map((item, idx) => (
  <li key={idx}>
    {item.name} - ${item.price}
    <input
      type="text"
      value={item.detail || ''}
      placeholder="Detalle"
      style={{ marginLeft: '0.5em' }}
      onChange={e => {
        const newCart = [...cart];
        newCart[idx] = { ...newCart[idx], detail: e.target.value };
        setCart(newCart);
      }}
    />
    <button
      onClick={() => {
        setCart(cart.filter((_, i) => i !== idx));
      }}
      style={{ marginLeft: '0.5em' }}
    >
      Remover
    </button>
  </li>
))}
          </ul>
          <p>
            <strong>
              Total: ${cart.reduce((sum, item) => sum + Number(item.price), 0)}
            </strong>
          </p>
        </>
      )}
       
      <button className='whatsapp-float' onClick={() => sendOrder(detail)}><i className="fab fa-whatsapp"></i></button>
    </div>
  );
}