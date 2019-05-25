export default class RequestHandler {


    getMoviesFromApiAsync() {

        return fetch('http://192.168.1.4:8081')
            .then((response) => response.json())
            .then((responseJson) => {

                return responseJson;
                console.log("inside "+marker);
            })
            .catch((error) => {
                console.error(error);
            });


    }

}