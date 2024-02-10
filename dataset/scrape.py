import requests
from bs4 import BeautifulSoup
import pandas as pd

def scrapeAndAdd(df, url, league, position):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all the table rows (tr) in the HTML
        rows = soup.find_all('tr')

        # Iterate through each row and extract the data
        for row in rows:
            # Find all the table data (td) in the row
            columns = row.find_all(['td', 'th'])

            # Extract the data and append it to the DataFrame
            row_data = [column.text.strip() for column in columns]
            
            # Create a Series for the entire row, including 'league' and 'position'
            row_series = pd.Series(row_data + [league, position])
            
            # Append the Series to the DataFrame
            df = df.append(row_series, ignore_index=True)

        return df
    
combined_df = pd.DataFrame()

urls_and_params = [
    ('https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Spanish ACB', 'PG'),
    ('https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Spanish ACB', 'SG'),
    ('https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Spanish ACB', 'SF'),
    ('https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Spanish ACB', 'PF'),
    ('https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Spanish ACB', 'C'),
    ('https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Italian Lega Basket', 'PG'),
    ('https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Italian Lega Basket', 'SG'),
    ('https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Italian Lega Basket', 'SF'),
    ('https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Italian Lega Basket', 'PF'),
    ('https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Italian Lega Basket', 'C'),
    ('https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Turkish BSL', 'PG'),
    ('https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Turkish BSL', 'SG'),
    ('https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Turkish BSL', 'SF'),
    ('https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Turkish BSL', 'PF'),
    ('https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Turkish BSL', 'C'),
    ('https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Greek HEBA A1', 'PG'),
    ('https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Greek HEBA A1', 'SG'),
    ('https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Greek HEBA A1', 'SF'),
    ('https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Greek HEBA A1', 'PF'),
    ('https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Greek HEBA A1', 'C'),
    ('https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Lithuanian LKL', 'PG'),
    ('https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Lithuanian LKL', 'SG'),
    ('https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Lithuanian LKL', 'SF'),
    ('https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Lithuanian LKL', 'PF'),
    ('https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Lithuanian LKL', 'C'),
    ('https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Israeli BSL', 'PG'),
    ('https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Israeli BSL', 'SG'),
    ('https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Israeli BSL', 'SF'),
    ('https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Israeli BSL', 'PF'),
    ('https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Israeli BSL', 'C'),
    ('https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'French Jeep Elite', 'PG'),
    ('https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'French Jeep Elite', 'SG'),
    ('https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'French Jeep Elite', 'SF'),
    ('https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'French Jeep Elite', 'PF'),
    ('https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'French Jeep Elite', 'C'),
    ('https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Serbian KLS', 'PG'),
    ('https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Serbian KLS', 'SG'),
    ('https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Serbian KLS', 'SF'),
    ('https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Serbian KLS', 'PF'),
    ('https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Serbian KLS', 'C'),
    ('https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Croatian A1 Liga', 'PG'),
    ('https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Croatian A1 Liga', 'SG'),
    ('https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Croatian A1 Liga', 'SF'),
    ('https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Croatian A1 Liga', 'PF'),
    ('https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Croatian A1 Liga', 'C'),
    ('https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'German BBL', 'PG'),
    ('https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'German BBL', 'SG'),
    ('https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'German BBL', 'SF'),
    ('https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'German BBL', 'PF'),
    ('https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'German BBL', 'C'),
    ('https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Australian NBL', 'PG'),
    ('https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Australian NBL', 'SG'),
    ('https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Australian NBL', 'SF'),
    ('https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Australian NBL', 'PF'),
    ('https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Australian NBL', 'C'),
    ('https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Chinese CBA', 'PG'),
    ('https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Chinese CBA', 'SG'),
    ('https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Chinese CBA', 'SF'),
    ('https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Chinese CBA', 'PF'),
    ('https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Chinese CBA', 'C'),
    ('https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Argentinian Liga A', 'PG'),
    ('https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Argentinian Liga A', 'SG'),
    ('https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Argentinian Liga A', 'SF'),
    ('https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Argentinian Liga A', 'PF'),
    ('https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Argentinian Liga A', 'C'),
    ('https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Brazilian NBB', 'PG'),
    ('https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Brazilian NBB', 'SG'),
    ('https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Brazilian NBB', 'SF'),
    ('https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Brazilian NBB', 'PF'),
    ('https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Brazilian NBB', 'C'),
    ('https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'South Korean KBL', 'PG'),
    ('https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'South Korean KBL', 'SG'),
    ('https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'South Korean KBL', 'SF'),
    ('https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'South Korean KBL', 'PF'),
    ('https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'South Korean KBL', 'C'),
    ('https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season', 'Mexican LNBP', 'PG'),
    ('https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season', 'Mexican LNBP', 'SG'),
    ('https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season', 'Mexican LNBP', 'SF'),
    ('https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season', 'Mexican LNBP', 'PF'),
    ('https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season', 'Mexican LNBP', 'C')
]

for url, league, position in urls_and_params:
    combined_df = scrapeAndAdd(combined_df, url, league, position)

combined_df.to_csv('/Users/binayakpandey/Documents/international_players.csv', index=False, encoding='utf-8')