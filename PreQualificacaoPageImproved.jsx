function PreQualificacaoPageImproved({ onBack }) {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
        // Informações básicas
        nomeEmpresa: '',
        segmento: '',
        tamanhoEmpresa: '',
        faturamentoAnual: '',
        
        // Situação atual
        experienciaMarketing: '',
        ferramentasAtuais: '',
        orcamentoMarketing: '',
        equipeInterna: '',
        
        // Objetivos e desafios
        principalDesafio: '',
        objetivoPrincipal: '',
        metasEspecificas: '',
        concorrencia: '',
        
        // Urgência e expectativas
        urgencia: '',
        expectativaROI: '',
        tempoDisponivel: '',
        jaTrabalhouAgencia: ''
    });

    const totalSteps = 4;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const calculateQualificationScore = () => {
        let score = 0;
        let factors = [];
        
        // Tamanho da empresa (peso: 25%)
        if (formData.tamanhoEmpresa === 'grande') {
            score += 25;
            factors.push('Empresa de grande porte (+25 pts)');
        } else if (formData.tamanhoEmpresa === 'media') {
            score += 20;
            factors.push('Empresa de médio porte (+20 pts)');
        } else if (formData.tamanhoEmpresa === 'pequena') {
            score += 12;
            factors.push('Empresa de pequeno porte (+12 pts)');
        } else if (formData.tamanhoEmpresa === 'micro') {
            score += 8;
            factors.push('Microempresa (+8 pts)');
        }
        
        // Faturamento anual (peso: 20%)
        if (formData.faturamentoAnual === 'alto') {
            score += 20;
            factors.push('Alto faturamento anual (+20 pts)');
        } else if (formData.faturamentoAnual === 'medio') {
            score += 15;
            factors.push('Médio faturamento anual (+15 pts)');
        } else if (formData.faturamentoAnual === 'baixo') {
            score += 8;
            factors.push('Baixo faturamento anual (+8 pts)');
        }
        
        // Orçamento de marketing (peso: 20%)
        if (formData.orcamentoMarketing === 'alto') {
            score += 20;
            factors.push('Orçamento alto para marketing (+20 pts)');
        } else if (formData.orcamentoMarketing === 'medio') {
            score += 15;
            factors.push('Orçamento médio para marketing (+15 pts)');
        } else if (formData.orcamentoMarketing === 'baixo') {
            score += 8;
            factors.push('Orçamento baixo para marketing (+8 pts)');
        }
        
        // Urgência (peso: 15%)
        if (formData.urgencia === 'imediata') {
            score += 15;
            factors.push('Urgência imediata (+15 pts)');
        } else if (formData.urgencia === 'curto') {
            score += 12;
            factors.push('Prazo curto (+12 pts)');
        } else if (formData.urgencia === 'medio') {
            score += 8;
            factors.push('Prazo médio (+8 pts)');
        } else if (formData.urgencia === 'longo') {
            score += 5;
            factors.push('Prazo longo (+5 pts)');
        }
        
        // Experiência com marketing (peso: 10%)
        if (formData.experienciaMarketing === 'avancada') {
            score += 10;
            factors.push('Experiência avançada em marketing (+10 pts)');
        } else if (formData.experienciaMarketing === 'intermediaria') {
            score += 8;
            factors.push('Experiência intermediária (+8 pts)');
        } else if (formData.experienciaMarketing === 'basica') {
            score += 5;
            factors.push('Experiência básica (+5 pts)');
        } else if (formData.experienciaMarketing === 'nenhuma') {
            score += 3;
            factors.push('Sem experiência anterior (+3 pts)');
        }
        
        // Equipe interna (peso: 10%)
        if (formData.equipeInterna === 'sim-dedicada') {
            score += 10;
            factors.push('Equipe interna dedicada (+10 pts)');
        } else if (formData.equipeInterna === 'sim-parcial') {
            score += 6;
            factors.push('Equipe parcialmente dedicada (+6 pts)');
        } else if (formData.equipeInterna === 'nao') {
            score += 3;
            factors.push('Sem equipe interna (+3 pts)');
        }
        
        return { score, factors };
    };

    const getQualificationLevel = (score) => {
        if (score >= 85) return { 
            level: 'PREMIUM', 
            color: '#28a745', 
            description: 'Cliente ideal - Alta prioridade para contato imediato',
            nextSteps: 'Agendamento de reunião executiva em 24h'
        };
        if (score >= 70) return { 
            level: 'QUALIFICADO', 
            color: '#007bff', 
            description: 'Lead qualificado - Ótimo potencial de negócio',
            nextSteps: 'Contato comercial em 48h'
        };
        if (score >= 50) return { 
            level: 'PROMISSOR', 
            color: '#ffc107', 
            description: 'Lead promissor - Requer nutrição e acompanhamento',
            nextSteps: 'Inclusão em campanha de nutrição'
        };
        if (score >= 30) return { 
            level: 'BAIXA PRIORIDADE', 
            color: '#fd7e14', 
            description: 'Lead para desenvolvimento a longo prazo',
            nextSteps: 'Acompanhamento mensal'
        };
        return { 
            level: 'NÃO QUALIFICADO', 
            color: '#dc3545', 
            description: 'Não atende aos critérios mínimos no momento',
            nextSteps: 'Reavaliação em 6 meses'
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { score, factors } = calculateQualificationScore();
        const qualification = getQualificationLevel(score);
        
        // Simular envio para CRM/sistema
        const leadData = {
            ...formData,
            score,
            qualification: qualification.level,
            timestamp: new Date().toISOString(),
            factors
        };
        
        console.log('Lead Data:', leadData);
        
        alert(`🎯 RESULTADO DA ANÁLISE AVANÇADA\n\n` +
              `Score de Qualificação: ${score}/100\n` +
              `Nível: ${qualification.level}\n\n` +
              `📊 ${qualification.description}\n\n` +
              `📅 Próximos passos: ${qualification.nextSteps}\n\n` +
              `✅ Dados enviados com sucesso!\n` +
              `Nossa equipe entrará em contato em breve.`);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content">
                        <h3>📊 Informações da Empresa</h3>
                        <p>Vamos começar conhecendo sua empresa</p>
                        
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
                                <option value="consultoria">Consultoria</option>
                                <option value="imobiliario">Imobiliário</option>
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
                            <label htmlFor="faturamentoAnual">Faturamento Anual</label>
                            <select
                                id="faturamentoAnual"
                                name="faturamentoAnual"
                                value={formData.faturamentoAnual}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione a faixa</option>
                                <option value="baixo">Até R$ 1 milhão</option>
                                <option value="medio">R$ 1 - 10 milhões</option>
                                <option value="alto">Acima de R$ 10 milhões</option>
                                <option value="nao-informar">Prefiro não informar</option>
                            </select>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <h3>🎯 Situação Atual de Marketing</h3>
                        <p>Conte-nos sobre sua experiência com marketing</p>
                        
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
                                <option value="basica">Básica (até 1 ano)</option>
                                <option value="intermediaria">Intermediária (1-3 anos)</option>
                                <option value="avancada">Avançada (3+ anos)</option>
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
                                <option value="baixo">Até R$ 10.000</option>
                                <option value="medio">R$ 10.000 - R$ 50.000</option>
                                <option value="alto">Acima de R$ 50.000</option>
                                <option value="variavel">Orçamento variável por projeto</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="equipeInterna">Equipe Interna de Marketing</label>
                            <select
                                id="equipeInterna"
                                name="equipeInterna"
                                value={formData.equipeInterna}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione</option>
                                <option value="sim-dedicada">Sim, equipe dedicada (3+ pessoas)</option>
                                <option value="sim-parcial">Sim, parcialmente dedicada (1-2 pessoas)</option>
                                <option value="nao">Não possui equipe interna</option>
                                <option value="terceirizado">Trabalho terceirizado atual</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="ferramentasAtuais">Ferramentas e Canais Atuais</label>
                            <textarea
                                id="ferramentasAtuais"
                                name="ferramentasAtuais"
                                value={formData.ferramentasAtuais}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Ex: Google Ads, Facebook, Instagram, LinkedIn, HubSpot, RD Station, E-mail Marketing..."
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <h3>🚀 Objetivos e Desafios</h3>
                        <p>Defina seus objetivos e principais dificuldades</p>
                        
                        <div className="form-group">
                            <label htmlFor="objetivoPrincipal">Objetivo Principal</label>
                            <select
                                id="objetivoPrincipal"
                                name="objetivoPrincipal"
                                value={formData.objetivoPrincipal}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione o objetivo</option>
                                <option value="leads">Geração de Leads Qualificados</option>
                                <option value="vendas">Aumento Direto de Vendas</option>
                                <option value="branding">Fortalecimento da Marca</option>
                                <option value="digital">Presença Digital</option>
                                <option value="conversao">Melhoria na Taxa de Conversão</option>
                                <option value="retencao">Retenção de Clientes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="metasEspecificas">Metas Específicas</label>
                            <textarea
                                id="metasEspecificas"
                                name="metasEspecificas"
                                value={formData.metasEspecificas}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Ex: Aumentar leads em 50%, dobrar vendas online, melhorar ROI em 30%..."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="principalDesafio">Principal Desafio Atual</label>
                            <textarea
                                id="principalDesafio"
                                name="principalDesafio"
                                value={formData.principalDesafio}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Descreva seu principal desafio ou dificuldade..."
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="concorrencia">Como está a Concorrência?</label>
                            <select
                                id="concorrencia"
                                name="concorrencia"
                                value={formData.concorrencia}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione</option>
                                <option value="baixa">Baixa concorrência</option>
                                <option value="media">Concorrência moderada</option>
                                <option value="alta">Alta concorrência</option>
                                <option value="desconheco">Não sei avaliar</option>
                            </select>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <h3>⏰ Urgência e Expectativas</h3>
                        <p>Para finalizar, precisamos entender seus prazos e expectativas</p>
                        
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
                                <option value="flexivel">Flexível</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="expectativaROI">Expectativa de Retorno (ROI)</label>
                            <select
                                id="expectativaROI"
                                name="expectativaROI"
                                value={formData.expectativaROI}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione a expectativa</option>
                                <option value="conservadora">Conservadora (2x-3x)</option>
                                <option value="moderada">Moderada (3x-5x)</option>
                                <option value="agressiva">Agressiva (5x+)</option>
                                <option value="sem-expectativa">Sem expectativa definida</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tempoDisponivel">Tempo Disponível para Acompanhamento</label>
                            <select
                                id="tempoDisponivel"
                                name="tempoDisponivel"
                                value={formData.tempoDisponivel}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione</option>
                                <option value="muito">Muito disponível (diariamente)</option>
                                <option value="medio">Disponibilidade média (semanal)</option>
                                <option value="pouco">Pouco disponível (mensal)</option>
                                <option value="minimo">Mínimo (só resultados)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="jaTrabalhouAgencia">Já trabalhou com agência de marketing?</label>
                            <select
                                id="jaTrabalhouAgencia"
                                name="jaTrabalhouAgencia"
                                value={formData.jaTrabalhouAgencia}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecione</option>
                                <option value="sim-satisfeito">Sim, e fiquei satisfeito</option>
                                <option value="sim-insatisfeito">Sim, mas não fiquei satisfeito</option>
                                <option value="nao">Não, seria a primeira vez</option>
                                <option value="freelancer">Já trabalhei com freelancers</option>
                            </select>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="page-container">
            <button className="back-button" onClick={onBack}>
                ← Voltar
            </button>
            
            <div className="page-header">
                <h2>🎯 Pré-qualificação Avançada</h2>
                <p>Análise completa e personalizada para sua empresa</p>
                
                {/* Progress Bar */}
                <div className="progress-bar">
                    <div className="progress-steps">
                        {[1, 2, 3, 4].map(step => (
                            <div 
                                key={step} 
                                className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                            >
                                {step}
                            </div>
                        ))}
                    </div>
                    <div className="progress-text">
                        Etapa {currentStep} de {totalSteps}
                    </div>
                </div>
            </div>

            <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
                {renderStep()}
                
                <div className="form-actions">
                    {currentStep > 1 && (
                        <button 
                            type="button" 
                            onClick={prevStep} 
                            className="back-button"
                        >
                            ← Anterior
                        </button>
                    )}
                    
                    {currentStep < totalSteps ? (
                        <button 
                            type="button" 
                            onClick={nextStep} 
                            className="submit-button"
                        >
                            Próximo →
                        </button>
                    ) : (
                        <button type="submit" className="submit-button">
                            🎯 Finalizar Análise
                        </button>
                    )}
                </div>
            </form>

            <style jsx>{`
                .progress-bar {
                    margin: 2rem 0;
                    text-align: center;
                }
                
                .progress-steps {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .progress-step {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #e9ecef;
                    color: #6c757d;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }
                
                .progress-step.active {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                
                .progress-text {
                    color: #6c757d;
                    font-size: 0.9rem;
                }
                
                .step-content h3 {
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }
                
                .step-content p {
                    color: #6c757d;
                    margin-bottom: 2rem;
                }
                
                .form-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 2rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }
            `}</style>
        </div>
    );
}