import Guitar from './components/Guitar';
import Header from './components/Header'
import {db} from './data/db';
import {useCart} from './hooks/useCart.js'

function App() {
  const {} = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar._id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - José A. Vásquez (c)Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App
