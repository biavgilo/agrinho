 <script>
        let nomeUsuario = "";

        // função para alternar entre claro e escuro
        function alternarTema() {
            const body = document.documentElement;
            const btnTema = document.getElementById('btnTema');
            
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                btnTema.innerText = "Escuro";
            } else {
                body.setAttribute('data-theme', 'dark');
                btnTema.innerText = "Claro";
            }
        }

        // conforme rola para baixo a imagem some
        window.addEventListener('scroll', () => {
            // imagem de Fundo
            const bgImagem = document.getElementById('bgImagem');
            const scrollMaximo = window.innerHeight; 
            const scrollAtual = window.scrollY;

            if (scrollAtual <= scrollMaximo) {
                let novaOpacidade = 0.25 * (1 - (scrollAtual / scrollMaximo));
                bgImagem.style.opacity = novaOpacidade;
            } else {
                bgImagem.style.opacity = 0;
            }

            //barra progresso de leitura
            const totalScrollavel = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScrollavel > 0) {
                const percentual = (scrollAtual / totalScrollavel) * 100;
                document.getElementById('barraProgresso').style.width = percentual + '%';
            }
        });

        // volta pro inicio quando recarrega o site
        window.addEventListener('DOMContentLoaded', () => {
            window.scrollTo(0, 0);
            if (history.replaceState) {
                history.replaceState(null, null, ' ');
            }
        });

        // tela pedindo o nome
        function solicitarNome() {
            const box = document.getElementById('box-inicio-quiz');
            box.innerHTML = `
                <p><b>Antes de começarmos, digite o seu nome para o registro da fazenda:</b></p>
                <input type="text" id="nomeInput" class="input-nome" placeholder="Seu nome aqui..." autocomplete="off">
                <br>
                <button class="btn-futuro" onclick="validarEIrParaDecisoes()">Iniciar Quiz</button>
            `;
            document.getElementById('nomeInput').focus();
        }

        function validarEIrParaDecisoes() {
            const input = document.getElementById('nomeInput');
            nomeUsuario = input.value.trim();
            
            if (nomeUsuario === "") {
                nomeUsuario = "Produtor Anônimo";
            }
            
            irParaDecisoes();
        }

        // navegação para a segunda página (oculta barra de progresso)
        function irParaDecisoes() {
            document.getElementById('containerProgresso').style.display = 'none';
            document.getElementById('conteudo-principal').style.display = 'none';
            document.getElementById('bgImagem').style.display = 'none';
            document.getElementById('bgImagemQuiz').style.display = 'block';
            const painel = document.getElementById('conteudo-decisoes');
            painel.style.display = 'flex';
            window.scrollTo(0, 0);
            inicializarQuiz();
        }

        // perguntas para 7 fases
        const perguntas = [
            {
                titulo: "Fase 1: Preparo e Manejo do Solo",
                opcoes: [
                    { texto: "Adotar o Plantio Direto sobre a palhada e fazer rotação de culturas para nutrir o solo naturalmente.", peso: 3 }, 
                    { texto: "Utilizar o método tradicional de aração mecânica leve, mantendo o solo limpo sem queimadas.", peso: 2 }, 
                    { texto: "Realizar queimadas para limpar o terreno rapidamente e usar fertilizantes químicos pesados em larga escala.", peso: 1 } 
                ]
            },
            {
                titulo: "Fase 2: Irrigação e Gestão de Recursos Hídricos",
                opcoes: [
                    { texto: "Instalar sistemas de gotejamento automatizados integrados com cisternas de captação de água da chuva.", peso: 3 }, 
                    { texto: "Utilizar aspersores comuns programados por horários fixos para evitar o ápice do calor do dia.", peso: 2 }, 
                    { texto: "Desviar o leito de um rio próximo para bombear água de forma contínua e inundar os sulcos de plantio.", peso: 1 } 
                ]
            },
            {
                titulo: "Fase 3: Proteção de Cultivos e Controle de Pragas",
                opcoes: [
                    { texto: "Implementar o Manejo Integrado de Pragas (MIP), usando insetos benéficos protetores e bioinsumos locais.", peso: 3 }, 
                    { texto: "Aplicar defensivos químicos tradicionais preventivos seguindo estritamente a janela do calendário.", peso: 2 }, 
                    { texto: "Pulverizar defensivos sintéticos pesados via aérea ao menor sinal de qualquer inseto na lavoura.", peso: 1 } 
                ]
            },
            {
                titulo: "Fase 4: Tratamento de Dejetos e Resíduos Animais",
                opcoes: [
                    { texto: "Instalar biodigestores para tratar o esterco, gerando biogás para a propriedade e biofertilizantes de alta qualidade.", peso: 3 },
                    { texto: "Armazenar os dejetos em esterqueiras cobertas para curar o material antes de utilizá-lo na adubação comum.", peso: 2 },
                    { texto: "Descartar os resíduos diretamente em valas nos fundos da propriedade, deixando infiltrar perto de lençóis freáticos.", peso: 1 }
                ]
            },
            {
                titulo: "Fase 5: Matriz Energética da Propriedade",
                opcoes: [
                    { texto: "Cobrir os galpões com painéis solares fotovoltaicos e utilizar biocombustíveis renováveis nos maquinários.", peso: 3 },
                    { texto: "Utilizar exclusivamente a energia elétrica da rede convencional, sem fontes alternativas ou automações de corte.", peso: 2 },
                    { texto: "Manter geradores antigos movidos a óleo diesel operando em capacidade máxima para baratear custos operacionais.", peso: 1 }
                ]
            },
            {
                titulo: "Fase 6: Manejo de Pastagens e Pecuária",
                opcoes: [
                    { texto: "Adotar o sistema de Integração Lavoura-Pecuária-Floresta (ILPF) com pastejo rotacionado por piquetes.", peso: 3 },
                    { texto: "Criar o gado de forma extensiva em pastos fixos tradicionais, aplicando calagem básica quando o capim enfraquece.", peso: 2 },
                    { texto: "Praticar o superpastoreio, superlotando os pastos até expor a terra nua e gerar processos graves de erosão.", peso: 1 }
                ]
            },
            {
                titulo: "Fase 7: Preservação de Áreas Naturais e Matas Ciliares",
                opcoes: [
                    { texto: "Isolar totalmente as Áreas de Preservação Permanente (APPs) e reflorestar as margins de rios com mudas nativas.", peso: 3 },
                    { texto: "Manter as cercas limítrofes da mata nativa existente apenas para cumprir as obrigações legais da reserva.", peso: 2 },
                    { texto: "Avançar o plantio e o gado sobre as margens dos rios e nascentes para aproveitar o máximo de espaço produtivo.", peso: 1 }
                ]
            }
        ];

        let perguntaAtual = 0;
        let pontuacaoTotal = 0;

        function inicializarQuiz() {
            perguntaAtual = 0;
            pontuacaoTotal = 0;
            mostrarPergunta();
        }

        function mostrarPergunta() {
            const card = document.getElementById('card-quiz');
            if (perguntaAtual < perguntas.length) {
                const dados = perguntas[perguntaAtual];
                
                let htmlOpcoes = `
                    <div class="header-pergunta">
                        <img src="fazendinha.png" alt="Logo Fazendinha" class="logo-pergunta">
                        <h3>${dados.titulo}</h3>
                    </div>
                `;
                
                dados.opcoes.forEach((opcao) => {
                    htmlOpcoes += `<button class="btn-opcao" onclick="computarDecisao(${opcao.peso})">${opcao.texto}</button>`;
                });
                
                card.innerHTML = htmlOpcoes;
            } else {
                calcularResultadoFinal();
            }
        }

        function computarDecisao(peso) {
            pontuacaoTotal += peso;
            perguntaAtual++;
            mostrarPergunta();
        }

        function calcularResultadoFinal() {
            const card = document.getElementById('card-quiz');
            const mediaFinal = pontuacaoTotal / perguntas.length;
            let vereditoHTML = `<h3>Resultado do Gerenciamento de <span style="text-decoration: underline;">${nomeUsuario}</span>:</h3>`;

            if (mediaFinal >= 2.6) {
                vereditoHTML += `
                    <div class="resultado-texto excelente">Excelente no cuidado com o meio ambiente!</div>
                    <p style="margin-top:15px; font-size:1.1rem;">Parabéns, <b>${nomeUsuario}</b>! Suas decisões transformaram sua fazenda em um modelo global de sustentabilidade. Você conseguiu reter carbono, otimizar recursos e produzir alimentos mantendo a harmonia com a natureza.</p>
                `;
            } else if (mediaFinal >= 1.6) {
                vereditoHTML += `
                    <div class="resultado-texto media">Média no cuidado...</div>
                    <p style="margin-top:15px; font-size:1.1rem;">Olha, <b>${nomeUsuario}</b>, você evitou catástrofes extremas, mas suas técnicas ainda dependem muito de métodos convencionais que desgastam o ecossistema a longo prazo. Vale a pena balancear com práticas mais regenerativas!</p>
                `;
            } else {
                vereditoHTML += `
                    <div class="resultado-texto ruim">Você acabou com o planeta...</div>
                    <p style="margin-top:15px; font-size:1.1rem;">Infelizmente, <b>${nomeUsuario}</b>, a busca pelo lucro imediato devastou os recursos naturais locais. O solo ficou infértil, os rios secaram e a alta emissão de gases acelerou a degradação ambiental da região.</p>
                `;
            }

            vereditoHTML += `<button class="btn-reiniciar" onclick="reiniciarTudo()">Tentar Novamente</button>`;
            card.innerHTML = vereditoHTML;
        }

        function reiniciarTudo() {
            const box = document.getElementById('box-inicio-quiz');
            box.innerHTML = `
                <p>Suas escolhas definem os rumos da nossa sobrevivência e a saúde do planeta. Você está pronto para assumir o gerenciamento de uma propriedade e testar seu impacto ambiental?</p>
                <button class="btn-futuro" onclick="solicitarNome()">Descobrir Agora</button>
            `;

            document.getElementById('containerProgresso').style.display = 'block';
            document.getElementById('conteudo-decisoes').style.display = 'none';
            document.getElementById('conteudo-principal').style.display = 'block';
            window.scrollTo(0, 0);
        }
    </script>
