#!/usr/bin/env python
# * coding: utf8 *
'''
scrapeGoogleAnalyticsData.py

A module that contains code for scraping page views from Google Analytics data (exported to CSV).
Data exported from this report: https://analytics.google.com/analytics/web/#report/content-pages/a11849964w58352168p59576049/%3F_u.date00%3D20170901%26_u.date01%3D20180308%26explorer-table-tableMode.selected%3Ddata%26explorer-table.plotKeys%3D%5B%5D%26explorer-table.rowCount%3D5000/
'''
import csv
from os.path import abspath, dirname, join

from google.cloud import datastore

client = datastore.Client('utahkoopserver')

current_directory = abspath(dirname(__file__))

with open(join(current_directory, 'analytics_export.csv')) as csvfile:
    reader = csv.reader(csvfile)

    #: skip header content
    for skip_line in range(0, 7):
        reader.next()

    for row in reader:
        #: skip the day, index, pageviews section
        if len(row) == 0:
            break

        page = 'https://gis.utah.gov' + row[0]
        # page = 'https://deploy-preview-800--gis-utah-gov.netlify.com' + row[0]
        views = int(row[1].replace(',', ''))
        print(page, views)

        key = client.key('view', page)
        entity = datastore.Entity(key)

        entity.update({
            'count': views
        })

        client.put(entity)
