import { useState, useEffect, FormEvent } from 'react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'main'>('login');
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // State Login Biometrik
  const [showBiometricModal, setShowBiometricModal] = useState<boolean>(false);
  
  // State BCA ID & Password
  const [bcaId, setBcaId] = useState<string>('ERY977');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [showPasswordText, setShowPasswordText] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');

  // Auto trigger Sidik Jari gaya-gayaan pas awal buka
  useEffect(() => {
    if (currentScreen === 'login') {
      const timer = setTimeout(() => {
        triggerBiometricEffect();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const triggerBiometricEffect = () => {
    setShowBiometricModal(true);
    setTimeout(() => {
      setShowBiometricModal(false);
    }, 1200);
  };

  // Carousel Iklan State
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const adsList = [
    {
      id: 1,
      title: 'Diskon 50% Kulineran!',
      subtitle: 'Pakai QRIS myBCA di Resto & Cafe Pilihan',
      bg: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      badge: 'PROMO KULINER'
    },
    {
      id: 2,
      title: 'BCA Travel Fair 2026',
      subtitle: 'Cashback s/d Rp 2 Juta Tiket Pesawat & Hotel',
      bg: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
      badge: 'TRAVEL'
    },
    {
      id: 3,
      title: 'KPR BCA Bunga Spesial',
      subtitle: 'Bunga Efektif 2.67% Fix 1 Tahun',
      bg: 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
      badge: 'HUNIAN'
    }
  ];

  // Data Rekening (Saldo: IDR 20.081.300)
  const [accountHolder, setAccountHolder] = useState<string>('ERY');
  const [accountNumber, setAccountNumber] = useState<string>('8830492811');
  const [balance, setBalance] = useState<number>(20081300);
  const [showBalance, setShowBalance] = useState<boolean>(false);

  // Custom Settings State
  const [editName, setEditName] = useState<string>(accountHolder);
  const [editNumber, setEditNumber] = useState<string>(accountNumber);
  const [editBalance, setEditBalance] = useState<string>(balance.toString());
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Transfer State
  const [transferTarget, setTransferTarget] = useState<string>('');
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [transferSuccess, setTransferSuccess] = useState<boolean>(false);

  // Cardless State
  const [cardlessCode, setCardlessCode] = useState<number | null>(null);

  // Mutasi Transaksi
  interface Transaction {
    id: number;
    type: 'in' | 'out';
    title: string;
    amount: number;
    date: string;
    time: string;
  }

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'in', title: 'Transfer Masuk - PT GLOBAL TECH', amount: 5000000, date: '07 Nov 2026', time: '09:15' },
    { id: 2, type: 'out', title: 'QRIS - KOPI KENANGAN', amount: 35000, date: '06 Nov 2026', time: '14:20' },
    { id: 3, type: 'out', title: 'Transfer - ZAHWA LUPIS', amount: 150000, date: '05 Nov 2026', time: '18:45' },
  ]);

  const handleManualLogin = (e: FormEvent) => {
    e.preventDefault();
    if (!inputPassword.trim()) {
      setLoginError('Silakan masukkan password Anda');
      return;
    }
    setLoginError('');
    setCurrentScreen('main');
    setInputPassword('');
  };

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    setAccountHolder(editName);
    setAccountNumber(editNumber);
    setBalance(parseFloat(editBalance) || 0);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleExecuteTransfer = (e: FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (!amt || amt > balance) return;
    setBalance(prev => prev - amt);
    setTransactions([{
      id: Date.now(),
      type: 'out',
      title: `Transfer - ${transferTarget}`,
      amount: amt,
      date: 'Today',
      time: 'Just now'
    }, ...transactions]);
    setTransferSuccess(true);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', color: '#1e293b', padding: '0' }}>
      
      {/* Container Frame HP */}
      <div style={{ width: '100%', maxWidth: '390px', height: '844px', backgroundColor: '#f0f4f8', borderRadius: '36px', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '8px solid #1e293b' }}>
        
        {/* LAYAR LOGIN */}
        {currentScreen === 'login' && (
          <div style={{ flex: 1, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
            <div>
              <div style={{ padding: '16px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f9ff' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#00a3e0', letterSpacing: '-1px' }}>my<span style={{ color: '#00569c' }}>BCA</span></span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px', cursor: 'pointer' }}>🎧</span>
                  <div style={{ backgroundColor: 'white', border: '1px solid #cbd5e1', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', color: '#00569c', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    EN 🇺🇸
                  </div>
                </div>
              </div>

              <div style={{ margin: '10px 16px', backgroundColor: '#38bdf8', borderRadius: '20px', padding: '16px', color: 'white', background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)', boxShadow: '0 4px 12px rgba(2,132,199,0.2)' }}>
                <p style={{ fontSize: '10px', opacity: 0.9, margin: 0 }}>The New Gebyar Hadiah BCA</p>
                <h3 style={{ fontSize: '16px', fontWeight: '900', margin: '2px 0 4px' }}>TERIMA KASIH</h3>
                <p style={{ fontSize: '9px', opacity: 0.8, margin: 0 }}>sudah bermain Gacha dan mengumpulkan poin</p>
              </div>

              <div style={{ padding: '16px 20px' }}>
                <form onSubmit={handleManualLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>BCA ID</label>
                    <input 
                      type="text" 
                      value={bcaId}
                      onChange={(e) => setBcaId(e.target.value)}
                      style={{ width: '100%', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '14px', fontWeight: 'bold', color: '#00569c', backgroundColor: '#f8fafc', outline: 'none' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Password</label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <input 
                        type={showPasswordText ? 'text' : 'password'}
                        placeholder="Masukkan Password Anda"
                        value={inputPassword}
                        onChange={(e) => { setInputPassword(e.target.value); setLoginError(''); }}
                        style={{ width: '100%', padding: '12px 40px 12px 12px', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '14px', color: '#1e293b', outline: 'none' }}
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPasswordText(!showPasswordText)}
                        style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#64748b', padding: 0 }}
                      >
                        {showPasswordText ? '👁️' : '👁️‍🗨️'}
                      </button>
                    </div>
                  </div>

                  {loginError && (
                    <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', padding: '8px 12px', borderRadius: '8px' }}>
                      <p style={{ fontSize: '11px', color: '#dc2626', margin: 0, fontWeight: 'bold', textAlign: 'center' }}>
                        ⚠️ {loginError}
                      </p>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    <button 
                      type="submit"
                      style={{ flex: 1, padding: '14px', backgroundColor: '#00569c', color: 'white', border: 'none', borderRadius: '24px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,86,156,0.25)' }}
                    >
                      Login
                    </button>

                    <button 
                      type="button"
                      onClick={triggerBiometricEffect}
                      title="Pemindai Sidik Jari"
                      style={{ width: '48px', height: '48px', backgroundColor: '#e0f2fe', border: '1.5px solid #00a3e0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', cursor: 'pointer' }}
                    >
                      ☝️
                    </button>
                  </div>
                </form>
              </div>

              <div style={{ margin: '0 16px 20px', backgroundColor: '#f8fafc', borderRadius: '20px', padding: '14px', display: 'flex', justifyContent: 'space-around', border: '1px solid #f1f5f9' }}>
                {[
                  { title: 'Flazz', icon: '🎴' },
                  { title: 'Scan QRIS', icon: '🔳' },
                  { title: 'QRIS Transfer', icon: '📲' },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={triggerBiometricEffect}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', margin: '0 auto 4px' }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: '10px', color: '#00569c', fontWeight: '600' }}>{item.title}</span>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 10px' }}>
                  Want to Login with a different account? <br />
                  <span style={{ color: '#00569c', fontWeight: 'bold', cursor: 'pointer' }}>Change Account</span>
                </p>
                <span style={{ fontSize: '11px', color: '#00569c', fontWeight: '500', cursor: 'pointer' }}>
                  ⓘ About myBCA
                </span>
              </div>
            </div>
          </div>
        )}

        {/* LAYAR UTAMA (BERANDA) */}
        {currentScreen === 'main' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', backgroundColor: '#00569c' }}>
            
            <div style={{ padding: '16px 20px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
              <span style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-1px' }}>my<span style={{ color: '#38bdf8' }}>BCA</span></span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontSize: '18px', cursor: 'pointer' }}>🎧</span>
                <span style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => setActiveTab('settings')}>⚙️</span>
                <span style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => { setCurrentScreen('login'); setLoginError(''); }}>🚪</span>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 80px' }}>

              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 'bold', margin: '4px 0 12px', letterSpacing: '0.5px' }}>HELLO, {accountHolder}</p>

              <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', marginBottom: '16px' }}>
                <div style={{ background: 'linear-gradient(90deg, #38bdf8 0%, #2dd4bf 100%)', borderRadius: '12px', padding: '8px 12px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '3px 10px', borderRadius: '10px', fontSize: '10px', fontWeight: 'bold' }}>
                    ⓘ View BCA ID
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    Account: {accountNumber} 📋
                  </span>
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Active Balance</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#1e293b', fontFamily: 'monospace', margin: 0 }}>
                      IDR {showBalance ? balance.toLocaleString('id-ID') : '••••••••'}
                    </h3>

                    <button 
                      onClick={() => setShowBalance(!showBalance)} 
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {showBalance ? (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00569c" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      ) : (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00569c" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
                  <button onClick={() => setActiveTab('history')} style={{ background: 'none', border: 'none', color: '#00569c', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', padding: 0 }}>
                    📊 Account Transactions
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ background: adsList[currentAdIndex].bg, borderRadius: '18px', padding: '14px 16px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '64px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 'bold', backgroundColor: 'rgba(255,255,255,0.25)', padding: '2px 6px', borderRadius: '6px', letterSpacing: '0.5px' }}>
                      {adsList[currentAdIndex].badge}
                    </span>
                    <h4 style={{ fontSize: '13px', fontWeight: '900', margin: '4px 0 2px' }}>{adsList[currentAdIndex].title}</h4>
                    <p style={{ fontSize: '10px', opacity: 0.9, margin: 0 }}>{adsList[currentAdIndex].subtitle}</p>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: 'white', color: '#00569c', padding: '6px 12px', borderRadius: '14px' }}>
                    Cek Promo &gt;
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
                  {adsList.map((ad, idx) => (
                    <div 
                      key={ad.id} 
                      onClick={() => setCurrentAdIndex(idx)}
                      style={{ width: currentAdIndex === idx ? '16px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: currentAdIndex === idx ? '#38bdf8' : 'rgba(255,255,255,0.4)', cursor: 'pointer' }} 
                    />
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '20px 12px', marginBottom: '16px' }}>
                {activeTab === 'home' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px 8px' }}>
                    {[
                      { title: 'Transfer', icon: '🔄', badge: null, tab: 'transfer' },
                      { title: 'Payment & Top Up', icon: '🧾', badge: 'NEW', tab: 'home' },
                      { title: 'Welma', icon: '📈', badge: null, tab: 'home' },
                      { title: 'Lifestyle', icon: '🛍️', badge: null, tab: 'home' },
                      { title: 'Flazz', icon: '🎴', badge: null, tab: 'home' },
                      { title: 'Cardless', icon: '📲', badge: null, tab: 'cardless' },
                      { title: 'Bank Products', icon: '🏛️', badge: null, tab: 'home' },
                      { title: 'Scheduled Transactions', icon: '📅', badge: null, tab: 'home' },
                    ].map((item, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveTab(item.tab)}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
                      >
                        <div style={{ width: '46px', height: '46px', backgroundColor: '#e0f2fe', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', position: 'relative' }}>
                          {item.icon}
                          {item.badge && (
                            <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#f97316', color: 'white', fontSize: '8px', fontWeight: 'bold', padding: '1px 4px', borderRadius: '6px' }}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <span style={{ fontSize: '10px', color: '#334155', fontWeight: '500', textAlign: 'center', lineHeight: '1.2' }}>{item.title}</span>
                      </button>
                    ))}
                  </div>
                )}

                {activeTab === 'transfer' && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#00569c', marginBottom: '12px' }}>Transfer Dana</h4>
                    {transferSuccess ? (
                      <div style={{ textAlign: 'center', padding: '12px' }}>
                        <p style={{ color: '#16a34a', fontWeight: 'bold' }}>Transfer Berhasil!</p>
                        <button onClick={() => setTransferSuccess(false)} style={{ padding: '6px 14px', background: '#00569c', color: 'white', border: 'none', borderRadius: '8px' }}>OK</button>
                      </div>
                    ) : (
                      <form onSubmit={handleExecuteTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input type="text" placeholder="Rekening Tujuan" value={transferTarget} onChange={e => setTransferTarget(e.target.value)} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px' }} required />
                        <input type="number" placeholder="Nominal (Rp)" value={transferAmount} onChange={e => setTransferAmount(e.target.value)} style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '12px' }} required />
                        <button type="submit" style={{ padding: '10px', background: '#00569c', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px' }}>Transfer Sekarang</button>
                      </form>
                    )}
                  </div>
                )}

                {activeTab === 'cardless' && (
                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#00569c' }}>Tarik Tunai Tanpa Kartu</h4>
                    {cardlessCode ? (
                      <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#00569c', margin: '12px 0' }}>{cardlessCode}</div>
                    ) : (
                      <button onClick={() => setCardlessCode(Math.floor(100000 + Math.random() * 900000))} style={{ marginTop: '8px', padding: '8px 16px', background: '#00569c', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px' }}>Generate Kode</button>
                    )}
                  </div>
                )}

                {activeTab === 'history' && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#00569c', marginBottom: '10px' }}>Account Transactions</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {transactions.map(tx => (
                        <div key={tx.id} style={{ padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', border: '1px solid #e2e8f0' }}>
                          <div>
                            <p style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>{tx.title}</p>
                            <p style={{ fontSize: '9px', color: '#94a3b8', margin: 0 }}>{tx.date} • {tx.time}</p>
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 'bold', color: tx.type === 'in' ? '#16a34a' : '#dc2626' }}>
                            {tx.type === 'in' ? '+' : '-'}{formatRupiah(tx.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#00569c', marginBottom: '10px' }}>Custom Data Rekening</h4>
                    {saveSuccess && <p style={{ color: '#16a34a', fontSize: '11px' }}>✓ Data Saved Successfully!</p>}
                    <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input type="text" value={editName} onChange={e => setEditName(e.target.value)} placeholder="Account Holder Name" style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} />
                      <input type="text" value={editNumber} onChange={e => setEditNumber(e.target.value)} placeholder="Account Number" style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} />
                      <input type="number" value={editBalance} onChange={e => setEditBalance(e.target.value)} placeholder="Active Balance (Rp)" style={{ padding: '8px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '12px' }} />
                      <button type="submit" style={{ padding: '10px', background: '#f59e0b', color: '#1e293b', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px' }}>Save Changes</button>
                    </form>
                  </div>
                )}
              </div>

              <div style={{ backgroundColor: '#0284c7', background: 'linear-gradient(135deg, #0369a1 0%, #0c4a6e 100%)', borderRadius: '20px', padding: '16px', color: 'white', textAlign: 'center' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 8px' }}>Perubahan Biaya Transfer</h4>
                <p style={{ fontSize: '10px', opacity: 0.9, lineHeight: '1.4', margin: '0 0 8px' }}>
                  Transfer BI FAST ke <strong>BCA Digital (Blu)</strong> menjadi Rp2.500<br />
                  Transfer Realtime Online ke <strong>BCA Syariah</strong> menjadi Rp2.500
                </p>
                <p style={{ fontSize: '9px', opacity: 0.7, margin: 0 }}>Efektif mulai 03 Januari 2025</p>
              </div>

            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#00569c', padding: '8px 16px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', color: activeTab === 'home' ? '#38bdf8' : 'white' }}>
                <span style={{ fontSize: '16px' }}>🏛️</span>
                <span style={{ fontSize: '9px', fontWeight: 'bold' }}>Home</span>
              </button>

              <button onClick={() => setActiveTab('history')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', color: activeTab === 'history' ? '#38bdf8' : 'white' }}>
                <span style={{ fontSize: '16px' }}>📄</span>
                <span style={{ fontSize: '9px' }}>Activity</span>
              </button>

              <button onClick={() => setActiveTab('home')} style={{ background: 'none', border: 'none', marginTop: '-24px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: '#38bdf8', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00569c', fontSize: '24px', boxShadow: '0 4px 12px rgba(56,189,248,0.4)', border: '3px solid #00569c' }}>
                  🔳
                </div>
                <span style={{ fontSize: '9px', color: 'white', fontWeight: 'bold', marginTop: '2px' }}>QRIS</span>
              </button>

              <button style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', color: 'white' }}>
                <span style={{ fontSize: '16px' }}>⭐</span>
                <span style={{ fontSize: '9px' }}>For You</span>
              </button>

              <button onClick={() => setActiveTab('settings')} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', cursor: 'pointer', color: activeTab === 'settings' ? '#38bdf8' : 'white' }}>
                <span style={{ fontSize: '16px' }}>👤</span>
                <span style={{ fontSize: '9px' }}>My Account</span>
              </button>
            </div>

          </div>
        )}

        {showBiometricModal && (
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '24px', textAlign: 'center', width: '100%', maxWidth: '260px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                ☝️
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#00569c', margin: '0 0 4px' }}>
                Memindai Sidik Jari
              </h4>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>
                BCA ID: {bcaId}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}