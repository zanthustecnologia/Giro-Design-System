---
"@giro-ds/react": patch
---

fix(TextField): normalize value handling to support string | number type

- Add normalizeValue() helper to convert string | number → string internally
- Fix .trim() error on numeric values (lines 90-91)
- Add background-color to input for better visibility
- Maintain backward compatibility with existing string values
