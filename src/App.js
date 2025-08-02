import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// Текущая версия (должна совпадать с version.json)
const APP_VERSION = '0.1';

function App() {
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        // Запрос с параметром, чтобы избежать кеширования
        const res = await fetch('/version.json?t=' + Date.now());
        
        if (!res.ok) throw new Error('Failed to fetch version');
        
        const { version } = await res.json();
        
        if (version !== APP_VERSION) {
          const shouldReload = confirm(
            `Доступна новая версия (${version}). Перезагрузить страницу?`
          );
          if (shouldReload) {
            window.location.reload(true); // Hard reload
          }
        }
      } catch (err) {
        console.error('Ошибка проверки обновлений:', err);
      }
    };

    // Проверяем при загрузке и каждые 10 минут
    checkForUpdates();
    const interval = setInterval(checkForUpdates, 10 * 60 * 1000);
    
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
        <p>Version: {APP_VERSION}</p>
      </header>
    </div>
  );
}

export default App;
