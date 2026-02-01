# ABRALAS - Arquitetura e Plano do Projeto

## 1. Visão Geral
**ABRALAS** é um Progressive Web App (PWA) dedicado ao "Deus dos Caminhos" e ao princípio da Fluidez. Funciona como um kit de ferramentas digital para magistas do caos e devotos abrirem caminhos, meditarem e se conectarem com a egrégora.

**Filosofia:** Fluidez, Velocidade, Modernidade, "Glitch/Tech Magic".
**Plataforma:** Web (Principal), instalável como App no celular (PWA).

## 2. Tecnologias

### Frontend
- **Framework:** React 18 + Vite (TypeScript)
- **Estilo:** Tailwind CSS + `clsx`/`tailwind-merge`
- **Animações:** Framer Motion (Crucial para a sensação de "fluidez")
- **Roteamento:** React Router DOM (v6)
- **Ícones:** Lucide React (Geometria limpa e moderna)
- **PWA:** `vite-plugin-pwa` (Para funcionar offline e instalar no celular)
- **Gerenciamento de Estado:** Zustand (Leve e simples)

### Dados (Local & JSON)
- **Sem Banco de Dados (Por enquanto):**
    - Todo o conteúdo (textos, orações) será carregado de arquivos **JSON estáticos** dentro do projeto.
    - O progresso do usuário (diário, configurações) será salvo no **LocalStorage** do navegador.
    - **Funcionalidades Online:** O contador de pessoas e rituais coletivos serão puramente visuais (simulados) nesta versão inicial, já que não teremos servidor.

## 3. Funcionalidades e Módulos

### A. O Fluxo (Início/Dashboard)
- **Mantra/Saudação:** Saudação baseada na hora planetária (ex: "Bom Dia de Mercúrio").
- **Ações Rápidas:** "Botão de Pânico" (Agoj ABRALAS), "Ritual Rápido", "Ler Texto do Dia".
- **Visual:** Fundo animado, nunca estático.

### B. Espaço Coletivo (O Fluxo)
- **Visualização:** Interface mostrando partículas fluindo.
- **Simulação:** Contador visual de "Chaves Girando" (representando a egrégora).

### C. Altar Virtual
- **Interativo:** Arrastar e soltar velas (Cores: Laranja, Amarela, Vermelha).
- **Meditação:** Player de áudio com as faixas do Soundcloud (links diretos ou arquivos locais).
- **Foco:** O Sigilo de ABRALAS pulsando no centro.

### D. Grimório (Biblioteca)
- **Conteúdo:** Textos fornecidos (História, Etimologia, Associações) em JSON.
- **Busca:** Pesquisa rápida por palavras-chave (ex: "Velas", "Oração").
- **Design:** Cards com efeito de vidro (Glassmorphism).

### E. Sincronário (Calendário)
- **Info Planetária:** Cálculo automático da hora/dia planetário atual via Javascript.
- **Lembretes:** "Dia de Mercúrio (Quarta) - Bom para comunicação".

## 4. Design System

- **Tema:** Modo Escuro (Dark Mode) padrão (Místico/Tech).
- **Cores:**
    - Primária: `#FF8C00` (Laranja Escuro - Abrir Caminhos)
    - Secundária: `#FFD700` (Dourado - Prosperidade)
    - Destaque: `#EF4444` (Vermelho - Energia/Urgência)
    - Fundo: Vazio Profundo (`#0F172A`) até Vidro Transparente.
- **Glassmorphism:** Uso intenso de transparências e blur.
- **Tipografia:** Sans-serif, geométrica (ex: *Sora* ou *Inter*).

## 5. Estrutura de Pastas
```
/src
  /assets        # Imagens, Sigilos, Áudios
  /components
    /layout      # Layout base, Navegação estilo App
    /ui          # Botões, Cards, Inputs (Variantes de Vidro)
    /altar       # Componentes de Vela, Sigilo
    /collective  # Contador visual, Efeitos de partículas
  /data          # JSONs com os textos e orações (Nosso "Banco de Dados")
  /hooks         # Lógica de hora planetária, persistência local
  /pages         # Início, Altar, Biblioteca, Calendário
  /utils         # Auxiliares de data e cálculo
```

## 6. Passos de Implementação

1.  **Configuração:** Iniciar projeto Vite React TS, instalar Tailwind.
2.  **Interface Base:** Criar Layout e Navegação (Barra inferior para mobile).
3.  **Página Inicial:** Implementar fundo fluido e "Botão de Pânico".
4.  **Grimório & Dados:** Criar os arquivos JSON com o conteúdo dos textos e exibir.
5.  **Altar:** Criar componente de vela interativa.
6.  **PWA:** Configurar `manifest.json` para instalação.
