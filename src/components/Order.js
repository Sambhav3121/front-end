import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function OrderPage() {
    const [order, setOrder] = useState(null);
    const { orderId } = useParams(); 

    useEffect(() => {
        const url = `https://food-delivery.int.kreosoft.space/api/order/${orderId}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => setOrder(data))
            .catch(error => console.error('Error fetching order:', error));
    }, [orderId]); 

    return (
        <div>
            <Link to="/"></Link>
            {order ? (
                <div>
                    <h1>Order Details</h1>
                    <p>Order ID: {order.id}</p>
                    <p>Delivery Time: {new Date(order.deliveryTime).toLocaleString()}</p>
                    <p>Order Time: {new Date(order.orderTime).toLocaleString()}</p>
                    <p>Status: {order.status}</p>
                    <p>Total Price: ${order.price.toFixed(2)}</p>
                    <p>Delivery Address: {order.address}</p>
                    <h2>Dishes Ordered:</h2>
                    <ul>
                        {order.dishes.map(dish => (
                            <li key={dish.id}>
                                <img src={dish.image} alt={dish.name} style={{width: '100px'}} />
                                <p>Name: {dish.name}</p>
                                <p>Price: ${dish.price.toFixed(2)}</p>
                                <p>Total Price: ${dish.totalPrice.toFixed(2)}</p>
                                <p>Amount: {dish.amount}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading order details...</p>
            )}
        </div>
    );
}

export default OrderPage;