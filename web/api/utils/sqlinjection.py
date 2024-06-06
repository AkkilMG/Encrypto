
import re
def extract_tables(sqlmap_output):
    tables_section = re.search(r'Database: \w+\n\[(.*?)\]\n\+-----------\+\n((?:\| .+? \|\n)+)\+-----------\+', sqlmap_output, re.DOTALL)
    if tables_section:
        tables = tables_section.group(2)
        table_names = re.findall(r'\| (.+?) \|', tables)
        return table_names
    return []