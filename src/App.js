import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import logo from './logo.svg';
import './App.css';

ReactModal.setAppElement('#root');

const APP_VERSION = '0.8';

function App() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newVersion, setNewVersion] = useState('');

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const res = await fetch('/version.json?t=' + Date.now());
        if (!res.ok) throw new Error('Failed to fetch version');
        
        const { version } = await res.json();
        
        if (version !== APP_VERSION) {
          setNewVersion(version);
          setShowUpdateModal(true);
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
        <p>Version: {APP_VERSION}</p>
      </header>

      <ReactModal
        isOpen={showUpdateModal}
        onRequestClose={() => setShowUpdateModal(false)}
        contentLabel="Update Available"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '400px'
          }
        }}
      >
        <h3>Доступно обновление!</h3>
        <p>Новая версия: {newVersion}</p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={() => window.location.reload(true)}>
            Обновить сейчас
          </button>
          <button onClick={() => setShowUpdateModal(false)}>
            Позже
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default App;
