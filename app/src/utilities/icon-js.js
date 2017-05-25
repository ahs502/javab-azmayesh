(function(global) {

    iconJs.feed = feed;
    iconJs.file = file;

    global.iconJs = iconJs;

    var dataUrls = {
        //IMPORTANT: This file will be feeded asynchronously at runtime.

        'left arrow': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzEuNDk0IDMxLjQ5NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEuNDk0IDMxLjQ5NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMjAxRDsiIGQ9Ik0xMC4yNzMsNS4wMDljMC40NDQtMC40NDQsMS4xNDMtMC40NDQsMS41ODcsMGMwLjQyOSwwLjQyOSwwLjQyOSwxLjE0MywwLDEuNTcxbC04LjA0Nyw4LjA0N2gyNi41NTQNCgljMC42MTksMCwxLjEyNywwLjQ5MiwxLjEyNywxLjExMWMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDMuODEzbDguMDQ3LDguMDMyYzAuNDI5LDAuNDQ0LDAuNDI5LDEuMTU5LDAsMS41ODcNCgljLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        'menu bars': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB3aWR0aD0iNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCI+CiAgPGc+CiAgICA8ZyBmaWxsPSIjMUQxRDFCIj4KICAgICAgPHBhdGggZD0iTTIuMjUyLDEwLjI3MWg1OC44NzFjMS4xMjQsMCwyLjAzNC0wLjkxLDIuMDM0LTIuMDM0YzAtMS4xMjMtMC45MS0yLjAzNC0yLjAzNC0yLjAzNEgyLjI1MiAgICBjLTEuMTI0LDAtMi4wMzQsMC45MTEtMi4wMzQsMi4wMzRDMC4yMTgsOS4zNiwxLjEyOCwxMC4yNzEsMi4yNTIsMTAuMjcxeiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDMwLjAxNWgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEyLTIuMDM0LDIuMDM1IDAsMS4xMjIgMC45MSwyLjAzNCAyLjAzNCwyLjAzNGg1OC44NzFjMS4xMjQsMCAyLjAzNC0wLjkxMiAyLjAzNC0yLjAzNC03LjEwNTQzZS0xNS0xLjEyMy0wLjkxLTIuMDM1LTIuMDM0LTIuMDM1eiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDUzLjg3NmgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEtMi4wMzQsMi4wMzQgMCwxLjEyMyAwLjkxLDIuMDM0IDIuMDM0LDIuMDM0aDU4Ljg3MWMxLjEyNCwwIDIuMDM0LTAuOTExIDIuMDM0LTIuMDM0LTcuMTA1NDNlLTE1LTEuMTI0LTAuOTEtMi4wMzQtMi4wMzQtMi4wMzR6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",

        //Format:    'key': "data_url",
    };

    var emptySvg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgICB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIGlkPSJzdGFydGVyX3N2ZyI+ICAgPC9zdmc+";

    function iconJs(dataUrlTitle) {
        return dataUrls[dataUrlTitle] || emptySvg;
    }

    function feed(newDataUrls) {
        newDataUrls = newDataUrls || {};
        Object.keys(newDataUrls).forEach(function(key) {
            dataUrls[key] = newDataUrls[key];
        });
    }

    function file(filename) {
        var previewIcon = 'free file';
        if (isOneOfThese(['doc', 'docx']))
            previewIcon = 'doc file';
        if (isOneOfThese(['xls', 'xlsx']))
            previewIcon = 'xls file';
        if (isOneOfThese(['pdf']))
            previewIcon = 'pdf file';

        return iconJs(previewIcon);

        function isOneOfThese(arrayOfTypes) {
            for (var i = 0; i < arrayOfTypes.length; i++)
                if (filename.slice(-1 - arrayOfTypes[i].length) === '.' + arrayOfTypes[i])
                    return true;
            return false;
        }
    }

})(global);
