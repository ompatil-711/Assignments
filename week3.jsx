import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';

// Combined App Component
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

// Landing Page Component
function LandingPage() {
  const products = [
    { id: 1, name: 'Product One', price: '$29.99', image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'Product Two', price: '$39.99', image: 'https://via.placeholder.com/300' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4">BrandName</nav>

      <header className="text-center p-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
        <p className="text-lg mt-2">Find the best products for your needs</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover rounded-lg bg-gray-200" 
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">{product.price}</p>
            <Link 
              to={`/product/${product.id}`} 
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </main>

      <footer className="bg-gray-200 text-center p-4 mt-auto">
        <p>Follow us: 
          <a href="#" className="mx-2 text-blue-500">Twitter</a>
          <a href="#" className="mx-2 text-blue-600">Facebook</a>
        </p>
      </footer>
    </div>
  );
}

// Product Details Component
function ProductDetails() {
  const { id } = useParams();
  
  const productData = {
    1: { 
      name: 'Product One', 
      description: 'Detailed info about Product One. This is a high-quality product with many features that will meet your needs perfectly.', 
      price: '$29.99',
      image: 'https://via.placeholder.com/600'
    },
    2: { 
      name: 'Product Two', 
      description: 'Detailed info about Product Two. An advanced version with additional capabilities for professional use.', 
      price: '$39.99',
      image: 'https://via.placeholder.com/600'
    },
  };

  const product = productData[id];

  if (!product) return <div className="p-6">Product not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link to="/" className="text-blue-500 mb-4 inline-block">← Back to products</Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full rounded-lg bg-gray-200" 
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg mt-4">{product.description}</p>
          <p className="text-xl text-green-600 mt-4">{product.price}</p>
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Express Server (would normally be in a separate server.js file)

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

app.get('/welcome', (req, res) => {
  res.json({ message: "Welcome to Express!" });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
