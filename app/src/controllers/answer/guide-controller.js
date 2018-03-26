/*global app*/
/*global angular*/
/*global Fuse*/

app.controller('AnswerGuideController', ['$rootScope', '$scope', '$state', '$timeout', '$http',
    function($rootScope, $scope, $state, $timeout, $http) {

        var me = this;

        me.hideGuidance = hideGuidance;
        me.selectCategory = selectCategory;
        me.search = search;
        me.selectArticle = selectArticle;

        me.data = null;
        me.filteredArticles = [];

        var fuseOptions = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["title"]
        };

        $http.get('/json/guidance-data.json').then(function(res) {
            me.data = res.data || [];
            me.selectedCategory = me.data[0];
            me.search();
        });

        function hideGuidance() {
            angular.element('#ja-answer-guide-modal').modal('hide');
        }

        function selectCategory(category) {
            me.selectedCategory = category;
            me.search();
        }

        function search() {
            me.filteredArticles = me.selectedCategory.articles;
            if (me.searchText) {
                // me.filteredArticles = me.filteredArticles.filter(function(article) {
                //     return article.title.toUpperCase().includes(me.searchText.toUpperCase());
                // });
                var fuse = new Fuse(me.filteredArticles, fuseOptions);
                me.filteredArticles = fuse.search(me.searchText).map(function(item) {
                    return item.item;
                });
            }
            me.selectedArticle = null;
            if (me.filteredArticles.length === 1) {
                me.selectedArticle = me.filteredArticles[0];
            }
        }

        function selectArticle(article) {
            me.selectedArticle = me.selectedArticle === article ? null : article;
        }

    }
]);
