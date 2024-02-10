import pandas as pd
from bs4 import BeautifulSoup
import requests

url= 'https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/'
response = requests.get(url)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')
    # Find all the table rows (tr) in the HTML
    rows = soup.find_all('tr')
    href_data = []
    # Iterate through each row and extract the data
    for row in rows:
        # Find all the table data (td) in the row
        links = row.find_all('a')

        # Extract the data and append it to the DataFrame
        filtered_href_list = [link.get('href') for link in links if link.get('href', '').startswith('/player/')]
        href_data.append(filtered_href_list)
    if href_data:
        href_data.pop(0)

urls_list = ['https://basketball.realgm.com' + value[0] for value in href_data]

url2 = 'https://basketball.realgm.com/player/Markus-Howard/Summary/81690'

response2 = requests.get(url2)
columns = ['name', 'imageURL', 'age', 'height', 'weight', 'nationality']
players = pd.DataFrame(columns=columns)
if response2.status_code == 200:
    soup = BeautifulSoup(response2.text, 'html.parser')

    #Get name of player
    div_element = soup.find('div', class_='half-column-left')
    name_element = div_element.find('h2')
    name = name_element.get_text(strip=True)

    #Get image url
    img_element = soup.select_one('.profile-box .half-column-left img')
    img_src = img_element['src'] if img_element else None
    img_src = 'https://basketball.realgm.com/' + img_src

    #Get age value
    age_element = soup.select_one('.profile-box .half-column-left p:-soup-contains("Born:")')
    age_text = age_element.get_text(strip=True)
    age_value = age_text.split('(')[-1].split(' ')[0]



    





