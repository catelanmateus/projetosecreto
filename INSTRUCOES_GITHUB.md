# 🚀 Como Colocar o Projeto no GitHub

## 📋 Pré-requisitos

1. **Conta no GitHub**: [github.com](https://github.com)
2. **Git instalado**: [git-scm.com](https://git-scm.com)
3. **Projeto organizado**: Todas as pastas e arquivos prontos

## 🔧 Passo a Passo

### 1. Instalar o Git (se não tiver)

**Windows:**
- Baixe em: [git-scm.com](https://git-scm.com)
- Instale com as opções padrão

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

### 2. Configurar o Git (primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@exemplo.com"
```

### 3. Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em **"New repository"** (botão verde)
3. **Nome do repositório**: `quiz-do-amor` ou `projeto-secreto`
4. **Descrição**: "Quiz romântico e interativo criado com HTML, CSS e JavaScript"
5. **Público** ou **Privado** (sua escolha)
6. **NÃO** marque "Initialize this repository with a README"
7. Clique em **"Create repository"**

### 4. Inicializar o Repositório Local

```bash
# No terminal, na pasta do projeto
cd "C:\Users\mateus\ProjetoSecreto"

# Inicializar Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Primeira versão: Quiz do Amor completo"

# Adicionar o repositório remoto (substitua pela sua URL)
git remote add origin https://github.com/SEU_USUARIO/quiz-do-amor.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 5. Estrutura Final no GitHub

```
quiz-do-amor/
├── README.md              # Documentação principal
├── index.html             # Página HTML
├── styles.css             # Estilos CSS
├── script.js              # Lógica JavaScript
├── .gitignore             # Arquivos ignorados
├── INSTRUCOES_GITHUB.md   # Este arquivo
└── assets/
    ├── images/            # Pasta de imagens
    │   ├── eu dando joia.jpeg
    │   ├── eu e ela.jpeg
    │   ├── nos dois.jpeg
    │   └── README.md
    └── audio/             # Pasta de áudio
        └── .gitkeep
```

## 📝 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log --oneline

# Ver diferenças
git diff

# Fazer novo commit
git add .
git commit -m "Descrição da mudança"

# Enviar para GitHub
git push

# Baixar mudanças do GitHub
git pull
```

## 🌐 URLs Importantes

- **GitHub**: [github.com](https://github.com)
- **Git**: [git-scm.com](https://git-scm.com)
- **GitHub Pages**: Para hospedar o site (gratuito)

## 🎯 GitHub Pages (Opcional)

Para hospedar o site gratuitamente:

1. No repositório, vá em **Settings**
2. Role até **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: main
5. **Folder**: / (root)
6. Clique **Save**

O site ficará disponível em: `https://SEU_USUARIO.github.io/quiz-do-amor`

## 💡 Dicas

- **Commits frequentes**: Faça commits pequenos e frequentes
- **Mensagens claras**: Use mensagens descritivas nos commits
- **README atualizado**: Mantenha a documentação sempre atualizada
- **Issues**: Use para organizar melhorias futuras
- **Branches**: Use branches para novas funcionalidades

## 🆘 Problemas Comuns

**Erro de autenticação:**
- Use GitHub CLI ou configure SSH keys
- Ou use token pessoal em vez de senha

**Arquivo muito grande:**
- Verifique o `.gitignore`
- Use Git LFS para arquivos grandes

**Conflito de merge:**
- Resolva manualmente ou use `git merge --abort`

---

**🎉 Parabéns! Seu projeto está no GitHub!**
