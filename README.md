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
1. a listview that shows jobs based on different department (filter), each job post should be contained inside a card view like the android's.

2. a sidemenu (same from android)

3. detail page view (same from android)

4. a search function (same from android, that search job based on job title)

5. a "favourite" function (user can star certain jobs to review later), the "favourite" items should be stored locally.

6. admob integration & tab (1. job list 2. favourite)
when the user click on any job post, there will be 1/10 chance to show a full-screen interestitial ads. For example, check if the current second is divisible by 10 if yes show ad, if no, show the detail page.

## Design Specifications

Theme Color: #010a43

Grey: #B4B4B4
