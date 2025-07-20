export const translations = {
  en: {
    header: {
      home: "Home",
      about: "About",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      greeting: "CRAFTING DIGITAL EXPERIENCES SINCE — YEAR:2023",
      description:
        "Jonatas Silva — Software engineer turning ideas into digital products for over {years} years.",
    },
    about: {
      title: "About Me",
      description_1:
        "Hello! My name is Jonatas Silva, I am a software developer with over 2 years of experience creating digital solutions focused on efficiency, performance and good user experience.",
      description_2:
        "Throughout my career, I have worked on projects in different segments and different project niches, which has given me a broader view of technology and business. I am familiar with frontend and backend development, but it is when creating solutions that connect purpose and technology that I feel most fulfilled.",
      description_3:
        "I am driven by continuous learning, I enjoy working in a team and I see challenges as opportunities for growth. I always seek to write clean, well-structured and easy-to-maintain code. I am currently focused on building scalable applications and contributing to projects that generate a real impact on people's lives.",
      language: "Language",
      framework: "Framework",
      runtime: "Runtime",
    },
    technologies: {
      title: "Technologies",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
    },
    projects: {
      title: "Projects",
    },
    experience: {
      title: "Experience",
      projects: "Projects",
      satisfied: "Satisfied",
      positive: "Positive",
    },
    education: {
      title: "Education",
      subtitle: "My academic background",
    },
    contact: {
      title: "Contact",
      description:
        "Looking to start a project or you need consultation? Feel free to contact me.",
      name: "Name",
      name_placeholder: "Name",
      email: "Email",
      email_placeholder: "Email",
      message: "Message",
      message_placeholder: "Message",
      send: "Send",
    },
    project: {
      back: "Back to Projects",
      title: "Project",
      description: "About the Project",
      deploy: "Deploy",
      repository: "Repository",
      technologies: "Technologies used",
      gallery: "Project Gallery",
    },
  },
  pt: {
    header: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      experience: "Experiência",
      contact: "Contato",
    },
    hero: {
      greeting: "CRIANDO EXPERIÊNCIAS DIGITAIS DESDE — ANO:2023",
      description:
        "Jonatas Silva — Engenheiro de software transformando ideias em produtos digitais há mais de {years} anos.",
    },
    about: {
      title: "Sobre Mim",
      description_1:
        "Olá! Meu nome é Jonatas Silva, sou um desenvolvedor de software com mais de 2 anos de experiência criando soluções digitais focadas em eficiência, desempenho e boa experiência do usuário.",
      description_2:
        "Ao longo da minha carreira, trabalhei em projetos em diferentes segmentos e niches de projeto, o que me deu uma visão mais ampla da tecnologia e do negócio. Sou familiar com desenvolvimento frontend e backend, mas é quando crio soluções que conectam propósito e tecnologia que me sinto mais realizado.",
      description_3:
        "Sou impulsionado pelo aprendizado contínuo, gosto de trabalhar em equipe e vejo desafios como oportunidades de crescimento. Sempre busco escrever código limpo, bem estruturado e fácil de manter. Estou atualmente focado em construir aplicações escaláveis e contribuir para projetos que geram um impacto real na vida das pessoas.",
      language: "Linguagem",
      framework: "Biblioteca",
      runtime: "Ambiente de execução",
    },
    technologies: {
      title: "Tecnologias",
      frontend: "Frontend",
      backend: "Backend",
      tools: "Ferramentas",
    },
    projects: {
      title: "Projetos",
    },
    experience: {
      title: "Experiência",
      projects: "Projetos",
      satisfied: "Satisfação",
      positive: "Positivo",
    },
    education: {
      title: "Educação",
      subtitle: "Minha formação acadêmica",
    },
    contact: {
      title: "Contato",
      description:
        "Procurando iniciar um projeto ou precisa de uma consulta? Sinta-se à vontade para entrar em contato comigo.",
      name: "Nome",
      name_placeholder: "Nome",
      email: "Email",
      email_placeholder: "Email",
      message: "Mensagem",
      message_placeholder: "Mensagem",
      send: "Enviar",
    },
    project: {
      back: "Voltar para Projetos",
      title: "Projeto",
      description: "Sobre o Projeto",
      deploy: "Visitar",
      repository: "Repositório",
      technologies: "Tecnologias usadas",
      gallery: "Galeria do Projeto",
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type TranslationSection = keyof typeof translations.en;
export type Language = keyof typeof translations;
