issueTracker.directive('autoComplete', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {
            // Invoke jQuery autocomplete to rebind the the list of suggestions every time the label list changes
            scope.$watch(function () {
                return scope.labelsList;
            }, function () {
                elem.autocomplete({
                    source: scope.labelsList
                });
            });
        }
    };
});
