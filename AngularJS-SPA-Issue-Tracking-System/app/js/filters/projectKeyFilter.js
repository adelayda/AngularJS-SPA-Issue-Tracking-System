issueTracker.filter('firstLetters', function () {
    return function (input, scope) {
        if (input != null) {
           var tokens = input.split(' ');
            var result = "";
            tokens.forEach(function (element) {
                result += element.substring(0, 1)
            });

            return result;
        }
    }
});
