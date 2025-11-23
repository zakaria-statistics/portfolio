import pypdf
import json

def extract_text_from_pdf(pdf_path):
    try:
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    pdf_path = "Zakaria_EL_moumnaoui_resume.pdf"
    text = extract_text_from_pdf(pdf_path)
    with open("cv_text.txt", "w", encoding="utf-8") as f:
        f.write(text)
