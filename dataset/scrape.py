import pandas as pd
from bs4 import BeautifulSoup
import requests

def scrapeAndAdd(df, url, league, position):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all the table rows (tr) in the HTML
        rows = soup.find_all('tr')

        # Ensure 'LEAGUE' and 'POSITION' columns exist
        if 'LEAGUE' not in df.columns:
            df['LEAGUE'] = ''

        if 'POSITION' not in df.columns:
            df['POSITION'] = ''

        # Extract the column headers only once from the first row
        if df.empty:
            header_row = rows[0]
            header_columns = header_row.find_all(['th'])
            df.columns = [header.text.strip() for header in header_columns] + ['LEAGUE', 'POSITION']

        # Iterate through each row (excluding the first row) and extract the data
        for i, row in enumerate(rows[1:], start=1):
            # Find all the table data (td) in the row
            columns = row.find_all(['td', 'th'])

            # Extract the data and append it to the DataFrame
            row_data = [column.text.strip() for column in columns]

            # Populate 'LEAGUE' column based on the logic
            if i == 0 and df['LEAGUE'].empty:
                df['LEAGUE'] = league
            elif df['LEAGUE'].iloc[i] == '':
                df.at[i, 'LEAGUE'] = league

            # Populate 'POSITION' column based on the logic
            if i == 0 and df['POSITION'].empty:
                df['POSITION'] = position
            elif df['POSITION'].iloc[i] == '':
                df.at[i, 'POSITION'] = position

            df = df.append(pd.Series(row_data + [league, position]), ignore_index=True)

        return df
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
        return df
    
combined_df = pd.DataFrame()