import React from 'react';
import '../style/generic.css'
import '../style/Store.css';
import { useEffect, useState } from 'react';



const Item = (props) => {
    // State to hold the quantity of item purchased/purchasing
    const [qty, setQty] = useState(1);

    // Destructures storeItems
    const { storeItems, updateCart } = props;

    // Filters through storeItems to find which item the user had selected from the Store component
    let choice = storeItems.filter(item => item.itemID === props.match.params.id);

    // Destructures the returned array (choice)
    let [itemInfo] = choice;

    // Function to check if the selected item is in the cart, and if so what the quantity is. If there isn't a quantity, set the qty to 1
    //if there is a qty, set it to the qty. This needs to be run by useEffect
    // const checkOriginalQty = () => {
    //     let foundItem = cart.find(element => element.itemID === itemInfo.itemID);
    //     if (foundItem === undefined) {
    //         setQty(1);
    //     }
    //     else {
    //         setQty(foundItem.qty);
    //     }
    //     console.log(qty)
    // }

    // // This useEffect only runs on ComponentDidMount to grab the original quantity of the item
    // useEffect(() => {
    //     checkOriginalQty();
    // }, []);

    // This increments the quantity to add (qtyAdd)
    const incrementQty = () => {
        if (qty < 10) {
            setQty(prevQty => prevQty + 1);
        }
        else {
            alert("don't be greedy!")
        }
    };

    // This decrementss the quantity to add (qtyAdd)
    const decrementQty = () => {
        if (qty <= 0) {
            alert('Are you going to sell me the fish?')
        }
        else {
            setQty(prevQty => prevQty - 1);
        }
    };

    return (
        <div>
            <h1 className='section-title'>Item Page</h1>
            <div className='item-page'>
                <img src={itemInfo.url} alt='failed'></img>
                <div className='item-data'>
                    <h1>{itemInfo.name}</h1>
                    <p>{itemInfo.description}</p>
                    <p>Price: ${itemInfo.price}</p>


                    {/* Section for adding an item */}
                    <div className='item-cta'>
                        <div className='purchase-qty-wrapper'>
                            <button className='decrement qtyButton' onClick={decrementQty}>&lt;</button>
                            <p className='item-quantity'>{qty}</p>
                            <button className='increment qtyButton' onClick={incrementQty}>&gt;</button>
                        </div>



                        {/* <p>Quantity in Cart: {qty}</p>
                        <div className='add-item-section'>
                            <p>Quantity to Add: </p>
                            <div className='purchase-qty-wrapper'>
                                <button className='increment qtyButton'>&lt;</button>
                                <p className='item-quantity'>{qty}</p>
                                <button className='decrement qtyButton'>&gt;</button>
                            </div>
                        </div> */}

                        <button type='submit' className='purchase-button' onClick={(e) => { updateCart(e, qty, {itemInfo})}}>Add to cart</button>




                    </div>
                </div>
            </div>
        </div>
    )


}


export default Item;