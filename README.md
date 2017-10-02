## Technical Specifications

API to fetch job posts:

English: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/eng.json

Traditional Chinese: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/tc.json

Simplified Chinese: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/sc.json

Department logo mapping: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/dept_logo_map.json

For example, you should first download the mapping in the app, and loop through the array to find out if the current department name matches any in the map, if yes, and suppose the mapped "logoName" is logo_cedd, the image should be: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_cedd.png . If there is no match, please use https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png as default icon.

~~## JSON file handling
All json file should be cached in the local device, and new json files should only be downloaded when there is a newer version from the api, otherwise, the local ones should be used.~~

## Requierd Functions
1. a listview that shows jobs based on different department (filter)
OrReply :- it will take 6 hours without pagination itand all data will be get from api

2. a sidemenu (same from android)
Reply :- ok design may be little different, and with Chinese language it will take 3 hours

3. detail page view (same from android)
Reply : it will take 3 hours

4. a search function (same from android, that search job based on job title)

5. a "favourite" function (user can star certain jobs to review later)

6. admob integration
*6. tab (1. job list 2. favourite)

## Design Specifications

Theme Color: #010a43

Grey: #B4B4B4
