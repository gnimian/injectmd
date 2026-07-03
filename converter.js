//Uses pdfjs-dist to extract text without formatting
import pdf2md from  "@opendocsg/pdf2md";
import mammoth from "mammoth";
import TurndownService from "turndown";
import * as pdfjsLib from 'pdfjs-dist';

const PDFtoTXT = async (file) => {
    const buffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({data: buffer});
    const pdf = await loadingTask.promise;
    const totalPageCount = pdf.numPages;
    const pages = [];
    for (
        let currentPage = 1;
        currentPage <= totalPageCount;
        currentPage++
    ) {
        const page = await pdf.getPage(currentPage);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(s => s.str).join(" ");
        pages.push(pageText);
    }
    return pages.join("\n\n");
}

//Uses mammoth.js
const DOCXtoTXT = async (file) => {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({arrayBuffer: buffer});
    return result.value;
}

//Uses @opendocsg/pdf2md
const PDFtoMD = async(file) => {
    const buffer = await file.arrayBuffer();
    const text = await pdf2md(buffer);
    return text;
}

//Uses mammoth.js + turndown
const DOCXtoMD = async(file) => {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.convertToHtml({arrayBuffer: buffer});
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(result.value);
    return markdown;
}

const convertFile = async (file, mode) => {
    if (file.type === "application/pdf") {
        if (mode === "txt") {
            return await PDFtoTXT(file);
        }
        else if (mode === "md") {
            return await PDFtoMD(file);
        }
        else{
            //REMEMBER TO ADD ERROR HANDLING HERE!!!
        }
    }
    else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        if (mode === "txt") {
            return await DOCXtoTXT(file);
        }
        else if (mode === "md") {
            return await DOCXtoMD(file);
        }
        else{
            //REMEMBER TO ADD ERROR HANDLING HERE!!!
        }
    }
    else {
        //REMEMBER TO ADD ERROR HANDLING HERE!!!
    }
}

export { convertFile };