function PreQualificacaoPage({ onBack }) {
    const [formData, setFormData] = React.useState({
        nomeEmpresa: '',
        segmento: '',
        tamanhoEmpresa: '',
        experienciaMarketing: '',
        orcamentoMarketing: '',
        principalDesafio: '',
        objetivoPrincipal: '',
        tempoDisponivel: '',
        equipeInterna: '',
        ferramentasAtuais: '',
        expectativaROI: '',
        urgencia: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Cálculo básico de score de qualificação
        let score = 0;
        
        // Pontuação baseada no tamanho da empresa
        if (formData.tamanhoEmpresa === 'grande') score += 30;
        else if (formData.tamanhoEmpresa === 'media') score += 20;
        else if (formData.tamanhoEmpresa === 'pequena') score += 10;
        
        // Pontuação baseada no orçamento
        if (formData.orcamentoMarketing === 'alto') score += 25;
        else if (formData.orcamentoMarketing === 'medio') score += 15;
        else if (formData.orcamentoMarketing === 'baixo') score += 5;
        
        // Pontuação baseada na urgência
        if (formData.urgencia === 'imediata') score += 20;
        else if (formData.urgencia === 'curto') score += 15;
        else if (formData.urgencia === 'medio') score += 10;
        else if (formData.urgencia === 'longo') score += 5;
        
        // Pontuação baseada na experiência
        if (formData.experienciaMarketing === 'avancada') score += 15;
        else if (formData.experienciaMarketing === 'intermediaria') score += 10;
        else if (formData.experienciaMarketing === 'basica') score += 8;
        else if (formData.experienciaMarketing === 'nenhuma') score += 5;
        
        // Pontuação baseada na equipe interna
        if (formData.equipeInterna === 'sim-dedicada') score += 10;
        else if (formData.equipeInterna === 'sim-parcial') score += 5;
        
        let qualificacao = '';
        if (score >= 70) qualificacao = 'ALTA PRIORIDADE - Lead Qualificado';
        else if (score >= 50) qualificacao = 'MÉDIA PRIORIDADE - Lead Promissor';
        else if (score >= 30) qualificacao = 'BAIXA PRIORIDADE - Lead para Nutrição';
        else qualificacao = 'NÃO QUALIFICADO - Requer mais informações';
        
        alert(`Resultado da Pré-qualificação:\n\nScore: ${score}/100\nStatus: ${qualificacao}\n\nObrigado por suas informações!`);
    };

    return (
        <div className="page-container">
            <button className="back-button" onClick={onBack}>
                ← Voltar
            </button>
            
            <div className="page-header">
                <h2>Pré-qualificação de Clientes</h2>
                <p>Preencha o formulário abaixo para avaliarmos como podemos ajudar sua empresa</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nomeEmpresa">Nome da Empresa *</label>
                    <input
                        type="text"
                        id="nomeEmpresa"
                        name="nomeEmpresa"
                        value={formData.nomeEmpresa}
                        onChange={handleInputChange}
                        required
                        placeholder="Digite o nome da sua empresa"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="segmento">Segmento de Atuação *</label>
                    <select
                        id="segmento"
                        name="segmento"
                        value={formData.segmento}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione o segmento</option>
                        <option value="tecnologia">Tecnologia</option>
                        <option value="saude">Saúde</option>
                        <option value="educacao">Educação</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="varejo">Varejo</option>
                        <option value="industria">Indústria</option>
                        <option value="servicos">Serviços</option>
                        <option value="outro">Outro</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="tamanhoEmpresa">Tamanho da Empresa *</label>
                    <select
                        id="tamanhoEmpresa"
                        name="tamanhoEmpresa"
                        value={formData.tamanhoEmpresa}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione o tamanho</option>
                        <option value="micro">Micro (até 9 funcionários)</option>
                        <option value="pequena">Pequena (10-49 funcionários)</option>
                        <option value="media">Média (50-249 funcionários)</option>
                        <option value="grande">Grande (250+ funcionários)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="experienciaMarketing">Experiência com Marketing Digital</label>
                    <select
                        id="experienciaMarketing"
                        name="experienciaMarketing"
                        value={formData.experienciaMarketing}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione sua experiência</option>
                        <option value="nenhuma">Nenhuma experiência</option>
                        <option value="basica">Básica</option>
                        <option value="intermediaria">Intermediária</option>
                        <option value="avancada">Avançada</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="orcamentoMarketing">Orçamento Mensal para Marketing</label>
                    <select
                        id="orcamentoMarketing"
                        name="orcamentoMarketing"
                        value={formData.orcamentoMarketing}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione a faixa de orçamento</option>
                        <option value="baixo">Até R$ 5.000</option>
                        <option value="medio">R$ 5.000 - R$ 20.000</option>
                        <option value="alto">Acima de R$ 20.000</option>
                        <option value="variavel">Orçamento variável</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="principalDesafio">Principal Desafio de Marketing</label>
                    <textarea
                        id="principalDesafio"
                        name="principalDesafio"
                        value={formData.principalDesafio}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Descreva seu principal desafio..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="objetivoPrincipal">Objetivo Principal</label>
                    <select
                        id="objetivoPrincipal"
                        name="objetivoPrincipal"
                        value={formData.objetivoPrincipal}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione o objetivo</option>
                        <option value="leads">Geração de Leads</option>
                        <option value="vendas">Aumento de Vendas</option>
                        <option value="branding">Fortalecimento da Marca</option>
                        <option value="engajamento">Engajamento Digital</option>
                        <option value="conversao">Melhoria na Conversão</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="urgencia">Urgência do Projeto</label>
                    <select
                        id="urgencia"
                        name="urgencia"
                        value={formData.urgencia}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione a urgência</option>
                        <option value="imediata">Imediata (início em 1-2 semanas)</option>
                        <option value="curto">Curto prazo (1-2 meses)</option>
                        <option value="medio">Médio prazo (3-6 meses)</option>
                        <option value="longo">Longo prazo (6+ meses)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="equipeInterna">Possui Equipe Interna de Marketing?</label>
                    <select
                        id="equipeInterna"
                        name="equipeInterna"
                        value={formData.equipeInterna}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecione</option>
                        <option value="sim-dedicada">Sim, equipe dedicada</option>
                        <option value="sim-parcial">Sim, parcialmente dedicada</option>
                        <option value="nao">Não possui</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="ferramentasAtuais">Ferramentas Atuais de Marketing</label>
                    <textarea
                        id="ferramentasAtuais"
                        name="ferramentasAtuais"
                        value={formData.ferramentasAtuais}
                        onChange={handleInputChange}
                        rows="2"
                        placeholder="Ex: Google Ads, Facebook Ads, HubSpot, RD Station..."
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">
                        Avaliar Pré-qualificação
                    </button>
                </div>
            </form>
        </div>
    );
}