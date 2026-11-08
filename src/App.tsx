import React, { useState, useEffect } from 'react';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'prelogin' | 'dashboard'>('splash');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('prelogin');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 0) {
      setShowLoginModal(false);
      setPassword('');
      setScreen('dashboard');
    }
  };

  const handleFingerprintLogin = () => {
    setShowLoginModal(false);
    setPassword('');
    setScreen('dashboard');
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#000000',
      fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      margin: 0,
      padding: 0
    }}>
      {/* Mobile Frame Container */}
      <div style={{
        width: '100%',
        maxWidth: '412px',
        height: '100vh',
        maxHeight: '915px',
        backgroundColor: '#ffffff',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}>

        {/* 1. SPLASH SCREEN */}
        {screen === 'splash' && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '140px 24px 30px 24px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
              <span style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', color: '#0066ae' }}>my</span>
              <span style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', color: '#003b7a' }}>BCA</span>
            </div>
            
            <div style={{ fontSize: '9.5px', color: '#666666', textAlign: 'center', lineHeight: '1.4', fontWeight: '400' }}>
              BCA berizin dan diawasi oleh Otoritas Jasa Keuangan & Bank Indonesia.<br />
              BCA merupakan peserta penjaminan LPS.
            </div>
          </div>
        )}

        {/* 2. PRE-LOGIN SCREEN */}
        {screen === 'prelogin' && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f4f6f9',
            overflowY: 'auto',
            paddingBottom: '20px'
          }}>
            {/* Top Bar Logo & Help */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 20px 10px 20px',
              backgroundColor: '#f4f6f9'
            }}>
              <div>
                <span style={{ fontSize: '26px', fontWeight: '900', fontStyle: 'italic', color: '#0066ae' }}>my</span>
                <span style={{ fontSize: '26px', fontWeight: '900', fontStyle: 'italic', color: '#003b7a' }}>BCA</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  fontSize: '11px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #dcdfe6',
                  padding: '5px 12px',
                  borderRadius: '20px',
                  color: '#4a5568',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '500'
                }}>
                  <span style={{ fontSize: '13px' }}>🎧</span> Pusat Bantuan
                </div>
                <div style={{
                  fontSize: '11px',
                  backgroundColor: '#e53e3e',
                  color: '#ffffff',
                  padding: '3px 10px',
                  borderRadius: '14px',
                  fontWeight: 'bold'
                }}>
                  ID
                </div>
              </div>
            </div>

            {/* Banner Nabung Emas */}
            <div style={{ padding: '0 16px', marginTop: '4px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #003882 0%, #001f54 100%)',
                borderRadius: '18px',
                padding: '16px',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0,56,130,0.2)',
                position: 'relative'
              }}>
                <span style={{
                  backgroundColor: '#ffc107',
                  color: '#000000',
                  fontSize: '9px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px'
                }}>
                  DO IT BETTER
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginTop: '10px', marginBottom: '4px' }}>
                  Nabung Emas<br />Jadi Ringkas di <span style={{ color: '#ffc107' }}>myBCA</span>
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px' }}>
                  <span style={{ fontSize: '10px', color: '#90caf9', textDecoration: 'underline' }}>bca.id/emasmybca</span>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffc107' }}></div>
                </div>
              </div>
            </div>

            {/* User Greeting Box */}
            <div style={{ textAlign: 'center', marginTop: '22px', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', color: '#718096' }}>Halo,</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#1a202c', letterSpacing: '0.5px', marginTop: '2px' }}>ERY</div>
              <div style={{ fontSize: '12px', color: '#a0aec0', marginTop: '2px' }}>ER***7</div>
              <div style={{ fontSize: '13px', color: '#0066ae', fontWeight: 'bold', marginTop: '6px', cursor: 'pointer' }}>
                Ganti Akun
              </div>
            </div>

            {/* Quick Action Buttons Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '0 20px' }}>
              {[
                { label: 'Flazz', bg: '#0056b3', icon: '💳' },
                { label: 'NFC Pay', bg: '#3b82f6', icon: '📡' },
                { label: 'Scan QRIS', bg: '#004085', icon: '📱' },
                { label: 'QRIS Transfer', bg: '#002752', icon: '🔄' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: item.bg,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: '#2d3748', marginTop: '8px', textAlign: 'center' }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Atur Button */}
            <div style={{ textAlign: 'center', marginTop: '14px' }}>
              <span style={{ fontSize: '12px', color: '#718096', backgroundColor: '#edf2f7', padding: '4px 14px', borderRadius: '16px' }}>
                ⚙️ Atur
              </span>
            </div>

            {/* Login Primary Button */}
            <div style={{ padding: '0 20px', marginTop: '20px' }}>
              <button
                onClick={() => setShowLoginModal(true)}
                style={{
                  width: '100%',
                  backgroundColor: '#0056b3',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '14px',
                  borderRadius: '24px',
                  border: 'none',
                  fontSize: '15px',
                  boxShadow: '0 6px 16px rgba(0, 86, 179, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Masuk
              </button>
            </div>

            {/* Layanan Lainnya */}
            <div style={{ padding: '0 20px', marginTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#2d3748' }}>Layanan Lainnya</span>
                <span style={{ fontSize: '14px', color: '#a0aec0' }}>&gt;</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {[
                  { title: 'Pengajuan KPR', icon: '🏠' },
                  { title: 'BIG by BCA', icon: '🛡️' },
                  { title: 'BCA Life', icon: '💚' },
                  { title: 'blu by BCA', icon: '💙' }
                ].map((s, i) => (
                  <div key={i} style={{
                    backgroundColor: '#ffffff',
                    padding: '10px 4px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
                    <div style={{ fontSize: '9px', color: '#4a5568', fontWeight: '500' }}>{s.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. LOGIN MODAL */}
        {showLoginModal && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              width: '100%',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              padding: '24px 20px 28px 20px',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#1a202c', margin: 0 }}>Masuk ke myBCA</h3>
                <span onClick={() => setShowLoginModal(false)} style={{ fontSize: '20px', cursor: 'pointer', color: '#a0aec0' }}>✕</span>
              </div>

              <div style={{ fontSize: '13px', color: '#4a5568', marginBottom: '16px' }}>
                BCA ID: <strong style={{ color: '#0056b3' }}>ERY977</strong>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <input
                    type="password"
                    placeholder="Masukkan Password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '14px',
                      border: '1.5px solid #cbd5e0',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: password ? '#0056b3' : '#cbd5e0',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    padding: '14px',
                    borderRadius: '14px',
                    border: 'none',
                    fontSize: '14px',
                    cursor: password ? 'pointer' : 'not-allowed',
                    marginBottom: '12px'
                  }}
                >
                  Lanjut
                </button>
              </form>

              <div style={{ textAlign: 'center', margin: '10px 0', fontSize: '12px', color: '#a0aec0' }}>atau</div>

              <button
                onClick={handleFingerprintLogin}
                style={{
                  width: '100%',
                  backgroundColor: '#ebf8ff',
                  color: '#0066ae',
                  fontWeight: 'bold',
                  padding: '13px',
                  borderRadius: '14px',
                  border: '1px solid #bee3f8',
                  fontSize: '13.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '18px' }}>👆</span> Masuk dengan Sidik Jari
              </button>
            </div>
          </div>
        )}

        {/* 4. DASHBOARD UTAMA */}
        {screen === 'dashboard' && (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#edf2f7',
            overflowY: 'auto',
            paddingBottom: '75px'
          }}>
            {/* Blue Header Section */}
            <div style={{
              background: 'linear-gradient(180deg, #0052cc 0%, #0066ae 100%)',
              color: '#ffffff',
              padding: '20px 20px 26px 20px',
              borderBottomLeftRadius: '24px',
              borderBottomRightRadius: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '26px', fontWeight: '900', fontStyle: 'italic', color: '#ffffff' }}>my</span>
                  <span style={{ fontSize: '26px', fontWeight: '900', fontStyle: 'italic', color: '#80d8ff' }}>BCA</span>
                </div>
                <div style={{ display: 'flex', gap: '14px', fontSize: '18px' }}>
                  <span>🎧</span>
                  <span>⚙️</span>
                  <span onClick={() => { setScreen('prelogin'); setShowBalance(false); }} style={{ cursor: 'pointer' }}>🚪</span>
                </div>
              </div>

              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#e2e8f0', letterSpacing: '0.5px', marginBottom: '12px' }}>
                HALO, ERY
              </div>

              {/* Main Card Saldo & Rekening */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '18px',
                padding: '16px',
                color: '#1a202c',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)'
              }}>
                <div style={{
                  backgroundColor: '#ebf8ff',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  width: 'fit-content',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#0066ae'
                }}>
                  💳 BCA ID &gt;
                </div>
                
                <div style={{ fontSize: '12.5px', color: '#4a5568', marginTop: '10px' }}>
                  Rekening: <strong style={{ color: '#1a202c' }}>577 - 685 - 1422</strong>
                </div>

                <div style={{
                  marginTop: '14px',
                  paddingTop: '12px',
                  borderTop: '1px solid #edf2f7',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#a0aec0', fontWeight: '500' }}>Saldo Aktif</span>
                    <div style={{ fontSize: '20px', fontWeight: '900', color: '#1a202c', marginTop: '2px', letterSpacing: '-0.5px' }}>
                      {showBalance ? 'IDR 20,081,661.82' : 'IDR ••••••••••••'}
                    </div>
                  </div>
                  {/* Icon Mata Murni */}
                  <span
                    onClick={() => setShowBalance(!showBalance)}
                    style={{ fontSize: '18px', cursor: 'pointer', padding: '4px', userSelect: 'none' }}
                  >
                    {showBalance ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>

                <div style={{
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid #edf2f7',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12.5px',
                  fontWeight: 'bold',
                  color: '#0056b3'
                }}>
                  <span>📑 Mutasi Rekening</span>
                  <span>&gt;</span>
                </div>
              </div>
            </div>

            {/* Hadiah Banner */}
            <div style={{ padding: '0 16px', marginTop: '14px' }}>
              <div style={{
                background: 'linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)',
                borderRadius: '14px',
                padding: '12px 16px',
                color: '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: 'bold', margin: 0 }}>Total 600.000+ Hadiah Siap Dimenangkan!</p>
                  <button style={{
                    marginTop: '6px',
                    backgroundColor: '#ffc107',
                    color: '#0f172a',
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    border: 'none'
                  }}>
                    Main & Dapatkan Hadiah &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Menu Utama Grid */}
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 'bold', color: '#2d3748', marginBottom: '10px' }}>
                <span>Menu Utama</span>
                <span style={{ fontSize: '12px', color: '#718096' }}>⚙️ Atur</span>
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '14px 10px',
                backgroundColor: '#ffffff',
                padding: '18px 12px',
                borderRadius: '18px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}>
                {[
                  { name: 'Transfer', icon: '↗️', badge: '' },
                  { name: 'Bayar & Isi Ulang', icon: '💳', badge: 'NEW' },
                  { name: 'Investasi', icon: '📈', badge: '' },
                  { name: 'Lifestyle', icon: '🛍️', badge: 'NEW' },
                  { name: 'Flazz', icon: '💳', badge: '' },
                  { name: 'Cardless', icon: '🏧', badge: '' },
                  { name: 'Produk Perbankan', icon: '🏛️', badge: '' },
                  { name: 'Proteksi', icon: '🛡️', badge: '' }
                ].map((m, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
                    {m.badge && (
                      <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '6px',
                        backgroundColor: '#e53e3e',
                        color: '#ffffff',
                        fontSize: '7.5px',
                        fontWeight: '900',
                        padding: '1px 4px',
                        borderRadius: '6px'
                      }}>
                        {m.badge}
                      </span>
                    )}
                    <div style={{
                      width: '44px',
                      height: '44px',
                      backgroundColor: '#ebf8ff',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {m.icon}
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '500', color: '#2d3748', marginTop: '6px', lineHeight: '1.2' }}>
                      {m.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. BOTTOM NAVIGATION BAR */}
        {screen === 'dashboard' && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#0052cc',
            color: '#ffffff',
            padding: '8px 24px 10px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 40,
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ textAlign: 'center', fontSize: '10px' }}>
              <div style={{ fontSize: '18px' }}>🏠</div>
              <span style={{ fontWeight: '500' }}>Beranda</span>
            </div>
            <div style={{ textAlign: 'center', fontSize: '10px', opacity: 0.85 }}>
              <div style={{ fontSize: '18px' }}>📑</div>
              <span>Aktivitas</span>
            </div>

            {/* QRIS Big Central Button */}
            <div style={{
              marginTop: '-26px',
              backgroundColor: '#00e5ff',
              padding: '12px',
              borderRadius: '50%',
              border: '4px solid #ffffff',
              fontSize: '22px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
              📱
            </div>

            <div style={{ textAlign: 'center', fontSize: '10px', opacity: 0.85 }}>
              <div style={{ fontSize: '18px' }}>⭐</div>
              <span>Untukmu</span>
            </div>
            <div style={{ textAlign: 'center', fontSize: '10px', opacity: 0.85 }}>
              <div style={{ fontSize: '18px' }}>👤</div>
              <span>Akun Saya</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}