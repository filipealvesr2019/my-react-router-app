import React, { useState } from 'react';
import "./signup.css";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        if (!email.includes('@')) {
            setEmailError('O email é inválido');
            return;
        }
        if (password.length < 6) {
            setPasswordError('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        // Lógica para enviar o email e a senha para o backend
        console.log(email, password);
    };

    return (
        <>
            <form onSubmit={handleSignup}>
                <h2>Sign up</h2>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="email error">{emailError}</div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="password error">{passwordError}</div>
                <button type="submit">Sign up</button>
            </form>
        </>
    );
};

export default Signup;
