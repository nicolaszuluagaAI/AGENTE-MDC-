</div >
  <button
    onClick={async () => {
      await fetch('/api/auth/logout', { method: 'POST' })
      window.location.href = '/login'
    }}
    style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '8px 12px', margin: '8px',
      background: 'transparent', border: 'none', borderRadius: '8px',
      color: '#6b7280', fontSize: '14px', cursor: 'pointer',
      width: 'calc(100% - 16px)', textAlign: 'left'
    }}
    onMouseOver={e => (e.currentTarget.style.background = '#1f2937')}
    onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
  >
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
    Cerrar sesión
  </button>
      </nav >