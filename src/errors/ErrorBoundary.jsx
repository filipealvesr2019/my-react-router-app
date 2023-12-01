import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode logar o erro aqui, se necessário
  }

  render() {
    if (this.state.hasError) {
      return <p>Algo deu errado!</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
