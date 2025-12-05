# 🌬️ Método 4-7-8 - Controle de Respiração

Um aplicativo web interativo para praticar a técnica de respiração 4-7-8, projetado para ajudar no relaxamento, redução de ansiedade e melhoria do bem-estar mental.

## 📋 Sobre o Projeto

O Método 4-7-8 é uma técnica de respiração desenvolvida pelo Dr. Andrew Weil, que consiste em:
- **4 segundos** de inspiração
- **7 segundos** retendo o ar
- **8 segundos** de expiração

Esta técnica é conhecida por promover relaxamento, reduzir ansiedade e ajudar a adormecer mais rapidamente.

## ✨ Funcionalidades

- 🎯 **Guia Visual Animado**: Animação SVG interativa com ícones que acompanham cada fase da respiração (🫁 Inspirar, ⏸️ Segurar, 💨 Expirar)
- ⏱️ **Timer Preciso**: Contador regressivo em tempo real para cada fase da técnica
- 🌙 **Modo Escuro/Claro**: Toggle entre temas claro e escuro com preferência salva no LocalStorage
- 🎵 **Música de Fundo Lofi**: Música ambiente relaxante com volume ajustado automaticamente (opcional)
- 📊 **Contador de Sessões Diárias**: Rastreamento automático das sessões realizadas por dia usando LocalStorage
- 🔊 **Feedback Sonoro**: Sons de beep discretos para indicar transições entre fases
- 📱 **Design Responsivo**: Interface adaptável e otimizada para desktop, tablet e dispositivos móveis
- 💾 **Armazenamento Local**: Dados das sessões e preferências salvas no navegador (sem necessidade de servidor)
- 🎨 **Animações Suaves**: Transições CSS para uma experiência visual agradável
- ⏸️ **Controle Total**: Botão para parar a sessão a qualquer momento

## 🚀 Como Usar

1. Abra o arquivo `index.html` em seu navegador moderno
2. Clique no botão **"Iniciar"** para começar uma sessão
3. Siga as instruções na tela:
   - **Inspire** por 4 segundos (visual expande)
   - **Segure** a respiração por 7 segundos (visual mantém)
   - **Expire** por 8 segundos (visual contrai)
4. A animação visual e o timer guiarão você através de cada fase
5. Clique em **"Parar"** a qualquer momento para interromper a sessão
6. Após completar, a contagem de sessões do dia será atualizada automaticamente

### Controles Adicionais

- **Dark Mode**: Botão no canto superior direito para alternar entre tema claro/escuro
- **Música**: Botão no canto superior esquerdo para ativar/desativar a música de fundo lofi

## 📁 Estrutura do Projeto

```
controle_respiracao/
├── index.html                    # Página principal HTML
├── assets/
│   ├── css/
│   │   └── styles.css            # Estilos da aplicação com variáveis CSS
│   ├── js/
│   │   └── script.js             # Lógica da aplicação JavaScript
│   ├── audio/
│   │   └── vibe_mix.mp3          # Música de fundo lofi (loop)
│   └── image/
│       └── bem_estar.png         # Ícone do site (favicon)
└── README.md                     # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página
- **CSS3**: 
  - Variáveis CSS para tema dinâmico
  - Media queries para design responsivo
  - Transições e animações suaves
  - Flexbox para layout
- **JavaScript (Vanilla)**: 
  - Lógica da aplicação sem dependências externas
  - Async/Await para gerenciamento de fluxo
  - LocalStorage API para persistência de dados
- **SVG**: Animações visuais interativas para guiar a respiração
- **Web Audio API**: Reprodução de sons e música de fundo
- **LocalStorage API**: Armazenamento de preferências e dados das sessões

## 📱 Compatibilidade

- ✅ Chrome/Edge (versão recente)
- ✅ Firefox (versão recente)
- ✅ Safari (versão recente)
- ✅ Navegadores móveis (iOS Safari, Chrome Mobile)
- ✅ Funciona offline após carregamento inicial (exceto o som de beep que requer conexão)

## 💡 Recursos Técnicos

- **LocalStorage**: 
  - Armazenamento de preferências de tema (`theme`)
  - Contador de sessões diárias (`sessions`)
- **CSS Variables**: Sistema de temas dinâmico e fácil de personalizar
- **Async/Await**: Gerenciamento assíncrono das fases da respiração
- **Promise-based Countdown**: Sistema de contagem regressiva com capacidade de interrupção
- **Transitions CSS**: Animações suaves para transições visuais e de tema
- **Volume Control**: Volumes pré-configurados para música (0.5%) e beep (0.4%) para não incomodar
- **Error Handling**: Tratamento de erros para reprodução de áudio

## 🎨 Personalização

### Cores do Tema

As cores podem ser personalizadas no arquivo `assets/css/styles.css`:

```css
:root {
  --bg-light: #eef3ff;
  --bg-dark: #0f1117;
  --text-light: #111;
  --text-dark: #f2f2f2;
  --accent: #4a6cf7;
}
```

### Tempos de Respiração

Os tempos podem ser ajustados na função `startSession()` em `assets/js/script.js`:

```javascript
await countdown(4, "Inspire por 4s", animateInspire);
await countdown(7, "Segure por 7s", animateHold);
await countdown(8, "Expire por 8s", animateExhale);
```

### Volume dos Sons

Os volumes podem ser ajustados no início do arquivo `assets/js/script.js`:

```javascript
bgMusic.volume = 0.005;  // música suave (0.5%)
beep.volume = 0.004;     // beep discreto (0.4%)
```

### Música de Fundo

Para trocar a música, substitua o arquivo `assets/audio/vibe_mix.mp3` ou edite o caminho em `index.html`:

```html
<source src="assets/audio/seu_arquivo.mp3" type="audio/mpeg" />
```

## 📝 Notas Importantes

- ⚠️ A aplicação funciona completamente offline após o carregamento inicial, exceto pelo som de beep que é carregado de uma URL externa
- 💾 Os dados são armazenados localmente no navegador (LocalStorage), não há servidor backend
- 🎧 Recomenda-se usar fones de ouvido para uma experiência mais imersiva
- 🧘 Para melhores resultados, pratique em um ambiente calmo e confortável
- 🔕 Os volumes de áudio são configurados em níveis baixos para não incomodar
- 📱 A interface é totalmente responsiva e funciona bem em dispositivos móveis
- 🎯 A música de fundo é iniciada automaticamente quando uma sessão começa

## 🔧 Requisitos

- Navegador web moderno com suporte a:
  - ES6+ (async/await, arrow functions)
  - LocalStorage API
  - Web Audio API
  - CSS Variables
  - SVG

Não requer instalação de dependências ou servidor - basta abrir o `index.html`!

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- 🐛 Reportar bugs
- 💡 Sugerir novas funcionalidades
- 📖 Melhorar a documentação
- 🔀 Enviar pull requests
- ⭐ Dar uma estrela no projeto

## 📄 Licença

Este projeto está disponível como código aberto. Sinta-se livre para usar e modificar conforme necessário.

## 🙏 Créditos

- **Técnica de respiração**: Método 4-7-8 desenvolvido pelo Dr. Andrew Weil
- **Música de fundo**: Música lofi personalizada
- **Som de beep**: Google Actions Sounds (https://actions.google.com/sounds/)

---

**Desenvolvido com ❤️ para promover o bem-estar mental e o relaxamento**

🌟 *Respire fundo, relaxe e aproveite a jornada!* 🌟