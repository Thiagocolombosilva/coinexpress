import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, LogOut, CreditCard, Smartphone, Bitcoin, Shield, Clock, Star, Menu, X } from 'lucide-react';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'

const CoinExpressSite = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [serverName, setServerName] = useState('');
  const [characterName, setCharacterName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const packages = [
    { id: 1, coins: 250, price: 60.00, bonus: 0, popular: false },
    { id: 2, coins: 500, price: 118.00, bonus: 10, popular: false },
    { id: 3, coins: 1000, price: 232.00, bonus: 50, popular: true },
    { id: 4, coins: 2500, price: 570.00, bonus: 150, popular: false },
    { id: 5, coins: 5000, price: 1120.00, bonus: 350, popular: false }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'teste@teste.com.br' && password === 'teste') {
      setIsLoggedIn(true);
      setShowLogin(false);
      setEmail('');
      setPassword('');
    } else {
      alert('Usuário ou senha incorretos!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCart([]);
  };

  const addToCart = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }

    if (!serverName || !characterName) {
      alert('Por favor, preencha o servidor e o nome do personagem');
      return;
    }

    const pkg = packages.find(p => p.id === selectedPackage);
    const item = {
      id: Date.now(),
      package: pkg,
      quantity,
      serverName,
      characterName,
      total: pkg.price * quantity
    };

    setCart([...cart, item]);
    setSelectedPackage(null);
    setQuantity(1);
    setServerName('');
    setCharacterName('');
    alert('Adicionado ao carrinho!');
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalCart = () => {
    return cart.reduce((sum, item) => sum + item.total, 0);
  };

  const finalizePurchase = () => {
    if (!paymentMethod) {
      alert('Selecione uma forma de pagamento');
      return;
    }
    alert(`Pedido finalizado! Total: R$ ${getTotalCart().toFixed(2)}\nMétodo: ${paymentMethod}\nEm breve você receberá as instruções de pagamento.`);
    setCart([]);
    setShowCart(false);
    setPaymentMethod('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center font-bold text-xl">
                CE
              </div>
              "text-2xl font-bold text-white">CoinExpress</span>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setShowCart(true)}
                    className="flex items-center space-x-2 text-white hover:text-yellow-400 transition relative"
                  >
                    <ShoppingCart size={20} />
                    {cart.length > 0 && (
                      "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cart.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-red-400 transition"
                  >
                    <LogOut size={20} />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/50 transition"
                >
                  <User size={20} />
                  <span>Entrar</span>
                </button>
              )}
            </nav>
          </div>

          {/* Mobile navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setShowCart(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white hover:text-yellow-400 transition w-full"
                  >
                    <ShoppingCart size={20} />
                    <span>Carrinho ({cart.length})</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-white hover:text-red-400 transition w-full"
                  >
                    <LogOut size={20} />
                    <span>Sair</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-lg font-semibold w-full justify-center"
                >
                  <User size={20} />
                  <span>Entrar</span>
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Tibia Coins com
              "bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Segurança</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              A forma mais rápida e segura de comprar Tibia Coins. Entrega automática em minutos!
            </p>
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center space-x-3 text-white">
                <Shield className="text-green-400" size={32} />
                <div className="text-left">
                  <div className="font-bold">100% Seguro</div>
                  <div className="text-sm text-gray-400">Pagamento protegido</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Clock className="text-blue-400" size={32} />
                <div className="text-left">
                  <div className="font-bold">Entrega Rápida</div>
                  <div className="text-sm text-gray-400">Até 5 minutos</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Star className="text-yellow-400" size={32} />
                <div className="text-left">
                  <div className="font-bold">Melhor Preço</div>
                  <div className="text-sm text-gray-400">Pacotes com bônus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Escolha seu Pacote
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 transition-all hover:scale-105 cursor-pointer ${
                  selectedPackage === pkg.id
                    ? 'border-yellow-400 shadow-lg shadow-yellow-500/50'
                    : pkg.popular
                    ? 'border-purple-500'
                    : 'border-slate-700'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    POPULAR
                  </div>
                )}
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold text-yellow-400">{pkg.coins}</div>
                  <div className="text-sm text-gray-400">Tibia Coins</div>
                  {pkg.bonus > 0 && (
                    <div className="bg-green-500/20 border border-green-500 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                      +{pkg.bonus} BÔNUS
                    </div>
                  )}
                  <div className="text-3xl font-bold text-white">
                    R$ {pkg.price.toFixed(2)}
                  </div>
                  <button
                    className={`w-full py-3 rounded-lg font-bold transition ${
                      selectedPackage === pkg.id
                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    {selectedPackage === pkg.id ? 'SELECIONADO' : 'SELECIONAR'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Form */}
          {selectedPackage && (
            <div className="mt-12 max-w-2xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-purple-500">
              <h3 className="text-2xl font-bold text-white mb-6">Complete seu Pedido</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Nome do Servidor</label>
                  <input
                    type="text"
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 outline-none"
                    placeholder="Ex: Antica, Luminera..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Nome do Personagem</label>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 outline-none"
                    placeholder="Ex: Dark Knight..."
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Quantidade</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 outline-none"
                  />
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="flex justify-between text-white mb-2">
                    <span>Subtotal:</span>
                    "font-bold">
                      R$ {(packages.find(p => p.id === selectedPackage).price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={addToCart}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={24} />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border-2 border-purple-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Login</h2>
              <button onClick={() => setShowLogin(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 outline-none"
                  placeholder="seu@email.com"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-3 rounded-lg border border-slate-600 focus:border-purple-500 outline-none"
                  placeholder="********"
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-yellow-500/50 transition"
              >
                Entrar
              </button>
              <p className="text-sm text-gray-400 text-center">
                Demo: teste@teste.com.br / teste
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Carrinho de Compras</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Seu carrinho está vazio</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-slate-700/50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-white font-bold text-lg">
                            {item.package.coins} Tibia Coins
                          </div>
                          <div className="text-gray-400 text-sm">
                            Servidor: {item.serverName} | Personagem: {item.characterName}
                          </div>
                          <div className="text-gray-400 text-sm">
                            Quantidade: {item.quantity}x
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="text-right text-yellow-400 font-bold">
                        R$ {item.total.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-700 pt-6 space-y-6">
                  <div>
                    <h3 className="text-white font-bold mb-4">Forma de Pagamento</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setPaymentMethod('PIX')}
                        className={`p-4 rounded-lg border-2 transition ${
                          paymentMethod === 'PIX'
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <Smartphone className="mx-auto mb-2 text-green-400" size={32} />
                        <div className="text-white font-bold">PIX</div>
                        <div className="text-sm text-gray-400">Aprovação instantânea</div>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('Cartão')}
                        className={`p-4 rounded-lg border-2 transition ${
                          paymentMethod === 'Cartão'
                            ? 'border-blue-500 bg-blue-500/20'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <CreditCard className="mx-auto mb-2 text-blue-400" size={32} />
                        <div className="text-white font-bold">Cartão</div>
                        <div className="text-sm text-gray-400">Crédito ou Débito</div>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('Crypto')}
                        className={`p-4 rounded-lg border-2 transition ${
                          paymentMethod === 'Crypto'
                            ? 'border-orange-500 bg-orange-500/20'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <Bitcoin className="mx-auto mb-2 text-orange-400" size={32} />
                        <div className="text-white font-bold">Crypto</div>
                        <div className="text-sm text-gray-400">Bitcoin, USDT</div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex justify-between text-white text-xl mb-2">
                      "font-bold">Total:</span>
                      "font-bold text-yellow-400">
                        R$ {getTotalCart().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={finalizePurchase}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/30 border-t border-purple-500/20 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 CoinExpress. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">Entrega rápida e segura de Tibia Coins</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const routes = [
    {
      path: "/",
      element: <CoinExpressSite />,
    },
  ];

  const router = createBrowserRouter(routes, { basename: import.meta.env.DEV ? '/' : '/coinexpress/' })

  return <RouterProvider router={router} />
}

export default App;
 
