import pandas as pd

# Excelファイルを読み込む
df = pd.read_excel('word_list.xlsx')

# JSONファイルとして保存
df.to_json('word_list.json', orient='records', force_ascii=False)
