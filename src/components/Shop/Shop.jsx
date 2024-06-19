import React, { useEffect, useState } from 'react';

import { addToDb, getShoppingCart} from '../../utilities/fakedb' 
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {


        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))

    }, [])

    // useEffect(() => {

      
    //     const storedCart = getShoppingCart();
    //     //step 1 : get id

    //     for(const id in storedCart) {
    //         //step 2 get the product by using id

    //         //console.log('products',products);

    //         const addedProduct = products.find(product => product.id===id);
    //      //  console.log('add',addedProduct);

    //        // step 3 get quantity of the product
    //         const quantity = storedCart[id];

    //         addedProduct.quantity =quantity

    //         console.log(addedProduct);
            
            
    //     }
    // },[products])

    // we use (for in ) to loop objects and use (for of) for loop array

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id
    
        for (const id in storedCart) {
            // step 2: get the product by using id
    
            const addedProduct = products.find(product => product.id === id);
            
            // step 3: get quantity of the product
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct)
            }
            //console.log('added product',addedProduct);
        }

        setCart(savedCart);
    }, [products]);
    

    

    const handleAddToCart = (product) => {

        const newCart = [...cart, product]
        setCart(newCart);
        addToDb(product.id);


    }

 //( ctrl+shift+f )= for searching any keywords 


    return (
        <div className='shop-container'>
            <div className="products-container">

                {
                    products.map(product =>

                        <Product

                            key={product.id}

                            product={product}
                            handleAddToCart={handleAddToCart}







                        ></Product>



                    )
                }

            </div>

            <div className="cart-container">


                <Cart cart={ cart}></Cart>
                
            </div>


        </div>
    );
};

export default Shop;