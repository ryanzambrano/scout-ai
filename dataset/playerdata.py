import pandas as pd
from bs4 import BeautifulSoup
import requests

def extract_player_urls(input_urls):
    urls_list = []

    for url in input_urls:
        response = requests.get(url)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            rows = soup.find_all('tr')
            href_data = []

            for row in rows:
                links = row.find_all('a')
                filtered_href_list = [link.get('href') for link in links if link.get('href', '').startswith('/player/')]
                href_data.extend(filtered_href_list)

            if href_data:
                href_data.pop(0)

            urls_list.extend(['https://basketball.realgm.com' + value for value in href_data])

    return urls_list

input_urls = [
    'https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/4/Spanish-ACB/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/6/Italian-Lega-Basket-Serie-A/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/7/Turkish-BSL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/8/Greek-HEBA-A1/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/10/Lithuanian-LKL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/11/Israeli-BSL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/12/French-Jeep-Elite/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/13/Serbian-KLS/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/14/Croatian-A-1-Liga/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/15/German-BBL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/5/Australian-NBL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/40/Chinese-CBA/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/58/Argentinian-Liga-A/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/59/Brazilian-NBB/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/63/South-Korean-KBL/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/PG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/SG/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/SF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/PF/desc/1/Regular_Season',
    'https://basketball.realgm.com/international/league/76/Mexican-LNBP/stats/2024/Averages/Qualified/All/points/C/desc/1/Regular_Season',
]
result_urls_list = extract_player_urls(input_urls)

def extractPlayerInfo(url):
    response = requests.get(url)
    player_info = {
        'name': 'N/A',
        'img_url': 'N/A',
        'age': 'N/A',
        'height': 'N/A',
        'weight': 'N/A',
        'nationality': 'N/A',
    }
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        #Get name of player
        div_element = soup.find('div', class_='half-column-left')
        name_element = div_element.find('h2')
        name = name_element.get_text(strip=True)
        player_info['name'] = name

        #Get image url
        img_element = soup.select_one('.profile-box .half-column-left img')
        img_src = img_element['src'] if img_element else None
        img_src = 'https://basketball.realgm.com/' + img_src
        player_info['img_url'] = img_src

        #Get age value
        age_element = soup.select_one('.profile-box .half-column-left p:-soup-contains("Born:")')
        if age_element:
            age_text = age_element.get_text(strip=True)
            age_value = age_text.split('(')[-1].split(' ')[0]
            player_info['age'] = age_value
        else:
            player_info['age'] = 'N/A'

        #Get height value
        height_element = soup.select_one('.profile-box .half-column-left p:-soup-contains("Height:")')
        height_text = height_element.get_text(strip=True)
        height_index = height_text.find("Height:")
        # If "Height:" is found
        if height_index != -1:
            # Extract the substring starting from the position after "Height:"
            height_text = height_text[height_index + len("Height:"):]

            # Find the closing parenthesis in the remaining substring
            parenthesis_index = height_text.find(")")

            # If a closing parenthesis is found, extract the height value before it
            if parenthesis_index != -1:
                height_value = height_text[:parenthesis_index]

                # Extract the weight value
                weight_index = height_text.find("Weight:")
                weight_text = height_text[weight_index + len("Weight:"):]

                # Find the first space in the remaining substring
                space_index = weight_text.find(" ")

                # If a space is found, extract the weight value before it
                if space_index != -1:
                    weight_value = weight_text[:space_index]

                    # Convert the extracted values to appropriate formats
                    height_value = height_value.strip()  # Remove leading/trailing whitespaces
                    height_value = height_value.split(" ")[0]
                    weight_value = int(weight_value)
                    player_info['height'] = height_value
                    player_info['weight'] = weight_value

        #Get nationality
        nationality_element = soup.select_one('.profile-box .half-column-left p:-soup-contains("Nationality:")')
        nationality_text = nationality_element.get_text(strip=True)
        nationality_value = nationality_text.split(':')[-1].strip()
        player_info['nationality'] = nationality_value

    return player_info

columns = ['name', 'img_url', 'age', 'height', 'weight', 'nationality']
df = pd.DataFrame(columns=columns)

for url in result_urls_list:
    df = pd.concat([df, pd.DataFrame.from_records([extractPlayerInfo(url)])])

df.head(10)




