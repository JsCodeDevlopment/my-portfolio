import Image from "next/image";

export interface Technology {
  id: string;
  name: string;
  image: React.ComponentType<{ width?: number; height?: number; alt?: string }>;
}

export const technologies: Technology[] = [
  {
    id: "react",
    name: "React",
    image: (props) => (
      <Image src="/technologies/react.svg" {...props} alt="React" />
    ),
  },
  {
    id: "nextjs",
    name: "Next.js",
    image: (props) => (
      <Image src="/technologies/next.svg" {...props} alt="Next.js" />
    ),
  },
  {
    id: "typescript",
    name: "TypeScript",
    image: (props) => (
      <Image src="/technologies/typescript.svg" {...props} alt="TypeScript" />
    ),
  },
  {
    id: "javascript",
    name: "JavaScript",
    image: (props) => (
      <Image src="/technologies/javascript.svg" {...props} alt="JavaScript" />
    ),
  },
  {
    id: "html",
    name: "HTML",
    image: (props) => (
      <Image src="/technologies/html.svg" {...props} alt="HTML" />
    ),
  },
  {
    id: "css",
    name: "CSS",
    image: (props) => (
      <Image src="/technologies/css.svg" {...props} alt="CSS" />
    ),
  },
  {
    id: "sass",
    name: "Sass",
    image: (props) => (
      <Image src="/technologies/sass.svg" {...props} alt="Sass" />
    ),
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    image: (props) => (
      <Image src="/technologies/tailwind.svg" {...props} alt="Tailwind CSS" />
    ),
  },
  {
    id: "styled-components",
    name: "Styled Components",
    image: (props) => (
      <Image
        src="/technologies/styled-components.svg"
        {...props}
        alt="Styled Components"
      />
    ),
  },
  {
    id: "shadcn-ui",
    name: "Shadcn/ui",
    image: (props) => (
      <Image src="/technologies/shadcn.svg" {...props} alt="shadcn/ui" />
    ),
  },
  {
    id: "zod",
    name: "Zod",
    image: (props) => (
      <Image src="/technologies/zod.svg" {...props} alt="Zod" />
    ),
  },
  {
    id: "nodejs",
    name: "Node.js",
    image: (props) => (
      <Image src="/technologies/node.svg" {...props} alt="Node.js" />
    ),
  },
  {
    id: "express",
    name: "Express",
    image: (props) => (
      <Image src="/technologies/express.svg" {...props} alt="Express" />
    ),
  },
  {
    id: "nestjs",
    name: "NestJS",
    image: (props) => (
      <Image src="/technologies/nest.svg" {...props} alt="NestJS" />
    ),
  },
  {
    id: "golang",
    name: "Golang",
    image: (props) => (
      <Image src="/technologies/golang.svg" {...props} alt="Golang" />
    ),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    image: (props) => (
      <Image src="/technologies/mongo.svg" {...props} alt="MongoDB" />
    ),
  },
  {
    id: "mongoose",
    name: "Mongoose",
    image: (props) => (
      <Image src="/technologies/mongoose.svg" {...props} alt="Mongoose" />
    ),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    image: (props) => (
      <Image src="/technologies/postgres.svg" {...props} alt="PostgreSQL" />
    ),
  },
  {
    id: "mysql",
    name: "MySQL",
    image: (props) => (
      <Image src="/technologies/mysql.svg" {...props} alt="MySQL" />
    ),
  },
  {
    id: "redis",
    name: "Redis",
    image: (props) => (
      <Image src="/technologies/redis.svg" {...props} alt="Redis" />
    ),
  },
  {
    id: "bullmq",
    name: "BullMQ",
    image: (props) => (
      <Image src="/technologies/bull.svg" {...props} alt="BullMQ" />
    ),
  },
  {
    id: "jwt",
    name: "JWT",
    image: (props) => (
      <Image src="/technologies/jwt.svg" {...props} alt="JWT" />
    ),
  },
  {
    id: "prisma",
    name: "Prisma",
    image: (props) => (
      <Image src="/technologies/prisma.svg" {...props} alt="Prisma" />
    ),
  },
  {
    id: "typeorm",
    name: "TypeORM",
    image: (props) => (
      <Image src="/technologies/typeorm.svg" {...props} alt="TypeORM" />
    ),
  },
  {
    id: "swagger",
    name: "Swagger",
    image: (props) => (
      <Image src="/technologies/swagger.svg" {...props} alt="Swagger" />
    ),
  },
  {
    id: "git",
    name: "Git",
    image: (props) => (
      <Image src="/technologies/git.svg" {...props} alt="Git" />
    ),
  },
  {
    id: "docker",
    name: "Docker",
    image: (props) => (
      <Image src="/technologies/docker.svg" {...props} alt="Docker" />
    ),
  },
  {
    id: "jest",
    name: "Jest",
    image: (props) => (
      <Image src="/technologies/jest.svg" {...props} alt="Jest" />
    ),
  },
  {
    id: "rabbitmq",
    name: "RabbitMQ",
    image: (props) => (
      <Image src="/technologies/rabbitmq.svg" {...props} alt="RabbitMQ" />
    ),
  },
];
