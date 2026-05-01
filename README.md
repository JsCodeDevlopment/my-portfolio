# Jonatas Silva — Portfolio v2 (Ultra-Premium Minimalist)

[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://jonatas-silva-software-engineer.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

O **Portfolio v2** é uma evolução radical da minha presença digital, reimaginado sob o conceito de *Ultra-Premium Minimalism*. Esta versão foca em uma experiência cinematográfica, tipografia editorial de alto impacto e interações fluidas que transformam a navegação em uma jornada imersiva.

<h1 align="center">
  <img alt="Portfolio Preview" title="Portfolio v2" style="border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3);" src="https://jonatas-silva-software-engineer.vercel.app/preview.webp" />
</h1>

---

## ✨ O que há de novo na v2?

### 🎨 Design & Aesthetic
- **Estética Ultra-Premium**: Interface refinada com glassmorphism avançado, grids dinâmicos e paleta de cores harmonizada (Neon Green accents).
- **Tipografia Editorial**: Sistema de cabeçalhos de sessão inspirado em revistas de alta precisão, com marcadores de metadados (`SESSION NO.`) e legendas traduzíveis.
- **Interações Cinematográficas**: Mouse followers inteligentes, revelações em scroll sincronizadas e efeitos de profundidade visual.

### 🌐 Arquitetura de Internacionalização (i18n)
- **Sistema Centralizado**: Migração de hardcoded strings para um provider de tradução robusto (`translations/index.ts`).
- **Localização Completa**: Suporte total a **Inglês** e **Português**, abrangendo desde mensagens de validação de formulários até estados de carregamento.
- **Persistência Inteligente**: Sincronização automática entre preferência do usuário e contexto da aplicação.

### ⚡ Performance & Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) com App Router.
- **Animações**: [Motion/React](https://motion.dev/) (Framer Motion v12) para animações de alto desempenho.
- **Estilização**: Tailwind CSS com variantes de tema customizadas.
- **Formulários**: React Hook Form + Zod com validação internacionalizada.
- **Dados**: Integração dinâmica com a API do GitHub para vitrine de projetos.

### 📄 Dynamic Resume System
- **Parser de Markdown Robusto**: Integração em tempo real com repositórios externos de currículo, transformando Markdown em componentes UI premium com alta fidelidade.
- **Cálculo Inteligente de Experiência**: Algoritmo que calcula automaticamente o tempo de permanência (meses/anos) em cada cargo.
- **Gestão de Promoções**: Identificação automática de múltiplos cargos na mesma empresa, exibindo o tempo total acumulado na organização.
- **Resiliência de Dados**: Sistema de busca inteligente (fallback) que garante a exibição das experiências mesmo com variações nos cabeçalhos do arquivo de origem.

---

## 🛠️ Funcionalidades Principais

- [x] **Dark/Light Mode**: Transição de tema com suavidade cinematográfica.
- [x] **Language Switcher**: Troca instantânea de idioma sem recarregamento.
- [x] **Experience Timeline**: Cronograma interativo com indicadores de progresso.
- [x] **Smart Experience Durations**: Cálculo automático de tempo por cargo e tempo total por empresa.
- [x] **Project Detail System**: Páginas de detalhes ricas com metadados e specs do sistema.
- [x] **Tech Marquees**: Exibição dinâmica de stack em movimento infinito.
- [x] **Contact Flow**: Formulário elegante integrado com EmailJS e notificações Toast.

---

## 📂 Organização do Código

O projeto segue uma estrutura modular e escalável:

```bash
src/
├── app/                    # Next.js App Router (Layouts, Pages, Projects)
├── components/             # Componentes de UI e Seções Hero/About/Work
│   ├── ui/                # Base UI (Buttons, Marquees, Particles)
│   └── forms/             # Componentes de formulário isolados
├── contexts/               # Providers de Tema e Idioma (Global State)
├── hooks/                  # Custom Hooks (useTranslation, useProjects)
├── translations/           # Dicionário centralizado (en.ts | pt.ts)
├── services/               # Parsers e serviços de integração de dados
├── utils/                  # Utilitários de data, imagem e formatação
└── constants/              # Configurações de tecnologias e dados estáticos
```

---

## 🚀 Como executar localmente

1. Clone o repositório:
```bash
git clone https://github.com/JsCodeDevlopment/portfolio.git
```

2. Instale as dependências:
```bash
yarn install
```

3. Execute o ambiente de desenvolvimento:
```bash
yarn dev
```

---

## 👨‍💻 Desenvolvedor

<div align="center">
  <img src="https://avatars.githubusercontent.com/u/100796752?v=4" width="120" style="border-radius: 60px" />
  <br />
  <strong>Jonatas Silva</strong><br />
  FullStack Developer | Software Engineer
</div>

<div align="center">
  <a href="https://github.com/JsCodeDevlopment">
    <img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="https://linkedin.com/in/jonatas-silva-software">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
</div>

---

<div align="center">
  <sub>Built with Excellence & React by <a href="https://github.com/JsCodeDevlopment">Jonatas Silva</a></sub>
</div>