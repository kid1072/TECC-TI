from __future__ import annotations

import sys
from pathlib import Path

from docx import Document
from docx.document import Document as DocumentType
from docx.table import Table
from docx.text.paragraph import Paragraph


def iter_blocks(document: DocumentType):
    for child in document.element.body.iterchildren():
        if child.tag.endswith("}p"):
            yield Paragraph(child, document)
        elif child.tag.endswith("}tbl"):
            yield Table(child, document)


def main() -> None:
    source = Path(sys.argv[1])
    document = Document(source)

    for index, block in enumerate(iter_blocks(document), start=1):
        if isinstance(block, Paragraph):
            text = block.text.strip()
            if text:
                print(f"P{index:03d} [{block.style.name}] {text}")
            continue

        print(f"TABLE {index:03d}")
        for row_index, row in enumerate(block.rows, start=1):
            cells = [" / ".join(p.text.strip() for p in cell.paragraphs if p.text.strip()) for cell in row.cells]
            print(f"  R{row_index:02d}: " + " || ".join(cells))


if __name__ == "__main__":
    main()
