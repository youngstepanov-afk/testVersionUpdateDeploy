import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [reloadWarning, setReloadWarning] = useState(false);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        // Загружаем текущую версию (кешированную)
        const cachedResponse = await fetch('/version.json');
        const cachedData = await cachedResponse.json();
        const cachedVersion = cachedData.version;

        // Загружаем свежую версию (с bypass кеша)
        const freshResponse = await fetch('/version.json?t=' + Date.now());
        const freshData = await freshResponse.json();
        const freshVersion = freshData.version;

        if (freshVersion !== cachedVersion) {
          setReloadWarning(true);
          alert(`Доступна новая версия (${freshVersion}). Перезагрузка через 15 сек.`);
          setTimeout(() => {
            window.location.reload(true); // Hard reload
          }, 15000);
        }
      } catch (error) {
        console.error('Ошибка проверки версии:', error);
      }
    };

    // Проверяем каждые 60 секунд
    const interval = setInterval(checkForUpdates, 60000);
    checkForUpdates(); // Первая проверка сразу

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Test V.0.3</p>
        {reloadWarning && (
          <div style={{ marginTop: '20px', color: 'yellow' }}>
            ⚠️ Внимание: страница перезагрузится через 15 секунд (новый деплой)
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
