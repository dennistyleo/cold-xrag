import sys
try:
    import pypdf
    reader = pypdf.PdfReader("/Users/leodennis/Downloads/Cold_XRAG_Concept.pdf")
    for i, page in enumerate(reader.pages):
        print(f"--- PAGE {i+1} ---")
        print(page.extract_text())
except Exception as e:
    print("Error reading PDF:", e)
