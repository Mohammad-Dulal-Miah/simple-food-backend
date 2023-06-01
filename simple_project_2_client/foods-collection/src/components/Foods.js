import React from 'react';

const Foods = ({food}) => {

    const {name , email , quantity} = food;

    return (
        <div>
            <h3>Name: {name}</h3>
            <p><small>Email: {email}</small></p>
            <p><small>Quantity: {quantity}</small></p>
        </div>
    );
};

export default Foods;