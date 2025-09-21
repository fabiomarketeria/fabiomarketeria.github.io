const { useState } = React;

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'prequalificacao':
                return <PreQualificacaoPage onBack={() => setCurrentPage('home')} />;
            case 'prequalificacao-improved':
                return <PreQualificacaoPageImproved onBack={() => setCurrentPage('home')} />;
            default:
                return <LandingPage onNavigate={setCurrentPage} />;
        }
    };

    return (
        <div className="app">
            {renderPage()}
        </div>
    );
}

function LandingPage({ onNavigate }) {
    return (
        <div className="landing-page">
            {/* Header with Logo */}
            <header className="header">
                <div className="header-content">
                    <div className="logo-section">
                        <img 
                            src="logo.svg" 
                            alt="Marketeria Logo" 
                            className="logo"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                        <h1 className="site-title">Marketeria</h1>
                    </div>
                    <nav className="nav-menu">
                        <button 
                            className="nav-button"
                            onClick={() => onNavigate('prequalificacao')}
                        >
                            Pré-qualificação
                        </button>
                        <button 
                            className="nav-button"
                            onClick={() => onNavigate('prequalificacao-improved')}
                        >
                            Pré-qualificação Melhorada
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <section className="hero-section">
                    <h2 className="hero-title">Bem-vindo ao Marketeria</h2>
                    <p className="hero-description">
                        Sua plataforma completa de marketing digital e gestão comercial.
                    </p>
                    <div className="hero-actions">
                        <button 
                            className="cta-button primary"
                            onClick={() => onNavigate('prequalificacao')}
                        >
                            Começar Pré-qualificação
                        </button>
                        <button 
                            className="cta-button secondary"
                            onClick={() => onNavigate('prequalificacao-improved')}
                        >
                            Versão Melhorada
                        </button>
                    </div>
                </section>

                <section className="features-section">
                    <h3>Nossos Recursos</h3>
                    <div className="features-grid">
                        <div className="feature-card">
                            <h4>Pré-qualificação Inteligente</h4>
                            <p>Sistema avançado para qualificação de leads e prospects.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Gestão Comercial</h4>
                            <p>Ferramentas completas para gestão do seu pipeline comercial.</p>
                        </div>
                        <div className="feature-card">
                            <h4>Marketing Digital</h4>
                            <p>Soluções integradas para suas estratégias de marketing.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2024 Marketeria. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}