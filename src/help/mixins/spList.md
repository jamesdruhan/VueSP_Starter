#### Initialize: (Any Component)

```javascript
import spListMix from '../../mixins/spListMix';

export default
{
	... // Other Propertise Here ...

    data ()
    {
        return {
            ... // Other Variables Here ...

            // Load setting and field details for the following lists.
            loadListDetails  :
            [
                // Title of the libraries.
                'Documents',
                'My List Title Here'
            ],

            // Load data from the following libraries.
            loadListData :
            [
                // Title of the libraries.
                'MyListTitleHere'
            ],

            // List of columns per list name to load.
            columnsToGet :
            {
                MyListTitleHere :
                [
                    'ID',
                    'Title'
                ]
            },
        }
    },

    ... // Other Propertise Here ...
}
```
