#!/usr/bin/env python3
import PyPDF2
import json
import re

def extract_pdf_data(pdf_path):
    """Extract text and data from PDF file"""
    extracted_data = {
        "campaigns": [],
        "kpis": [],
        "budgets": [],
        "performance_metrics": [],
        "creative_details": [],
        "targeting": [],
        "attribution": [],
        "time_series": []
    }
    
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            num_pages = len(pdf_reader.pages)
            
            print(f"PDF has {num_pages} pages")
            
            all_text = ""
            for page_num in range(num_pages):
                page = pdf_reader.pages[page_num]
                text = page.extract_text()
                all_text += text + "\n"
                print(f"\n--- Page {page_num + 1} ---")
                print(text[:500] + "..." if len(text) > 500 else text)
            
            # Save full text for analysis
            with open('/Users/kevin/dev/Precise/precise-db-backend/preciseweb2/pdf_extracted_text.txt', 'w') as f:
                f.write(all_text)
            
            print(f"\nFull text saved to pdf_extracted_text.txt")
            
            # Look for patterns in the text
            # Campaign patterns
            campaign_patterns = [
                r'campaign[:\s]+([^\n]+)',
                r'Campaign Name[:\s]+([^\n]+)',
                r'DSP[:\s]+([^\n]+)'
            ]
            
            # Budget patterns
            budget_patterns = [
                r'\$[\d,]+(?:\.\d{2})?',
                r'budget[:\s]+\$?[\d,]+',
                r'spend[:\s]+\$?[\d,]+'
            ]
            
            # Performance patterns
            performance_patterns = [
                r'CTR[:\s]+([\d.]+%?)',
                r'CPC[:\s]+\$?([\d.]+)',
                r'CPM[:\s]+\$?([\d.]+)',
                r'ROAS[:\s]+([\d.]+)',
                r'conversion[:\s]+([\d.]+%?)'
            ]
            
            # Extract matches
            for pattern in campaign_patterns:
                matches = re.findall(pattern, all_text, re.IGNORECASE)
                if matches:
                    extracted_data["campaigns"].extend(matches)
            
            for pattern in budget_patterns:
                matches = re.findall(pattern, all_text, re.IGNORECASE)
                if matches:
                    extracted_data["budgets"].extend(matches)
            
            for pattern in performance_patterns:
                matches = re.findall(pattern, all_text, re.IGNORECASE)
                if matches:
                    extracted_data["performance_metrics"].extend(matches)
            
            return extracted_data
            
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

if __name__ == "__main__":
    pdf_path = "/Users/kevin/Downloads/Second_Demo_System_Requirements_Template.xlsx - Ed's Edits to #'s w_ Cubs KPIs.pdf"
    data = extract_pdf_data(pdf_path)
    
    if data:
        print("\n\nExtracted Data Summary:")
        for key, values in data.items():
            if values:
                print(f"\n{key.upper()}:")
                for value in values[:5]:  # Show first 5 items
                    print(f"  - {value}")
                if len(values) > 5:
                    print(f"  ... and {len(values) - 5} more")