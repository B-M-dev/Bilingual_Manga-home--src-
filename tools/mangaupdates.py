"""
 Bilingual Manga DB <-> MangaUpdates.com id match and ratings update tool

 USAGE: 

* To match Bilingual Manga DB series ID with the corresponding Mangaupdates.com series ID:

            python3 mangaupdates.py match_all

        For every manga title in admin_manga_metadata.json a search query will be done. 
        The search keyword is the BM manga title. The script will automatically select
        the first (best) search result and print the data. 
        Make sure to check that name and release year matches and synopsis suggests it's the same manga

            python3 mangaupdates.py show

        This will show manga id and title in BM database and the corresponding manga title in Mangaupdates.com
        Titles that have different names are highlighted with * marking.

        For example if there's an error (mismatch) like below:

            *  3 [65a979b8a6584202090c5020] I'm Not a Lolicon! : I&#039;m Not a Boy            

        Then start correcting it with following sequence:
            python3 mangaupdates.py search <keyword>

        For example in this case "I'm Not a Lolicon!" has a mismatch, use command:
            python3 mangaupdates.py search lolicon
            .
            .
            12: I&#039;m Not a Lolicon
                (2020) Shouji Osamu is an elementary school teacher fresh out of college about to embark on his first day. At the school gate, he was suddenly hugged by Chise, a girl he doesn&#039;t recognize who seems to know him. He later finds out that Chise is a fifth-grade student in his class, and that she lives in the same apartment building as he does. During a late-night rendezvous, he learns that nothing about their encounter is coincidental.

        .. and note the search result number of the correct manga (in this case it's 12)

        Then match the manga with the right search result:
            python3 mangaupdates.py match <title_name> <search_keyword> <search_result_index>
        or 
            python3 mangaupdates.py match <title_id> <search_keyword> <search_result_index>

        In this case it's better to use title_id because the title name contains apostrophes 
        and it's hard to escape:

            python3 mangaupdates.py match 65a979b8a6584202090c5020 lolicon 12


* To refresh votes and ratings for each matched manga title:

        python3 mangaupdates.py refresh

"""
import json
import argparse
import time

import requests
import json
from datetime import date

import logging
logging.captureWarnings(True) # repress HTML certificate verification warnings

parser = argparse.ArgumentParser(
    prog="mangaupdates",
    description="Bilingual Manga DB <-> MangaUpdates.com match and update tool",
     
)
subparsers = parser.add_subparsers(help='', dest='command')

parser_download = subparsers.add_parser('match_all', help='Search data for all the manga titles and select the first match')

parser_update = subparsers.add_parser('refresh', help='Refresh ratings')

parser_list = subparsers.add_parser('show', help='Show matched titles')

parser_search = subparsers.add_parser('search', help='Search manga titles from mangaupdates.com')
parser_search.add_argument('keyword', type=str, help='search keyword (e.g: Meitantei)')

parser_select = subparsers.add_parser('match', help='Select manga title from search results')
parser_select.add_argument('manga', type=str, help='Manga title')
parser_select.add_argument('keyword', type=str, help='search keyword (e.g: Meitantei)')
parser_select.add_argument('index', type=int, help='search result index number')

args = vars(parser.parse_args())
cmd = args.pop('command')

manga_data_file = "../json/admin.manga_data.json"
manga_metadata_file = "../json/admin.manga_metadata.json"
ratings_file = "../json/ratings.json"

search_url = "http://api.mangaupdates.com/v1/series/search"
get_series_url = "http://api.mangaupdates.com/v1/series/"
headers = {'Content-Type': 'application/json'}

title_name_to_id = dict()
title_names = dict()
title_years = dict()
synopsis = dict()
ratings = dict()

try:
    with open(ratings_file,"r",encoding="utf-8") as f:
        data = f.read()
        ratings = json.loads(data)
except:
    print("Existing ratings.json not found")


with open(manga_metadata_file,"r",encoding="utf-8") as f:
    data = f.read()
    manga_metadata = json.loads(data)
    manga_titles = manga_metadata[0]['manga_titles']
    for t in manga_titles:
        title_id = t['enid']
        title_name = t['entit']
        title_years[title_id] = t['Release']
        title_names[title_id] = title_name
        title_name_to_id[title_name] = title_id


with open(manga_data_file,"r",encoding="utf-8") as f:
    data = f.read()
    manga_data = json.loads(data)
    for m in manga_data:
        title_id = m['_id']['$oid']
        synopsis[title_id] = m['syn_en']
        pages = m['jp_data']['ch_jp']


def get_title_id(item):
    if item in title_name_to_id.keys():
        return title_name_to_id[item]
    if item in title_names.keys():
        # the item is in fact the title id
        return item
    raise Exception("unknown manga title/id %d" % item)


def show(args):
    i = 0
    for title_id, title_name in title_names.items():
        i += 1
        if title_id not in ratings:
            print("MISSING: [%s] %s " % (title_id, title_name))
        else:
            t = ratings[title_id]['title_name']
            t = t.replace("&#039;","'")
            t = t.replace("&amp;","&")
            t = t.replace("&quot;",'"')
            star = '* ' if t.lower() != title_name.lower() else '  '
            print("%s %d [%s] %s : %s" % (star, i, title_id, title_name,t ))


def search_records_and_select_one(title_id, keyword, index):
        
    body = json.dumps({"search" :keyword})
    #Making http post request
    response = requests.post(search_url, headers=headers, data=body, verify=False)
    r = response.json()
    hits = r['total_hits']
    if hits>0:
        j = r['results'][index]
        print("[match #%d] %s [%s] : MU name: %s [%s] (%s)" % 
            (index+1,
                title_names[title_id], title_years[title_id], 
                j['hit_title'], j['record']['year'], j['record']['title'])
        )
        print("BM synopsis: %s" % (synopsis[title_id]))
        print("MU synopsis: %s" % (j['record']['description']))
        print("")

        c = dict()

        c['rating'] = j['record']['bayesian_rating']
        c['votes'] = j['record']['rating_votes']
        c['url'] = j['record']['url']
        c['last_updated'] = j['record']['last_updated']['as_string']
        c['series_id'] = j['record']['series_id']
        c['title_name'] = j['hit_title']

        ratings[title_id] = c

        f = open(ratings_file,"w",encoding="utf-8")
        s = json.dumps(ratings)
        f.write(s)
        f.close()
    else:
        print(title_names[title_id] + " not found")


def search(args):
    body = json.dumps({"search" :args['keyword']})

    response = requests.post(search_url, headers=headers, data=body, verify=False)
    r_json = response.json()
    i = 1
    for r in r_json['results']:
        print("%d: %s (JP: %s)" % (i, r['hit_title'], r['record']['title']))
        print("%s" % r['record']['url'])
        print("\t(%s) %s" % ( r['record']['year'], r['record']['description']))
        print("")
        i += 1


def match(args):
    title_id = get_title_id(args['manga'])
    search_records_and_select_one(title_id, args['keyword'], args['index']-1)


def refresh(args):

    today = str(date.today())

    i = 0
    for title_id, c in ratings.items():
        i += 1
        print("Updating %d : %s" % (i,title_names[title_id]))

        response = requests.get(get_series_url + str(c['series_id']), headers=headers, verify=False)
        r = response.json()

        rating = r['bayesian_rating']
        votes = r['rating_votes']

        if rating != c['rating']:
            print("  - Updating Rating %f -> %f" % 
                  (c['rating'], rating)
            )
        if votes != c['votes']:
            print("  - Updating votes %d -> %d" % 
                  (c['votes'],votes)
            )

        c['rating'] = r['bayesian_rating']
        c['votes'] = r['rating_votes']
        c['last_updated'] = r['last_updated']['as_string']
        c['last_refreshed'] = today
        
        ratings[title_id] = c
        #time.sleep(0.1)

    f = open(ratings_file,"w",encoding="utf-8")
    f.write(json.dumps(ratings))
    f.close()


def match_all(args):
    for title_id, title_name in title_names.items():
        if not title_id in ratings:
            search_records_and_select_one(title_id,title_name,0)
            time.sleep(1)


if cmd != None:
  locals()[cmd](args)
