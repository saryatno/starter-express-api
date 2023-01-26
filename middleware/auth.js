import jwt from 'jsonwebtoken';
import axios from 'axios';

const auth = async(req, res, next) => {
    try {

        const tokenType = req.headers.authorization.split(" ")[1]; 
        const token = req.headers.authorization.split(" ")[2]; 
        const isCustomAuth = token.length < 500;
        let decodedData;
        //console.log(tokenType);
        
        if(token && isCustomAuth) {
            if (tokenType == '1'){
                
                decodedData = jwt.verify(token, "test"); //test is code in controllers sebaiknya di save di env
                //console.log(decodedData);
                req.userId = decodedData?.id;
                
            }else{
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                
                decodedData = res.data;

                req.userId = decodedData?.sub;
                
            }

        }else{
            decodedData = jwt.decode(token); //test is code in controllers sebaiknya di save di env

            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        //console.log(req);
        console.log(error);
    }
}

export default auth;