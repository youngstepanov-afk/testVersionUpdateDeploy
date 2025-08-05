import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import logo from './logo.svg';
import './App.css';

ReactModal.setAppElement('#root');

const VERSION_STORAGE_KEY = 'app_version';

function App() {
  const [version, setVersion] = useState('');

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const res = await fetch('/version.json?t=' + Date.now());
        if (!res.ok) throw new Error('Failed to fetch version');
        
        const { version } = await res.json();
        setVersion(version);
        const savedVersion = localStorage.getItem(VERSION_STORAGE_KEY);
        
        if (version !== savedVersion) {
          localStorage.setItem(VERSION_STORAGE_KEY, version);
          window.location.reload();
        }
      } catch (err) {
        console.error('Ошибка проверки обновлений:', err);
      }
    };

    checkForUpdates();
    
    const interval = setInterval(checkForUpdates, 15_000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Версия приложения: {version}</p>
        <p>Сохранённая версия: {localStorage.getItem(VERSION_STORAGE_KEY)}</p>
      </header>
    </div>
  );
}

export default App;