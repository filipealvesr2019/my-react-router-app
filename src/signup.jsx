import React, { useState } from 'react';
import "./signup.css"
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Use os valores de email e senha aqui ou passe para a função apropriada
        console.log(email, password);
    };

    return (
        <>
            <form>
    <h2>sign up</h2>
    <label for="email">Email</label>
    <input type="text" name="email" required></input>
    <div class="email error"></div>
    <label for="password">Password</label>
    <input type="password" name="password" required></input>
    <div class="password error"></div>
    <button>Sign up</button>

</form>

        </>
    );
};

export default Signup;
