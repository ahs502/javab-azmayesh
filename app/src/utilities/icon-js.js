(function(global) {

    var dataUrls = {

        'left arrow': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgMzEuNDk0IDMxLjQ5NCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzEuNDk0IDMxLjQ5NDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMjAxRDsiIGQ9Ik0xMC4yNzMsNS4wMDljMC40NDQtMC40NDQsMS4xNDMtMC40NDQsMS41ODcsMGMwLjQyOSwwLjQyOSwwLjQyOSwxLjE0MywwLDEuNTcxbC04LjA0Nyw4LjA0N2gyNi41NTQNCgljMC42MTksMCwxLjEyNywwLjQ5MiwxLjEyNywxLjExMWMwLDAuNjE5LTAuNTA4LDEuMTI3LTEuMTI3LDEuMTI3SDMuODEzbDguMDQ3LDguMDMyYzAuNDI5LDAuNDQ0LDAuNDI5LDEuMTU5LDAsMS41ODcNCgljLTAuNDQ0LDAuNDQ0LTEuMTQzLDAuNDQ0LTEuNTg3LDBsLTkuOTUyLTkuOTUyYy0wLjQyOS0wLjQyOS0wLjQyOS0xLjE0MywwLTEuNTcxTDEwLjI3Myw1LjAwOXoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K",
        'menu bars': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0nMS4wJyBlbmNvZGluZz0ndXRmLTgnPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgJy0vL1czQy8vRFREIFNWRyAxLjEvL0VOJyAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz4KPHN2ZyB3aWR0aD0iNjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjY0IiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA2NCA2NCI+CiAgPGc+CiAgICA8ZyBmaWxsPSIjMUQxRDFCIj4KICAgICAgPHBhdGggZD0iTTIuMjUyLDEwLjI3MWg1OC44NzFjMS4xMjQsMCwyLjAzNC0wLjkxLDIuMDM0LTIuMDM0YzAtMS4xMjMtMC45MS0yLjAzNC0yLjAzNC0yLjAzNEgyLjI1MiAgICBjLTEuMTI0LDAtMi4wMzQsMC45MTEtMi4wMzQsMi4wMzRDMC4yMTgsOS4zNiwxLjEyOCwxMC4yNzEsMi4yNTIsMTAuMjcxeiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDMwLjAxNWgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEyLTIuMDM0LDIuMDM1IDAsMS4xMjIgMC45MSwyLjAzNCAyLjAzNCwyLjAzNGg1OC44NzFjMS4xMjQsMCAyLjAzNC0wLjkxMiAyLjAzNC0yLjAzNC03LjEwNTQzZS0xNS0xLjEyMy0wLjkxLTIuMDM1LTIuMDM0LTIuMDM1eiIvPgogICAgICA8cGF0aCBkPSJtNjEuMTIzLDUzLjg3NmgtNTguODcxYy0xLjEyNCwwLTIuMDM0LDAuOTEtMi4wMzQsMi4wMzQgMCwxLjEyMyAwLjkxLDIuMDM0IDIuMDM0LDIuMDM0aDU4Ljg3MWMxLjEyNCwwIDIuMDM0LTAuOTExIDIuMDM0LTIuMDM0LTcuMTA1NDNlLTE1LTEuMTI0LTAuOTEtMi4wMzQtMi4wMzQtMi4wMzR6Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K",
        'delete': "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgMzQ4LjMzMyAzNDguMzM0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzNDguMzMzIDM0OC4zMzQ7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzM2LjU1OSw2OC42MTFMMjMxLjAxNiwxNzQuMTY1bDEwNS41NDMsMTA1LjU0OWMxNS42OTksMTUuNzA1LDE1LjY5OSw0MS4xNDUsMCw1Ni44NSAgIGMtNy44NDQsNy44NDQtMTguMTI4LDExLjc2OS0yOC40MDcsMTEuNzY5Yy0xMC4yOTYsMC0yMC41ODEtMy45MTktMjguNDE5LTExLjc2OUwxNzQuMTY3LDIzMS4wMDNMNjguNjA5LDMzNi41NjMgICBjLTcuODQzLDcuODQ0LTE4LjEyOCwxMS43NjktMjguNDE2LDExLjc2OWMtMTAuMjg1LDAtMjAuNTYzLTMuOTE5LTI4LjQxMy0xMS43NjljLTE1LjY5OS0xNS42OTgtMTUuNjk5LTQxLjEzOSwwLTU2Ljg1ICAgbDEwNS41NC0xMDUuNTQ5TDExLjc3NCw2OC42MTFjLTE1LjY5OS0xNS42OTktMTUuNjk5LTQxLjE0NSwwLTU2Ljg0NGMxNS42OTYtMTUuNjg3LDQxLjEyNy0xNS42ODcsNTYuODI5LDBsMTA1LjU2MywxMDUuNTU0ICAgTDI3OS43MjEsMTEuNzY3YzE1LjcwNS0xNS42ODcsNDEuMTM5LTE1LjY4Nyw1Ni44MzIsMEMzNTIuMjU4LDI3LjQ2NiwzNTIuMjU4LDUyLjkxMiwzMzYuNTU5LDY4LjYxMXoiIGZpbGw9IiNEODAwMjciLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",

        'free file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDOEJEQjg7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIxOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIyOC41IiBjeT0iNDciIHI9IjMiLz4KCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGN4PSIzOC41IiBjeT0iNDciIHI9IjMiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K",
        'doc file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMTguNSwxM2gtNmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg2YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMTkuMDUyLDEzLDE4LjUsMTN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTIxLjUsMThoLTljLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoOWMwLjU1MiwwLDEsMC40NDgsMSwxUzIyLjA1MiwxOCwyMS41LDE4eiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNS41LDE4Yy0wLjI2LDAtMC41Mi0wLjExLTAuNzEtMC4yOWMtMC4xOC0wLjE5LTAuMjktMC40NS0wLjI5LTAuNzFjMC0wLjI2LDAuMTEtMC41MiwwLjI5LTAuNzEgICBjMC4zNy0wLjM3LDEuMDUtMC4zNywxLjQyLDBjMC4xOCwwLjE5LDAuMjksMC40NSwwLjI5LDAuNzFjMCwwLjI2LTAuMTEsMC41Mi0wLjI5LDAuNzFDMjYuMDIsMTcuODksMjUuNzYsMTgsMjUuNSwxOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzcuNSwxOGgtOGMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg4YzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzguMDUyLDE4LDM3LjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTEyLjUsMzNjLTAuMjYsMC0wLjUyLTAuMTEtMC43MS0wLjI5Yy0wLjE4LTAuMTktMC4yOS0wLjQ1LTAuMjktMC43MWMwLTAuMjYsMC4xMS0wLjUyLDAuMjktMC43MSAgIGMwLjM3LTAuMzcsMS4wNS0wLjM3LDEuNDIsMGMwLjE4LDAuMTksMC4yOSwwLjQ0LDAuMjksMC43MWMwLDAuMjYtMC4xMSwwLjUyLTAuMjksMC43MUMxMy4wMiwzMi44OSwxMi43NiwzMywxMi41LDMzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0yNC41LDMzaC04Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDhjMC41NTIsMCwxLDAuNDQ4LDEsMVMyNS4wNTIsMzMsMjQuNSwzM3oiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwxOGgtMmMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWgyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDE4LDQzLjUsMTh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTM0LjUsMjNoLTIyYy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDIyYzAuNTUyLDAsMSwwLjQ0OCwxLDFTMzUuMDUyLDIzLDM0LjUsMjN6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojODY5N0NCOyIgZD0iTTQzLjUsMjNoLTZjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoNmMwLjU1MiwwLDEsMC40NDgsMSwxUzQ0LjA1MiwyMyw0My41LDIzeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6Izg2OTdDQjsiIGQ9Ik0xNi41LDI4aC00Yy0wLjU1MiwwLTEtMC40NDgtMS0xczAuNDQ4LTEsMS0xaDRjMC41NTIsMCwxLDAuNDQ4LDEsMVMxNy4wNTIsMjgsMTYuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNMzAuNSwyOGgtMTBjLTAuNTUyLDAtMS0wLjQ0OC0xLTFzMC40NDgtMSwxLTFoMTBjMC41NTIsMCwxLDAuNDQ4LDEsMVMzMS4wNTIsMjgsMzAuNSwyOHoiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM4Njk3Q0I7IiBkPSJNNDMuNSwyOGgtOWMtMC41NTIsMC0xLTAuNDQ4LTEtMXMwLjQ0OC0xLDEtMWg5YzAuNTUyLDAsMSwwLjQ0OCwxLDFTNDQuMDUyLDI4LDQzLjUsMjh6Ii8+Cgk8cGF0aCBzdHlsZT0iZmlsbDojMDA5NkU2OyIgZD0iTTQ4LjAzNyw1Nkg3Ljk2M0M3LjE1NSw1Niw2LjUsNTUuMzQ1LDYuNSw1NC41MzdWMzloNDN2MTUuNTM3QzQ5LjUsNTUuMzQ1LDQ4Ljg0NSw1Niw0OC4wMzcsNTZ6Ii8+Cgk8Zz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTIzLjUsNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzE5LjUwMyw1Mi45ODQsMTkuMzA3LDUzLDE5LjE4LDUzaC0zLjgxNFY0Mi45MjRIMTguNCAgICBjMC44NDgsMCwxLjU5MywwLjEzNSwyLjIzNSwwLjQwM3MxLjE3NiwwLjYyNywxLjYsMS4wNzNzMC43NCwwLjk1NSwwLjk1LDEuNTI0QzIzLjM5NSw0Ni40OTQsMjMuNSw0Ny4wOCwyMy41LDQ3LjY4MnogICAgIE0xOC42MzMsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgxOC42MzN6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMy40NzUsNDcuOTE0YzAsMC44NDgtMC4xMDcsMS41OTUtMC4zMjEsMi4yNDJjLTAuMjE0LDAuNjQ3LTAuNTExLDEuMTg1LTAuODg5LDEuNjEzICAgIGMtMC4zNzgsMC40MjktMC44MiwwLjc1Mi0xLjMyNiwwLjk3MXMtMS4wNiwwLjMyOC0xLjY2MSwwLjMyOHMtMS4xNTUtMC4xMDktMS42NjEtMC4zMjhzLTAuOTQ4LTAuNTQyLTEuMzI2LTAuOTcxICAgIGMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTNjLTAuMjE0LTAuNjQ3LTAuMzIxLTEuMzk1LTAuMzIxLTIuMjQyczAuMTA3LTEuNTkzLDAuMzIxLTIuMjM1ICAgIGMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2YzAuMzc4LTAuNDI5LDAuODItMC43NTQsMS4zMjYtMC45NzhzMS4wNi0wLjMzNSwxLjY2MS0wLjMzNXMxLjE1NSwwLjExMSwxLjY2MSwwLjMzNSAgICBzMC45NDgsMC41NDksMS4zMjYsMC45NzhjMC4zNzgsMC40MjksMC42NzQsMC45NjQsMC44ODksMS42MDZDMzMuMzY3LDQ2LjMyMSwzMy40NzUsNDcuMDY2LDMzLjQ3NSw0Ny45MTR6IE0yOS4yMzYsNTEuNzI5ICAgIGMwLjMzNywwLDAuNjU4LTAuMDY2LDAuOTY0LTAuMTk4YzAuMzA1LTAuMTMyLDAuNTc5LTAuMzQ5LDAuODItMC42NDljMC4yNDEtMC4zMDEsMC40MzEtMC42OTUsMC41NjctMS4xODMgICAgczAuMjA5LTEuMDgyLDAuMjE5LTEuNzg0Yy0wLjAwOS0wLjY4NC0wLjA4LTEuMjY1LTAuMjEyLTEuNzQzYy0wLjEzMi0wLjQ3OS0wLjMxNC0wLjg3My0wLjU0Ny0xLjE4M3MtMC40OTctMC41MzMtMC43OTMtMC42NyAgICBjLTAuMjk2LTAuMTM3LTAuNjA4LTAuMjA1LTAuOTM3LTAuMjA1Yy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5ICAgIGMtMC4yNDIsMC4zMDYtMC40MzEsMC42OTktMC41NjcsMS4xODNzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1ICAgIGMwLjEzMiwwLjQ4MywwLjMxNCwwLjg3NywwLjU0NywxLjE4M3MwLjQ5NywwLjUyOCwwLjc5MywwLjY3QzI4LjU5Niw1MS42NTgsMjguOTA4LDUxLjcyOSwyOS4yMzYsNTEuNzI5eiIvPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNNDIuNjA3LDUxLjk3NWMtMC4zNzQsMC4zNjQtMC43OTgsMC42MzgtMS4yNzEsMC44MmMtMC40NzQsMC4xODMtMC45ODQsMC4yNzMtMS41MzEsMC4yNzMgICAgYy0wLjYwMiwwLTEuMTU1LTAuMTA5LTEuNjYxLTAuMzI4cy0wLjk0OC0wLjU0Mi0xLjMyNi0wLjk3MWMtMC4zNzgtMC40MjktMC42NzUtMC45NjYtMC44ODktMS42MTMgICAgYy0wLjIxNC0wLjY0Ny0wLjMyMS0xLjM5NS0wLjMyMS0yLjI0MnMwLjEwNy0xLjU5MywwLjMyMS0yLjIzNWMwLjIxNC0wLjY0MywwLjUxLTEuMTc4LDAuODg5LTEuNjA2ICAgIGMwLjM3OC0wLjQyOSwwLjgyMi0wLjc1NCwxLjMzMy0wLjk3OGMwLjUxLTAuMjI0LDEuMDYyLTAuMzM1LDEuNjU0LTAuMzM1YzAuNTQ3LDAsMS4wNTcsMC4wOTEsMS41MzEsMC4yNzMgICAgYzAuNDc0LDAuMTgzLDAuODk3LDAuNDU2LDEuMjcxLDAuODJsLTEuMTM1LDEuMDEyYy0wLjIyOC0wLjI2NS0wLjQ4MS0wLjQ1Ni0wLjc1OS0wLjU3NGMtMC4yNzgtMC4xMTgtMC41NjctMC4xNzgtMC44NjgtMC4xNzggICAgYy0wLjMzNywwLTAuNjU5LDAuMDYzLTAuOTY0LDAuMTkxYy0wLjMwNiwwLjEyOC0wLjU3OSwwLjM0NC0wLjgyLDAuNjQ5Yy0wLjI0MiwwLjMwNi0wLjQzMSwwLjY5OS0wLjU2NywxLjE4MyAgICBzLTAuMjEsMS4wNzUtMC4yMTksMS43NzdjMC4wMDksMC42ODQsMC4wOCwxLjI2NywwLjIxMiwxLjc1YzAuMTMyLDAuNDgzLDAuMzE0LDAuODc3LDAuNTQ3LDEuMTgzczAuNDk3LDAuNTI4LDAuNzkzLDAuNjcgICAgYzAuMjk2LDAuMTQyLDAuNjA4LDAuMjEyLDAuOTM3LDAuMjEyczAuNjM2LTAuMDYsMC45MjMtMC4xNzhzMC41NDktMC4zMSwwLjc4Ni0wLjU3NEw0Mi42MDcsNTEuOTc1eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'xsl file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiM5MUNEQTA7IiBkPSJNNDguMDM3LDU2SDcuOTYzQzcuMTU1LDU2LDYuNSw1NS4zNDUsNi41LDU0LjUzN1YzOWg0M3YxNS41MzdDNDkuNSw1NS4zNDUsNDguODQ1LDU2LDQ4LjAzNyw1NnoiLz4KCTxnPgoJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjAuMzc5LDQ4LjEwNUwyMi45MzYsNTNoLTEuOWwtMS42LTMuODAxaC0wLjEzN0wxNy41NzYsNTNoLTEuOWwyLjU1Ny00Ljg5NWwtMi43MjEtNS4xODJoMS44NzMgICAgbDEuNzc3LDQuMTAyaDAuMTM3bDEuOTI4LTQuMTAySDIzLjFMMjAuMzc5LDQ4LjEwNXoiLz4KCQk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI3LjAzNyw0Mi45MjR2OC44MzJoNC42MzVWNTNoLTYuMzAzVjQyLjkyNEgyNy4wMzd6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zOS4wNDEsNTAuMjM4YzAsMC4zNjQtMC4wNzUsMC43MTgtMC4yMjYsMS4wNlMzOC40NTMsNTEuOTQsMzguMTgsNTIuMnMtMC42MTEsMC40NjctMS4wMTIsMC42MjIgICAgYy0wLjQwMSwwLjE1NS0wLjg1NywwLjIzMi0xLjM2NywwLjIzMmMtMC4yMTksMC0wLjQ0NC0wLjAxMi0wLjY3Ny0wLjAzNHMtMC40NjctMC4wNjItMC43MDQtMC4xMTYgICAgYy0wLjIzNy0wLjA1NS0wLjQ2My0wLjEzLTAuNjc3LTAuMjI2Yy0wLjIxNC0wLjA5Ni0wLjM5OS0wLjIxMi0wLjU1NC0wLjM0OWwwLjI4Ny0xLjE3NmMwLjEyNywwLjA3MywwLjI4OSwwLjE0NCwwLjQ4NSwwLjIxMiAgICBjMC4xOTYsMC4wNjgsMC4zOTgsMC4xMzIsMC42MDgsMC4xOTFjMC4yMDksMC4wNiwwLjQxOSwwLjEwNywwLjYyOSwwLjE0NGMwLjIwOSwwLjAzNiwwLjQwNSwwLjA1NSwwLjU4OCwwLjA1NSAgICBjMC41NTYsMCwwLjk4Mi0wLjEzLDEuMjc4LTAuMzljMC4yOTYtMC4yNiwwLjQ0NC0wLjY0NSwwLjQ0NC0xLjE1NWMwLTAuMzEtMC4xMDUtMC41NzQtMC4zMTQtMC43OTMgICAgYy0wLjIxLTAuMjE5LTAuNDcyLTAuNDE3LTAuNzg2LTAuNTk1cy0wLjY1NC0wLjM1NS0xLjAxOS0wLjUzM2MtMC4zNjUtMC4xNzgtMC43MDctMC4zODgtMS4wMjUtMC42MjkgICAgYy0wLjMxOS0wLjI0MS0wLjU4My0wLjUyNi0wLjc5My0wLjg1NGMtMC4yMS0wLjMyOC0wLjMxNC0wLjczOC0wLjMxNC0xLjIzYzAtMC40NDYsMC4wODItMC44NDMsMC4yNDYtMS4xODkgICAgczAuMzg1LTAuNjQxLDAuNjYzLTAuODgyYzAuMjc4LTAuMjQxLDAuNjAyLTAuNDI2LDAuOTcxLTAuNTU0czAuNzU5LTAuMTkxLDEuMTY5LTAuMTkxYzAuNDE5LDAsMC44NDMsMC4wMzksMS4yNzEsMC4xMTYgICAgYzAuNDI4LDAuMDc3LDAuNzc0LDAuMjAzLDEuMDM5LDAuMzc2Yy0wLjA1NSwwLjExOC0wLjExOSwwLjI0OC0wLjE5MSwwLjM5Yy0wLjA3MywwLjE0Mi0wLjE0MiwwLjI3My0wLjIwNSwwLjM5NiAgICBjLTAuMDY0LDAuMTIzLTAuMTE5LDAuMjI2LTAuMTY0LDAuMzA4Yy0wLjA0NiwwLjA4Mi0wLjA3MywwLjEyOC0wLjA4MiwwLjEzN2MtMC4wNTUtMC4wMjctMC4xMTYtMC4wNjMtMC4xODUtMC4xMDkgICAgcy0wLjE2Ny0wLjA5MS0wLjI5NC0wLjEzN2MtMC4xMjgtMC4wNDYtMC4yOTYtMC4wNzctMC41MDYtMC4wOTZjLTAuMjEtMC4wMTktMC40NzktMC4wMTQtMC44MDcsMC4wMTQgICAgYy0wLjE4MywwLjAxOS0wLjM1NSwwLjA3LTAuNTIsMC4xNTdzLTAuMzEsMC4xOTMtMC40MzgsMC4zMjFjLTAuMTI4LDAuMTI4LTAuMjI4LDAuMjcxLTAuMzAxLDAuNDMxICAgIGMtMC4wNzMsMC4xNTktMC4xMDksMC4zMTMtMC4xMDksMC40NThjMCwwLjM2NCwwLjEwNCwwLjY1OCwwLjMxNCwwLjg4MmMwLjIwOSwwLjIyNCwwLjQ2OSwwLjQxOSwwLjc3OSwwLjU4OCAgICBjMC4zMSwwLjE2OSwwLjY0NywwLjMzMywxLjAxMiwwLjQ5MmMwLjM2NCwwLjE1OSwwLjcwNCwwLjM1NCwxLjAxOSwwLjU4MXMwLjU3NiwwLjUxMywwLjc4NiwwLjg1NCAgICBDMzguOTM2LDQ5LjI2MSwzOS4wNDEsNDkuNywzOS4wNDEsNTAuMjM4eiIvPgoJPC9nPgoJPHBhdGggc3R5bGU9ImZpbGw6I0M4QkRCODsiIGQ9Ik0yMy41LDE2di00aC0xMnY0djJ2MnYydjJ2MnYydjJ2NGgxMGgyaDIxdi00di0ydi0ydi0ydi0ydi0ydi00SDIzLjV6IE0xMy41LDE0aDh2MmgtOFYxNHogICAgTTEzLjUsMThoOHYyaC04VjE4eiBNMTMuNSwyMmg4djJoLThWMjJ6IE0xMy41LDI2aDh2MmgtOFYyNnogTTIxLjUsMzJoLTh2LTJoOFYzMnogTTQyLjUsMzJoLTE5di0yaDE5VjMyeiBNNDIuNSwyOGgtMTl2LTJoMTlWMjggICB6IE00Mi41LDI0aC0xOXYtMmgxOVYyNHogTTIzLjUsMjB2LTJoMTl2MkgyMy41eiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",
        'pdf file': "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2IDU2IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1NiA1NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggc3R5bGU9ImZpbGw6I0U5RTlFMDsiIGQ9Ik0zNi45ODUsMEg3Ljk2M0M3LjE1NSwwLDYuNSwwLjY1NSw2LjUsMS45MjZWNTVjMCwwLjM0NSwwLjY1NSwxLDEuNDYzLDFoNDAuMDc0ICAgYzAuODA4LDAsMS40NjMtMC42NTUsMS40NjMtMVYxMi45NzhjMC0wLjY5Ni0wLjA5My0wLjkyLTAuMjU3LTEuMDg1TDM3LjYwNywwLjI1N0MzNy40NDIsMC4wOTMsMzcuMjE4LDAsMzYuOTg1LDB6Ii8+Cgk8cG9seWdvbiBzdHlsZT0iZmlsbDojRDlEN0NBOyIgcG9pbnRzPSIzNy41LDAuMTUxIDM3LjUsMTIgNDkuMzQ5LDEyICAiLz4KCTxwYXRoIHN0eWxlPSJmaWxsOiNDQzRCNEM7IiBkPSJNMTkuNTE0LDMzLjMyNEwxOS41MTQsMzMuMzI0Yy0wLjM0OCwwLTAuNjgyLTAuMTEzLTAuOTY3LTAuMzI2ICAgYy0xLjA0MS0wLjc4MS0xLjE4MS0xLjY1LTEuMTE1LTIuMjQyYzAuMTgyLTEuNjI4LDIuMTk1LTMuMzMyLDUuOTg1LTUuMDY4YzEuNTA0LTMuMjk2LDIuOTM1LTcuMzU3LDMuNzg4LTEwLjc1ICAgYy0wLjk5OC0yLjE3Mi0xLjk2OC00Ljk5LTEuMjYxLTYuNjQzYzAuMjQ4LTAuNTc5LDAuNTU3LTEuMDIzLDEuMTM0LTEuMjE1YzAuMjI4LTAuMDc2LDAuODA0LTAuMTcyLDEuMDE2LTAuMTcyICAgYzAuNTA0LDAsMC45NDcsMC42NDksMS4yNjEsMS4wNDljMC4yOTUsMC4zNzYsMC45NjQsMS4xNzMtMC4zNzMsNi44MDJjMS4zNDgsMi43ODQsMy4yNTgsNS42Miw1LjA4OCw3LjU2MiAgIGMxLjMxMS0wLjIzNywyLjQzOS0wLjM1OCwzLjM1OC0wLjM1OGMxLjU2NiwwLDIuNTE1LDAuMzY1LDIuOTAyLDEuMTE3YzAuMzIsMC42MjIsMC4xODksMS4zNDktMC4zOSwyLjE2ICAgYy0wLjU1NywwLjc3OS0xLjMyNSwxLjE5MS0yLjIyLDEuMTkxYy0xLjIxNiwwLTIuNjMyLTAuNzY4LTQuMjExLTIuMjg1Yy0yLjgzNywwLjU5My02LjE1LDEuNjUxLTguODI4LDIuODIyICAgYy0wLjgzNiwxLjc3NC0xLjYzNywzLjIwMy0yLjM4Myw0LjI1MUMyMS4yNzMsMzIuNjU0LDIwLjM4OSwzMy4zMjQsMTkuNTE0LDMzLjMyNHogTTIyLjE3NiwyOC4xOTggICBjLTIuMTM3LDEuMjAxLTMuMDA4LDIuMTg4LTMuMDcxLDIuNzQ0Yy0wLjAxLDAuMDkyLTAuMDM3LDAuMzM0LDAuNDMxLDAuNjkyQzE5LjY4NSwzMS41ODcsMjAuNTU1LDMxLjE5LDIyLjE3NiwyOC4xOTh6ICAgIE0zNS44MTMsMjMuNzU2YzAuODE1LDAuNjI3LDEuMDE0LDAuOTQ0LDEuNTQ3LDAuOTQ0YzAuMjM0LDAsMC45MDEtMC4wMSwxLjIxLTAuNDQxYzAuMTQ5LTAuMjA5LDAuMjA3LTAuMzQzLDAuMjMtMC40MTUgICBjLTAuMTIzLTAuMDY1LTAuMjg2LTAuMTk3LTEuMTc1LTAuMTk3QzM3LjEyLDIzLjY0OCwzNi40ODUsMjMuNjcsMzUuODEzLDIzLjc1NnogTTI4LjM0MywxNy4xNzQgICBjLTAuNzE1LDIuNDc0LTEuNjU5LDUuMTQ1LTIuNjc0LDcuNTY0YzIuMDktMC44MTEsNC4zNjItMS41MTksNi40OTYtMi4wMkMzMC44MTUsMjEuMTUsMjkuNDY2LDE5LjE5MiwyOC4zNDMsMTcuMTc0eiAgICBNMjcuNzM2LDguNzEyYy0wLjA5OCwwLjAzMy0xLjMzLDEuNzU3LDAuMDk2LDMuMjE2QzI4Ljc4MSw5LjgxMywyNy43NzksOC42OTgsMjcuNzM2LDguNzEyeiIvPgoJPHBhdGggc3R5bGU9ImZpbGw6I0NDNEI0QzsiIGQ9Ik00OC4wMzcsNTZINy45NjNDNy4xNTUsNTYsNi41LDU1LjM0NSw2LjUsNTQuNTM3VjM5aDQzdjE1LjUzN0M0OS41LDU1LjM0NSw0OC44NDUsNTYsNDguMDM3LDU2eiIvPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0xNy4zODUsNTNoLTEuNjQxVjQyLjkyNGgyLjg5OGMwLjQyOCwwLDAuODUyLDAuMDY4LDEuMjcxLDAuMjA1ICAgIGMwLjQxOSwwLjEzNywwLjc5NSwwLjM0MiwxLjEyOCwwLjYxNWMwLjMzMywwLjI3MywwLjYwMiwwLjYwNCwwLjgwNywwLjk5MXMwLjMwOCwwLjgyMiwwLjMwOCwxLjMwNiAgICBjMCwwLjUxMS0wLjA4NywwLjk3My0wLjI2LDEuMzg4Yy0wLjE3MywwLjQxNS0wLjQxNSwwLjc2NC0wLjcyNSwxLjA0NmMtMC4zMSwwLjI4Mi0wLjY4NCwwLjUwMS0xLjEyMSwwLjY1NiAgICBzLTAuOTIxLDAuMjMyLTEuNDQ5LDAuMjMyaC0xLjIxN1Y1M3ogTTE3LjM4NSw0NC4xNjh2My45OTJoMS41MDRjMC4yLDAsMC4zOTgtMC4wMzQsMC41OTUtMC4xMDMgICAgYzAuMTk2LTAuMDY4LDAuMzc2LTAuMTgsMC41NC0wLjMzNWMwLjE2NC0wLjE1NSwwLjI5Ni0wLjM3MSwwLjM5Ni0wLjY0OWMwLjEtMC4yNzgsMC4xNS0wLjYyMiwwLjE1LTEuMDMyICAgIGMwLTAuMTY0LTAuMDIzLTAuMzU0LTAuMDY4LTAuNTY3Yy0wLjA0Ni0wLjIxNC0wLjEzOS0wLjQxOS0wLjI4LTAuNjE1Yy0wLjE0Mi0wLjE5Ni0wLjM0LTAuMzYtMC41OTUtMC40OTIgICAgYy0wLjI1NS0wLjEzMi0wLjU5My0wLjE5OC0xLjAxMi0wLjE5OEgxNy4zODV6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMi4yMTksNDcuNjgyYzAsMC44MjktMC4wODksMS41MzgtMC4yNjcsMi4xMjZzLTAuNDAzLDEuMDgtMC42NzcsMS40NzdzLTAuNTgxLDAuNzA5LTAuOTIzLDAuOTM3ICAgIHMtMC42NzIsMC4zOTgtMC45OTEsMC41MTNjLTAuMzE5LDAuMTE0LTAuNjExLDAuMTg3LTAuODc1LDAuMjE5QzI4LjIyMiw1Mi45ODQsMjguMDI2LDUzLDI3Ljg5OCw1M2gtMy44MTRWNDIuOTI0aDMuMDM1ICAgIGMwLjg0OCwwLDEuNTkzLDAuMTM1LDIuMjM1LDAuNDAzczEuMTc2LDAuNjI3LDEuNiwxLjA3M3MwLjc0LDAuOTU1LDAuOTUsMS41MjRDMzIuMTE0LDQ2LjQ5NCwzMi4yMTksNDcuMDgsMzIuMjE5LDQ3LjY4MnogICAgIE0yNy4zNTIsNTEuNzk3YzEuMTEyLDAsMS45MTQtMC4zNTUsMi40MDYtMS4wNjZzMC43MzgtMS43NDEsMC43MzgtMy4wOWMwLTAuNDE5LTAuMDUtMC44MzQtMC4xNS0xLjI0NCAgICBjLTAuMTAxLTAuNDEtMC4yOTQtMC43ODEtMC41ODEtMS4xMTRzLTAuNjc3LTAuNjAyLTEuMTY5LTAuODA3cy0xLjEzLTAuMzA4LTEuOTE0LTAuMzA4aC0wLjk1N3Y3LjYyOUgyNy4zNTJ6Ii8+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNi4yNjYsNDQuMTY4djMuMTcyaDQuMjExdjEuMTIxaC00LjIxMVY1M2gtMS42NjhWNDIuOTI0SDQwLjl2MS4yNDRIMzYuMjY2eiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=",

        // '': "",
    };

    function iconJs(dataUrlTitle) {
        return dataUrls[dataUrlTitle] || dataUrlTitle || '';
    }

    global.iconJs = iconJs;

})(window);