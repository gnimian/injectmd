/*
TODO:
1. could I choose multiple files at the same time and convert them and then upload as separate files or upload as one file (especially for chatgpt which has upload limits?)
2. Add style for the menu item so it has dark mode and light mode and matches style of the other menu items
3. MAKE THIS CODE EFFICIENT AND CLEANER!!!
4. Add error handling, especially in the converter.js file
*/

class AIConfig {
    constructor(menu, menuItem, inp) {
        this.menu = menu;
        this.menuItem = menuItem;
        this.inp = inp;
    }
}
const CLAUDE = new AIConfig(
    'div[role="menu"]',
    'div[role="menuitem"]',
    'div[data-testid="chat-input"]'
)
const CHATGPT = new AIConfig(
    'div.popover',
    'div.__menu-item',
    'div#prompt-textarea'
)
const GROK = new AIConfig(
    'div[role="menu"][data-radix-menu-content]',
    'div[role="menuitem"]',
    'textarea[aria-label="Ask Grok anything"]'
)
const GEMINI = new AIConfig(
    'mat-card[data-test-id="card-container"]',
    'button[role="menuitem"]',
    'div[aria-label="Enter a prompt for Gemini"]'
)
const PERPLEXITY = new AIConfig(
    'div[role="menu"][data-radix-menu-content]',
    'div[role="menuitem"]',
    'div#ask-input'
)
const COPILOT = new AIConfig(
    'div[role="menu"]',
    'button[role="menuitem"]',
    'textarea[data-testid="composer-input"]'
)

const init = () => {
    const whichAI = window.location.hostname
    if (whichAI === 'chatgpt.com') {addObserver(CHATGPT);}
    else if (whichAI === 'claude.ai') {addObserver(CLAUDE);}
    else if (whichAI === 'gemini.google.com') {addObserver(GEMINI);}
    else if (whichAI === 'perplexity.ai') {addObserver(PERPLEXITY);}
    else if (whichAI === 'copilot.microsoft.com') {addObserver(COPILOT);}
    else if (whichAI === 'grok.com') {addObserver(GROK);}
}

const addObserver = (site) => {
    const observer = new MutationObserver(() => {
        const menu = document.querySelector(site.menu);

        if (menu && !menu.querySelector('#injectmd-item')) {
            const injectItem = document.createElement('div');
            injectItem.id = 'injectmd-item';
            injectItem.textContent = 'Inject File';
            menu.prepend(injectItem);
            injectItem.addEventListener('click', async () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.docx';
                input.click();
                input.addEventListener('change', async () => {
                    //TODO: could add more files
                    const file = input.files[0];
                    const storedMode = await browser.storage.sync.get('mode');
                    const mode = storedMode.mode;
                    const convertedFile = await convertFile(file, mode);
                    const inp = document.querySelector(site.inp);
                    if (inp.tagName === 'TEXTAREA') {
                        //value for textarea
                        inp.value = convertedFile;
                    }
                    else {
                        //Inner text for divs
                        inp.innerText = convertedFile;
                    }
                    inp.dispatchEvent(new Event('input', { bubbles: true }));
                })
             })
        }
    })

    observer.observe(document.body, { childList: true, subtree: true });
}

init();