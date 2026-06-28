const CLAUDE = {
    menu: 'div[role="menu"]',
    menuItem: 'div[role="menuitem"]',
    inp: 'div[data-testid="chat-input"]'
}
const CHATGPT = {
    inp: 'div#prompt-textarea'
}
const GROK = {
    inp: 'textarea[aria-label="Ask Grok anything"]'
}
const GEMINI = {
    inp: 'div[aria-label="Enter a prompt for Gemini"]'
}
const PERPLEXITY = {
    inp: 'div#ask-input'
}
const DEEPSEEK = {
    inp: 'textarea[placeholder="Message DeepSeek"]'
}
const COPILOT = {
    inp: 'textarea[data-testid="composer-input"]'
}

const init = () => {
    const whichAI = window.location.hostname
    if (whichAI === 'chatgpt.com') {}
    else if (whichAI === 'claude.ai') {}
    else if (whichAI === 'gemini.google.com') {}
    else if (whichAI === 'perplexity.ai') {}
    else if (whichAI === 'chat.deepseek.com'){}
    else if (whichAI === 'copilot.microsoft.com'){}
    else if (whichAI === 'grok.com'){}
}

init()