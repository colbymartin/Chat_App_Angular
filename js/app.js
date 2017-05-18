const app = angular.module('ChatApp', ['angularMoment']);

app.controller('MessageListController', function ($scope, MessageService) {
    $scope.messages = MessageService.getMessages();

});

app.controller('MessageAddController', function ($scope, MessageService) {
    $scope.my_name = '';
    $scope.my_message = '';
    
    $scope.add = function () {
        
        MessageService.addMessage($scope.my_name, $scope.my_message);
        $scope.messages = MessageService.getMessages();
        $scope.my_name = '';
        $scope.my_message = '';
    }
});

app.factory('MessageService', function ($http) {
    let messages = [];

    $http.get('https://tiy-28202.herokuapp.com/chats').then(function (response) {
        const log = response.data.chats;

        for (let i = log.length - 1; i >= 0; i--) {
            messages.push({
                author: log[i].from,
                content: log[i].message,
                time: log[i].added,
            })
        }
    });


return {
    getMessages() {
        return messages;
    },
    addMessage (name, mess) {

        let data = {
            from: name,
            message: mess,
        }

        $http.post('https://tiy-28202.herokuapp.com/chats', JSON.stringify(data)).then(function (response) {
            messages.splice(0, messages.length);
            const log = response.data.chats;
            for (let i = log.length - 1; i >= 0; i--) {
                messages.push({
                    author: log[i].from,
                    content: log[i].message,
                    time: log[i].added,
                });
        }
    }); 
    }
}
})

