# Dashboard CIB2B

Um dashboard moderno desenvolvido em React TypeScript para operações B2B (Business-to-Business).

## 🚀 Tecnologias Utilizadas

- **React 18+** com TypeScript
- **Vite** como build tool
- **Material-UI v7** para componentes UI
- **Recharts** para visualização de dados
- **React Router** para navegação
- **Emotion** para styling

## 📊 Funcionalidades

- **Dashboard Overview**: Métricas principais com cards interativos
- **Analytics**: Gráficos de conversão e fontes de tráfego
- **Customers**: Tabela de clientes com roles e informações
- **Performance**: Monitoramento de performance da aplicação
- **Settings**: Configurações do sistema

## 🛠️ Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd dashboard-cib2b

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Para build de produção
npm run build

# Para preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── DashboardChart.tsx
│   ├── DashboardLayout.tsx
│   └── MetricCard.tsx
├── pages/              # Páginas da aplicação
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   ├── Customers.tsx
│   ├── Performance.tsx
│   └── Settings.tsx
├── types/              # Definições TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
└── main.tsx           # Entry point
```

## 🎨 Design System

O projeto utiliza Material-UI com tema customizado:
- **Cores primárias**: Azul (#1976d2)
- **Cores secundárias**: Rosa (#dc004e)
- **Tipografia**: Roboto
- **Layout responsivo** com breakpoints

## 📈 Componentes Principais

### MetricCard
Cartões para exibir métricas com tendências e cores dinâmicas.

### DashboardChart
Gráficos de linha responsivos usando Recharts.

### DashboardLayout
Layout principal com sidebar de navegação e header.

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview da build
- `npm run lint` - Executa ESLint

## 📝 Próximos Passos

- [ ] Integração com APIs reais
- [ ] Autenticação e autorização
- [ ] Testes unitários
- [ ] Dark mode
- [ ] Internacionalização (i18n)
- [ ] PWA capabilities

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
