import {createContext,useContext,useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';

const ChatContext = createContext();

// chat priovider which wraps all over the app
const ChatProvider = ({children}) => {
    const [user,setUser] = useState();
    const history = useHistory(); // to navigate between pages

    useEffect(() => {
        const userData =  JSON.parse(localStorage.getItem("userInfo"));
        setUser(userData);

        if(!userData){
            history.push("/");
        }
    },[history]);
    return (
        <ChatContext.Provider value={{user,setUser}}>
            {children}
        </ChatContext.Provider>
    );
};

// to make state accessible to other aaps
export const ChatState = () =>{
    return useContext(ChatContext);
}


export default ChatProvider;