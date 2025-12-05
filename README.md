# 🌬️ Método 4-7-8 - Controle de Respiração

Um aplicativo web interativo para praticar a técnica de respiração 4-7-8, projetado para ajudar no relaxamento, redução de ansiedade e melhoria do bem-estar mental.

## 📋 Sobre o Projeto

O Método 4-7-8 é uma técnica de respiração desenvolvida pelo Dr. Andrew Weil, que consiste em:
- **4 segundos** de inspiração
- **7 segundos** retendo o ar
- **8 segundos** de expiração

Esta técnica é conhecida por promover relaxamento, reduzir ansiedade e ajudar a adormecer mais rapidamente.

## ✨ Funcionalidades

- 🎯 **Guia Visual Animado**: Animação SVG interativa que acompanha cada fase da respiração
- ⏱️ **Timer Preciso**: Contador regressivo para cada fase da técnica
- 🌙 **Modo Escuro/Claro**: Toggle entre temas claro e escuro com preferência salva
- 🎵 **Música de Fundo**: Música ambiente lofi para criar uma atmosfera relaxante (opcional)
- 📊 **Contador de Sessões**: Rastreamento automático das sessões realizadas por dia
- 🔊 **Feedback Sonoro**: Sons de beep para indicar transições entre fases
- 📱 **Design Responsivo**: Interface adaptável para desktop e dispositivos móveis
- 💾 **Armazenamento Local**: Dados das sessões e preferências salvas no navegador

## 🚀 Como Usar

1. Abra o arquivo `index.html` em seu navegador
2. Clique no botão **"Iniciar"** para começar uma sessão
3. Siga as instruções na tela:
   - **Inspire** por 4 segundos
   - **Segure** a respiração por 7 segundos
   - **Expire** por 8 segundos
4. A animação visual e o timer guiarão você através de cada fase
5. Clique em **"Parar"** a qualquer momento para interromper a sessão

### Controles Adicionais

- **Dark Mode**: Botão no canto superior direito para alternar entre tema claro/escuro
- **Música**: Botão no canto superior esquerdo para ativar/desativar a música de fundo

## 📁 Estrutura do Projeto

```
controle_respiracao/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos da aplicação
│   └── audio/
│       └── mixkit-sweet-september-282.mp3  # Música de fundo
├── js/
│   └── script.js           # Lógica da aplicação
└── README.md               # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização com variáveis CSS e design responsivo
- **JavaScript (Vanilla)**: Lógica da aplicação sem dependências
- **SVG**: Animações visuais para guiar a respiração
- **Web Audio API**: Reprodução de sons e música

## 📱 Compatibilidade

- ✅ Chrome/Edge (versão recente)
- ✅ Firefox (versão recente)
- ✅ Safari (versão recente)
- ✅ Navegadores móveis (iOS Safari, Chrome Mobile)

## 💡 Recursos Técnicos

- **LocalStorage**: Armazenamento de preferências de tema e contador de sessões
- **CSS Variables**: Sistema de temas dinâmico
- **Async/Await**: Gerenciamento assíncrono das fases da respiração
- **Transitions CSS**: Animações suaves para transições visuais

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

Os tempos podem ser ajustados na função `startSession()` em `js/script.js`:

```javascript
await countdown(4, "Inspire por 4s", animateInspire);
await countdown(7, "Segure por 7s", animateHold);
await countdown(8, "Expire por 8s", animateExhale);
```

## 📝 Notas

- A aplicação funciona completamente offline após o carregamento inicial
- Os dados são armazenados localmente no navegador (LocalStorage)
- Recomenda-se usar fones de ouvido para uma experiência mais imersiva
- Para melhores resultados, pratique em um ambiente calmo e confortável

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Melhorar a documentação
- Enviar pull requests

## 📄 Licença

Este projeto está disponível como código aberto. Sinta-se livre para usar e modificar conforme necessário.

## 🙏 Créditos

- Técnica de respiração: Método 4-7-8 desenvolvido pelo Dr. Andrew Weil
- Música de fundo: Mixkit (https://mixkit.co/)

---

**Desenvolvido com ❤️ para promover o bem-estar mental e o relaxamento**


