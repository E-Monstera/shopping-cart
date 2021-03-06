import Home from './components/Home';
import Store from './components/Store';
import Cart from './components/Cart';
import Nav from './components/Nav';
import Item from './components/Item';
import './style/generic.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


/*
What I need to accomplish:

1-Update the nav-bar to have shadows or something that shows which tab we are in
2-Create the basic css for the shopping cart
3-Create a state for the shopping cart and add funcionality to
  increment/decrement the quantity from Item.js
  add item to cart from Store.js
4-Load the state of the cart to Cart.js to load and calculate the total

Optional:
1 - Add a note saying that the item was successfully added to the cart AND THE TOTAL currently in the cart!
2 - Add hover effects to the buttons
3 - Add an absolutely positioned dropdown for the cart
4 - Add an image for cart and a quantity updator
*/








function App() {

  // Array that holds the store items
  const storeItems = [{ name: 'Anglerfish', url: '/images/anglerfish.webp', description: 'This fish uses light to lure you out of the dark. The last thing you will every see will be its multitude of teeth gaping wide to swallow you whole. 10/10 on the terror scale.', price: 550.00, itemID: 'anglerfish' }, { name: 'Barreleye', url: '/images/barreleye.jpeg', description: 'With its transparent head, this fish can track your whereabouts no matter where you are. Bonus points for this fishes ability to cause an existential crisis as your enemy visualizes what translucent skin on a human would look like.', price: 750.00, itemID: 'barreleye' }, { name: 'Black Dragonfish', url: '/images/black-dragonfish.webp', description: 'While the males of this species prefer to stay below 1,000 meters, the much larger females return to the surface waters at night. Their slight glow may alert you to their presense... If not too late.', price: 300.00, itemID: 'black-dragonfish' }, { name: 'Frilled Shark', url: '/images/frilled-shark.jpg', description: 'If your frenemie is bothered by both sharks and eels, this is the perfect animal for their nightmares. Despite its 300 recurved, needle-like, teeth, this shark prefers to swallow its prey whole with its long and flexibile jaws.', price: 500.00, itemID: 'frilled-shark' }, { name: 'Goblin Shark', url: '/images/goblin-shark.webp', description: 'This shark, equipped with nail-like teeth, usually measure at 13 feet in length, but has been recorded to be 20 feet long. The appearance of this shark is enough to frighten your hardiest enemy.', price: 300.00, itemID: 'goblin-shark' }, { name: 'Greenland Shark', url: '/images/greenland-shark.jpg', description: 'This shark is not only one of the largest living sharks but also one of the longest living. Their average size is 21 feet long; however, they can grow up to 24 feet in length. Living in the Artic and North Atlantic Oceans, this shark survives in a freezing environment, slowly hunting you as it waits to attack. Its upper jaw teeth are pointed, and very thin, allowing them to hold onto you while their lower jaw cuts massive bites out of you.', price: 800.00, itemID: 'greenland-shark' }, { name: 'Lamprey', url: '/images/lamprey.webp', description: 'These parasitic fish feed by boring into your flesh and sucking out your blood. Need we say more?', price: 500.00, itemID: 'lamprey' }, { name: 'Moray Eel', url: '/images/moray-eel.jpg', description: 'Anyone who says they are not bothered by these eels is lying, or ignorant. These eels are equipped with the terrifying pharyngeal jaws, a second set of jaws nestled back in their throat that comes forwards when they bite. Two bites for the price of one.', price: 250.00, itemID: 'moray-eel' }, { name: 'Payara', url: '/images/payara.jpg', description: 'Also known as the saber tooth barracuda or vampire fish, this sharp toothed fish will be extra terrifying in numbers.', price: 150.00, itemID: 'payara' }, { name: 'Red-Lipped Batfish', url: '/images/red-lipped-batfish.jpg', description: 'Those lips.', price: 200.00, itemID: 'red-lipped-batfish' }, { name: 'Sarcastic Fringehead', url: '/images/sarcastic-fringehead.webp', description: 'This territorially aggressive fish is not afraid to defend its habitat. In numbers, would you be able to fend them off?', price: 100.00, itemID: 'sarcastic-fringehead' }, { name: 'Vampire Squid', url: '/images/vampire-squid.jpg', description: 'That gaping array of teeth will be the last thing your nightmare victim sees.', price: 750.00, itemID: 'vampire-squid' }]

  // State to hold the cart contents
  const [cart, setCart] = useState([]);

  // This is a private method that finds the item in the cart and returns the index
  const findItem = (ID) => {
    return cart.findIndex(element => element.itemID === ID);
  }

  //This function removes an item from the array. It is triggered by the 'remove item' button on the Cart component (Cart.js)
  //It finds the index of the array, copies the cart to a temporary array, then sets the cart to the spliced array
  const removeItemFromCart = (e) => {
    
    const index = findItem(e.target.id);
    let tempCart = [...cart];
    tempCart.splice(index, 1);
    setCart([...tempCart]);
  }

  // This function edits an existing element in the cart. The adjustor indicates whether we're incrementing
  // or decrementing the item. If we decrememnt the item and it hits 0, then we remove the item from the cart
  const editCart = (e, adjustor) => {

    // Find the index of the element to be adjusted
    const index = findItem(e.target.id);
    const tempCart = [...cart];

    if (adjustor === 1) {
      tempCart[index].qty = tempCart[index].qty + 1;
    }
    else {
      if (tempCart[index].qty <= 0) {
        alert('removing item from cart')
        tempCart.splice(index, 1);
      }
      else {
        tempCart[index].qty = tempCart[index].qty - 1;
      }
      console.log('decremented')
    }
    setCart([...tempCart])
  }

  // This function updates the cart from the Item component, only adding items as requested
  const updateCart = (e, qty, item) => {
    e.preventDefault();

    //This checks to see if the item already exists in the cart
    let index = findItem(item.itemInfo.itemID);

    //This conditional covers if item is not found. It copies the cart array and appends the new object and its quantity to the end
    if (index === -1) {
      setCart([...cart, {
        name: item.itemInfo.name,
        url: item.itemInfo.url,
        price: item.itemInfo.price,
        itemID: item.itemInfo.itemID,
        qty: qty
      }])
    }
    // This conditional covers if the item is found. It copies the array, updates the quantity, and copies itself to the state array
    else {
      const tempCart = [...cart];
      tempCart[index].qty = tempCart[index].qty + qty;

      setCart([...tempCart])
    }
    alert('added to cart')
  };

  // This is just used for seeing live updates
  useEffect(() => {
    // console.log('cart changed')
    // console.log(cart);
  }, [cart])


  return (
    <Router>
      <div className="App page-wrapper">
        <Nav />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/store" exact
            render={(props) => (
              <Store {...props} storeItems={storeItems} />
            )} />

          <Route path='/store/:id'
            render={(props) => (
              <Item {...props} storeItems={storeItems} cart={cart} updateCart={updateCart} />
            )} />

          <Route path="/cart" 
          render={(props) => (
              <Cart {...props} cart={cart} 
              removeItemFromCart={removeItemFromCart} editCart={editCart}/>
            )}/>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
