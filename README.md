## Technical Specifications

API to fetch job posts:

English: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/eng.json

Traditional Chinese: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/tc.json

Simplified Chinese: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/sc.json

Department logo mapping: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/dept_logo_map.json

For example, you should first download the mapping in the app, and loop through the array to find out if the current department name matches any in the map, if yes, and suppose the mapped "logoName" is logo_cedd, the image should be: https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_cedd.png . If there is no match, please use https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png as default icon.

## Design Specifications

Theme Color: #010a43

Grey: #B4B4B4

Image: 

